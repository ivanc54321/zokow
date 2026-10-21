import React from 'react';
import { Wine, ArrowUpRight } from 'lucide-react';

export default function AboutSection({ onOpenVenue, onOpenAbout }) {
  return (
    <section className="about-scene-section">
      <div className="about-scene-container">
        
        {/* Left Column: Editorial Text */}
        <div className="about-text-column reveal-fade-left">
          <div className="about-eyebrow">
            <span className="about-badge-dot"></span>
            <span>ABOUT THE SCENE</span>
          </div>
          <h2 className="about-heading">
            WELCOME TO THANET'S NIGHTLIFE & SOCIAL HEARTBEAT
          </h2>
          
          <div className="about-body">
            <p>
              Thanet's coast is experiencing an unprecedented cultural renaissance. From the electric late-night energy of 
              Margate’s Old Town to Ramsgate’s historic royal harbour arches and Broadstairs’ cosy Victorian pubs, 
              VERGE is your curated insider passport to every gathering that matters.
            </p>
            <p>
              Whether you’re after world-class touring artists headlining at <strong>Dreamland’s Hall By The Sea</strong>, 
              sweaty intimate basement gigs at <strong>Ramsgate Music Hall</strong>, 5-a-side floodlit football leagues at 
              <strong>Hartsdown Park</strong>, or sunrise dips in Walpole Bay’s 4-acre tidal pool — our verified community 
              feed pulls live listings straight from Instagram flyers, Meetups, and local organisers every hour.
            </p>
          </div>

          <div className="about-stats-row">
            <div className="about-stat-item stat-teal">
              <span className="stat-number">40+</span>
              <span className="stat-label">Active Venues</span>
            </div>
            <div className="about-stat-item stat-violet">
              <span className="stat-number">120+</span>
              <span className="stat-label">Monthly Gigs & Meetups</span>
            </div>
            <div className="about-stat-item stat-gold">
              <span className="stat-number">3</span>
              <span className="stat-label">Iconic Coastal Towns</span>
            </div>
          </div>

          <div className="about-cta-row">
            <button 
              className="about-hub-btn"
              onClick={() => onOpenVenue && onOpenVenue('dreamland')}
            >
              <span>Explore Dreamland Margate Hub</span>
              <ArrowUpRight size={18} />
            </button>
            {onOpenAbout && (
              <button 
                className="about-hub-btn about-manifesto-btn"
                onClick={onOpenAbout}
                style={{ background: '#f1513a' }}
              >
                <span>Read Full Story & Slider UI</span>
                <ArrowUpRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Framed Coastal Photo with Iconic Orange Border */}
        <div className="about-image-column reveal-fade-right delay-150">
          <div className="about-orange-frame">
            <div className="about-img-inner">
              <img 
                src="/margate/margate-main-sands-turner.jpg" 
                alt="Margate Main Sands and Turner Contemporary seafront" 
                className="about-bar-img"
              />
              <div className="about-img-badge">
                <Wine size={16} className="badge-icon-accent" />
                <span>MARGATE MAIN SANDS & CULTURE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
