import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Users, 
  Compass, 
  Music, 
  HeartHandshake, 
  Calendar, 
  Sun, 
  Waves,
  Rss,
  Activity,
  Tag,
  Dog,
  Smile,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import { CATEGORIES, TIME_FILTERS, AMENITY_FILTERS, VENUES } from '../data/eventsData';

const HERO_SLIDES = [
  {
    title: "WELCOME TO THANET SOCIAL & NIGHTLIFE",
    tagline: "Live Music, Craft Taprooms & Coastal Happenings",
    lead: "Experience world-class concerts at Dreamland, cosy acoustic gigs in Ramsgate harbour vaults, and vibrant social meetups across the coast.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
    badge: "FEATURED HIGHLIGHT",
    highlightTown: "Margate & Ramsgate"
  },
  {
    title: "DREAMLAND STAGES & SUNSET GIGS",
    tagline: "Scenic Stage Festivals & Hall By The Sea",
    lead: "From international touring headliners and retro roller room discos to street food courts overlooking Margate sands.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
    badge: "LIVE STAGE",
    highlightTown: "Margate"
  },
  {
    title: "HARBOUR SPEAKEASIES & CRAFT DINING",
    tagline: "Cocktail Lounges, Taprooms & Woodfired Catch",
    lead: "Indulge in fresh seafood platters, natural wine cellars, and warm community dining beneath historic seaside arches.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",
    badge: "FOOD & DRINKS",
    highlightTown: "Broadstairs & Ramsgate"
  },
  {
    title: "COASTAL SWIMS & FLOODLIT 5-A-SIDE",
    tagline: "Hartsdown Sports, Tidal Pools & Outdoor Action",
    lead: "Join weekend wild swimmers at Walpole Bay tidal pool, football leagues under the lights, or scenic trail runs along Botany Bay chalk cliffs.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    badge: "ACTIVE THANET",
    highlightTown: "Cliftonville"
  }
];

export default function Hero({ 
  selectedCategory, 
  onSelectCategory, 
  selectedTimeFilter, 
  onSelectTimeFilter,
  selectedTown,
  onSelectTown,
  selectedAmenities = [],
  onToggleAmenity,
  onOpenVenue
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides smoothly every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'Users': return Users;
      case 'Compass': return Compass;
      case 'Music': return Music;
      case 'HeartHandshake': return HeartHandshake;
      default: return Sparkles;
    }
  };

  const getAmenityIcon = (iconName) => {
    switch (iconName) {
      case 'Tag': return Tag;
      case 'Sun': return Sun;
      case 'PawPrint': return Dog;
      case 'Smile': return Smile;
      default: return Sparkles;
    }
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="hero-section modern-hero">
      {/* Background Slides with Atmospheric Fade */}
      <div className="hero-slides-wrapper">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={idx}
            className={`hero-slide-bg ${idx === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-gradient-scrim"></div>
            <div className="hero-neon-bokeh"></div>
          </div>
        ))}
      </div>

      {/* Hero Carousel Navigation Chevrons */}
      <button 
        className="hero-nav-arrow arrow-left" 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        className="hero-nav-arrow arrow-right" 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Hero Container */}
      <div className="hero-content">
        
        {/* Coastal / Live badge */}
        <div className="hero-top-status-row">
          <div className="hero-status-pill">
            <span className="pill-pulse-dot"></span>
            <Sun size={14} className="pill-icon" />
            <span className="pill-text">Thanet Coastline • 18°C Mild Breezes</span>
            <span className="pill-divider">•</span>
            <Waves size={14} className="pill-icon" />
            <span className="pill-text">Low Tide 16:40 (Walpole Bay Open)</span>
          </div>

          <div className="slide-badge-pill">
            <Flame size={13} className="slide-badge-icon" />
            <span>{activeSlideData.badge}</span>
          </div>
        </div>

        {/* Large Bold Centerpiece Title inspired by reference */}
        <div className="hero-centerpiece">
          <h1 className="hero-headline-large">
            {activeSlideData.title}
          </h1>
          <p className="hero-tagline-sub">
            {activeSlideData.tagline}
          </p>
          <p className="hero-lead">
            {activeSlideData.lead}
          </p>
        </div>

        {/* Slide Indicators Dots */}
        <div className="hero-indicators-row">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Sources Citation Bar */}
        <div className="sources-callout">
          <div className="sources-callout-inner">
            <Rss size={13} className="sources-rss" />
            <span className="sources-label">LIVE AGGREGATION FROM:</span>
            <div className="sources-tags">
              <span className="source-tag meetup-tag">Meetup.com</span>
              <span className="source-tag instagram-tag">Instagram</span>
              <span className="source-tag facebook-tag">Facebook Events</span>
              <span className="source-tag eventbrite-tag">Eventbrite</span>
              <span className="source-tag community-tag">Local Submissions</span>
            </div>
          </div>
        </div>

        {/* Town Quick Switcher */}
        <div className="town-buttons-row">
          <button 
            className={`town-btn ${selectedTown === 'all' ? 'active' : ''}`}
            onClick={() => onSelectTown('all')}
          >
            All Thanet
          </button>
          <button 
            className={`town-btn ${selectedTown === 'Margate' ? 'active' : ''}`}
            onClick={() => onSelectTown('Margate')}
          >
            Margate & Cliftonville
          </button>
          <button 
            className={`town-btn ${selectedTown === 'Ramsgate' ? 'active' : ''}`}
            onClick={() => onSelectTown('Ramsgate')}
          >
            Ramsgate Harbour
          </button>
          <button 
            className={`town-btn ${selectedTown === 'Broadstairs' ? 'active' : ''}`}
            onClick={() => onSelectTown('Broadstairs')}
          >
            Broadstairs Bays
          </button>
        </div>

        {/* Primary Category Filters */}
        <div className="category-filters-container">
          <div className="category-filters-scroll">
            {CATEGORIES.map((cat) => {
              const IconComp = getCategoryIcon(cat.icon);
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <IconComp size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time filters & Amenity Vibe Pills */}
        <div className="filters-secondary-row">
          <div className="time-filter-row">
            <span className="time-label">
              <Calendar size={13} />
              When:
            </span>
            <div className="time-pills">
              {TIME_FILTERS.map((tf) => (
                <button
                  key={tf.id}
                  className={`time-pill ${selectedTimeFilter === tf.id ? 'active' : ''}`}
                  onClick={() => onSelectTimeFilter(tf.id)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Amenity / Vibe Filters */}
          <div className="amenity-filters-row">
            <span className="amenity-label">Vibes:</span>
            <div className="amenity-pills">
              {AMENITY_FILTERS.map((af) => {
                const IconComp = getAmenityIcon(af.icon);
                const isActive = selectedAmenities.includes(af.id);
                return (
                  <button
                    key={af.id}
                    className={`amenity-pill ${isActive ? 'active' : ''}`}
                    onClick={() => onToggleAmenity(af.id)}
                  >
                    <IconComp size={12} />
                    <span>{af.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Popular Venues Spotlight Strip */}
        <div className="venues-spotlight-bar">
          <span className="spotlight-label">Iconic Venues:</span>
          <div className="spotlight-chips">
            {VENUES.map(venue => (
              <button 
                key={venue.id}
                className="venue-chip-btn"
                onClick={() => onOpenVenue && onOpenVenue(venue.id)}
                title={`View ${venue.name} hub guide and gigs`}
              >
                <span>{venue.name.split(' ')[0]}</span>
                <span className="venue-chip-town">({venue.town})</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
