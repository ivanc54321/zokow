import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  PlusCircle, 
  RefreshCw, 
  Calendar, 
  Map, 
  Grid,
  Menu,
  X
} from 'lucide-react';
import { TOWNS } from '../data/eventsData';

export default function Navbar({ 
  selectedTown, 
  onSelectTown, 
  searchQuery, 
  onSearchChange,
  savedCount,
  onOpenSaved,
  onOpenSubmit,
  onOpenScrapers,
  isSyncing,
  viewMode,
  onToggleViewMode,
  itineraryCount,
  onOpenPlanner
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navbar-floating-wrapper">
      <header className={`navbar-floating-capsule ${scrolled ? 'is-scrolled' : ''}`}>
        
        {/* Left: Brand Logo & Live Pulse */}
        <div className="nav-brand-section" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-capsule">
            <span className="brand-title">ZOKAL</span>
            <span className="brand-dot"></span>
          </div>
          <div className="nav-live-pill" title="Live Thanet Feed">
            <span className="live-pulse-dot"></span>
            <span className="live-pulse-text">LIVE</span>
          </div>
        </div>

        {/* Center: Clean Spaced Navigation Links (like the reference picture) */}
        <nav className="nav-center-menu" aria-label="Main Navigation">
          <button 
            className="nav-center-link" 
            onClick={() => scrollToSection('atmosphere-section')}
          >
            Vibes
          </button>
          <button 
            className="nav-center-link" 
            onClick={() => scrollToSection('carousels-section')}
          >
            Happenings
          </button>
          <button 
            className="nav-center-link" 
            onClick={() => scrollToSection('about-scene-section')}
          >
            About
          </button>
          <button 
            className={`nav-center-link ${viewMode === 'map' ? 'is-active-tab' : ''}`}
            onClick={() => {
              if (viewMode !== 'map') onToggleViewMode('map');
              setTimeout(() => scrollToSection('map-section-anchor'), 100);
            }}
          >
            <Map size={13} className="nav-inline-icon" />
            Coast Map
          </button>
        </nav>

        {/* Right: Actions, Utilities & Signature Pill CTA Button (like "Launch App") */}
        <div className="nav-right-actions">
          
          {/* Town Quick Selector Glass Pill */}
          <div className="nav-town-pill">
            <MapPin size={13} className="town-pill-icon" />
            <select 
              value={selectedTown} 
              onChange={(e) => onSelectTown(e.target.value)}
              className="town-pill-select"
              aria-label="Select town"
            >
              {TOWNS.map(town => (
                <option key={town.id} value={town.id}>
                  {town.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Trigger / Input Pill */}
          <div className={`nav-search-capsule ${searchOpen || searchQuery ? 'expanded' : ''}`}>
            <Search 
              size={14} 
              className="search-capsule-icon" 
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => !searchQuery && setSearchOpen(false)}
              className="search-capsule-input"
            />
            {searchQuery && (
              <button 
                className="search-capsule-clear"
                onClick={() => onSearchChange('')}
              >
                ×
              </button>
            )}
          </div>

          {/* Weekend Planner Pill */}
          <button 
            className="nav-icon-pill"
            onClick={onOpenPlanner}
            title="Open Weekend Planner Itinerary"
            aria-label="Weekend Planner"
          >
            <Calendar size={14} />
            {itineraryCount > 0 && (
              <span className="nav-pill-badge badge-orange">{itineraryCount}</span>
            )}
          </button>

          {/* Saved Bookmarks Pill */}
          <button 
            className="nav-icon-pill"
            onClick={onOpenSaved}
            title="Saved Bookmarks"
            aria-label="Saved events"
          >
            <Heart 
              size={14} 
              fill={savedCount > 0 ? "#ff5e14" : "none"} 
              color={savedCount > 0 ? "#ff5e14" : "currentColor"} 
            />
            {savedCount > 0 && (
              <span className="nav-pill-badge">{savedCount}</span>
            )}
          </button>

          {/* Feed Scraper Sync Pill */}
          <button 
            className={`nav-icon-pill feed-sync-pill ${isSyncing ? 'is-syncing' : ''}`}
            onClick={onOpenScrapers}
            title="Live aggregation sources"
            aria-label="Feed sources"
          >
            <RefreshCw size={13} className={isSyncing ? 'spin-icon' : ''} />
          </button>

          {/* Signature Rounded Pill CTA Button (like "Launch App" in the reference) */}
          <button 
            className="nav-cta-pill-btn"
            onClick={onOpenSubmit}
          >
            <PlusCircle size={15} />
            <span>Post Event</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </header>

      {/* Mobile Drawer / Glass Dropdown */}
      {mobileMenuOpen && (
        <div className="nav-mobile-glass-dropdown">
          <button className="mobile-nav-item" onClick={() => scrollToSection('atmosphere-section')}>
            Vibes & Atmosphere
          </button>
          <button className="mobile-nav-item" onClick={() => scrollToSection('carousels-section')}>
            Upcoming Happenings
          </button>
          <button className="mobile-nav-item" onClick={() => scrollToSection('about-scene-section')}>
            About the Scene
          </button>
          <button 
            className="mobile-nav-item"
            onClick={() => {
              if (viewMode !== 'map') onToggleViewMode('map');
              setTimeout(() => scrollToSection('map-section-anchor'), 100);
            }}
          >
            Interactive Coast Map
          </button>
          
          <div className="mobile-nav-divider"></div>
          
          <div className="mobile-nav-controls">
            <button className="mobile-control-btn" onClick={() => { setMobileMenuOpen(false); onOpenPlanner(); }}>
              <Calendar size={15} />
              <span>Weekend Schedule ({itineraryCount})</span>
            </button>
            <button className="mobile-control-btn" onClick={() => { setMobileMenuOpen(false); onOpenSaved(); }}>
              <Heart size={15} color="#ff5e14" fill={savedCount > 0 ? "#ff5e14" : "none"} />
              <span>Bookmarks ({savedCount})</span>
            </button>
            <button className="mobile-control-btn" onClick={() => { setMobileMenuOpen(false); onOpenScrapers(); }}>
              <RefreshCw size={15} />
              <span>Data Feeds</span>
            </button>
          </div>

          <button 
            className="mobile-cta-btn" 
            onClick={() => { setMobileMenuOpen(false); onOpenSubmit(); }}
          >
            <PlusCircle size={16} />
            <span>Post New Event</span>
          </button>
        </div>
      )}
    </div>
  );
}
