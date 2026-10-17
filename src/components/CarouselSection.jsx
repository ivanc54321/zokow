import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard';

export default function CarouselSection({ 
  title, 
  subtitle, 
  icon: Icon, 
  events, 
  onSelectEvent, 
  savedEventIds, 
  onToggleSave, 
  badgeText,
  itineraryIds = [],
  onToggleItinerary,
  onOpenVenue,
  theme = 'orange' // 'orange' | 'sports' | 'community' | 'social' | 'food'
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [events]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth'
    });
    setTimeout(checkScroll, 350);
  };

  if (!events || events.length === 0) return null;

  return (
    <section className={`carousel-section section-theme-${theme} reveal-on-scroll`}>
      <div className="carousel-header">
        <div className="carousel-titles">
          <div className="section-title-wrap">
            {Icon && <Icon className={`section-icon icon-${theme}`} size={22} />}
            <h2 className="section-title">{title}</h2>
            {badgeText && <span className={`section-badge badge-${theme}`}>{badgeText}</span>}
            <span className="carousel-count-pill">{events.length} listings</span>
          </div>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="carousel-controls">
          <button 
            className={`carousel-arrow arrow-btn-${theme}`} 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            title="Previous events"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className={`carousel-arrow arrow-btn-${theme}`} 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            title="Next events"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        className="carousel-track" 
        ref={scrollRef}
        onScroll={checkScroll}
      >
        {events.map((event) => (
          <div key={event.id} className="carousel-item">
            <EventCard 
              event={event} 
              onSelect={onSelectEvent}
              isSaved={savedEventIds.includes(event.id)}
              onToggleSave={onToggleSave}
              isInItinerary={itineraryIds.includes(event.id)}
              onToggleItinerary={onToggleItinerary}
              onOpenVenue={onOpenVenue}
              cardTheme={theme}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
