import React from 'react';
import { ArrowRight, Utensils, GlassWater, Music2 } from 'lucide-react';

export default function AtmospherePillarsSection({ onFilterPillar, onOpenVenue }) {
  const handlePillarClick = (categoryKey, venueId) => {
    if (venueId && onOpenVenue) {
      onOpenVenue(venueId);
    } else if (onFilterPillar) {
      onFilterPillar(categoryKey);
      const grid = document.querySelector('.directory-grid-section');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="atmosphere-section" className="atmosphere-pillars-section">
      <div className="section-header-centered reveal-on-scroll">
        <span className="section-pill-tag">THREE PILLARS OF THANET CULTURE</span>
        <h2 className="section-title-large">EXPERIENCE THE VIBE</h2>
        <p className="section-subtitle-large">
          Curated culinary havens, craft mixology, and high-energy live concerts under coastal skies.
        </p>
      </div>

      <div className="pillars-grid">
        
        {/* Pillar 1: FOOD (Warm Roasted Amber / Gold Theme) */}
        <div 
          className="pillar-card pillar-food reveal-on-scroll delay-100"
          onClick={() => handlePillarClick('activity', 'dreamland')}
        >
          <div className="pillar-image-container">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" 
              alt="Artisan grilled food and Thanet dining" 
              className="pillar-img"
            />
            <div className="pillar-overlay pillar-food-overlay"></div>
          </div>
          
          <div className="pillar-content">
            <div className="pillar-tag-badge food-badge">
              <Utensils size={14} />
              <span>CULINARY & TASTES</span>
            </div>
            <h3 className="pillar-title">FOOD</h3>
            <p className="pillar-description">
              From fresh North Sea catch on the harbour arm to Neapolitan pizzerias and artisan wing bars.
            </p>
            <button className="pillar-cta-btn food-btn">
              <span>View our food spots</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="pillar-bottom-glow food-glow"></div>
        </div>

        {/* Pillar 2: DRINK (Electric Neon Violet / Magenta Theme) */}
        <div 
          className="pillar-card pillar-drink reveal-on-scroll delay-200"
          onClick={() => handlePillarClick('meetup', 'ramsgatemusichall')}
        >
          <div className="pillar-image-container">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80" 
              alt="Handcrafted cocktail with lime wheel and neon bar atmosphere" 
              className="pillar-img"
            />
            <div className="pillar-overlay pillar-drink-overlay"></div>
          </div>
          
          <div className="pillar-content">
            <div className="pillar-tag-badge drink-badge">
              <GlassWater size={14} />
              <span>COCKTAILS & CRAFT BEERS</span>
            </div>
            <h3 className="pillar-title">DRINK</h3>
            <p className="pillar-description">
              Intimate taprooms, natural wine cellars, and speakeasies with signature coastal botanicals.
            </p>
            <button className="pillar-cta-btn drink-btn">
              <span>Explore night bars</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="pillar-bottom-glow drink-glow"></div>
        </div>

        {/* Pillar 3: EVENT (Cyber Cyan / Emerald Stage Laser Theme) */}
        <div 
          className="pillar-card pillar-event reveal-on-scroll delay-300"
          onClick={() => handlePillarClick('event', 'dreamland')}
        >
          <div className="pillar-image-container">
            <img 
              src="/margate/dreamland-neon-dusk.jpg" 
              alt="Dreamland Margate illuminated neon tower and seaside nightlife" 
              className="pillar-img"
            />
            <div className="pillar-overlay pillar-event-overlay"></div>
          </div>
          
          <div className="pillar-content">
            <div className="pillar-tag-badge event-badge">
              <Music2 size={14} />
              <span>LIVE GIGS & FESTIVALS</span>
            </div>
            <h3 className="pillar-title">EVENT</h3>
            <p className="pillar-description">
              Outdoor festival stages at Dreamland, indie basement sets, and late DJ sessions by the waves.
            </p>
            <button className="pillar-cta-btn event-btn">
              <span>View live gigs & tickets</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="pillar-bottom-glow event-glow"></div>
        </div>

      </div>
    </section>
  );
}
