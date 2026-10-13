import React from 'react';
import { MapPin, Clock, Calendar, Users, Heart, Plus, Check } from 'lucide-react';
import { getEventVenueId } from '../data/eventsData';

export default function EventCard({ 
  event, 
  onSelect, 
  isSaved, 
  onToggleSave, 
  isInItinerary, 
  onToggleItinerary, 
  onOpenVenue,
  cardTheme = 'default'
}) {
  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'dreamland':
        return { bg: 'rgba(255, 94, 20, 0.15)', text: '#ff5e14', border: 'rgba(255, 94, 20, 0.4)' };
      case 'meetup':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.4)' };
      case 'instagram':
        return { bg: 'rgba(217, 70, 239, 0.15)', text: '#e879f9', border: 'rgba(217, 70, 239, 0.4)' };
      case 'facebook':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.4)' };
      case 'eventbrite':
        return { bg: 'rgba(249, 115, 22, 0.15)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.4)' };
      default:
        return { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.4)' };
    }
  };

  const getCategoryThemeClass = (category) => {
    switch (category) {
      case 'activity': return 'cat-sports';
      case 'meetup': return 'cat-social';
      case 'event': return 'cat-event';
      case 'volunteer': return 'cat-community';
      default: return 'cat-orange';
    }
  };

  const badgeStyle = getSourceBadgeColor(event.source);
  const venueId = getEventVenueId(event);
  const themeClass = cardTheme !== 'default' ? `card-theme-${cardTheme}` : getCategoryThemeClass(event.category);

  return (
    <div 
      className={`event-card ${themeClass}`}
      onClick={() => onSelect(event)}
    >
      <div className="card-media">
        <img 
          src={event.image} 
          alt={event.title}
          loading="lazy"
          className="card-img"
        />
        <div className="card-overlay-gradient"></div>
        
        {/* Source badge */}
        <div 
          className="source-badge"
          style={{ 
            backgroundColor: badgeStyle.bg, 
            color: badgeStyle.text,
            borderColor: badgeStyle.border 
          }}
          title={`Aggregated from ${event.sourceName}`}
        >
          <span className="source-dot" style={{ backgroundColor: badgeStyle.text }}></span>
          {event.sourceName}
        </div>

        {/* Town pill */}
        <div className="town-badge">
          <MapPin size={12} />
          {event.town}
        </div>

        {/* Action icons group: Save & Itinerary */}
        <div className="card-actions-top">
          {onToggleItinerary && (
            <button 
              className={`itinerary-card-btn ${isInItinerary ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleItinerary(event.id);
              }}
              title={isInItinerary ? "In Weekend Schedule" : "Add to Weekend Schedule"}
              aria-label="Toggle weekend plan"
            >
              {isInItinerary ? <Check size={14} /> : <Plus size={14} />}
              <span className="itinerary-card-btn-text">{isInItinerary ? "Weekend" : "Plan"}</span>
            </button>
          )}

          {/* Save button */}
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(event.id);
            }}
            aria-label={isSaved ? "Remove from bookmarks" : "Save event"}
            title={isSaved ? "Saved to your list" : "Save event"}
          >
            <Heart size={16} fill={isSaved ? "#ff5e14" : "none"} color={isSaved ? "#ff5e14" : "#ffffff"} />
          </button>
        </div>

        {/* Category banner */}
        <div className="category-pill">
          {event.categoryLabel}
        </div>
      </div>

      <div className="card-body">
        <div className="card-date-row">
          <span className="date-highlight">
            <Calendar size={13} />
            {event.dateDisplay}
          </span>
          <span className="time-highlight">
            <Clock size={13} />
            {event.time.split(' - ')[0]}
          </span>
        </div>

        <h3 className="card-title" title={event.title}>
          {event.title}
        </h3>

        <p className="card-venue">
          <MapPin size={13} className="venue-pin" />
          {venueId && onOpenVenue ? (
            <button 
              className="card-venue-link"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVenue(venueId);
              }}
              title={`View ${event.venue} spotlight`}
            >
              {event.venue}
            </button>
          ) : (
            <span>{event.venue}</span>
          )}
        </p>

        <p className="card-desc">
          {event.description}
        </p>

        <div className="card-tags">
          {event.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-chip">
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <div className="attendee-info">
            <Users size={14} />
            <span>{event.attendees} attending</span>
            {event.spotsLeft && (
              <span className="spots-left">• {event.spotsLeft} spots left</span>
            )}
          </div>
          
          <div className="price-tag">
            {event.price}
          </div>
        </div>
      </div>
    </div>
  );
}
