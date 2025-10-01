import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"

// Types for our content
export interface Post {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
  readingTime: string
  tags: string[]
  image?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  description: string
  content: string
  image: string
}

// Process markdown content
async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content)
  
  return String(result)
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTime} min read`
}

// No mock data - using actual markdown files

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    console.log('Loading posts from markdown files...')
    
    // Use the correct glob pattern for Vite
    const postsContext = import.meta.glob('/src/content/posts/*.md', { eager: true, query: '?raw', import: 'default' })
    
    console.log('Posts context keys:', Object.keys(postsContext))
    console.log('Posts context entries:', Object.entries(postsContext))
    
    if (Object.keys(postsContext).length === 0) {
      console.warn('No markdown files found')
      return []
    }
    
    const posts = await Promise.all(
      Object.entries(postsContext).map(async ([path, file]) => {
        console.log('Processing post:', path)
        console.log('File object:', file)
        const slug = path.split('/').pop()?.replace('.md', '') || ''
        
        // Get the raw content from the imported file
        const rawContent = file as string
        console.log('Raw content preview:', rawContent.substring(0, 200))
        
        const { data, content } = matter(rawContent)
        
        console.log('Parsed data for', slug, ':', data)
        
        const processedContent = await processMarkdown(content)
        const readingTime = calculateReadingTime(content)
        
        // Validate and format the date
        let formattedDate = data.date || ''
        if (formattedDate) {
          const dateObj = new Date(formattedDate)
          if (isNaN(dateObj.getTime())) {
            console.warn('Invalid date for post:', slug, 'Date:', formattedDate)
            formattedDate = new Date().toISOString().split('T')[0] // Use today's date as fallback
          } else {
            formattedDate = dateObj.toISOString().split('T')[0] // Format as YYYY-MM-DD
          }
        }
        
        const post = {
          slug,
          title: data.title || '',
          date: formattedDate,
          category: data.category || 'general',
          excerpt: data.excerpt || '',
          content: processedContent,
          readingTime,
          tags: data.tags || [],
          image: data.image || undefined,
        } as Post
        
        console.log('Processed post:', post.title, 'Category:', post.category, 'Date:', post.date)
        return post
      })
    )
    
    console.log('All posts loaded:', posts.length)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

// Get all blog posts by category
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts()
  return allPosts.find(post => post.slug === slug) || null
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    // Import all markdown files from the content/projects directory
    const projectsContext = import.meta.glob('/src/content/projects/*.md', { eager: true, query: '?raw', import: 'default' })
    
    const projects = await Promise.all(
      Object.entries(projectsContext).map(async ([path, file]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || ''
        const { data, content } = matter(file as string)
        
        const processedContent = await processMarkdown(content)
        
        return {
          slug,
          title: data.title || '',
          category: data.category || 'Project',
          description: data.description || '',
          content: processedContent,
          image: data.image || '/placeholder.svg?height=400&width=600&text=Project',
        } as Project
      })
    )
    
    return projects
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter((project) => project.category === category)
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const allProjects = await getAllProjects()
  return allProjects.find(project => project.slug === slug) || null
}

// Get all categories from posts
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}

// Get all project categories
export async function getAllProjectCategories(): Promise<string[]> {
  const projects = await getAllProjects()
  const categories = new Set(projects.map((project) => project.category))
  return Array.from(categories)
}

// Get all tags from posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags || []))
  return Array.from(tags)
}