'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileDown, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import type { TaskFormData } from './types';

const initialFormData: TaskFormData = {
  name: '',
  email: '',
  companyName: '',
  taskDescription: '',
  copyUsage: {
    mobileApp: false,
    website: false,
    email: false,
    pushNotification: false,
    inAppMessage: false,
    chatbot: false,
    other: false,
    otherDetails: ''
  },
  copyGoal: '',
  audience: '',
  isGlobalAudience: '',
  tone: {
    friendly: false,
    professional: false,
    reassuring: false,
    funPlayful: false,
    neutral: false,
    other: false,
    otherDetails: ''
  },
  hasToneGuidelines: '',
  toneGuidelinesLink: '',
  hasCharacterLimit: '',
  characterLimit: '',
  hasDesignFile: '',
  designFileLink: '',
  hasLegalRequirements: '',
  legalRequirements: '',
  successCriteria: '',
  deadline: '',
  deadlineDays: '',
  revisionRounds: '',
  uploadedFiles: [],
  fileLinks: []
};

export default function WritingFormClient() {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [siteKey, setSiteKey] = useState<string>("");

  useEffect(() => {
    // Get the reCAPTCHA site key
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
    setSiteKey(key);

    // If no key is found in production, log a warning
    if (!key && process.env.NODE_ENV === "production") {
      console.warn(
        "reCAPTCHA site key is missing for writing form. Please check your environment variables."
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (section: 'copyUsage' | 'tone', name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked
      }
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...filesArray]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const exportAsMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ux-writing-task-${formData.name.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // If site key is not available, bypass captcha check in dev
    if (!siteKey && process.env.NODE_ENV !== "production") {
      // Skip captcha verification in development if no key is provided
      console.warn("Bypassing reCAPTCHA verification in development mode");
    } else if (!captchaToken) {
      setError("Please complete the captcha verification");
      return;
    }

    setSubmitting(true);
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch("/api/writing-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaToken || "dev-mode-bypass",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to submit writing task");
    } finally {
      setSubmitting(false);
    }
  };

  const generateMarkdown = () => {
    return `# UX Writing Task Submission

## 1. Contact Details
- **Name:** ${formData.name}
- **Email:** ${formData.email}
- **Company/Team Name:** ${formData.companyName}

## 2. Task Overview
### What do you need help writing?
${formData.taskDescription}

### Where will this copy be used?
${formData.copyUsage.mobileApp ? '- Mobile App (iOS/Android)\n' : ''}${formData.copyUsage.website ? '- Website\n' : ''}${formData.copyUsage.email ? '- Email\n' : ''}${formData.copyUsage.pushNotification ? '- Push Notification\n' : ''}${formData.copyUsage.inAppMessage ? '- In-app Message\n' : ''}${formData.copyUsage.chatbot ? '- Chatbot\n' : ''}${formData.copyUsage.other ? `- Other: ${formData.copyUsage.otherDetails}\n` : ''}

### What's the goal of this copy?
${formData.copyGoal}

## 3. Target Audience
### Who will read this?
${formData.audience}

### Is this for a global audience?
${formData.isGlobalAudience}

## 4. Tone and Voice
### Preferred tone of voice
${formData.tone.friendly ? '- Friendly\n' : ''}${formData.tone.professional ? '- Professional\n' : ''}${formData.tone.reassuring ? '- Reassuring\n' : ''}${formData.tone.funPlayful ? '- Fun/playful\n' : ''}${formData.tone.neutral ? '- Neutral\n' : ''}${formData.tone.other ? `- Other: ${formData.tone.otherDetails}\n` : ''}

### Do you have tone/brand guidelines?
${formData.hasToneGuidelines}${formData.toneGuidelinesLink ? '\n- Link: ' + formData.toneGuidelinesLink : ''}

## 5. Technical Constraints
### Do you have a character or word limit?
${formData.hasCharacterLimit}${formData.characterLimit ? ': ' + formData.characterLimit + ' characters/words' : ''}

### Do you have a design file (e.g., Figma)?
${formData.hasDesignFile}${formData.designFileLink ? '\n- Link: ' + formData.designFileLink : ''}

## 6. Other Considerations
### Any legal or compliance copy that must be included?
${formData.hasLegalRequirements}${formData.legalRequirements ? '\n' + formData.legalRequirements : ''}

### What does success look like for this copy?
${formData.successCriteria}

## 7. Timeline
### When do you need this by?
${formData.deadline === 'ASAP' ? 'ASAP' : ''}${formData.deadline === 'In days' ? 'In ' + formData.deadlineDays + ' days' : ''}${formData.deadline === 'No deadline' ? 'No deadline yet' : ''}

### Number of expected revision rounds
${formData.revisionRounds}

## 8. Uploaded Files
${formData.uploadedFiles.length > 0 ? formData.uploadedFiles.map(file => `- ${file.name}`).join('\n') : 'No files uploaded'}

## File Links
${formData.fileLinks.length > 0 
  ? formData.fileLinks.map((link, i) => `- [${link.description || `Link ${i+1}`}](${link.url})`).join('\n') 
  : 'No links provided'}
`;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto text-center">
          <h3 className="text-2xl font-bold">Thank You!</h3>
          <p className="mt-4 text-muted-foreground">Your UX writing task has been submitted successfully.</p>
          <p className="mt-2 text-muted-foreground">I'll be in touch with you shortly.</p>
          <Button className="mt-8" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">1. Contact Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="companyName">Company/Team Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">2. Task Overview</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskDescription">What do you need help writing?*</Label>
                <Textarea 
                  id="taskDescription" 
                  name="taskDescription" 
                  placeholder="Tell me about the screen, feature, or experience you need copy for. The more context, the better!" 
                  value={formData.taskDescription} 
                  onChange={handleInputChange} 
                  required
                  className="min-h-32"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Where will this copy be used?</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Select all platforms where this content will appear.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mobileApp" 
                      checked={formData.copyUsage.mobileApp} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'mobileApp', checked as boolean)}
                    />
                    <Label htmlFor="mobileApp" className="text-sm">Mobile App (iOS/Android)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="website" 
                      checked={formData.copyUsage.website} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'website', checked as boolean)}
                    />
                    <Label htmlFor="website" className="text-sm">Website</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="email" 
                      checked={formData.copyUsage.email} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'email', checked as boolean)}
                    />
                    <Label htmlFor="email" className="text-sm">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pushNotification" 
                      checked={formData.copyUsage.pushNotification} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'pushNotification', checked as boolean)}
                    />
                    <Label htmlFor="pushNotification" className="text-sm">Push Notification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="inAppMessage" 
                      checked={formData.copyUsage.inAppMessage} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'inAppMessage', checked as boolean)}
                    />
                    <Label htmlFor="inAppMessage" className="text-sm">In-app Message</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="chatbot" 
                      checked={formData.copyUsage.chatbot} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'chatbot', checked as boolean)}
                    />
                    <Label htmlFor="chatbot" className="text-sm">Chatbot</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="other" 
                      checked={formData.copyUsage.other} 
                      onCheckedChange={(checked) => handleCheckboxChange('copyUsage', 'other', checked as boolean)}
                    />
                    <Label htmlFor="other" className="text-sm">Other</Label>
                  </div>
                  {formData.copyUsage.other && (
                    <div className="sm:col-span-2">
                      <Input 
                        id="otherDetails" 
                        name="otherDetails" 
                        placeholder="Please specify" 
                        value={formData.copyUsage.otherDetails} 
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            copyUsage: {
                              ...prev.copyUsage,
                              otherDetails: e.target.value
                            }
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copyGoal">What's the goal of this copy?*</Label>
                <Textarea 
                  id="copyGoal" 
                  name="copyGoal" 
                  placeholder="What should this copy help users do or understand? E.g., complete a signup, understand how a feature works, feel confident about a purchase..." 
                  value={formData.copyGoal} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Target Audience */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">3. Target Audience</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audience">Who will read this?*</Label>
                <Textarea 
                  id="audience" 
                  name="audience" 
                  placeholder="Tell me about your users. Their mindset, familiarity with your product, or any relevant demographics. What's important to them?" 
                  value={formData.audience} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Is this for a global audience?*</Label>
                <RadioGroup 
                  value={formData.isGlobalAudience} 
                  onValueChange={(value) => handleRadioChange('isGlobalAudience', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="global-yes" />
                    <Label htmlFor="global-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="global-no" />
                    <Label htmlFor="global-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Needs localization later" id="global-later" />
                    <Label htmlFor="global-later">Needs localization later</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Tone and Voice */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">4. Tone and Voice</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred tone of voice</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  How should your copy sound to users? Check all that apply, or visit our <Link to="/writing-guidelines" className="text-primary underline hover:no-underline">writing guidelines tool</Link> for more tone options.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-friendly" 
                      checked={formData.tone.friendly} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'friendly', checked as boolean)}
                    />
                    <Label htmlFor="tone-friendly" className="text-sm">Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-professional" 
                      checked={formData.tone.professional} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'professional', checked as boolean)}
                    />
                    <Label htmlFor="tone-professional" className="text-sm">Professional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-reassuring" 
                      checked={formData.tone.reassuring} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'reassuring', checked as boolean)}
                    />
                    <Label htmlFor="tone-reassuring" className="text-sm">Reassuring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-funPlayful" 
                      checked={formData.tone.funPlayful} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'funPlayful', checked as boolean)}
                    />
                    <Label htmlFor="tone-funPlayful" className="text-sm">Fun/playful</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-neutral" 
                      checked={formData.tone.neutral} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'neutral', checked as boolean)}
                    />
                    <Label htmlFor="tone-neutral" className="text-sm">Neutral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tone-other" 
                      checked={formData.tone.other} 
                      onCheckedChange={(checked) => handleCheckboxChange('tone', 'other', checked as boolean)}
                    />
                    <Label htmlFor="tone-other" className="text-sm">Other</Label>
                  </div>
                  {formData.tone.other && (
                    <div className="sm:col-span-2">
                      <Input 
                        id="tone-otherDetails" 
                        name="tone-otherDetails" 
                        placeholder="Please specify" 
                        value={formData.tone.otherDetails} 
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            tone: {
                              ...prev.tone,
                              otherDetails: e.target.value
                            }
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Do you have tone/brand guidelines?*</Label>
                <RadioGroup 
                  value={formData.hasToneGuidelines} 
                  onValueChange={(value) => handleRadioChange('hasToneGuidelines', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="guidelines-yes" />
                    <Label htmlFor="guidelines-yes">Yes (please upload or link)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="guidelines-no" />
                    <Label htmlFor="guidelines-no">No</Label>
                  </div>
                </RadioGroup>
                
                {formData.hasToneGuidelines === 'Yes' && (
                  <div className="mt-2">
                    <Label htmlFor="toneGuidelinesLink">Link to guidelines (optional)</Label>
                    <Input 
                      id="toneGuidelinesLink" 
                      name="toneGuidelinesLink" 
                      placeholder="Already have tone guidelines? Drop a link here." 
                      value={formData.toneGuidelinesLink} 
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Technical Constraints */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">5. Technical Constraints</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Do you have a character or word limit?*</Label>
                <RadioGroup 
                  value={formData.hasCharacterLimit} 
                  onValueChange={(value) => handleRadioChange('hasCharacterLimit', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="limit-yes" />
                    <Label htmlFor="limit-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="limit-no" />
                    <Label htmlFor="limit-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Unsure" id="limit-unsure" />
                    <Label htmlFor="limit-unsure">Unsure – need help checking in design</Label>
                  </div>
                </RadioGroup>
                
                {formData.hasCharacterLimit === 'Yes' && (
                  <div className="mt-2">
                    <Label htmlFor="characterLimit">Character/word limit</Label>
                    <Input 
                      id="characterLimit" 
                      name="characterLimit" 
                      placeholder="How many characters or words can fit? E.g., 250 characters" 
                      value={formData.characterLimit} 
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Do you have a design file (e.g., Figma)?*</Label>
                <RadioGroup 
                  value={formData.hasDesignFile} 
                  onValueChange={(value) => handleRadioChange('hasDesignFile', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="design-yes" />
                    <Label htmlFor="design-yes">Yes (please link or upload)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Not yet" id="design-no" />
                    <Label htmlFor="design-no">Not yet</Label>
                  </div>
                </RadioGroup>
                
                {formData.hasDesignFile === 'Yes' && (
                  <div className="mt-2">
                    <Label htmlFor="designFileLink">Link to design file (optional)</Label>
                    <Input 
                      id="designFileLink" 
                      name="designFileLink" 
                      placeholder="Got Figma, Sketch, or other design files? Add a link here." 
                      value={formData.designFileLink} 
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Other Considerations */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">6. Other Considerations</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Any legal or compliance copy that must be included?*</Label>
                <RadioGroup 
                  value={formData.hasLegalRequirements} 
                  onValueChange={(value) => handleRadioChange('hasLegalRequirements', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="legal-yes" />
                    <Label htmlFor="legal-yes">Yes (please describe or upload)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="legal-no" />
                    <Label htmlFor="legal-no">No</Label>
                  </div>
                </RadioGroup>
                
                {formData.hasLegalRequirements === 'Yes' && (
                  <div className="mt-2">
                    <Label htmlFor="legalRequirements">Legal requirements details</Label>
                    <Textarea 
                      id="legalRequirements" 
                      name="legalRequirements" 
                      placeholder="Any specific disclaimers, terms, or compliance language that must be included?" 
                      value={formData.legalRequirements} 
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="successCriteria">What does success look like for this copy?</Label>
                <Textarea 
                  id="successCriteria" 
                  name="successCriteria" 
                  placeholder="How will we know if this copy works well? Any metrics, user behaviors, or outcomes you're hoping to see?" 
                  value={formData.successCriteria} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">7. Timeline</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>When do you need this by?*</Label>
                <RadioGroup 
                  value={formData.deadline} 
                  onValueChange={(value) => handleRadioChange('deadline', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ASAP" id="deadline-asap" />
                    <Label htmlFor="deadline-asap">ASAP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="In days" id="deadline-days" />
                    <Label htmlFor="deadline-days">In ... days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No deadline" id="deadline-none" />
                    <Label htmlFor="deadline-none">No deadline yet</Label>
                  </div>
                </RadioGroup>
                
                {formData.deadline === 'In days' && (
                  <div className="mt-2">
                    <Label htmlFor="deadlineDays">Number of days</Label>
                    <Input 
                      id="deadlineDays" 
                      name="deadlineDays" 
                      type="number" 
                      min="1"
                      placeholder="When do you need this? (e.g., 7 days)" 
                      value={formData.deadlineDays} 
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Number of expected revision rounds*</Label>
                <RadioGroup 
                  value={formData.revisionRounds} 
                  onValueChange={(value) => handleRadioChange('revisionRounds', value)}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="revisions-1" />
                    <Label htmlFor="revisions-1">1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="revisions-2" />
                    <Label htmlFor="revisions-2">2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3+" id="revisions-3plus" />
                    <Label htmlFor="revisions-3plus">3+</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Not sure yet" id="revisions-unsure" />
                    <Label htmlFor="revisions-unsure">Not sure yet</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Upload/Link Files */}
      <Card>
        <CardContent className="pt-6">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4">8. Upload / Link Files</h2>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Upload design files, copy docs, screenshots, etc.</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Visuals help tremendously! Share any reference materials that might be useful.
                </p>
                <div className="flex items-center gap-4">
                  <Input
                    id="fileUpload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Choose Files
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {formData.uploadedFiles.length > 0 
                      ? `${formData.uploadedFiles.length} file(s) selected` 
                      : 'No files selected'}
                  </span>
                </div>
                
                {formData.uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
                    <ul className="text-sm space-y-1">
                      {formData.uploadedFiles.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                          <span>{file.name}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* File Links */}
              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <Label>Add links to files</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        fileLinks: [...prev.fileLinks, { url: '', description: '' }]
                      }));
                    }}
                  >
                    + Add Link
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Share Google Docs, Dropbox, Figma files, or any other relevant links.
                </p>
                
                {formData.fileLinks.length > 0 && (
                  <div className="space-y-3 mt-3">
                    {formData.fileLinks.map((link, index) => (
                      <div key={index} className="flex flex-col space-y-2 p-3 bg-secondary rounded">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`file-link-${index}`} className="text-sm font-medium">
                            Link #{index + 1}
                          </Label>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                fileLinks: prev.fileLinks.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <Input
                          id={`file-link-${index}`}
                          placeholder="URL (e.g., Figma, Dropbox, Google Drive)"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...formData.fileLinks];
                            newLinks[index].url = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              fileLinks: newLinks
                            }));
                          }}
                        />
                        <Input
                          placeholder="Description (optional)"
                          value={link.description}
                          onChange={(e) => {
                            const newLinks = [...formData.fileLinks];
                            newLinks[index].description = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              fileLinks: newLinks
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Add reCAPTCHA before the submit buttons */}
      {siteKey && (
        <div className="my-6">
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <Button type="button" variant="outline" onClick={exportAsMarkdown} className="w-full sm:w-auto">
          <FileDown className="mr-2 h-4 w-4" />
          Download as Markdown
        </Button>
        <Button 
          type="submit" 
          disabled={
            submitting ||
            (!!siteKey &&
              !captchaToken &&
              process.env.NODE_ENV === "production")
          } 
          className="w-full sm:w-auto"
        >
          <Send className="mr-2 h-4 w-4" />
          {submitting ? 'Submitting...' : 'Submit This Form'}
        </Button>
      </div>
    </form>
  );
} 