import React from 'react';
import { ArrowRight, Beer, Coffee, Sparkles } from 'lucide-react';

export default function PromoCardsSection({ onOpenVenue }) {
  return (
    <section className="promo-cards-section">
      <div className="promo-cards-grid">
        
        {/* Promo Card 1: REWD Padel & Lounge Free Coffee Special */}
        <div 
          className="promo-card promo-rewd-card reveal-on-scroll delay-100"
          onClick={() => onOpenVenue && onOpenVenue('rewdpadel')}
        >
          <div className="promo-card-bg-gradient"></div>
          <div className="promo-card-left">
            <div className="promo-badge-tag rewd-tag">
              <Coffee size={14} className="promo-badge-icon" />
              <span>REWD WELLNESS LOUNGE</span>
            </div>
            <h3 className="promo-headline">
              FREE <span className="highlight-text">COFFEE</span>
            </h3>
            <p className="promo-subtext">Bring the leaflet to REWD Lounge for a free coffee of your choice. No membership required! Intro padel, Pilates & spin sessions £10.</p>
            <button className="promo-action-btn rewd-btn">
              <span>EXPLORE REWD PADEL</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="promo-card-right">
            <div className="promo-img-wrapper rewd-glow-frame">
              <img 
                src="/events/rewd-indoor-padel.jpg" 
                alt="REWD Padel Lounge and indoor courts Thanet" 
                className="promo-photo"
              />
            </div>
          </div>
        </div>

        {/* Promo Card 2: Beyond 30 Over 30s Day Party at Lido */}
        <div 
          className="promo-card promo-beyond-card reveal-on-scroll delay-200"
          onClick={() => onOpenVenue && onOpenVenue('drillshed')}
        >
          <div className="promo-card-bg-gradient"></div>
          <div className="promo-card-left">
            <div className="promo-badge-tag beyond-tag">
              <Sparkles size={14} className="promo-badge-icon" />
              <span>DAYTIME CLUBBING • MARGATE LIDO</span>
            </div>
            <h3 className="promo-headline">
              BEYOND <span className="highlight-pink">30</span>
            </h3>
            <p className="promo-subtext">80s & 90s daytime clubbing at The Drill Shed Lido Complex. 4 PM – 9 PM: No late nights, no hangxiety!</p>
            <button className="promo-action-btn beyond-btn">
              <span>EXPLORE DRILL SHED</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="promo-card-right">
            <div className="promo-img-wrapper beyond-glow-frame">
              <img 
                src="/events/beyond30-day-party.jpg" 
                alt="Beyond 30 Over 30s Day Party at Margate Lido" 
                className="promo-photo"
              />
            </div>
          </div>
        </div>

        {/* Promo Card 3: Happy Hour Pint & Drinks */}
        <div 
          className="promo-card promo-drink-card reveal-on-scroll delay-300"
          onClick={() => onOpenVenue && onOpenVenue('ramsgatemusichall')}
        >
          <div className="promo-card-bg-gradient"></div>
          <div className="promo-card-left">
            <div className="promo-badge-tag drink-tag">
              <Beer size={14} className="promo-badge-icon" />
              <span>SUNSET SESSIONS</span>
            </div>
            <h3 className="promo-headline">
              HAPPY HOUR
            </h3>
            <div className="promo-timing">
              <span className="promo-days">MON – FRIDAY</span>
              <span className="promo-hours">5 – 8 PM</span>
            </div>
            <p className="promo-subtext">2-for-1 local Kentish craft beers, spritzes & tidal gin cocktails on the harbour.</p>
            <button className="promo-action-btn drink-btn">
              <span>VIEW BAR LISTINGS</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="promo-card-right drink-img-side">
            <div className="promo-img-wrapper drink-glow-frame">
              <img 
                src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=700&q=80" 
                alt="Cold Craft Beer Pint Happy Hour" 
                className="promo-photo beer-photo"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
