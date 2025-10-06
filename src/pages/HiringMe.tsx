import { Link } from "react-router-dom";
import { Mail, ExternalLink, Users, Briefcase } from "lucide-react";

export default function HiringMe() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* Hero Section */}
      <header className="mt-36 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            The Framework for Hiring Me
          </h1>
          <div className="text-base text-muted-foreground font-mono tracking-tight mb-8">
            A clear set of questions to cut through noise and focus on what matters for your needs.
          </div>
        </div>
        
        {/* Introduction */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-sm max-w-none font-serif text-justify">
            <p className="text-sm leading-relaxed mb-4">
              <strong>Hiring exceptional people (or finding yourself in exceptional places) is never just about luck. Luck becomes easier when there's a framework. A clear set of questions. A way to cut through noise and focus on what matters.</strong>
            </p>
            <p className="text-sm leading-relaxed mb-6">
              That's why I'd like to share the framework for hiring me personally (as your next <strong>Product Writer, Content Developer, or Lead UX Writer</strong>) or my agency as your extended writing team. Think of it as a fast-and-frugal decision tree that makes your hiring process in finding writer very simple.
            </p>
          </div>
        </div>
      </header>

      {/* Individual Hiring Framework */}
      <section className="mb-12">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-6 text-center">
          Hiring Me as an Employee
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Question 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              1. Do I bring exceptional ability?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                I believe great writing in product and business is not just about stringing words together. Great writing can bring clarity that unlocks momentum. When I work on your product, you'll see me turning abstract ideas into clear, testable content that actually works. I write with developer-grade precision, so my copy integrates seamlessly with your design systems and code, not fighting against them.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                What really sets my work apart is how I craft brand stories that win both customer trust and stakeholder alignment. As a product copywriter, I build bridges between what your product can do and what users actually experience. If you're looking for someone who can raise the bar in these areas, the answer is yes.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              2. Would you admire working with me?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                Admiration in this context isn't about personality (while that's also a nice bonus because I'm a very cool person haha). It's about professional respect. Do you want someone who treats writing as a craft worth obsessing over? Someone who not only writes but teaches, mentors, and raises the bar for everyone around them?
              </p>
              <p className="text-sm leading-relaxed mb-4">
                I thrive in ambiguity while staying grounded in empathy for both users and business goals. I'm the kind of person who gets genuinely excited about finding the perfect word for a button label, and I'll help your team think more clearly about content strategy. If your answer leans toward admiration of craft, consistency, and collaborative spirit, that's a green light and we can bring this vehicle going even further!
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              3. Will I raise the average effectiveness of your team?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                This is where the framework becomes powerful. A good writer doesn't just fill a role like any other; this framework also hopes to elevate the whole team. My approach to writing and content ops is designed to reduce friction between design, dev, and business by using JSON-first documentation and accessibility standards (WCAG/ARIA) from day one.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                I strengthen product confidence through messaging that clarifies—<i>not complicates</i>—customer choices. More importantly, I create long-term playbooks so future hires and teammates inherit clarity without chaos. I also help teams leverage AI tools strategically, ensuring they enhance rather than replace human creativity. Effectiveness compounds when the team gains not only words, but a system that scales with modern technology.
              </p>
            </div>
          </div>

          {/* Decision */}
          <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              The Decision
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed">
                If all three questions get a "yes," the choice is straightforward: <strong>hire me</strong> or simply ask about my availability.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Because when you frame hiring this way, it's not about chance. It's about clarity. And clarity—<i>both in writing and in hiring</i>—is the real accelerator of progress. And yes, we can always discuss about the possibility of working together.
              </p>

              <p className="text-sm leading-relaxed mt-4">
                Doing this, I also save your time by not preparing the job requirements that often outdated with current market, screening tons of candidates, and other things that are not related to writing.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                This is my framework. Simple, practical, and built on the same principle I apply to writing. <br></br><strong>Make decisions easier, make outcomes stronger.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Hiring Framework */}
      <section className="mb-12">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-6 text-center">
          Hiring Sintaksis as Your Fractional Writing Team
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="prose prose-sm max-w-none font-serif text-justify">
            <p className="text-sm leading-relaxed mb-4">
              Hiring a writing/content development agency (especially at a fractional or project-based level) can feel tricky. You're not just looking for a freelancer who delivers words; you want a team that amplifies your product, protects your brand, and fits seamlessly into your workflow.
            </p>
            <p className="text-sm leading-relaxed mb-6">
              We believe hiring exceptional agency/partners shouldn't rely on luck. It should rely on a framework, a clear way to evaluate whether we're the right fit for you. This framework also helps us to focus on what matters for your needs.
            </p>
          </div>

          {/* Question 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              1. Do we bring exceptional ability to your product?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                Fractional doesn't mean "part-time talent." It means specialized strength on demand. At Sintaksis, we bring a blend of writer-grade clarity and developer-grade precision that's hard to find elsewhere and replicate in other agencies. We encourage our team to be a full-stack writer that understand the whole process, not just a writer that focus on words.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                We handle everything from microcopy and user flows that align perfectly with your design systems, to long-form content and business storytelling that actually converts. Our content ops approach uses JSON-first documentation and accessibility-ready copy from day one, creating scalable playbooks that your team can actually use. We also integrate AI tools strategically to boost productivity while maintaining the human touch that makes content truly resonate.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                If your product needs sharp, standards-driven content that unlocks real usability, then yes—<i>we bring exceptional ability</i>.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              2. Would you admire working with us?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                In this context, admiration is about trust and collaboration. Do you value partners who are just as comfortable in a Figma file as in a strategy deck? Do you want a team that listens deeply, translates complexity into clarity, and cares about your success as much as their own?
              </p>
              <p className="text-sm leading-relaxed mb-4">
                We're the kind of team that treats writing as infrastructure, something that holds your product together, not just "finishes" it. We combine craft, technical thinking, and genuine humility. If that sounds like the kind of partnership you'd admire, Sintaksis is that team.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              3. Will we raise the effectiveness of your whole team?
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                This is the decisive question. Because the right fractional team doesn't just "fit in", they elevate everyone. At Sintaksis, we make your team more effective by reducing ambiguity with clear copy tokens and documentation, embedding accessibility standards (WCAG, ARIA) into the writing from day one.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                We build reusable frameworks so future hires, designers, and developers inherit clarity in the process. We act as thought partners who see across product, design, and business, spotting blind spots before they become blockers. We also help teams navigate the AI landscape, implementing tools that actually work rather than just adding complexity. When your team can move faster, collaborate smoother, and launch with more confidence, that's when fractional writing proves its value.
              </p>
            </div>
          </div>

          {/* Decision */}
          <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
            <h3 className="text-lg font-bold font-mono tracking-tight text-primary">
              The Decision
            </h3>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed">
                If these three questions are answered with a "yes," the choice is simple: hire Sintaksis as your fractional writing team.
              </p>
              <p className="text-sm leading-relaxed mt-4">
                Because in today's product landscape, clarity it's leverage. And a fractional team built on clarity can do more than just "deliver content." We help your product speak, scale, and succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI and Technology Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-6 text-center">
          The AI Advantage: When Technology Meets Craft
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="prose prose-sm max-w-none font-serif text-justify">
            <p className="text-sm leading-relaxed mb-4">
              Here's something that sets me apart in today's writing landscape: I use AI as a tools to enhance my craft, productivity, and business results. I leverage them strategically to amplify creativity and business results. Sure, the writing industry is being transformed by AI, but <strong>without experts who know how to harness these tools effectively, they're just another shiny object that promises everything and delivers confusion.</strong>
            </p>
            <p className="text-sm leading-relaxed mb-4">
This very website you're reading is a perfect example—built with modern tools, optimized for performance, and designed to showcase what's possible when you combine technical understanding with writing expertise.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              When you hire me or Sintaksis, you're not just getting someone who writes well. You're getting a writer who understands how to use AI for research, ideation, and content optimization without losing the human touch that makes content truly resonate. I can help your team navigate the AI landscape, implement tools that actually work, and create content strategies that scale.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              The future belongs to writers who can bridge the gap between human creativity and technological capability. Whether you're hiring me as an individual contributor or bringing in Sintaksis as your fractional team, you're getting expertise that's already adapted to the AI-enhanced world we're living in.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-8 text-center">
          Ready to Move Forward?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual Hiring CTA */}
          <div className="space-y-4 p-6 border border-muted/20 rounded-lg hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold font-mono tracking-tight">
                Hire Me as an Employee
              </h3>
            </div>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                Looking for a full-time Product Writer, Content Developer, or Lead UX Writer with more than a decade of experience? I'm always open to new opportunities and would love to discuss how I can elevate your team's content strategy and execution.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                I'm particularly interested in roles where I can bridge content strategy with technical implementation and help teams leverage AI tools effectively. This is what I'm most passionate about—combining human creativity with technological capability.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                <strong>Current availability:</strong> Open for remote positions or full-time positions with visa sponsorship.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-primary rounded-md hover:text-primary-foreground transition-colors duration-300 text-sm font-mono tracking-tight"
              >
                <ExternalLink className="h-4 w-4" />
                Contact About Availability
              </Link>
            </div>
          </div>

          {/* Agency Hiring CTA */}
          <div className="space-y-4 p-6 border border-muted/20 rounded-lg hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold font-mono tracking-tight">
                Hire Sintaksis Agency
              </h3>
            </div>
            <div className="prose prose-sm max-w-none font-serif text-justify">
              <p className="text-sm leading-relaxed mb-4">
                Need a fractional writing team that can scale with your product? Sintaksis specializes in UX writing, content development, and content operations for growing companies. We work best with clients that value both craft and systems thinking, and we help teams navigate the AI landscape to boost productivity without losing the human touch.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                <strong>Current capacity:</strong> Taking on 2-3 new clients for Q4 2025.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://sintaksis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-primary rounded-md hover:text-primary-foreground transition-colors duration-300 text-sm font-mono tracking-tight"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Sintaksis
              </a>
              <a
                href="https://cal.com/sintaksis/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 text-sm font-mono tracking-tight"
              >
                <ExternalLink className="h-4 w-4" />
                Book Discovery Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
