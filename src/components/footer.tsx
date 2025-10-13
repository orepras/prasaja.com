import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* References Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-mono tracking-tight">FOOTER</h2>
        </div>

        {/* Two-column references layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-serif">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[1]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "About: Principal Writer & Content Developer," 
                  <em>Personal Website</em>, 2024. [Online]. Available: 
                  <Link to="/about" className="text-primary hover:underline">https://prasaja.com/about</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[2]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Writings: Essays on UX writing, content strategy, and product development," 
                  <em>Personal Blog</em>, 2024. [Online]. Available: 
                  <Link to="/writing" className="text-primary hover:underline">https://prasaja.com/writing</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[3]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Portfolio: Featured projects in UX writing and product development," 
                  <em>Personal Portfolio</em>, 2025. [Online]. Available: 
                  <Link to="/portfolio" className="text-primary hover:underline">https://prasaja.com/portfolio</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[4]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Contact: Discovery call scheduling and consultation," 
                  <em>Calendly Integration</em>, 2025. [Online]. Available: 
                  <Link to="/contact" className="text-primary hover:underline">https://prasaja.com/contact</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[5]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Accessibility Statement: Commitment to inclusive design," 
                  <em>Personal Website</em>, 2025. [Online]. Available: 
                  <Link to="/accessibility" className="text-primary hover:underline">https://prasaja.com/accessibility</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[6]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "LinkedIn: Professional networking and thought leadership," 
                  <em>LinkedIn</em>, 2025. [Online]. Available: 
                  <a href="https://www.linkedin.com/in/prasaja-mukti/" className="text-primary hover:underline">https://linkedin.com/in/prasaja-mukti</a>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[7]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "X (Twitter): Professional updates and industry insights," 
                  <em>X (formerly Twitter)</em>, 2025. [Online]. Available: 
                  <a href="https://x.com/orepras" className="text-primary hover:underline">https://x.com/orepras</a>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[8]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "GitHub: Open source projects and development work," 
                  <em>GitHub</em>, 2025. [Online]. Available: 
                  <a href="https://github.com/orepras" className="text-primary hover:underline">https://github.com/orepras</a>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[9]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  S. Studio, "Sintaksis: Product storytelling & development studio," 
                  <em>Company Website</em>, 2025. [Online]. Available: 
                  <a href="https://sintaksis.com" className="text-primary hover:underline">https://sintaksis.com</a>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[10]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Terminologi Inklusif: Panduan penggunaan istilah yang lebih inklusif dalam bahasa Indonesia," 
                  <em>Personal Resource</em>, 2025. [Online]. Available: 
                  <Link to="/terminologi-inklusif" className="text-primary hover:underline">https://prasaja.com/terminologi-inklusif</Link>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-xs font-mono mr-2 mt-0.5">[11]</span>
              <div className="flex-1">
                <p className="leading-relaxed">
                  P. Mukti, "Email Correspondence: Direct communication for inquiries and collaboration," 
                  <em>Email Contact</em>, 2025. [Online]. Available: 
                  <a href="mailto:prasaja@hey.com" className="text-primary hover:underline">prasaja@hey.com</a>. 
                  Last Accessed: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <p className="text-sm font-mono tracking-tighter text-muted-foreground">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://sintaksis.com"
                  className="text-primary hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sintaksis
                </a>
                . All rights reserved.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
