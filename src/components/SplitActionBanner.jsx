import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SplitActionBanner({ onSelectCategory, onScrollToDirectory, onBecomeMember }) {
  const handleMemberClick = () => {
    if (onBecomeMember) {
      onBecomeMember();
      return;
    }
    const el = document.getElementById('about-scene-section') || document.getElementById('atmosphere-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEventsClick = () => {
    if (onSelectCategory) onSelectCategory('all');
    const el = document.getElementById('upcoming-events-showcase') || document.getElementById('carousels-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (onScrollToDirectory) onScrollToDirectory();
  };

  return (
    <section className="split-action-banner">
      <div className="split-action-container">
        {/* Left Action: Become a Member */}
        <button 
          className="split-action-half split-food split-member reveal-fade-left"
          onClick={handleMemberClick}
          aria-label="Become a member"
        >
          <div className="split-action-content">
            <span className="split-action-title">
              BECOME A MEMBER
            </span>
            <ArrowRight size={22} className="split-action-arrow" />
          </div>
          <div className="split-action-hover-glow"></div>
        </button>

        {/* Divider Line */}
        <div className="split-action-divider"></div>

        {/* Right Action: Upcoming Events */}
        <button 
          className="split-action-half split-events reveal-fade-right"
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
