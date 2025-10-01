import { useState, useEffect, useRef } from 'react';
import ToneQuadrant from './tone-quadrant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileDown } from 'lucide-react';
import StyleGuide from './style-guide';
import VoiceAttributes from './voice-attributes';
import ContextAdaptation from './context-adaptation';
import GrammarMechanics from './grammar-mechanics';
import Terminology from './terminology';

const LOCAL_STORAGE_KEY = 'writing-guidelines-data';

type StyleGuideData = {
  purpose: string;
  brandPersonality: string;
  formattingStandards: string;
  brandName: string;
  brandStory: string;
};

type VoiceAndToneData = {
  currentTone: {
    x: number; // 0-1 range for horizontal axis (matter-of-fact to enthusiastic)
    y: number; // 0-1 range for vertical axis (formal to casual)
  };
  voiceAttributes: string[];
  contextAdaptation: Array<{ context: string; tone: string }>;
};

type GrammarMechanicsData = {
  punctuation: string;
  capitalization: string;
  numbersAndUnits: string;
  datesAndTimes: string;
};

type TerminologyItem = {
  term: string;
  definition: string;
  usageNotes: string;
  status: 'approved' | 'limitedUse' | 'prohibited';
};

type WritingGuidelinesData = {
  styleGuide: StyleGuideData;
  voiceAndTone: VoiceAndToneData;
  grammarMechanics: GrammarMechanicsData;
  terminology: TerminologyItem[];
};

// Default data with placeholder content
const defaultData: WritingGuidelinesData = {
  styleGuide: {
    purpose: "This style guide ensures consistency across all our communications. It helps team members create content that aligns with our brand identity.",
    brandPersonality: "Our brand is approachable yet professional, innovative without being overly technical, and confident without being arrogant.",
    formattingStandards: "- Headings: Sentence case\n- Body text: 16px/1.5\n- Bullet points: Begin with capital letters\n- Links: Descriptive, not 'click here'",
    brandName: "Prasaja",
    brandStory: "I'm a UX writer and product developer hybrid with a strong foundation in product writing, design systems, and accessibility. Over the past few years, I've led writing efforts in high-growth fintechs like Kredivo, Kredit Pintar, and OCBC, where I helped reduce support tickets, increase engagement, and shape scalable content systems that integrate seamlessly with engineering workflows."
  },
  voiceAndTone: {
    currentTone: { x: 0.7, y: 0.3 }, // Default position (formal and matter-of-fact side)
    voiceAttributes: [
      "Clear and direct",
      "Knowledgeable but not condescending",
      "Helpful and solution-oriented",
      "Concise but not abrupt"
    ],
    contextAdaptation: [
      { context: "Error messages", tone: "Direct, professional tone that focuses on solution, not blame" },
      { context: "Onboarding", tone: "Welcoming, encouraging, and guiding with clear next steps" },
      { context: "Technical documentation", tone: "Clear, precise, and focused on user needs" }
    ]
  },
  grammarMechanics: {
    punctuation: "- Use serial commas (Oxford commas)\n- Use em dashes (—) for breaks in thought\n- Avoid excessive exclamation points\n- Use single quotes for technical terms",
    capitalization: "- Use sentence case for headings\n- Capitalize proper nouns\n- Don't capitalize job titles unless they precede a name\n- Capitalize the first word after a colon if it begins a complete sentence",
    numbersAndUnits: "- Spell out numbers one through nine\n- Use numerals for 10 and above\n- Use numerals for all measurements\n- Include a space between the number and unit (e.g., 5 kg)",
    datesAndTimes: "- Use the format DD Month YYYY (e.g., 15 January 2023)\n- Use 24-hour time format (e.g., 14:30, not 2:30 PM)\n- Spell out time zones (e.g., Eastern Time, not ET)\n- Use 'to' instead of dashes in time ranges (9:00 to 17:00)"
  },
  terminology: [
    { term: "User", definition: "Person interacting with our product", usageNotes: "Preferred over 'customer' in UI and documentation", status: "approved" },
    { term: "Click", definition: "Press a mouse button", usageNotes: "Only use for desktop interactions; use 'tap' for mobile", status: "limitedUse" },
    { term: "Easy", definition: "Simple to understand or do", usageNotes: "Avoid making assumptions about user experience; specify what makes something easy", status: "prohibited" }
  ]
};

export default function WritingGuidelinesClient() {
  const [data, setData] = useState<WritingGuidelinesData>(defaultData);
  const [activeTab, setActiveTab] = useState("style-guide");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleToneChange = (x: number, y: number) => {
    setData(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        currentTone: { x, y }
      }
    }));
  };

  const handleVoiceAttributesChange = (newAttributes: string[]) => {
    setData(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        voiceAttributes: newAttributes
      }
    }));
  };

  const handleContextAdaptationChange = (newContexts: Array<{ context: string; tone: string }>) => {
    setData(prev => ({
      ...prev,
      voiceAndTone: {
        ...prev.voiceAndTone,
        contextAdaptation: newContexts
      }
    }));
  };

  // Reference for PDF export
  const contentRef = useRef<HTMLDivElement>(null);

  const exportAsPDF = () => {
    // Since we're in the browser, dynamically import html2pdf
    import('html2pdf.js').then((html2pdf) => {
      const element = contentRef.current;
      if (!element) return;

      // Use a clone of the element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Create a container for export
      const container = document.createElement('div');
      container.appendChild(clone);
      
      // Style the clone for better print layout
      const buttons = clone.querySelectorAll('button');
      buttons.forEach(button => button.style.display = 'none');
      
      const tabs = clone.querySelector('[role="tablist"]');
      if (tabs) tabs.remove();
      
      // Create the PDF
      const opt = {
        margin: 10,
        filename: 'writing-guidelines.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf.default().from(container).set(opt).save();
    }).catch((error) => {
      console.error("Failed to load html2pdf", error);
      alert("PDF export failed. Please try again or use the Markdown export.");
    });
  };

  const exportAsMarkdown = () => {
    // Create markdown content from data
    const markdown = `# Writing Guidelines for ${data.styleGuide.brandName || 'My Brand'}

## Brand Story
${data.styleGuide.brandStory || 'No brand story provided.'}

## Style Guide

### Purpose
${data.styleGuide.purpose}

### Brand Personality
${data.styleGuide.brandPersonality}

### Formatting Standards
${data.styleGuide.formattingStandards}

## Voice and Tone

### Current Tone
${getToneDescription(data.voiceAndTone.currentTone.x, data.voiceAndTone.currentTone.y)}

### Voice Attributes
${data.voiceAndTone.voiceAttributes.map(attr => `- ${attr}`).join('\n')}

### Context Adaptation
${data.voiceAndTone.contextAdaptation.map(item => `- **${item.context}**: ${item.tone}`).join('\n')}

## Grammar and Mechanics

### Punctuation
${data.grammarMechanics.punctuation}

### Capitalization
${data.grammarMechanics.capitalization}

### Numbers and Units
${data.grammarMechanics.numbersAndUnits}

### Dates and Times
${data.grammarMechanics.datesAndTimes}

## Terminology

| Term | Definition | Usage Notes | Status |
|------|------------|-------------|--------|
${data.terminology.map(term => `| ${term.term} | ${term.definition} | ${term.usageNotes} | ${term.status} |`).join('\n')}
`;

    // Create a download link
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.styleGuide.brandName || 'writing-guidelines').toLowerCase().replace(/\s+/g, '-')}-writing-guidelines.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper function to get tone description based on x,y coordinates
  function getToneDescription(x: number, y: number): string {
    let formalCasual = y < 0.5 ? "Formal" : "Casual";
    let enthusiasmFact = x < 0.5 ? "Matter-of-fact" : "Enthusiastic";
    
    return `${formalCasual} and ${enthusiasmFact}`;
  }

  return (
    <div className="space-y-8">
      {/* Export buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={exportAsPDF}>
          <Download className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
        <Button onClick={exportAsMarkdown}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as Markdown
        </Button>
      </div>

      {/* Content for export */}
      <div ref={contentRef}>
        {/* Main content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="style-guide">
              <span className="hidden sm:inline">Style Guide</span>
              <span className="sm:hidden">Style</span>
            </TabsTrigger>
            <TabsTrigger value="voice-tone">
              <span className="hidden sm:inline">Voice & Tone</span>
              <span className="sm:hidden">Voice</span>
            </TabsTrigger>
            <TabsTrigger value="grammar">
              <span className="hidden sm:inline">Grammar & Mechanics</span>
              <span className="sm:hidden">Grammar</span>
            </TabsTrigger>
            <TabsTrigger value="terminology">
              <span className="hidden sm:inline">Terminology</span>
              <span className="sm:hidden">Terms</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="style-guide" className="mt-6">
            <StyleGuide 
              data={data.styleGuide} 
              updateData={(newStyleGuide: StyleGuideData) => setData({...data, styleGuide: newStyleGuide})} 
            />
          </TabsContent>

          <TabsContent value="voice-tone" className="mt-6">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold tracking-tight">Voice and Tone</h2>
              <p className="text-muted-foreground">
                Define how your brand sounds in different contexts. Adjust the marker on the quadrant to set your default tone.
              </p>
              
              <ToneQuadrant 
                currentTone={data.voiceAndTone.currentTone} 
                onToneChange={handleToneChange} 
              />
              
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-10">
                <VoiceAttributes 
                  attributes={data.voiceAndTone.voiceAttributes}
                  onChange={handleVoiceAttributesChange}
                />
                
                <ContextAdaptation
                  contexts={data.voiceAndTone.contextAdaptation}
                  onChange={handleContextAdaptationChange}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grammar" className="mt-6">
            <GrammarMechanics 
              data={data.grammarMechanics} 
              updateData={(newGrammar: GrammarMechanicsData) => setData({...data, grammarMechanics: newGrammar})} 
            />
          </TabsContent>

          <TabsContent value="terminology" className="mt-6">
            <Terminology 
              data={data.terminology} 
              updateData={(newTerminology: TerminologyItem[]) => setData({...data, terminology: newTerminology})} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 