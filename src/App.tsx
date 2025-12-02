import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail'
import Writing from './pages/Writing'
import WritingDetail from './pages/WritingDetail'
import WritingGuidelines from './pages/WritingGuidelines'
import WritingForm from './pages/WritingForm'
import Accessibility from './pages/Accessibility'
import HiringMe from './pages/HiringMe'
import ADPListMeetup from './pages/ADPListMeetup'
import TerminologiInklusif from './pages/TerminologiInklusif'
import WritingRelatedWCAG from './pages/WritingRelatedWCAG'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col">
        {/* Skip to main content link for keyboard users */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<WritingDetail />} />
            <Route path="/writing-guidelines" element={<WritingGuidelines />} />
            <Route path="/writing-form" element={<WritingForm />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/hiring-me" element={<HiringMe />} />
            <Route path="/adplist-meetup" element={<ADPListMeetup />} />
            <Route path="/terminologi-inklusif" element={<TerminologiInklusif />} />
            <Route path="/writing-related-wcag" element={<WritingRelatedWCAG />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
