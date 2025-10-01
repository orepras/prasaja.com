import WritingGuidelinesClient from '../components/writing-guidelines/writing-guidelines-client';

export default function WritingGuidelines() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Writing Guidelines</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Designed for myself and clients, this tool quickly kickstarts written communication for products/brands. You too can create customizable writing guidelines.
      </p>

      <WritingGuidelinesClient />
      
      <div className="mt-10 text-sm text-muted-foreground">
        <p>
          All changes are saved to your browser&apos;s local storage. Export your guidelines as PDF or Markdown for sharing.
        </p>
      </div>
    </div>
  );
}
