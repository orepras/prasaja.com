import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Accessibility() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold font-mono tracking-tighter sm:text-4xl md:text-5xl mb-4">
            My Accessibility Commitment
          </h1>
          <p className="text-lg text-muted-foreground">
            As a UX writer who believes in inclusive code and content design,<br></br> I've built this website to be accessible to everyone.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>My Commitment</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                I believe that good content is beyond clarity. Information should serve good things to users and be accessible to everyone, regardless of their abilities or the technology they use to access the web.
              </p>
              <p>
                This website reflects my commitment to accessibility in both its content and its design. I've implemented 
                WCAG 2.1 AA standards throughout, ensuring that whether you're using a screen reader, navigating with a 
                keyboard, or relying on high contrast modes, you can access all the information and functionality here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conformance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
                  and developers to improve accessibility for people with disabilities. It defines 
                  three levels of conformance: Level A, Level AA, and Level AAA.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">WCAG 2.1 AA</Badge>
                  <span className="text-sm text-muted-foreground">
                    This website aims to conform to WCAG 2.1 Level AA standards.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Keyboard Navigation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Skip to main content link (try Tab on any page)</li>
                    <li>• Full keyboard navigation through all menus and links</li>
                    <li>• Visible focus indicators with proper contrast</li>
                    <li>• Escape key closes mobile menu and dropdowns</li>
                    <li>• Tab order follows logical reading sequence</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Screen Reader Support</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Semantic HTML with proper landmarks (header, main, footer)</li>
                    <li>• ARIA labels on navigation and interactive elements</li>
                    <li>• Logical heading hierarchy (H1 → H2 → H3)</li>
                    <li>• Descriptive alt text for all images</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Visual Design</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High contrast ratios (4.5:1 minimum for text)</li>
                    <li>• Scalable text that works at 200% zoom</li>
                    <li>• Dark and light mode with consistent contrast</li>
                    <li>• Responsive design for all screen sizes</li>
                    <li>• Color is never the only way to convey information</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Forms & Interactions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clear labels for all form fields</li>
                    <li>• Error messages with ARIA live regions</li>
                    <li>• Accessible buttons with descriptive text</li>
                    <li>• Loading states announced to screen readers</li>
                    <li>• Form validation with helpful error messages</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>POUR Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Perceivable</h4>
                  <p className="text-sm text-muted-foreground">
                    Information and user interface components must be presentable to users in ways 
                    they can perceive. This includes providing text alternatives for images, 
                    captions for videos, and ensuring sufficient color contrast.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Operable</h4>
                  <p className="text-sm text-muted-foreground">
                    User interface components and navigation must be operable. Users must be able 
                    to operate the interface using various input methods including keyboard, 
                    mouse, and assistive technologies.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Understandable</h4>
                  <p className="text-sm text-muted-foreground">
                    Information and the operation of user interface must be understandable. 
                    Content should be readable and predictable, with clear instructions and 
                    consistent navigation patterns.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Robust</h4>
                  <p className="text-sm text-muted-foreground">
                    Content must be robust enough that it can be interpreted reliably by a 
                    wide variety of user agents, including assistive technologies. This means 
                    using valid, semantic HTML and following web standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Real Examples from My Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Here are specific accessibility features I've implemented on this website:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Skip Navigation:</strong> Press Tab on any page to see the "Skip to main content" link</li>
                <li>• <strong>Mobile Menu:</strong> Fully keyboard accessible with proper ARIA labels and escape key support</li>
                <li>• <strong>Contact Form:</strong> All fields have proper labels, error handling, and live regions for screen readers</li>
                <li>• <strong>Writing Form:</strong> Complex multi-step form with accessible checkboxes, radio buttons, and file uploads</li>
                <li>• <strong>Theme Toggle:</strong> Accessible dropdown with proper focus management and screen reader support</li>
                <li>• <strong>Image Alt Text:</strong> Every image has descriptive alt text (like "Prasaja working as UX Writer and Developer")</li>
                <li>• <strong>Link Styling:</strong> Links are clearly distinguishable and maintain proper contrast in both light and dark modes</li>
                <li>• <strong>Focus Indicators:</strong> All interactive elements have visible focus states that meet contrast requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                I welcome your feedback on the accessibility of my website. If you encounter 
                any accessibility barriers or have suggestions for improvement, please let me know:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:hello@prasaja.com?subject=Accessibility Feedback" 
                    className="text-primary hover:underline"
                  >
                    hello@prasaja.com
                  </a>
                </p>
                <p>
                  <strong>Subject Line:</strong> Accessibility Feedback
                </p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                I aim to respond to accessibility feedback within 2 business days and will work 
                to address any issues promptly. Your input helps me create better, more inclusive experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  This website relies on the following technologies to work with the particular 
                  combination of web browser and any assistive technologies or plugins installed 
                  on your computer:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• HTML5 semantic markup</li>
                  <li>• CSS3 and Tailwind for styling and layout</li>
                  <li>• JavaScript for enhanced functionality</li>
                  <li>• React for dynamic content</li>
                  <li>• ARIA (Accessible Rich Internet Applications) attributes</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  These technologies are relied upon for conformance with the accessibility 
                  standards used.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                I assessed the accessibility of this website through the following approaches:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Self-evaluation using automated accessibility testing tools (AccessLens)</li>
                <li>• Manual testing with keyboard-only navigation (Tab, Enter, Escape, Arrow keys)</li>
                <li>• Screen reader testing with VoiceOver</li>
                <li>• Color contrast analysis using WebAIM tools and browser dev tools</li>
                <li>• Mobile accessibility testing with various screen sizes</li>
                <li>• Form testing</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              This accessibility statement was last updated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}