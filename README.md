# Prasaja Portfolio - Vite + React

This is a migrated version of the Prasaja portfolio website from Next.js to Vite + React, preserving all essential functionality including static pages, blog/writing system, and writing tools.

## Features

- **Static Pages**: Home, About, Contact, Portfolio
- **Writing/Blog System**: Markdown-based content with categories and filtering
- **Writing Tools**: 
  - Writing Guidelines Builder with voice/tone spectrum
  - UX Writing Request Form
- **Responsive Design**: Tailwind CSS with dark/light theme support
- **Modern UI**: Radix UI components with shadcn/ui styling

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── writing-guidelines/  # Writing guidelines components
│   └── writing-form/   # Writing form components
├── pages/              # Page components
├── lib/                # Utilities and helpers
└── hooks/              # Custom React hooks
```

## Content Management

The blog system uses markdown files stored in the `content/` directory:
- `content/posts/` - Blog posts organized by category
- `content/projects/` - Portfolio projects

## Writing Tools

### Writing Guidelines Builder
- Customizable writing guidelines
- Voice and tone spectrum
- Export to PDF/Markdown
- Local storage persistence

### UX Writing Request Form
- Comprehensive project brief form
- Export to Markdown
- Email integration ready

## Deployment

The project builds to static files that can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Migration Notes

This project was migrated from Next.js to Vite + React while preserving:
- All static pages and routing
- Markdown-based blog system
- Writing tools functionality
- UI/UX design and styling
- Theme support (dark/light mode)
