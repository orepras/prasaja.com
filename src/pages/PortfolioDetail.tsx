import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/markdown";
import { useEffect, useState } from "react";

interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (slug) {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
      }
      setLoading(false);
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading project...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4">Project not found</h1>
              <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been moved.</p>
              <Button asChild>
                <Link to="/portfolio">Back to Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Navigation */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6 group">
              <Link to="/portfolio" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-mono leading-tight mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {project.category}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              {project.description}
            </p>
          </header>

          {/* Project Image */}
          <div className="mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Project Content */}
          <article 
            className="prose-enhanced"
            dangerouslySetInnerHTML={{ __html: project.content }}
            aria-label={`Project content: ${project.title}`}
          />
        </div>
      </div>
    </div>
  );
}
