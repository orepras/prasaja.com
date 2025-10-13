import { Link } from "react-router-dom";
import { FileText, BookOpen, Code } from "lucide-react";
import { getAllPosts } from "@/lib/markdown";
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

export default function NotFound() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsData = await getAllPosts();
        // Shuffle and take 3 random posts
        const shuffled = postsData.sort(() => 0.5 - Math.random());
        setPosts(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "personal-essays":
        return <FileText className="h-4 w-4 text-primary mr-2" />;
      case "ux-writing":
        return <BookOpen className="h-4 w-4 text-primary mr-2" />;
      case "product":
        return <Code className="h-4 w-4 text-primary mr-2" />;
      case "coding":
        return <Code className="h-4 w-4 text-primary mr-2" />;
      default:
        return <FileText className="h-4 w-4 text-primary mr-2" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "personal-essays":
        return "Personal Essays";
      case "ux-writing":
        return "UX Writing";
      case "product":
        return "Product";
      case "coding":
        return "Coding";
      default:
        return category;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold font-mono tracking-tighter mb-4">Do you know what 404 is?</h1>
          <h2 className="text-2xl font-bold mb-4">Well, this page got lost. 
            But hey, while you're here, why not explore some of my writing instead?
</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm leading-relaxed font-serif text-muted-foreground">Loading some good reads...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm leading-relaxed font-serif text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-mono tracking-tight mb-6 text-center">
              Here are some essays you might enjoy:
            </h3>
            {posts.map((post) => (
              <Link key={post.slug} to={`/writing/${post.slug}`} className="block">
                <article className="border border-muted/20 hover:border-primary/30 hover:bg-muted/20 hover:scale-[1.01] transition-all duration-300 ease-in-out rounded-lg group cursor-pointer p-6">
                  <div className="flex items-center text-xs font-mono tracking-tight text-muted-foreground mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                    {getCategoryIcon(post.category)}
                    <span>{getCategoryName(post.category)}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-lg font-medium font-mono tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed font-serif text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 border-t border-dotted border-muted mr-3 group-hover:border-primary/50 transition-colors duration-300"></div>
                    <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                      Read this writing
                      <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
