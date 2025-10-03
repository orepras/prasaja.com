import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
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

export default function WritingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const postData = await getPostBySlug(slug);
        setPost(postData);
        
        // Load recommended posts (excluding current post)
        const allPosts = await getAllPosts();
        const filteredPosts = allPosts.filter(p => p.slug !== slug);
        
        // Shuffle and take 3 random posts
        const shuffled = filteredPosts.sort(() => 0.5 - Math.random());
        setRecommendedPosts(shuffled.slice(0, 3));
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading article...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-4xl">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4">Article not found</h1>
              <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Button asChild>
                <Link to="/writing">Back to Writing</Link>
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
              <Link to="/writing" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Writing
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold font-mono leading-tight mb-6 sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {post.category}
              </span>
              <time dateTime={post.date} className="flex items-center">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="flex items-center">
                <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                {post.readingTime}
              </span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <article 
            className="prose-enhanced"
            dangerouslySetInnerHTML={{ __html: post.content }}
            aria-label={`Article content: ${post.title}`}
          />

          {/* Recommended Writings Section */}
          {recommendedPosts.length > 0 && (
            <section className="mt-16 mb-8">
              <h2 className="text-xl font-bold font-mono tracking-tight mb-4 text-center">
                Read another one?
              </h2>
              
              <div className="space-y-3">
                {recommendedPosts.map((recommendedPost) => (
                  <Link key={recommendedPost.slug} to={`/writing/${recommendedPost.slug}`} className="block">
                    <div className="flex items-center justify-between py-2 px-3 border-b border-muted/10 hover:bg-muted/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-md group cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-3 w-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-xs text-muted-foreground font-mono tracking-tight">
                            {recommendedPost.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium font-mono tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                          {recommendedPost.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-serif group-hover:text-foreground/80 transition-colors duration-300">
                          {recommendedPost.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center ml-3">
                        <div className="flex-1 border-t border-dotted border-muted mx-2 group-hover:border-primary/50 transition-colors duration-300"></div>
                        <div className="text-primary group-hover:text-primary/80 font-mono tracking-tight text-xs flex items-center gap-1 transition-all duration-300">
                          visit link
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
          )}
        </div>
      </div>
    </div>
  );
}
