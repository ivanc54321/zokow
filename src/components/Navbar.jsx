import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  PlusCircle, 
  RefreshCw, 
  Calendar, 
  Map, 
  Menu, 
  X,
  Sun,
  Moon
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
  onOpenPlanner,
  onOpenBurgerMenu,
  theme = 'dark',
  onToggleTheme
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`navbar-floating-wrapper ${scrolled ? 'scrolled-active' : ''}`}>
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

          {/* Theme Mode Toggle Pill (Light / Dark) */}
          <button 
            className={`nav-icon-pill nav-theme-toggle-pill ${theme === 'light' ? 'is-light' : 'is-dark'}`}
            onClick={onToggleTheme}
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === 'light' ? (
              <Moon size={14} className="theme-toggle-icon moon-icon" />
            ) : (
              <Sun size={14} className="theme-toggle-icon sun-icon" />
            )}
          </button>

          {/* Post Event Quick Pill CTA */}
          <button 
            className="nav-cta-pill-btn"
            onClick={onOpenSubmit}
            title="Post a local Thanet event"
          >
            <PlusCircle size={15} />
            <span>Post Event</span>
          </button>

          {/* Desktop & Mobile Burger Drawer Menu Button (Far Right) */}
          <button 
            className="nav-burger-menu-btn"
            onClick={onOpenBurgerMenu}
            title="Open Explore & Directory Navigation Menu"
            aria-label="Open Explore & Directory Navigation Menu"
          >
            <div className="nav-burger-bars" aria-hidden="true">
              <span className="nav-burger-bar" />
              <span className="nav-burger-bar" />
              <span className="nav-burger-bar" />
            </div>
            <span className="nav-burger-label">Menu</span>
          </button>

        </div>

      </header>
    </div>
  );
}
