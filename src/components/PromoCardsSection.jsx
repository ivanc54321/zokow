import React from 'react';
import { ArrowRight, Beer, Flame } from 'lucide-react';

export default function PromoCardsSection({ onOpenVenue }) {
  return (
    <section className="promo-cards-section reveal-on-scroll">
      <div className="promo-cards-grid">
        
        {/* Promo Card 1: Gourmet Food Special */}
        <div 
          className="promo-card promo-food-card"
          onClick={() => onOpenVenue && onOpenVenue('dreamland')}
        >
          <div className="promo-card-bg-gradient"></div>
          <div className="promo-card-left">
            <div className="promo-badge-tag">
              <Flame size={14} className="promo-badge-icon" />
              <span>COASTAL HARVEST SPECIAL</span>
            </div>
            <h3 className="promo-headline">
              SAVE <span className="highlight-text">15%</span>
            </h3>
            <p className="promo-subtext">On local artisan seafood, woodfired pizzas & street food courts across Thanet.</p>
            <button className="promo-action-btn">
              <span>EXPLORE MENUS</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="promo-card-right">
            <div className="promo-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80" 
                alt="Thanet Artisan Pasta & Dining" 
                className="promo-photo"
              />
            </div>
          </div>
        </div>

        {/* Promo Card 2: Happy Hour Pint & Drinks */}
        <div 
          className="promo-card promo-drink-card"
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
