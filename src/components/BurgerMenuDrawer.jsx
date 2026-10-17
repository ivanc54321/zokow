import React, { useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Sun, 
  Waves, 
  Flame, 
  Calendar, 
  Sparkles, 
  Activity, 
  Users, 
  Music, 
  HeartHandshake, 
  Tag, 
  PawPrint, 
  Smile, 
  Map as MapIcon, 
  PlusCircle, 
  Bookmark, 
  RefreshCw, 
  Rss, 
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Moon
} from 'lucide-react';
import { CATEGORIES, TOWNS, TIME_FILTERS, AMENITY_FILTERS, VENUES } from '../data/eventsData';
import './BurgerMenuDrawer.css';

const CURATED_SCENE_GUIDES = [
  {
    id: "g-dreamland",
    badge: "LIVE STAGE",
    title: "Dreamland Stages & Sunset Gigs",
    lead: "Scenic Stage festivals, retro roller disco, and international touring headliners overlooking Margate sands.",
    town: "Margate",
    venueId: "dreamland",
    category: "event"
  },
  {
    id: "g-harbour",
    badge: "FOOD & DRINK",
    title: "Harbour Speakeasies & Craft Dining",
    lead: "Cosy acoustic gigs in Ramsgate harbour vaults, natural wine cellars, and local taprooms.",
    town: "Ramsgate",
    venueId: "ramsgatemusichall",
    category: "event"
  },
  {
    id: "g-active",
    badge: "ACTIVE THANET",
    title: "Coastal Swims & Floodlit 5-a-Side",
    lead: "Walpole Bay tidal pool wild swimming and all-weather 5-a-side floodlit football at Hartsdown Park.",
    town: "Margate",
    venueId: "walpole",
    category: "activity"
  }
];

export default function BurgerMenuDrawer({
  isOpen,
  onClose,
  selectedTown,
  onSelectTown,
  selectedCategory,
  onSelectCategory,
  selectedTimeFilter,
  onSelectTimeFilter,
  selectedAmenities = [],
  onToggleAmenity,
  onOpenVenue,
  viewMode,
  onToggleViewMode,
  itineraryCount = 0,
  onOpenPlanner,
  savedCount = 0,
  showSavedOnly,
  onOpenSaved,
  onOpenSubmit,
  onOpenScrapers,
  searchQuery,
  onSearchChange,
  onResetFilters,
  theme = 'dark',
  onToggleTheme
}) {
  const drawerRef = useRef(null);
  const scrollBodyRef = useRef(null);

  // Close on Escape key press & prevent body scrolling when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      if (scrollBodyRef.current) {
        scrollBodyRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToDirectory = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector('.directory-grid-section') || document.getElementById('upcoming-events-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'Users': return Users;
      case 'Music': return Music;
      case 'HeartHandshake': return HeartHandshake;
      default: return Sparkles;
    }
  };

  const getAmenityIcon = (iconName) => {
    switch (iconName) {
      case 'Tag': return Tag;
      case 'Sun': return Sun;
      case 'PawPrint': return PawPrint;
      case 'Smile': return Smile;
      default: return Sparkles;
    }
  };

  return (
    <div className="burger-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Site Navigation and Filters">
      <div 
        className="burger-drawer-panel"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-brand">
            <span className="drawer-logo-text">ZOKAL</span>
            <span className="drawer-logo-tag">EXPLORE & DIRECTORY</span>
          </div>
          <div className="drawer-header-controls">
            <button 
              className={`drawer-theme-quick-btn ${theme === 'light' ? 'is-light' : 'is-dark'}`}
              onClick={onToggleTheme}
              title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
            <button 
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Live Weather & Coastal Status Strip (from Old Hero) */}
        <div className="drawer-coastal-status">
          <div className="coastal-status-item">
            <Sun size={14} className="status-icon sun" />
            <span>Thanet Coast • 18°C Mild Breezes</span>
          </div>
          <div className="coastal-status-divider">•</div>
          <div className="coastal-status-item">
            <Waves size={14} className="status-icon waves" />
            <span>Low Tide 16:40 (Walpole Bay Open)</span>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="drawer-search-container">
          <Search size={16} className="drawer-search-icon" />
          <input 
            type="text"
            placeholder="Search gigs, swims, meetups..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="drawer-search-input"
          />
          {searchQuery && (
            <button 
              className="drawer-search-clear"
              onClick={() => onSearchChange && onSearchChange('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Scrollable Content Container */}
        <div className="drawer-scrollable-body" ref={scrollBodyRef}>
          
          {/* SECTION 0: Theme Mode Switcher */}
          <div className="drawer-section drawer-theme-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                {theme === 'light' ? <Sun size={14} className="section-icon amber" /> : <Moon size={14} className="section-icon violet" />}
                THEME / APPEARANCE
              </span>
              <span className="drawer-theme-state-tag">
                {theme === 'light' ? '☀️ Light Version' : '🌙 Dark Version'}
              </span>
            </div>
            <div className="drawer-theme-toggle-row">
              <button 
                type="button"
                className={`drawer-theme-choice-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => {
                  if (theme !== 'light' && onToggleTheme) onToggleTheme();
                }}
              >
                <Sun size={14} />
                <span>Light Version</span>
              </button>
              <button 
                type="button"
                className={`drawer-theme-choice-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => {
                  if (theme !== 'dark' && onToggleTheme) onToggleTheme();
                }}
              >
                <Moon size={14} />
                <span>Dark Version</span>
              </button>
            </div>
          </div>
          
          {/* SECTION 1: Explore by Coastal Town */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <MapPin size={14} className="section-icon teal" />
                EXPLORE BY TOWN
              </span>
            </div>
            <div className="drawer-town-pills">
              {TOWNS.map((t) => {
                const isActive = selectedTown === t.id;
                return (
                  <button
                    key={t.id}
                    className={`drawer-town-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectTown(t.id);
                      scrollToDirectory();
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Primary Categories */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <Sparkles size={14} className="section-icon violet" />
                CATEGORIES & HAPPENINGS
              </span>
            </div>
            <div className="drawer-categories-list">
              {CATEGORIES.map((cat) => {
                const IconComp = getCategoryIcon(cat.icon);
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    className={`drawer-category-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      scrollToDirectory();
                    }}
                  >
                    <div className="category-item-left">
                      <span className="cat-icon-frame">
                        <IconComp size={16} />
                      </span>
                      <span className="cat-label">{cat.label}</span>
                    </div>
                    <ChevronRight size={15} className="cat-arrow" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Timeframe & Dates */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <Calendar size={14} className="section-icon amber" />
                WHEN & TIMING
              </span>
            </div>
            <div className="drawer-pills-row">
              {TIME_FILTERS.map((tf) => {
                const isActive = selectedTimeFilter === tf.id;
                return (
                  <button
                    key={tf.id}
                    className={`drawer-filter-pill ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectTimeFilter(tf.id);
                      scrollToDirectory();
                    }}
                  >
                    {tf.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Atmosphere & Vibes */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <Flame size={14} className="section-icon coral" />
                VIBES & ATMOSPHERE
              </span>
            </div>
            <div className="drawer-pills-row">
              {AMENITY_FILTERS.map((af) => {
                const IconComp = getAmenityIcon(af.icon);
                const isActive = selectedAmenities.includes(af.id);
                return (
                  <button
                    key={af.id}
                    className={`drawer-vibe-pill ${isActive ? 'active' : ''}`}
                    onClick={() => onToggleAmenity(af.id)}
                  >
                    <IconComp size={13} />
                    <span>{af.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: Iconic Venues Spotlight */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <MapPin size={14} className="section-icon teal" />
                ICONIC VENUES & HUBS
              </span>
            </div>
            <div className="drawer-venue-chips">
              {VENUES.map((venue) => (
                <button
                  key={venue.id}
                  className="drawer-venue-card"
                  onClick={() => {
                    onClose();
                    if (onOpenVenue) onOpenVenue(venue.id);
                  }}
                >
                  <div className="venue-card-info">
                    <span className="venue-name">{venue.name}</span>
                    <span className="venue-town">{venue.town}</span>
                  </div>
                  <ChevronRight size={14} className="venue-arrow" />
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 6: Curated Scene Guides (From Old Hero Slides) */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">
                <Flame size={14} className="section-icon amber" />
                CURATED SCENE GUIDES
              </span>
            </div>
            <div className="drawer-stories-list">
              {CURATED_SCENE_GUIDES.map((story) => (
                <div 
                  key={story.id} 
                  className="drawer-story-item"
                  onClick={() => {
                    onClose();
                    if (story.venueId && onOpenVenue) onOpenVenue(story.venueId);
                    else if (story.category && onSelectCategory) onSelectCategory(story.category);
                  }}
                >
                  <span className="story-badge">{story.badge}</span>
                  <h4 className="story-title">{story.title}</h4>
                  <p className="story-lead">{story.lead}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: Quick Site Actions */}
          <div className="drawer-section">
            <div className="section-header-row">
              <span className="drawer-section-title">QUICK SITE TOOLS</span>
            </div>
            <div className="drawer-tools-grid">
              <button 
                className={`drawer-tool-btn ${viewMode === 'map' ? 'active-tool' : ''}`}
                onClick={() => {
                  onClose();
                  onToggleViewMode(viewMode === 'map' ? 'directory' : 'map');
                }}
              >
                <MapIcon size={16} />
                <span>{viewMode === 'map' ? 'Switch to Directory' : 'Coastal Map View'}</span>
              </button>

              <button 
                className="drawer-tool-btn"
                onClick={() => {
                  onClose();
                  onOpenPlanner();
                }}
              >
                <Calendar size={16} />
                <span>Weekend Planner ({itineraryCount})</span>
              </button>

              <button 
                className={`drawer-tool-btn ${showSavedOnly ? 'active-tool' : ''}`}
                onClick={() => {
                  onClose();
                  onOpenSaved();
                }}
              >
                <Bookmark size={16} />
                <span>Saved Bookmarks ({savedCount})</span>
              </button>

              <button 
                className="drawer-tool-btn"
                onClick={() => {
                  onClose();
                  onOpenSubmit();
                }}
              >
                <PlusCircle size={16} />
                <span>Submit Local Event</span>
              </button>

              <button 
                className={`drawer-tool-btn drawer-tool-theme-btn ${theme === 'light' ? 'highlight' : ''}`}
                onClick={() => {
                  if (onToggleTheme) onToggleTheme();
                }}
                title={theme === 'light' ? "Switch to Dark Version" : "Switch to Light Version"}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? 'Dark Version' : 'Light Version'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 8: Data Sources Citation Bar (from Old Hero) */}
          <div className="drawer-sources-footer">
            <div className="sources-label-row">
              <Rss size={13} className="rss-icon" />
              <span>LIVE COMMUNITY AGGREGATION</span>
            </div>
            <div className="sources-badges">
              <span className="src-badge meetup">Meetup.com</span>
              <span className="src-badge ig">Instagram</span>
              <span className="src-badge fb">Facebook</span>
              <span className="src-badge eb">Eventbrite</span>
              <span className="src-badge direct">Direct Submissions</span>
            </div>
          </div>

          {/* Reset Filters Option */}
          {onResetFilters && (
            <div className="drawer-reset-container">
              <button 
                className="drawer-reset-btn"
                onClick={() => {
                  onResetFilters();
                  onClose();
                }}
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
