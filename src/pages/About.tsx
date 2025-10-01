export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl font-medium font-sans tracking-tighter sm:text-4xl md:text-5xl">
            About Me
          </h1>
          <p className="font-mono tracking-tighter text-muted-foreground md:text-xl">
            UX Writer & Content Developer
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src="/images/prasaja-profile-2.webp"
              alt="Prasaja photos with a bold glasses"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className="font-mono tracking-tighter text-muted-foreground md:text-base">
              Hello! I'm Prasaja, a UX writer, content manager, and product storyteller who bridges words and code to craft intuitive digital experiences.
            </p>

<p className="font-mono tracking-tighter text-muted-foreground md:text-base">
                          With a decade of copywriting expertise (I meaaan, 12 years and still going strong!) and a growing passion for product development, I turn complex ideas into clear, engaging narratives that guide and delight users.
</p>
            <p className="font-mono tracking-tighter text-muted-foreground md:text-base italic">
              Fun fact: My stand-up comedy background shows up everywhere. From error messages that make users smile, leading with empathy, disarming tension with wit, even workshops where laughter sparks the best ideas
<br />
<br />
—all while delivering results.
            </p>
            <h2 className="font-mono font-bold">Publication and Achievement</h2>
            <ul>
              <li className="hover:underline font-mono tracking-tighter text-muted-foreground md:text-base">                  <span className="mr-2 text-primary">•</span>
<a href="https://uxcontent.com/content-design-json/" target="_blank" rel="noopener noreferrer">UX Content Collective</a> - How content designers can (and should) use JSON files</li>
              <br></br>
              <li className="hover:underline font-mono tracking-tighter text-muted-foreground md:text-base">                  <span className="mr-2 text-primary">•</span>
<a href="https://www.loker.id/artikel/prasaja-mukti-ux-writer-penghubung-penting-antara-teknologi-dan-kebutuhan-manusia" target="_blank" rel="noopener noreferrer">Loker.id</a> - UX Writer Penghubung Penting antara Teknologi dan Kebutuhan Manusia</li><br></br>
<li className="hover:underline font-mono tracking-tighter text-muted-foreground md:text-base">                  <span className="mr-2 text-primary">•</span>
<a href="https://www.warungcopy.com/blog/ux-writer-spesialis-atau-generalis" target="_blank" rel="noopener noreferrer">WARCOP</a> - Jadi UX Writer spesialis atau generalis? Mari pahami masing-masing opsi</li>
            </ul>

            <div className="pt-4">
              <h2 className="text-xl font-medium font-sans mb-4">
                Skills & Expertise
              </h2>
              <ul className="grid grid-cols-2 gap-2 font-mono tracking-tighter">
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  UX Writing
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  Content Strategy
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  Product Storytelling
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  Content Design
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  Front-end development
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  HTML, CSS, Javascript
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary">•</span>
                  Workshop Facilitation
                </li>
              </ul>
            </div>

            </div>
        </div>

        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-medium font-sans tracking-tighter">
            My Approach
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">User-Centered</h3>
              <p className="font-mono tracking-tighter text-muted-foreground">
                I believe that effective product starts with understanding the
                user's needs, goals, and context. Every word and product
                decision should serve a purpose in their journey without too
                much fluff.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Strategic</h3>
              <p className="font-mono tracking-tighter text-muted-foreground">
                Good product content isn't just about what sounds good—it's
                about what works. I approach each project with clear objectives
                and measurable outcomes in mind.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Collaborative</h3>
              <p className="font-mono tracking-tighter text-muted-foreground">
                The best work happens when everyone work closely together. I
                thrive in cross-functional environments and I continuously
                ensure that the team's vibe is the best in pursuit of
                excellence.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-medium font-sans tracking-tighter mb-4">
            Let's Not Rush Things
          </h2>
          <p className="font-mono tracking-tighter text-muted-foreground mb-4">
            You wouldn't kiss someone on the first date (unless it's really going well), right?
            </p>
            <p className="font-mono tracking-tighter text-muted-foreground mb-4">Same goes for hiring a writer. Take your time, poke around my site, read a little, get a feel for my style.</p>
            <p className="font-mono tracking-tighter text-muted-foreground mb-4">If something clicks and you think I might be the one (for your writing needs, of course), slide into my{' '}
            <a href="/contact" className="text-primary underline hover:no-underline">
              contact page
            </a>
            . Let's talk.
          </p>
        </div>
      </div>
    </div>
  );
}
