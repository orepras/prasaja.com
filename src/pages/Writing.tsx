import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold font-mono tracking-tighter sm:text-4xl md:text-5xl">
            Writings
          </h1>
          <p className="mx-auto font-mono max-w-[700px] text-muted-foreground md:text-xl">
            My personal writings contain my thoughts on UX, product, and coding.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">No posts found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-border pb-8 last:border-0"
            >
              <div className="flex items-center text-sm font-mono text-muted-foreground mb-2">
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
              <h2 className="text-xl font-medium font-sans mb-2">
                <Link
                  to={`/writing/${post.slug}`}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground font-mono tracking-tighter mb-4">
                {post.excerpt}
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link to={`/writing/${post.slug}`}>
                  Read this writing
                </Link>
              </Button>
            </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
