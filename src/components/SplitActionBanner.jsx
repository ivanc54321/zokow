import React from 'react';
import { ArrowRight, Utensils, CalendarDays, Sparkles } from 'lucide-react';

export default function SplitActionBanner({ onSelectCategory, onScrollToDirectory }) {
  const handleFoodClick = () => {
    if (onSelectCategory) onSelectCategory('activity'); // Or scroll to food/dining
    const el = document.getElementById('atmosphere-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEventsClick = () => {
    if (onSelectCategory) onSelectCategory('all');
    const el = document.getElementById('carousels-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (onScrollToDirectory) onScrollToDirectory();
  };

  return (
    <section className="split-action-banner reveal-on-scroll">
      <div className="split-action-container">
        {/* Left Action: Food & Drinks */}
        <button 
          className="split-action-half split-food"
          onClick={handleFoodClick}
          aria-label="Explore Food and Drinks"
        >
          <div className="split-action-content">
            <span className="split-action-title">
              OUR FOOD & DRINKS
            </span>
            <ArrowRight size={22} className="split-action-arrow" />
          </div>
          <div className="split-action-hover-glow"></div>
        </button>

        {/* Divider Line */}
        <div className="split-action-divider"></div>

        {/* Right Action: Upcoming Events */}
        <button 
          className="split-action-half split-events"
          onClick={handleEventsClick}
          aria-label="Explore Upcoming Events and Gigs"
        >
          <div className="split-action-content">
            <span className="split-action-title">
              UPCOMING EVENTS
            </span>
            <ArrowRight size={22} className="split-action-arrow" />
          </div>
          <div className="split-action-hover-glow"></div>
        </button>
      </div>
    </section>
  );
}
