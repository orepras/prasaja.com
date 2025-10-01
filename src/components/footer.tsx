import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  LucideGithub,
  LucideX,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";
export default function Footer() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium font-sans">Prasaja Mukti</h3>
            <p className="text-sm font-mono tracking-tighter text-muted-foreground">
              Product Writer—Developer hybrid, leading and building digital products with compelling narratives. Ready-to-hire without the agency overhead.
            </p>
          </div>

          {/* Mobile flexbox container for links and image */}
          <div className="flex flex-row gap-4 md:hidden">
            {/* Left column with Quick Links and Writings */}
            <div className="flex-1 space-y-8">
              <nav className="space-y-4" aria-labelledby="quick-links-mobile">
                <h3 id="quick-links-mobile" className="text-lg font-medium font-sans">Quick Links</h3>
                <ul className="space-y-2 text-sm font-mono tracking-tighter">
                  <li>
                    <Link
                      to="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Read About Me
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/writing"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Read My Writings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/portfolio"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Read My Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Contact Me Page
                    </Link>
                  </li>
                </ul>
              </nav>

          
            </div>

            {/* Right column with image */}
            <div className="w-32 flex items-center">
              <div className="relative w-32 h-48 overflow-hidden">
                <img
                  src="/images/prasaja-chill.png"
                  alt="Prasaja in a relaxed pose"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Quick Links - visible on md screens and up */}
          <nav className="hidden md:block space-y-4" aria-labelledby="quick-links-desktop">
            <h3 id="quick-links-desktop" className="text-lg font-medium font-sans">Quick Links</h3>
            <ul className="space-y-2 text-sm font-mono tracking-tighter">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Read about me
                </Link>
              </li>
              <li>
                <Link
                  to="/writing"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Read my writings
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Read my portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact me page
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Accessibility - visible on md screens and up */}
          <nav className="hidden md:block space-y-4" aria-labelledby="accessibility-desktop">
            
          </nav>

          <div className="space-y-4">
            <h3 className="text-lg font-medium font-sans">Newsletter</h3>
            <p className="text-sm font-mono tracking-tighter text-muted-foreground">
              Ready to read any interesting things I publish? Subscribe here.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-border pt-8 md:flex-row md:space-y-0">
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
            <Link
              to="/accessibility"
              className="text-sm font-mono tracking-tighter text-muted-foreground hover:text-foreground"
            >
              Accessibility Statement
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://x.com/orepras"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LucideX size={20} />
                <span className="sr-only">X fka Twitter</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/orepras"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LucideGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/prasaja-mukti/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
