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

export default function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading posts...');
        const postsData = await getAllPosts();
        console.log('Posts loaded:', postsData.length, postsData);
        setPosts(postsData);
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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold font-mono tracking-tight sm:text-4xl md:text-5xl">
            Writings
          </h1>
          <p className="mx-auto text-sm leading-relaxed font-serif max-w-[700px] text-muted-foreground">
            My personal writings contain my thoughts on UX, product, and coding.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm leading-relaxed font-serif text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm leading-relaxed font-serif text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
            <Link key={post.slug} to={`/writing/${post.slug}`} className="block">
              <article className="border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer py-4 px-3">
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
                <h2 className="text-sm font-medium font-mono tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
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
