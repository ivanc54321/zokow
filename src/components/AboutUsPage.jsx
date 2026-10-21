import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  Waves, 
  Users, 
  ShieldCheck, 
  PlusCircle, 
  X,
  ChevronRight,
  Sun,
  Moon,
  Play,
  Pause,
  MapPin
} from 'lucide-react';
import { ABOUT_SLIDES } from '../data/aboutSlidesData';
import './AboutUsPage.css';

const FEATURED_HUBS = [
  {
    id: "faithinstrangers",
    name: "Faith In Strangers",
    town: "Cliftonville, Margate",
    role: "Cliffside Discotheque Loft & Poseidon Sound",
    image: "/events/faith-in-strangers-loft.jpg",
    tag: "NIGHTLIFE & VIEWS",
    tagColor: "#5d47e8"
  },
  {
    id: "rewdpadel",
    name: "REWD Padel & Wellness Lounge",
    town: "Cargo Way, Westwood",
    role: "Panoramic Indoor Courts, Reformer Pilates & Spin",
    image: "/events/rewd-indoor-padel.jpg",
    tag: "PADEL & FITNESS",
    tagColor: "#0097a8"
  },
  {
    id: "dreamland",
    name: "Dreamland Margate",
    town: "Seafront, Margate",
    role: "Scenic Stage, Retro Roller Room & Hall By The Sea",
    image: "/margate/dreamland-neon-dusk.jpg",
    tag: "ICONIC VENUE",
    tagColor: "#f1513a"
  },
  {
    id: "drillshed",
    name: "The Drill Shed • Margate Lido",
    town: "Margate Lido Complex",
    role: "Historic Seafront Home of Beyond 30 Day Parties",
    image: "/events/beyond30-day-party.jpg",
    tag: "DAYTIME CLUBBING",
    tagColor: "#a8438b"
  },
  {
    id: "walpole",
    name: "Walpole Bay Tidal Pool",
    town: "Cliftonville, Margate",
    role: "4-Acre 1937 Saltwater Tidal Bathing Haven",
    image: "/arcona/card-swim.jpg",
    tag: "OPEN WATER WELLNESS",
    tagColor: "#0284c7"
  },
  {
    id: "ramsgatemusichall",
    name: "Ramsgate Music Hall",
    town: "Turner Street, Ramsgate",
    role: "140-Capacity NME Best Small Venue in Britain",
    image: "/margate/ramsgate-royal-harbour.jpg",
    tag: "INTIMATE LIVE SOUND",
    tagColor: "#fbb929"
  }
];

export default function AboutUsPage({ 
  onBackToDirectory, 
  onOpenSubmit, 
  onOpenVenue, 
  theme = 'dark', 
  onToggleTheme 
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const autoPlayTimerRef = useRef(null);

  const totalSlides = ABOUT_SLIDES.length;
  const currentSlide = ABOUT_SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx) => {
    setCurrentSlideIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeStoryModal) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, activeStoryModal]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || activeStoryModal) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, activeStoryModal, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStartX(null);
  };

  return (
    <div className={`about-page-root theme-${theme}`}>
      
      {/* Top Floating Header with Back button and Actions */}
      <header className="about-header-bar">
        <div className="about-header-inner">
          
          <button 
            className="about-back-btn" 
            onClick={onBackToDirectory}
            title="Return to Events Directory"
          >
            <ArrowLeft size={16} />
            <span>Back to Directory</span>
          </button>

          <div className="about-brand-center">
            <span className="about-brand-logo">VERGE</span>
            <span className="about-brand-badge">ABOUT US</span>
          </div>

          <div className="about-header-actions">
            <button 
              className="about-theme-toggle" 
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button 
              className="about-post-cta" 
              onClick={onOpenSubmit}
              title="Post a local gathering"
            >
              <PlusCircle size={15} />
              <span>Post Event</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="about-page-main">
        
        {/* Intro Tagline */}
        <div className="about-intro-header">
          <div className="about-intro-pill">
            <span className="pill-dot"></span>
            <span>EDITORIAL MANIFESTO & STORY</span>
          </div>
          <h1 className="about-main-title">
            Connecting The Isle of Thanet Through Culture & Community
          </h1>
          <p className="about-main-subtitle">
            Experience the curated journey behind VERGE — where seaside heritage meets independent nightlife, grassroots sports, and live arts.
          </p>
        </div>

        {/* 
          =======================================================
          THE SHOWPIECE: DRIBBLE CAROUSEL SLIDER UI
          Faithful recreation of BreadByte Design's Carousel Slider UI
          =======================================================
        */}
        <div 
          className="dribbble-slider-wrapper"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="dribbble-slider-card">
            
            {/* LEFT EDITORIAL COLUMN */}
            <div className="dribbble-left-col">
              
              <div className="dribbble-slide-content" key={currentSlide.id}>
                
                {/* Uppercase Tracked Eyebrow */}
                <div className="dribbble-slide-eyebrow">
                  <span className="eyebrow-slide-num">{currentSlide.indexLabel}</span>
                  <span className="eyebrow-sep">•</span>
                  <span className="eyebrow-kicker">{currentSlide.kicker}</span>
                </div>

                {/* Bold Chunky Condensed Display Headline */}
                <h2 className="dribbble-slide-heading">
                  {currentSlide.title}
                </h2>

                {/* Descriptive Editorial Paragraph */}
                <p className="dribbble-slide-desc">
                  {currentSlide.description}
                </p>

                {/* Animated "More ──────>" Link */}
                <button 
                  className="dribbble-more-link"
                  onClick={() => setActiveStoryModal(currentSlide)}
                >
                  <span className="more-text">{currentSlide.linkText}</span>
                  <span className="more-arrow-shaft"></span>
                  <span className="more-arrow-head">›</span>
                </button>

              </div>

              {/* DOCKED NAVIGATION ARROWS (Bottom-Right of Left Card) */}
              <div className="dribbble-nav-dock">
                
                {/* Slide Tracker Number */}
                <div className="dribbble-tracker">
                  <span className="tracker-current">{String(currentSlideIndex + 1).padStart(2, '0')}</span>
                  <span className="tracker-divider">/</span>
                  <span className="tracker-total">{String(totalSlides).padStart(2, '0')}</span>
                </div>

                {/* The Two Split Arrow Buttons */}
                <div className="dribbble-arrow-group" role="group" aria-label="Slider Navigation">
                  <button 
                    className="dribbble-arrow-btn arrow-prev" 
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    title="Previous Slide (or Left Arrow)"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button 
                    className="dribbble-arrow-btn arrow-next" 
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    title="Next Slide (or Right Arrow)"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>

              {/* Dynamic Slide Auto-play Progress Bar */}
              <div className="dribbble-progress-rail">
                <div 
                  className={`dribbble-progress-bar ${isAutoPlaying ? 'is-animating' : 'is-paused'}`}
                  key={currentSlideIndex}
                />
              </div>

            </div>

            {/* RIGHT ASYMMETRIC COLOR-BLOCKED COLLAGE */}
            <div className="dribbble-right-col" key={`collage-${currentSlide.id}`}>
              
              {/* TOP CARD (Spans Upper Right Quadrant) */}
              <div 
                className="collage-block block-top" 
                style={{ backgroundColor: currentSlide.collage.top.bg }}
              >
                <div className="collage-img-wrapper">
                  <img 
                    src={currentSlide.collage.top.image} 
                    alt={currentSlide.collage.top.title}
                    className="collage-photo"
                  />
                  <div className="collage-caption-tag">
                    <span className="caption-dot"></span>
                    <span>{currentSlide.collage.top.title}</span>
                  </div>
                </div>
              </div>

              {/* CENTER INSET SQUARE (Yellow/Vibrant Accent Block with Circular Cutout/Photo) */}
              <div 
                className="collage-block block-mid-square" 
                style={{ backgroundColor: currentSlide.collage.mid.bg }}
              >
                <div className="mid-square-inner">
                  <img 
                    src={currentSlide.collage.mid.image} 
                    alt={currentSlide.collage.mid.title}
                    className="mid-square-photo"
                  />
                  <div className="mid-square-badge">
                    <span>{currentSlide.collage.mid.tag}</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM CARD (Wide Rich Saturated Purple/Dark Base) */}
              <div 
                className="collage-block block-bottom" 
                style={{ backgroundColor: currentSlide.collage.bottom.bg }}
              >
                <div className="collage-bottom-inner">
                  <img 
                    src={currentSlide.collage.bottom.image} 
                    alt={currentSlide.collage.bottom.title}
                    className="bottom-photo"
                  />
                  <div className="bottom-gradient-overlay" />
                  <div className="bottom-caption">
                    <span className="bottom-subtitle">{currentSlide.collage.bottom.tag}</span>
                    <h4 className="bottom-title">{currentSlide.collage.bottom.title}</h4>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Slider Pagination Thumbnails & Controls Bar */}
          <div className="slider-bottom-bar">
            
            <div className="slider-pill-indicators">
              {ABOUT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  className={`slider-pill-indicator ${idx === currentSlideIndex ? 'is-active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <span className="indicator-number">0{idx + 1}</span>
                  <span className="indicator-label">{slide.kicker}</span>
                </button>
              ))}
            </div>

            <div className="slider-play-toggle">
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                className="play-pause-btn"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause size={13} />
                    <span>Auto 7s</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* 
          =======================================================
          SUPPORTING SECTION 1: THE THREE COASTAL TOWNS
          =======================================================
        */}
        <section className="about-towns-section">
          
          <div className="section-title-wrap">
            <span className="section-eyebrow">THE ISLE OF THANET</span>
            <h3 className="section-heading">Three Towns. One United Peninsula.</h3>
            <p className="section-sub">
              Distinct in character, united by coastline. VERGE maps and celebrates the singular identity of each town.
            </p>
          </div>

          <div className="towns-trio-grid">
            
            {/* Margate Card */}
            <div className="town-showcase-card card-margate">
              <div className="town-card-media">
                <img 
                  src="/margate/margate-main-sands-turner.jpg" 
                  alt="Margate Main Sands and Seafront" 
                  className="town-img"
                />
                <span className="town-tag tag-margate">MARGATE</span>
              </div>
              <div className="town-card-body">
                <h4>Creatives, Sunsets & Sonic Underground</h4>
                <p>
                  From Turner Contemporary’s world-stage gallery and Dreamland’s vintage amusement park to Cliftonville’s buzzing community bistros and Walpole Bay’s tidal bathers.
                </p>
                <div className="town-features">
                  <span>🎨 Arts & Galleries</span>
                  <span>🌊 Walpole Tidal Pool</span>
                  <span>🎪 Dreamland Hall</span>
                </div>
              </div>
            </div>

            {/* Ramsgate Card */}
            <div className="town-showcase-card card-ramsgate">
              <div className="town-card-media">
                <img 
                  src="/margate/ramsgate-royal-harbour.jpg" 
                  alt="Ramsgate Royal Harbour arches" 
                  className="town-img"
                />
                <span className="town-tag tag-ramsgate">RAMSGATE</span>
              </div>
              <div className="town-card-body">
                <h4>Royal Harbour, Music Vaults & Maritime Soul</h4>
                <p>
                  The UK’s only Royal Harbour, packed with atmospheric arches, craft taprooms, and the legendary Ramsgate Music Hall — winner of NME’s Best Small Venue.
                </p>
                <div className="town-features">
                  <span>⚓ Royal Marina Arches</span>
                  <span>🎸 Ramsgate Music Hall</span>
                  <span>🍻 Craft Waterfront Taprooms</span>
                </div>
              </div>
            </div>

            {/* Broadstairs Card */}
            <div className="town-showcase-card card-broadstairs">
              <div className="town-card-media">
                <img 
                  src="/margate/margate-coast-promenade.jpg" 
                  alt="Broadstairs Coastal Promenade" 
                  className="town-img"
                />
                <span className="town-tag tag-broadstairs">BROADSTAIRS</span>
              </div>
              <div className="town-card-body">
                <h4>Chalk Cliffs, Dickensian Coves & Acoustic Warmth</h4>
                <p>
                  Seven secluded sandy bays, historic clifftop tea houses, vibrant folk festivals, and intimate pub gigs overlooking Viking Bay.
                </p>
                <div className="town-features">
                  <span>🏖️ Viking Bay Sandy Coves</span>
                  <span>🎻 Folk Week & Gigs</span>
                  <span>🍦 Gelato & Clifftop Walks</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 
          =======================================================
          SUPPORTING SECTION 2: FEATURED THANET HUBS & VENUES
          Real local venues with direct hub navigation
          =======================================================
        */}
        <section className="about-hubs-section">
          <div className="section-title-wrap">
            <span className="section-eyebrow">CURATED CULTURAL ANCHORS</span>
            <h3 className="section-heading">The Venues & Spaces That Anchor Our Isle</h3>
            <p className="section-sub">
              Every gathering is rooted in an extraordinary local space. Explore Thanet’s premier cultural, musical, and athletic hubs.
            </p>
          </div>

          <div className="about-hubs-grid">
            {FEATURED_HUBS.map(hub => (
              <div key={hub.id} className="about-hub-card">
                <div className="hub-card-media">
                  <img src={hub.image} alt={hub.name} className="hub-photo" />
                  <span className="hub-badge" style={{ backgroundColor: hub.tagColor }}>
                    {hub.tag}
                  </span>
                </div>
                <div className="hub-card-body">
                  <div className="hub-town-row">
                    <MapPin size={12} className="hub-pin-icon" />
                    <span>{hub.town}</span>
                  </div>
                  <h4 className="hub-title">{hub.name}</h4>
                  <p className="hub-role">{hub.role}</p>
                  <button 
                    className="hub-explore-btn"
                    onClick={() => onOpenVenue && onOpenVenue(hub.id)}
                  >
                    <span>Explore Venue Hub</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 
          =======================================================
          SUPPORTING SECTION 2: CORE VALUES & HOW WE WORK
          =======================================================
        */}
        <section className="about-values-section">
          
          <div className="values-header">
            <span className="section-eyebrow">OUR COMMITMENT</span>
            <h3 className="section-heading">Principles That Guide Every Listing</h3>
          </div>

          <div className="values-quad-grid">
            
            <div className="value-card">
              <div className="value-icon-box box-amber">
                <Sparkles size={22} />
              </div>
              <h4>100% Free & Open</h4>
              <p>
                We will never charge community organizers, sports clubs, or artists to submit or highlight their gatherings. Culture should be free to discover.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box box-teal">
                <ShieldCheck size={22} />
              </div>
              <h4>Zero Algorithms</h4>
              <p>
                No sponsored pay-to-play feed prioritization. Events are ordered purely chronologically and by category so you never miss a real neighbourhood event.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box box-coral">
                <Waves size={22} />
              </div>
              <h4>Coastal Ecology & Respect</h4>
              <p>
                We actively champion beach cleaning initiatives, marine preservation, and outdoor wellness across Thanet’s protected chalk reefs and tidal pools.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box box-violet">
                <Users size={22} />
              </div>
              <h4>Independent Venues First</h4>
              <p>
                We shine the spotlight on family-run pubs, DIY studios, local parish halls, and indie spaces that give Thanet its authentic character.
              </p>
            </div>

          </div>

        </section>

        {/* 
          =======================================================
          CALL TO ACTION BANNER
          =======================================================
        */}
        <section className="about-cta-banner">
          <div className="cta-banner-content">
            <span className="cta-kicker">BE PART OF THANET’S STORY</span>
            <h3 className="cta-title">Got an Event, Live Gig, or Community Gathering?</h3>
            <p className="cta-desc">
              List it on VERGE in under 60 seconds with zero registration. Reach hundreds of locals across Margate, Ramsgate, and Broadstairs.
            </p>
            <div className="cta-buttons-row">
              <button className="cta-primary-btn" onClick={onOpenSubmit}>
                <PlusCircle size={17} />
                <span>Submit Your Event Free</span>
              </button>
              <button className="cta-secondary-btn" onClick={onBackToDirectory}>
                <span>Browse Live Directory</span>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 
        =======================================================
        EXPANDED STORY MODAL ("More ──────>" Drawer)
        =======================================================
      */}
      {activeStoryModal && (
        <div className="story-modal-overlay" onClick={() => setActiveStoryModal(null)}>
          <div className="story-modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="story-modal-header" style={{ borderTopColor: activeStoryModal.accentColor }}>
              <div className="story-modal-pill" style={{ color: activeStoryModal.accentColor }}>
                <span>{activeStoryModal.indexLabel}</span>
                <span>•</span>
                <span>{activeStoryModal.kicker}</span>
              </div>
              <button 
                className="story-modal-close" 
                onClick={() => setActiveStoryModal(null)}
                aria-label="Close Story"
              >
                <X size={20} />
              </button>
            </div>

            <div className="story-modal-body">
              <h2 className="story-modal-title">{activeStoryModal.storyHeadline}</h2>
              <div className="story-modal-paragraphs">
                {activeStoryModal.storyFull.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="story-modal-footer">
                <button 
                  className="story-modal-btn"
                  onClick={() => {
                    setActiveStoryModal(null);
                    onBackToDirectory();
                  }}
                >
                  <span>Explore Related Happenings on VERGE</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
