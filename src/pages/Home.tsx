import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 md:px-6">
          {/* Mobile Avatar Image (only visible on mobile) */}
          <div className="flex justify-center mb-2">
            <div className="relative w-20 h-20 overflow-hidden rounded-full">
              <img
                src="/images/prasaja-ava.png"
                alt="Prasaja avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <h1 id="hero-heading" className="text-3xl font-bold font-mono tracking-tight sm:text-4xl md:text-5xl text-center">
              Writer-grade clarity. <br />
              Developer-grade precision.
            </h1>
            <p className="max-w-[600px] font-mono tracking-tighter text-muted-foreground md:text-xl text-center mb-4">
              I'm a full-stack writer (covering product/UX writing, technical docs, and brand storytelling). 
              I'm ready-to-hire without the agency overhead.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="font-mono tracking-tighter">
                Have a project? Let's talk.
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-accent" aria-labelledby="expertise-heading">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 id="expertise-heading" className="text-2xl font-bold font-mono tracking-tight sm:text-3xl md:text-4xl mb-6 text-center">
              Being a Full-stack Writer
            </h2>
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-xl aspect-video relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/prasaja-profile.webp"
                  alt="Prasaja working as UX Writer and Developer"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="prose font-mono tracking-tighter text-muted-foreground prose-lg dark:prose-invert mx-auto text-sm">
              <p>
                Hi, my name is Prasaja and the photo above is kind of thing that I do nowadays—hosting event and talks for like-minded creatives.
              </p>
              <p>
                I started this whole journey out of pure curiosity about words, about technology, about how the two can shape the way we experience the world.
                As a <span className="text-primary font-medium">UX Writer</span>, I discovered that the right words at the right moment could
                transform a confusing interface into an intuitive experience. Along my journey, I've written microcopy that guides, reassures, and also makes people smile (or at least give that little nose-exhale). Because digital experiences should feel human, not robotic.
              </p>

              <p className="mt-6">
                But I wanted to do more than write about products; I wanted to 
                build something that helps me and clients (like <Link to="/writing-guidelines">customizable writing guidelines</Link>). Learning to code is the way forward and stacking up another skill. It also give me better understanding how content lives inside a product and how to make it shine.
              </p>
              <p className="mt-6">
                Now as a <span className="text-primary font-medium">Product Writer—Developer hybrid</span>, I bridge the gap between words and execution, between what users truly need and what technology can deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-12 md:py-16" aria-labelledby="writings-heading">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 id="writings-heading" className="text-2xl font-bold font-mono tracking-tighter sm:text-3xl">
              My Writings
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} to={`/writing/${post.slug}`} className="block h-full">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-400/50 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-green-400/0 group-hover:from-green-400/5 group-hover:to-green-400/10 rounded-lg transition-all duration-300 pointer-events-none"></div>
                  <CardContent className="p-6 flex flex-col h-full relative z-10">
                    <div className="mb-4 flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center font-mono tracking-tighter">
                      Read This Writing <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex font-mono justify-center">
            <Button variant="outline" asChild>
              <Link to="/writing" data-button>Read All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-16 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold font-mono tracking-tighter sm:text-3xl">
              Writing Tools
            </h2>
            <p className="max-w-[700px] font-mono tracking-tighter text-muted-foreground">
              I've built these tools to make my own work easier. Feel free to use them for your projects too!
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link to="/writing-guidelines" className="block h-full">
              <Card className="h-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-400/50 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-green-400/0 group-hover:from-green-400/5 group-hover:to-green-400/10 rounded-lg transition-all duration-300 pointer-events-none"></div>
                <div className="p-6 pb-4 relative z-10 flex flex-col h-full">
                  <h3 className="text-xl font-medium mb-2">Writing Guidelines Builder</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Ever struggled to keep your brand voice consistent? This tool lets you create, customize, 
                    and export writing guidelines in minutes. Play with the tone spectrum, set your terminology, 
                    and download as PDF or Markdown.
                  </p>
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Free to use
                    </div>
                    <div className="flex items-center font-mono tracking-tighter">
                      Give it a try <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/writing-form" className="block h-full">
              <Card className="h-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-400/50 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-green-400/0 group-hover:from-green-400/5 group-hover:to-green-400/10 rounded-lg transition-all duration-300 pointer-events-none"></div>
                <div className="p-6 pb-4 relative z-10 flex flex-col h-full">
                  <h3 className="text-xl font-medium mb-2">UX Writing Request Form</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Need help with UX writing? I've created this form to make collaboration smoother. 
                    Tell me about your project, audience, and tone preferences in one organized place. 
                    Great for teams and clearer than long email threads!
                  </p>
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      Client-ready
                    </div>
                    <div className="flex items-center font-mono tracking-tighter">
                      Send a request <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold font-mono tracking-tighter sm:text-3xl">
              Featured Projects
            </h2>
            <p className="max-w-[700px] font-mono tracking-tighter text-muted-foreground">
              A selection of my recent work in UX writing and product development.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} to={`/portfolio/${project.slug}`} className="block h-full">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-400/50 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-green-400/0 group-hover:from-green-400/5 group-hover:to-green-400/10 rounded-lg transition-all duration-300 pointer-events-none z-10"></div>
                  <div className="relative aspect-video">
                    <img
                      src={project.image || `/placeholder.svg?height=400&width=600&text=Project`}
                      alt={project.title}
                      className="object-contain transition-transform group-hover:scale-105 w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4 relative z-20">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-2 flex items-center font-mono tracking-tighter">
                      Read the story <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex font-mono justify-center">
            <Button variant="outline" asChild>
              <Link to="/portfolio" data-button>Read All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Call-to-Action Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold font-mono tracking-tighter sm:text-3xl">
              Need a helping hand?
            </h2>
            <p className="max-w-[600px] font-mono tracking-tighter text-muted-foreground">
              I run a product storytelling & development studio called{" "}
              <a
                href="https://sintaksis.com"
                className="font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sintaksis.
              </a>{" "}
              Book a discovery call to explore how we can build your product's compelling narratives.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild>
                <a
                  href="https://cal.com/sintaksis/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono tracking-tighter flex items-center gap-2"
                  data-button
                >
                  Schedule a Discovery Call
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M7 17l9-9" />
                    <path d="M8 8h8v8" />
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
