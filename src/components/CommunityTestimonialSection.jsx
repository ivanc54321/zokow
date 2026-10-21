import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Compass, 
  ArrowRight, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  MapPin
} from 'lucide-react';
import './CommunityTestimonialSection.css';

const COMMUNITY_MEMBERS = [
  {
    id: 'marcus',
    name: 'Marcus K.',
    role: 'DJ & Promoter',
    town: 'Margate',
    badge: 'Nightlife Curator',
    image: '/community/marcus.jpg',
    color: '#6366f1', // Indigo / Purple
    bgGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    quote: 'VERGE helped us pack out our residency without playing the social algorithm game. The most authentic local crowd in Thanet.',
    capsuleClass: 'capsule-top-left'
  },
  {
    id: 'elena',
    name: 'Elena R.',
    role: 'Ceramics & Printmaker',
    town: 'Cliftonville',
    badge: 'Artisan Member',
    image: '/community/elena.jpg',
    color: '#ec4899', // Hot Pink
    bgGradient: 'linear-gradient(135deg, #db2777 0%, #f43f5e 100%)',
    quote: 'Found our weekly print and ceramics studio collective within 48 hours of moving down. It makes coastal life feel instantly connected.',
    capsuleClass: 'capsule-bottom-left'
  },
  {
    id: 'chloe',
    name: 'Chloe T.',
    role: 'Tidal Swimmer & Host',
    town: 'Margate Sands',
    badge: 'Outdoor Leader',
    image: '/community/chloe.jpg',
    color: '#06b6d4', // Cyan / Teal
    bgGradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    quote: 'Our Walpole Bay tidal sunrise dips grew from four friends into a 25-person daily ritual through VERGE listings.',
    capsuleClass: 'capsule-top-center'
  },
  {
    id: 'sam',
    name: 'Sam W.',
    role: 'Padel Captain & Architect',
    town: 'Margate',
    badge: 'Active Thanet',
    image: '/community/sam.jpg',
    color: '#ff5e14', // Vibrant Amber Orange
    bgGradient: 'linear-gradient(135deg, #ea580c 0%, #ff5e14 100%)',
    quote: 'Booking indoor padel matches and finding local food pop-ups for our team afterwards has never been this simple.',
    capsuleClass: 'capsule-bottom-center'
  },
  {
    id: 'zara',
    name: 'Zara M.',
    role: 'Culinary Pop-up Organizer',
    town: 'Ramsgate Harbour',
    badge: 'Food & Culture',
    image: '/community/zara.jpg',
    color: '#eab308', // Warm Canary Yellow
    bgGradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    quote: 'The weekend planner feature is pure gold. Our Ramsgate harbour brunch circles and Friday wine crawls are permanently organized.',
    capsuleClass: 'capsule-offset-right'
  }
];

export default function CommunityTestimonialSection({ 
  onOpenSignUp, 
  onOpenAbout,
  onOpenSubmit
}) {
  const [activeMemberId, setActiveMemberId] = useState('marcus');
  const activeMember = COMMUNITY_MEMBERS.find(m => m.id === activeMemberId) || COMMUNITY_MEMBERS[0];

  return (
    <section className="comm-testimonial-section" aria-label="Community Testimonials">
      <div className="comm-testimonial-container">
        
        {/* LEFT COLUMN: Bold Typography, Pitch, CTAs, Feature Pills */}
        <div className="comm-content-col reveal-fade-left">
          
          <div className="comm-pill-badge">
            <span className="comm-badge-dot"></span>
            <span className="comm-badge-text">COMMUNITY FIRST</span>
          </div>

          <h2 className="comm-headline">
            Build your best <span className="comm-headline-gradient">community</span> starting from here.
          </h2>

          <p className="comm-subtext">
            Meet and communicate with the best people to run projects, gigs, sports clubs, or weekend gatherings across Margate, Ramsgate, and Broadstairs in a more authentic and rewarding way.
          </p>

          <div className="comm-cta-group">
            <button 
              className="comm-btn-primary"
              onClick={onOpenSignUp}
              title="Become a VERGE Member"
            >
              <span>Get Started</span>
              <Sparkles size={16} className="btn-sparkle-icon" />
            </button>
            <button 
              className="comm-btn-secondary"
              onClick={onOpenAbout}
              title="Read our manifesto & story"
            >
              <span>Learn More</span>
              <ArrowRight size={16} className="btn-arrow-icon" />
            </button>
          </div>

          {/* Bottom 3 Feature Pills */}
          <div className="comm-feature-row">
            <div className="comm-feature-item" onClick={onOpenSignUp} role="button" tabIndex={0}>
              <div className="comm-feature-icon-box comm-icon-chat">
                <Users size={18} />
              </div>
              <div className="comm-feature-text">
                <strong>Build Community</strong>
                <span>Social circles & groups</span>
              </div>
            </div>

            <div className="comm-feature-item" onClick={onOpenSubmit} role="button" tabIndex={0}>
              <div className="comm-feature-icon-box comm-icon-cal">
                <Calendar size={18} />
              </div>
              <div className="comm-feature-text">
                <strong>Share Events</strong>
                <span>List gigs in 60 seconds</span>
              </div>
            </div>

            <div className="comm-feature-item" onClick={onOpenAbout} role="button" tabIndex={0}>
              <div className="comm-feature-icon-box comm-icon-info">
                <Compass size={18} />
              </div>
              <div className="comm-feature-text">
                <strong>Coast Directory</strong>
                <span>Margate, Ramsgate & Beyond</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 5 Stadium-Capsule Portraits with Orbital Rings */}
        <div className="comm-visual-col reveal-fade-right delay-150">
          
          {/* Orbital Background Geometry */}
          <div className="comm-orbital-rings" aria-hidden="true">
            <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="340" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.18" />
              <circle cx="340" cy="300" r="260" stroke="currentColor" strokeWidth="1" opacity="0.12" />
              <path d="M 120 500 Q 300 200 560 220" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
            </svg>
          </div>

          {/* Capsule Portrait Collage Matrix */}
          <div className="comm-capsules-grid">
            
            {/* Column 1 (Left Track) */}
            <div className="comm-col-track track-left">
              
              {/* Marcus (Top Left Stadium Pill) */}
              <div 
                className={`comm-capsule-card ${COMMUNITY_MEMBERS[0].capsuleClass} ${activeMemberId === 'marcus' ? 'is-active' : ''}`}
                onClick={() => setActiveMemberId('marcus')}
                style={{ '--member-accent': COMMUNITY_MEMBERS[0].color }}
              >
                <div className="comm-capsule-inner" style={{ background: COMMUNITY_MEMBERS[0].bgGradient }}>
                  <img 
                    src={COMMUNITY_MEMBERS[0].image} 
                    alt={COMMUNITY_MEMBERS[0].name} 
                    className="comm-capsule-img"
                    loading="lazy"
                  />
                  <div className="capsule-hover-overlay">
                    <span className="capsule-name-tag">{COMMUNITY_MEMBERS[0].name}</span>
                    <span className="capsule-role-tag">{COMMUNITY_MEMBERS[0].role}</span>
                  </div>
                </div>
              </div>

              {/* Elena (Bottom Left Stadium Pill) */}
              <div 
                className={`comm-capsule-card ${COMMUNITY_MEMBERS[1].capsuleClass} ${activeMemberId === 'elena' ? 'is-active' : ''}`}
                onClick={() => setActiveMemberId('elena')}
                style={{ '--member-accent': COMMUNITY_MEMBERS[1].color }}
              >
                <div className="comm-capsule-inner" style={{ background: COMMUNITY_MEMBERS[1].bgGradient }}>
                  <img 
                    src={COMMUNITY_MEMBERS[1].image} 
                    alt={COMMUNITY_MEMBERS[1].name} 
                    className="comm-capsule-img"
                    loading="lazy"
                  />
                  <div className="capsule-hover-overlay">
                    <span className="capsule-name-tag">{COMMUNITY_MEMBERS[1].name}</span>
                    <span className="capsule-role-tag">{COMMUNITY_MEMBERS[1].role}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2 (Center Track) */}
            <div className="comm-col-track track-center">
              
              {/* Chloe (Top Center Circular / Rounded Pill) */}
              <div 
                className={`comm-capsule-card ${COMMUNITY_MEMBERS[2].capsuleClass} ${activeMemberId === 'chloe' ? 'is-active' : ''}`}
                onClick={() => setActiveMemberId('chloe')}
                style={{ '--member-accent': COMMUNITY_MEMBERS[2].color }}
              >
                <div className="comm-capsule-inner" style={{ background: COMMUNITY_MEMBERS[2].bgGradient }}>
                  <img 
                    src={COMMUNITY_MEMBERS[2].image} 
                    alt={COMMUNITY_MEMBERS[2].name} 
                    className="comm-capsule-img"
                    loading="lazy"
                  />
                  <div className="capsule-hover-overlay">
                    <span className="capsule-name-tag">{COMMUNITY_MEMBERS[2].name}</span>
                    <span className="capsule-role-tag">{COMMUNITY_MEMBERS[2].role}</span>
                  </div>
                </div>
              </div>

              {/* Sam (Bottom Center Stadium Pill) */}
              <div 
                className={`comm-capsule-card ${COMMUNITY_MEMBERS[3].capsuleClass} ${activeMemberId === 'sam' ? 'is-active' : ''}`}
                onClick={() => setActiveMemberId('sam')}
                style={{ '--member-accent': COMMUNITY_MEMBERS[3].color }}
              >
                <div className="comm-capsule-inner" style={{ background: COMMUNITY_MEMBERS[3].bgGradient }}>
                  <img 
                    src={COMMUNITY_MEMBERS[3].image} 
                    alt={COMMUNITY_MEMBERS[3].name} 
                    className="comm-capsule-img"
                    loading="lazy"
                  />
                  <div className="capsule-hover-overlay">
                    <span className="capsule-name-tag">{COMMUNITY_MEMBERS[3].name}</span>
                    <span className="capsule-role-tag">{COMMUNITY_MEMBERS[3].role}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 3 (Right Track) */}
            <div className="comm-col-track track-right">
              
              {/* Zara (Offset Stadium Pill) */}
              <div 
                className={`comm-capsule-card ${COMMUNITY_MEMBERS[4].capsuleClass} ${activeMemberId === 'zara' ? 'is-active' : ''}`}
                onClick={() => setActiveMemberId('zara')}
                style={{ '--member-accent': COMMUNITY_MEMBERS[4].color }}
              >
                <div className="comm-capsule-inner" style={{ background: COMMUNITY_MEMBERS[4].bgGradient }}>
                  <img 
                    src={COMMUNITY_MEMBERS[4].image} 
                    alt={COMMUNITY_MEMBERS[4].name} 
                    className="comm-capsule-img"
                    loading="lazy"
                  />
                  <div className="capsule-hover-overlay">
                    <span className="capsule-name-tag">{COMMUNITY_MEMBERS[4].name}</span>
                    <span className="capsule-role-tag">{COMMUNITY_MEMBERS[4].role}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Live Testimonial Quote Capsule */}
          <div className="comm-active-quote-card reveal-scale delay-200" style={{ borderColor: `${activeMember.color}40` }}>
            <div className="quote-header">
              <div className="quote-author-info">
                <div className="quote-avatar-mini" style={{ background: activeMember.bgGradient }}>
                  <img src={activeMember.image} alt={activeMember.name} />
                </div>
                <div>
                  <h4 className="quote-author-name">
                    {activeMember.name} 
                    <span className="quote-badge-tag">{activeMember.badge}</span>
                  </h4>
                  <p className="quote-author-location">
                    <MapPin size={11} className="inline-loc-pin" />
                    {activeMember.town} • {activeMember.role}
                  </p>
                </div>
              </div>
              <Quote size={20} className="quote-icon-decor" style={{ color: activeMember.color }} />
            </div>
            
            <p className="quote-body">"{activeMember.quote}"</p>

            <div className="quote-footer">
              <span className="quote-verified">
                <CheckCircle2 size={13} className="check-verified-icon" />
                Verified Thanet Passholder
              </span>
              <div className="quote-pills-nav">
                {COMMUNITY_MEMBERS.map(m => (
                  <button 
                    key={m.id}
                    className={`quote-pill-dot ${m.id === activeMemberId ? 'is-active' : ''}`}
                    onClick={() => setActiveMemberId(m.id)}
                    title={`View ${m.name}'s testimonial`}
                    style={{ '--dot-color': m.color }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
