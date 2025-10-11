import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";

export default function ADPListMeetup() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <header className="mt-24 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight mb-4">
            ADPList Jakarta Meetup
          </h1>
          <div className="text-base text-muted-foreground font-mono tracking-tight mb-8">
            Mentor datang bawa cerita, Mentee hadir penuh semangat.<br />
            Yuk kita temu di Jakarta, Berbagi ilmu, tumbuhkan hangat.
          </div>
          <div className="text-base text-muted-foreground font-mono tracking-tight mb-8">
            <i>Azeg, nah kita balik ke Bahasa Inggris dulu ya sesuai brief.</i>
          </div>
        </div>
      </header>

        {/* Registration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">Register for the Event</h2>
          
          <div className="bg-muted/30 rounded-lg p-6">
            <iframe
              src="https://luma.com/embed/event/evt-GlzUG97l0VvDl9z/simple"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: "1px solid #bfcbda88", borderRadius: "4px" }}
              allow="fullscreen; payment"
              aria-hidden="false"
              tabIndex={0}
              title="ADPList Jakarta Meetup Registration"
            />
          </div>
        </section>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">About the ADPList Jakarta Meetup</h2>
          
          <div className="space-y-4 text-justify font-serif">
            <p className="text-lg leading-relaxed">
              🎉 Jakarta, it's our turn! Let's gather for a relaxed evening of stories, ideas, and good company. 
              Whether you're a mentor, mentee, or just curious about the ADPList community, come join us for casual 
              networking, open conversations, and plenty of inspiration over good food and drinks in the city.
            </p>
            
            <p className="text-lg leading-relaxed">
              👋 Everyone's welcome — designers, writers, product folks, researchers, engineers, founders, and anyone 
              passionate about growth, creativity, and mentorship. You don't have to be an ADPList member — just come as you are!
            </p>
            
            <p className="text-lg leading-relaxed">
              🌟 <strong>Hosted by:</strong> Prasaja Mukti, Top 10 ADPList Mentor in Copywriting (4x consecutively) and 
              Principal Writer at Sintaksis, a copywriting and storytelling agency based in Indonesia. Alongside ADPList Ambassadors, Regina.
            </p>
            
            <p className="text-lg leading-relaxed">
              We'll also be joined by Felix Lee (Co-founder & CEO, ADPList) who's flying in to meet the Jakarta community 
              and share his journey of building ADPList, scaling mentorship worldwide, and navigating the AI era with heart and vision.
            </p>
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">Event Details</h2>
          
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight"><strong>Date:</strong> October 19th, 2025</span>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight"><strong>Venue:</strong> Tanare, Cipete</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight"><strong>Time:</strong> 3:00 PM – 5:00 PM</span>
            </div>
          </div>
        </section>

        {/* About Felix Lee */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">About Felix Lee</h2>
          
          <div className="space-y-4 text-justify font-serif">
            <p className="text-lg leading-relaxed">
              Felix Lee is the Co-founder and CEO of ADPList, the world's largest mentorship platform with over 33,000 
              mentors from companies like Netflix, Airbnb, and Google. Since 2021, ADPList has hosted more than 300 
              million minutes of mentorship sessions across 140 countries.
            </p>
            
            <p className="text-lg leading-relaxed">
              Felix has been featured in Forbes 30 Under 30 Asia and Tatler's Generation T Future Leader List (2023). 
              Before ADPList, he co-founded Packdat (acquired in 2018) and led product design at Gotrade (YC S19).
            </p>
          </div>
        </section>

        {/* Location Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">Location</h2>
          
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="space-y-2">
              <h3 className="font-mono tracking-tight font-bold">Tanare</h3>
              <p className="font-serif text-sm leading-relaxed">
                Jl. B.D.N. I No.47AB, RT.11/RW.13, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, 
                Daerah Khusus Ibukota Jakarta 12430, Indonesia
              </p>
              <p className="font-mono tracking-tight text-sm text-muted-foreground">
                Masuk lewat MOOT by bluehertz Cipete
              </p>
            </div>
          </div>
        </section>

        {/* Stay Connected */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-mono tracking-tight mb-6">Stay Connected</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight">
                🧭 Follow ADPList on <a href="https://linkedin.com/company/adplist" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a> and <a href="https://x.com/adplist" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X (Twitter)</a>
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight">
                📅 Subscribe to the <a href="https://adplist.org/events" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ADPList Community Calendar</a> to stay up to date on upcoming meetups and events.
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <ExternalLink className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight">
                👾 Join our <a href="https://discord.gg/adplist" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Discord</a> — where mentors, mentees, and the global ADPList community connect, share, and grow together.
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-mono tracking-tight">
                💬 ADPList mentors can also join the exclusive Mentor Slack Community by emailing <a href="mailto:community@adplist.org" className="text-primary hover:underline">community@adplist.org</a>.
              </span>
            </div>
          </div>
        </section>


        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="text-primary hover:text-primary/80 font-mono tracking-tight text-sm underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
