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
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold font-mono tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>
        </div>

        <div className="mb-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </div>
    </div>
  );
}
