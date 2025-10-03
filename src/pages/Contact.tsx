import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold font-mono tracking-tight sm:text-4xl md:text-5xl mb-4">
            Get in Touch
          </h1>
          <p className="text-sm leading-relaxed font-serif text-muted-foreground">
            Ready to work together? Let's discuss your project.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold font-mono tracking-tight">Send me a message</CardTitle>
          </CardHeader>
          <CardContent>
            {submitStatus === "success" && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm leading-relaxed font-serif text-green-800 dark:text-green-200">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm leading-relaxed font-serif text-red-800 dark:text-red-200">
                  Sorry, there was an error sending your message. Please try again or contact me directly.
                </p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-describedby="name-error"
                />
                <div id="name-error" className="sr-only" aria-live="polite"></div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-describedby="email-error"
                />
                <div id="email-error" className="sr-only" aria-live="polite"></div>
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  type="text" 
                  placeholder="What's this about?" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-describedby="subject-error"
                />
                <div id="subject-error" className="sr-only" aria-live="polite"></div>
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-describedby="message-error"
                />
                <div id="message-error" className="sr-only" aria-live="polite"></div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
                aria-describedby="submit-status"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <div id="submit-status" className="sr-only" aria-live="polite">
                {isSubmitting ? "Sending your message..." : "Ready to send"}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                Or have a project that my agency can help you with? Reach out directly at{" "}
                <a 
                  href="mailto:lets.talk@sintaksis.com" 
                  className="text-primary hover:underline"
                >
                  lets.talk@sintaksis.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <a
                href="https://cal.com/sintaksis/discovery"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Discovery Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
