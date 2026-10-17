import React, { useState, useEffect } from 'react';
import { ArrowUp, Calendar, Bookmark } from 'lucide-react';
import './BackToTopDock.css';

export default function BackToTopDock({
  itineraryCount = 0,
  onOpenPlanner,
  savedCount = 0,
  onOpenSaved
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="back-to-top-dock" role="region" aria-label="Quick page navigation">
      
      {/* Optional Quick Weekend Planner Shortcut if user has items */}
      {itineraryCount > 0 && (
        <button
          className="dock-pill-btn dock-planner-btn"
          onClick={onOpenPlanner}
          title={`Open your weekend plan (${itineraryCount} events)`}
          aria-label={`Open weekend plan with ${itineraryCount} items`}
        >
          <Calendar size={14} className="dock-icon" />
          <span className="dock-pill-label">Plan</span>
          <span className="dock-pill-badge">{itineraryCount}</span>
        </button>
      )}

      {/* Optional Quick Saved Bookmarks Shortcut if user has saved items */}
      {savedCount > 0 && (
        <button
          className="dock-pill-btn dock-saved-btn"
          onClick={onOpenSaved}
          title={`View bookmarked events (${savedCount} saved)`}
          aria-label={`View ${savedCount} saved events`}
        >
          <Bookmark size={14} className="dock-icon" />
          <span className="dock-pill-label">Saved</span>
          <span className="dock-pill-badge">{savedCount}</span>
        </button>
      )}

      {/* Main Scroll to Top Button */}
      <button
        className="dock-scroll-top-btn"
        onClick={scrollToTop}
        title="Return to top of page"
        aria-label="Scroll back to top"
      >
        <ArrowUp size={18} className="dock-arrow-icon" />
        <span className="dock-top-text">TOP</span>
      </button>

    </div>
  );
}
