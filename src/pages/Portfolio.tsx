import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/markdown";
import { useEffect, useState } from "react";

interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
    };
    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            Portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            A collection of my work in UX writing and product development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="mt-2 flex items-center text-primary font-mono tracking-tighter group-hover:underline">
                    Read the story <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
