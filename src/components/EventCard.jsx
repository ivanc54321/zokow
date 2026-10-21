import React from 'react';
import { MapPin, Clock, Calendar, Users, Heart, Plus, Check, ArrowRight, Ticket } from 'lucide-react';
import { getEventVenueId } from '../data/eventsData';

const parseTicketDate = (dateStr, displayStr) => {
  if (dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return { 
        month: months[monthIdx] || 'OCT', 
        day: isNaN(day) ? '15' : String(day).padStart(2, '0') 
      };
    }
  }
  if (displayStr) {
    const match = displayStr.match(/([A-Za-z]{3})\s+(\d+)/);
    if (match) {
      return { month: match[1].toUpperCase(), day: match[2].padStart(2, '0') };
    }
  }
  return { month: 'OCT', day: '15' };
};

export default function EventCard({ 
  event, 
  onSelect, 
  isSaved, 
  onToggleSave, 
  isInItinerary, 
  onToggleItinerary, 
  onOpenVenue,
  cardTheme = 'default',
  className = ''
}) {
  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'dreamland':
        return { bg: 'rgba(255, 94, 20, 0.18)', text: '#ff7533', border: 'rgba(255, 94, 20, 0.45)' };
      case 'meetup':
        return { bg: 'rgba(239, 68, 68, 0.18)', text: '#f87171', border: 'rgba(239, 68, 68, 0.45)' };
      case 'instagram':
        return { bg: 'rgba(217, 70, 239, 0.18)', text: '#e879f9', border: 'rgba(217, 70, 239, 0.45)' };
      case 'facebook':
        return { bg: 'rgba(59, 130, 246, 0.18)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.45)' };
      case 'eventbrite':
        return { bg: 'rgba(249, 115, 22, 0.18)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.45)' };
      default:
        return { bg: 'rgba(20, 184, 166, 0.18)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.45)' };
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
  const ticketDate = parseTicketDate(event.date, event.dateDisplay);

  return (
    <div 
      className={`event-card ${themeClass} ${className}`.trim()}
      onClick={() => onSelect(event)}
    >
      {/* 1. Clean Photo Section — Unobstructed, pristine photography */}
      <div className="card-media">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"} 
          alt={event.title}
          loading="lazy"
          className="card-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="card-media-vignette" />

        {/* Minimalist Top Anchors: Date Badge (Left) & Heart Button (Right) */}
        <div className="ticket-date-badge">
          <span className="ticket-month">{ticketDate.month}</span>
          <span className="ticket-day">{ticketDate.day}</span>
        </div>

        <button 
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(event.id);
          }}
          aria-label={isSaved ? "Remove from bookmarks" : "Save event"}
          title={isSaved ? "Saved to your list" : "Save event"}
        >
          <Heart size={15} fill={isSaved ? "#ff5e14" : "none"} color={isSaved ? "#ff5e14" : "#ffffff"} />
        </button>
      </div>

      {/* 2. Structured Bottom Content: Resting title + Hover reveal details */}
      <div className="card-body">
        {/* Title is always visible at the top of the body (Resting State) */}
        <div className="card-title-wrap">
          <h3 className="card-title" title={event.title}>
            {event.title}
          </h3>
        </div>

        {/* More Info on Hover */}
        <div className="card-hover-details">
          {/* Badges & Labels Row: Category, Town, Price, Source */}
          <div className="card-bottom-labels-row">
            <span className="category-pill">
              {event.categoryLabel}
            </span>
            <span className="town-badge">
              <MapPin size={11} />
              <span>{event.town}</span>
            </span>
            <span className={`card-price-pill ${event.isFree ? 'is-free' : ''}`}>
              <Ticket size={11} className="price-ticket-icon" />
              <span>{event.price}</span>
            </span>
            <span 
              className="source-badge"
              style={{ 
                backgroundColor: badgeStyle.bg, 
                color: badgeStyle.text,
                borderColor: badgeStyle.border 
              }}
              title={`Aggregated from ${event.sourceName}`}
            >
              <span className="source-dot" style={{ backgroundColor: badgeStyle.text }} />
              {event.sourceName}
            </span>
          </div>

          {/* Venue & Time Row */}
          <div className="card-venue-row">
            <div className="card-venue">
              <MapPin size={12} className="venue-pin" />
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
            </div>
            <span className="card-dot-sep">•</span>
            <div className="time-highlight">
              <Clock size={11} />
              <span>{event.time.split(' - ')[0]}</span>
            </div>
          </div>

          {/* Short Description */}
          {event.description && (
            <p className="card-desc">
              {event.description}
            </p>
          )}

          {/* Tags Row at Bottom */}
          {event.tags && event.tags.length > 0 && (
            <div className="card-tags">
              {event.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Card Footer: Attendees count & Schedule button / Details CTA */}
          <div className="card-footer">
            <div className="attendee-info">
              <Users size={12} />
              <span>{event.attendees} going</span>
              {event.spotsLeft && (
                <span className="spots-left">• {event.spotsLeft} left</span>
              )}
            </div>
            
            <div className="card-footer-actions">
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
                  {isInItinerary ? <Check size={12} /> : <Plus size={12} />}
                  <span className="itinerary-card-btn-text">{isInItinerary ? "Saved" : "Plan"}</span>
                </button>
              )}

              <div className="card-action-cta">
                <span>Details</span>
                <ArrowRight size={13} className="cta-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
