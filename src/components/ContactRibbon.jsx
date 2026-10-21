import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

export default function ContactRibbon({ onOpenMap }) {
  return (
    <section className="contact-orange-ribbon reveal-scale">
      <div className="contact-ribbon-container">
        
        {/* Column 1: Location & Directions */}
        <div className="ribbon-column">
          <div className="ribbon-icon-wrapper">
            <MapPin size={22} className="ribbon-icon" />
          </div>
          <div className="ribbon-details">
            <span className="ribbon-label">THANET COASTLINE HUB</span>
            <p className="ribbon-text">Marine Terrace & Harbour Arms</p>
            <p className="ribbon-subtext">Margate, Ramsgate & Broadstairs, Kent CT9</p>
            <button 
              className="ribbon-link-btn"
              onClick={onOpenMap}
            >
              <Navigation size={14} />
              <span>Explore Interactive Map</span>
            </button>
          </div>
        </div>

        <div className="ribbon-vertical-divider"></div>

        {/* Column 2: Hours & Social Times */}
        <div className="ribbon-column">
          <div className="ribbon-icon-wrapper">
            <Clock size={22} className="ribbon-icon" />
          </div>
          <div className="ribbon-details">
            <span className="ribbon-label">COMMUNITY & VENUE HOURS</span>
            <p className="ribbon-text"><strong>Mon – Thu:</strong> 10:00 AM – 11:00 PM</p>
            <p className="ribbon-text"><strong>Fri & Sat:</strong> 10:00 AM – 02:00 AM (Late Gigs)</p>
            <p className="ribbon-subtext"><strong>Sunday:</strong> 10:00 AM – 10:30 PM (Sunset Sessions)</p>
          </div>
        </div>

        <div className="ribbon-vertical-divider"></div>

        {/* Column 3: Direct Contact & Directory Submissions */}
        <div className="ribbon-column">
          <div className="ribbon-icon-wrapper">
            <Phone size={22} className="ribbon-icon" />
          </div>
          <div className="ribbon-details">
            <span className="ribbon-label">GET IN TOUCH & SUBMIT EVENTS</span>
            <p className="ribbon-text">
              <a href="tel:01843292700" className="ribbon-contact-link">01843 292700</a>
            </p>
            <p className="ribbon-subtext">
              <Mail size={13} className="inline-icon" />
              <a href="mailto:events@verge.thanet.uk" className="ribbon-contact-link">events@verge.thanet.uk</a>
            </p>
            <span className="ribbon-highlight-pill">Free Event Submissions Open</span>
          </div>
        </div>

      </div>
    </section>
  );
}
