import React from 'react';
import { 
  X, 
  MapPin, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import { VENUES } from '../data/eventsData';

export default function VenueModal({ venueId, onClose, events, onSelectEvent }) {
  if (!venueId) return null;

  const venue = VENUES.find(v => v.id === venueId);
  if (!venue) return null;

  // Filter events matching this venue
  const venueEvents = events.filter(e => {
    const text = (e.venue + ' ' + e.title).toLowerCase();
    if (venue.id === 'drillshed') return text.includes('drill shed') || text.includes('lido') || text.includes('beyond 30');
    if (venue.id === 'faithinstrangers') return text.includes('faith in strangers');
    if (venue.id === 'rewdpadel') return text.includes('rewd') || text.includes('padel') || text.includes('cargo way');
    if (venue.id === 'ramsgatetownshed') return text.includes('town shed');
    if (venue.id === 'sunkengarden') return text.includes('sunken garden');
    if (venue.id === 'boardathome') return text.includes('board at home');
    if (venue.id === 'thanetbowls') return text.includes('indoor bowls');
    if (venue.id === 'tcdtcentre') return text.includes('tcdt') || text.includes('hereson');
    if (venue.id === 'dreamland') return text.includes('dreamland') || text.includes('hall by the sea') || text.includes('scenic stage');
    if (venue.id === 'hartsdown') return text.includes('hartsdown');
    if (venue.id === 'walpole') return text.includes('walpole');
    if (venue.id === 'turner') return text.includes('turner');
    if (venue.id === 'ramsgatemusichall') return text.includes('ramsgate music hall');
    return false;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog venue-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Venue Hero Cover */}
        <div className="venue-modal-hero">
          <img src={venue.image} alt={venue.name} className="venue-hero-img" />
          <div className="venue-hero-overlay"></div>
          
          <div className="venue-hero-meta">
            <span className="venue-town-badge">{venue.town}</span>
            <h2 className="venue-hero-title">{venue.name}</h2>
            <p className="venue-hero-tagline">{venue.tagline}</p>
          </div>
        </div>

        {/* Venue Content Body */}
        <div className="venue-modal-body">
          <div className="venue-info-bar">
            <div className="venue-address-item">
              <MapPin size={16} className="venue-bar-icon" />
              <div>
                <span className="info-bar-label">Location</span>
                <strong className="info-bar-val">{venue.address}</strong>
              </div>
            </div>

            <div className="venue-links-item">
              <a 
                href={venue.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="venue-ext-link"
              >
                <Globe size={14} />
                <span>Visit Official Site</span>
                <ExternalLink size={12} />
              </a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="venue-map-link"
              >
                <MapPin size={14} />
                <span>Directions</span>
              </a>
            </div>
          </div>

          <div className="venue-desc-section">
            <h4 className="venue-section-heading">About {venue.name}</h4>
            <p className="venue-desc-text">{venue.description}</p>
          </div>

          {venue.facilities && (
            <div className="venue-facilities-section">
              <h4 className="venue-section-heading">Venue Features & Amenities</h4>
              <div className="facilities-chips">
                {venue.facilities.map((fac, idx) => (
                  <span key={idx} className="facility-chip">
                    <ShieldCheck size={13} />
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events at this Venue */}
          <div className="venue-events-section">
            <div className="venue-events-header">
              <h4 className="venue-section-heading">
                Upcoming Happenings at {venue.name}
              </h4>
              <span className="venue-event-count">
                {venueEvents.length} {venueEvents.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            {venueEvents.length === 0 ? (
              <p className="no-venue-events">No upcoming events currently scheduled for this venue.</p>
            ) : (
              <div className="venue-events-list">
                {venueEvents.map(evt => (
                  <div 
                    key={evt.id} 
                    className="venue-event-card"
                    onClick={() => {
                      onClose();
                      onSelectEvent(evt);
                    }}
                  >
                    <img src={evt.image} alt={evt.title} className="venue-event-thumb" />
                    <div className="venue-event-info">
                      <div className="venue-event-date">
                        <Calendar size={12} />
                        {evt.dateDisplay} • {evt.time.split(' - ')[0]}
                      </div>
                      <h5 className="venue-event-title">{evt.title}</h5>
                      <span className="venue-event-cat">{evt.categoryLabel}</span>
                    </div>
                    <div className="venue-event-right">
                      <span className="venue-event-price">{evt.price}</span>
                      <span className="venue-event-cta">Details &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
