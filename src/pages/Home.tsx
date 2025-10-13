import { Link } from "react-router-dom";
import {
  FileText,
  ExternalLink,
} from "lucide-react";
import { getAllProjects, getAllPosts } from "@/lib/markdown";
import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  readingTime: string;
  tags: string[];
  image?: string;
}

interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async () => {
      console.log('Home component: Loading data...')
      try {
        const [projectsData, postsData] = await Promise.all([
          getAllProjects(),
          getAllPosts()
        ]);
        console.log('Projects loaded:', projectsData.length)
        console.log('Posts loaded:', postsData.length)
        setProjects(projectsData.slice(0, 3));
        setPosts(postsData.slice(0, 3));
      } catch (error) {
        console.error('Error loading data in Home component:', error)
      }
    };
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* Minimalist Hero Section - Thesis Author Style */}
      <header className="mt-36 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            Syntax, Meet Semantics.
          </h1>
          <div className="text-base text-muted-foreground font-mono tracking-tight mb-8">
          </div>
          
          {/* Author Image - Thesis Style */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-muted">
              <img
                src="/images/prasaja-profile-2.webp"
                alt="Prasaja Mukti - Full-Stack Writer"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          {/* Author Info - Academic Style */}
          <div className="text-center space-y-1">
            <div className="font-mono tracking-tight text-sm">
              <strong>Prasaja Mukti</strong>
            </div>
            <div className="font-mono tracking-tight text-xs text-muted-foreground">
              Principal Writer & Content Developer, Sintaksis
            </div>
            <div className="font-mono tracking-tight text-xs text-muted-foreground">
              prasaja@hey.com
            </div>
          </div>
        </div>
        
        {/* Thesis Abstract */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h3 className="text-sm font-bold font-mono tracking-tight mb-2 text-center">Abstract</h3>
          </div>
          <div className="prose prose-sm max-w-none font-serif text-justify">
            <p className="text-sm leading-relaxed mb-4">
              <strong>This personal website explores the evolving landscape of modern content creation, arguing that writers who embrace 
              technology and understand both the craft of writing and the mechanics of digital systems can achieve 
              unprecedented success in today's market. Traditional copywriting approaches, while valuable, often 
              fall short in an era where content must seamlessly integrate with complex digital ecosystems.</strong>
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Through my work as a <i>full-stack writer</i> and founder of Sintaksis (copywriting and storytelling agency) I 
              demonstrate how writers can bridge the gap between human creativity and technological precision. This 
              hybrid approach enables the creation of content that not only resonates with audiences but also 
              functions effectively within modern digital frameworks, from UX interfaces to technical documentation.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              My methodology combines traditional writing expertise with technical understanding, allowing for 
              content strategies that are both emotionally compelling and technically sound. This approach has 
              proven effective across various industries, from fintech to e-commerce, where content must serve 
              both user needs and business objectives while maintaining technical feasibility.
            </p>
            <p className="text-sm leading-relaxed mb-6">
              For those seeking to understand my methodology in depth, I invite you to explore my detailed 
              essays on this website or schedule a consultation to discuss how this approach can be applied 
              to your specific challenges.
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-xs font-mono tracking-tight text-muted-foreground">
              <Link to="/writing" className="text-primary hover:underline">Read my essays</Link> • 
              <Link to="/contact" className="text-primary hover:underline ml-1">Book a consultation</Link>
            </p>
          </div>
        </div>
      </header>

      {/* Newspaper Section: The Journey */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
From Words to Code
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              My journey began with pure curiosity about words, technology, and how the two 
              can shape the way we experience the world. What started as fascination with language evolved into a 
              deep understanding of how content and code intersect in modern digital products.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              As a <span className="text-primary font-medium">UX Writer</span>, I discovered that the right words at the right moment could 
              transform a confusing interface into an intuitive experience. I've written microcopy that guides, reassures, 
              and makes people smile (or at least give that little nose-exhale).
            </p>
            <p className="text-sm leading-relaxed font-serif">
              Because digital experiences should feel human, not robotic. Every button label, every error message, every onboarding step is an opportunity to 
              connect with users on a human level.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              But I wanted to do more than write about products; I wanted to build something that helps me and clients. 
              Learning to code wasn't just about adding another skill—it was about understanding how content lives inside 
              a product and how to make it shine.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              When you understand both the technical constraints and the user needs, 
              you can create solutions that are both elegant and functional. Now as a <span className="text-primary font-medium">Principal  Writer—Content Developer hybrid</span>, I bridge the gap 
              between words and execution, between what users truly need and what technology can deliver.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              This unique perspective allows me to create content that doesn't just inform users, but guides them through experiences 
              that feel intuitive, human, and purposeful.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents: Writings */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
          Recent Writings
        </h2>
        
        <div className="space-y-3">
          {posts.map((post) => (
            <Link key={post.slug} to={`/writing/${post.slug}`} className="block">
              <div className="flex items-center justify-between py-2 px-3 border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-3 w-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs text-muted-foreground font-mono tracking-tight">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium font-mono tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-serif group-hover:text-foreground/80 transition-colors duration-300">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center ml-3">
                  <div className="flex-1 border-t border-dotted border-muted mx-2 group-hover:border-primary/50 transition-colors duration-300"></div>
                  <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                   read this one
                    <ExternalLink className="h-2 w-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/writing" 
            className="text-primary hover:text-primary/80 font-mono tracking-tight text-xs underline"
          >
            View all writings →
          </Link>
        </div>
      </section>

      {/* Table of Contents: Writing Tools */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
          Writing Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              I've built these tools to solve real problems I've encountered throughout my career as a writer, content developer, and agency owner. 
              Each tool addresses a specific pain point that I've seen countless teams struggle with—from maintaining consistent brand voice 
              across multiple touchpoints to streamlining the often chaotic process of content collaboration.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              The challenges are universal How do you keep your brand voice consistent when multiple writers are involved? How do you 
              communicate complex content requirements without endless email threads? How do you ensure that technical constraints are 
              considered from the beginning of the content creation process?
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              These tools represent my approach to bridging the gap between traditional content creation and modern digital workflows. 
              They're not just utilities—they're embodiments of the methodology I've developed over years of working with teams, 
              from startups to enterprise clients.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              Feel free to use them for your projects too—they're designed to be practical, not just pretty. Each tool has been 
              battle-tested in real-world scenarios and refined based on actual feedback (and critiques!). They're free to use because I believe 
              good tools should be accessible to everyone who needs them.
            </p>
          </div>
        </div>
          
        <div className="space-y-3 mt-8">
          <Link to="/writing-guidelines" className="block">
            <div className="flex items-center justify-between py-2 px-3 border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer">
              <div className="flex-1">
                <h3 className="text-sm font-medium font-mono tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                  Writing Guidelines Builder
                </h3>
                <p className="text-xs text-muted-foreground font-serif mb-1 group-hover:text-foreground/80 transition-colors duration-300">
                  Ever struggled to keep your brand voice consistent? This tool lets you create, customize, 
                  and export writing guidelines in minutes. Play with the tone spectrum, set your terminology, 
                  and download as PDF or Markdown.
                </p>
                <div className="text-xs text-primary font-mono tracking-tight group-hover:text-primary/80 transition-colors duration-300">
                  Free to use
                </div>
              </div>
              <div className="flex items-center ml-3">
                <div className="flex-1 border-t border-dotted border-muted mx-2 group-hover:border-primary/50 transition-colors duration-300"></div>
                <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                  try this builder
                  <ExternalLink className="h-2 w-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/writing-form" className="block">
            <div className="flex items-center justify-between py-2 px-3 border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer">
              <div className="flex-1">
                <h3 className="text-sm font-medium font-mono tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                  UX Writing Request Form
                </h3>
                <p className="text-xs text-muted-foreground font-serif mb-1 group-hover:text-foreground/80 transition-colors duration-300">
                  Need help with UX writing? I've created this form to make collaboration smoother. 
                  Tell me about your project, audience, and tone preferences in one organized place. 
                  Great for teams and clearer than long email threads!
                </p>
                <div className="text-xs text-primary font-mono tracking-tight group-hover:text-primary/80 transition-colors duration-300">
                  Client-ready
                </div>
              </div>
              <div className="flex items-center ml-3">
                <div className="flex-1 border-t border-dotted border-muted mx-2 group-hover:border-primary/50 transition-colors duration-300"></div>
                <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                  try create a form
                  <ExternalLink className="h-2 w-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Table of Contents: Featured Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              A selection of my recent work in UX writing and product development, each representing a unique challenge 
              in bridging user needs with technical possibilities. These projects span across different industries. From 
              fintech applications to e-commerce platforms.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              What makes these projects particularly interesting is how they required me to navigate complex technical 
              constraints while maintaining human-centered communication. Each case study demonstrates the intersection 
              of user psychology, business objectives, and technical feasibility.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              These aren't just portfolio pieces, they're documented methodologies that show how strategic content 
              and thoughtful design can transform user experiences. From reducing user confusion in complex workflows 
              to increasing conversion rates through better microcopy, each project represents a measurable impact 
              on both user satisfaction and business outcomes.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              The process behind each project involved extensive user research, stakeholder alignment, and iterative 
              testing. You'll see how I approach problems from multiple angles, considering both the emotional journey 
              of users and the technical constraints of development teams.
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mt-8">
          {projects.map((project) => (
            <Link key={project.slug} to={`/portfolio/${project.slug}`} className="block">
              <div className="flex items-center justify-between py-2 px-3 border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer">
                <div className="flex-1">
                  <h3 className="text-sm font-medium font-mono tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-serif group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center ml-3">
                  <div className="flex-1 border-t border-dotted border-muted mx-2 group-hover:border-primary/50 transition-colors duration-300"></div>
                  <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                    read project
                    <ExternalLink className="h-2 w-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/portfolio" 
            className="text-primary hover:text-primary/80 font-mono tracking-tight text-xs underline"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* Newspaper Conclusion: Call to Action */}
      <section className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
          Need a Helping Hand?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify mb-8">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              Imagine your product not just functioning, but truly connecting with users on an emotional level. 
              This is the vision that drives{" "}
              <a
                href="https://sintaksis.com"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sintaksis
              </a>
              , my product storytelling & development studio where we transform complex ideas into compelling narratives 
              that users actually want to engage with.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              Every day, I see brilliant products fail not because of technical limitations, but because they 
              speak in a language their users don't understand. The gap between what your product can do and 
              what users actually experience is often just a few well-chosen words away from being bridged.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm leading-relaxed font-serif">
              Whether you're launching a revolutionary app that needs to feel trustworthy right away, an e-commerce 
              platform that converts browsers into buyers, or technical documentation that developers actually 
              enjoy reading, I will help you bridge the gap between what your product can do and what users actually experience.
            </p>
            <p className="text-sm leading-relaxed font-serif">
              The difference between a good product and a great one often lies in the moments when users feel 
              understood, guided, and empowered. This is where my expertise transforms your vision into reality. 
              Ready to see what's possible when words and technology work in a harmony?<br></br>
              <a
                href="https://cal.com/sintaksis/discovery"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let's explore together.
              </a>
            </p>
          </div>
        </div>
        
      </section>
    </div>
  );
}
