import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  ExternalLink, 
  Share2, 
  Download, 
  Check, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';

export default function EventModal({ 
  event, 
  onClose, 
  isSaved, 
  onToggleSave 
}) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadICS = () => {
    // Generate basic iCalendar file for the event
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Verge//Local Social Directory//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}, ${event.town}, Kent, UK`,
      `DTSTART:${event.date.replace(/-/g, '')}T090000Z`,
      `DTEND:${event.date.replace(/-/g, '')}T110000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-${event.town.toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Hero image in modal */}
        <div className="modal-media">
          <img src={event.image} alt={event.title} className="modal-img" />
          <div className="modal-media-overlay"></div>
          
          <div className="modal-top-badges">
            <span className="modal-town-badge">
              <MapPin size={13} />
              {event.town}
            </span>
            <span className="modal-category-badge">
              {event.categoryLabel}
            </span>
          </div>

          <div className="modal-source-pill">
            <span>Aggregated via {event.sourceName}</span>
          </div>
        </div>

        {/* Modal content body */}
        <div className="modal-content">
          <div className="modal-meta-bar">
            <div className="modal-meta-item">
              <Calendar size={16} className="modal-meta-icon" />
              <div>
                <span className="meta-label">Date</span>
                <span className="meta-value">{event.dateDisplay}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <Clock size={16} className="modal-meta-icon" />
              <div>
                <span className="meta-label">Time</span>
                <span className="meta-value">{event.time}</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <Users size={16} className="modal-meta-icon" />
              <div>
                <span className="meta-label">Attendance</span>
                <span className="meta-value">{event.attendees} RSVP'd</span>
              </div>
            </div>

            <div className="modal-meta-item">
              <Tag size={16} className="modal-meta-icon" />
              <div>
                <span className="meta-label">Admission</span>
                <span className="meta-value price-val">{event.price}</span>
              </div>
            </div>
          </div>

          <h2 className="modal-title">{event.title}</h2>

          <div className="modal-venue-box">
            <MapPin size={18} className="venue-map-icon" />
            <div className="venue-details">
              <strong>{event.venue}</strong>
              <span>{event.town}, Thanet, Kent</span>
            </div>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ' ' + event.town + ' Kent')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link-btn"
            >
              Open in Maps
            </a>
          </div>

          <div className="modal-description-wrap">
            <h3 className="section-subheading">About this Event</h3>
            <p className="modal-description-text">{event.description}</p>
          </div>

          <div className="modal-organizer-box">
            <ShieldCheck size={18} className="organizer-icon" />
            <div>
              <span className="organizer-label">Hosted by</span>
              <strong className="organizer-name">{event.organizer}</strong>
            </div>
          </div>

          <div className="modal-tags-list">
            {event.tags.map((tag, idx) => (
              <span key={idx} className="modal-tag">#{tag}</span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="modal-footer-actions">
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn-primary"
            >
              <span>View Original on {event.sourceName}</span>
              <ExternalLink size={16} />
            </a>

            <button 
              className={`action-btn-secondary ${isSaved ? 'active' : ''}`}
              onClick={() => onToggleSave(event.id)}
            >
              <Heart size={16} fill={isSaved ? "#ef4444" : "none"} color={isSaved ? "#ef4444" : "currentColor"} />
              <span>{isSaved ? "Saved to List" : "Save Event"}</span>
            </button>

            <button 
              className="action-btn-secondary"
              onClick={downloadICS}
              title="Download iCal calendar event"
            >
              <Download size={16} />
              <span>Add to Cal</span>
            </button>

            <button 
              className="action-btn-secondary"
              onClick={handleShare}
              title="Copy share link"
            >
              {copied ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
