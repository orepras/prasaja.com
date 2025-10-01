import WritingFormClient from '../components/writing-form/writing-form-client';

export default function WritingForm() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">UX Writing Task Submission Form</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Use this form to help me understand your UX writing needs. The more details you provide, the better I can tailor the content to your requirements.
      </p>

      <WritingFormClient />
      
      <div className="mt-10 text-sm text-muted-foreground">
        <p>
          You can download this form as a Markdown file or submit it directly to lets.talk@sintaksis.com.
        </p>
      </div>
    </div>
  );
}
