import React, { useRef } from 'react';
import { 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Tag, 
  Moon, 
  Grid, 
  Map as MapIcon, 
  Music, 
  Utensils, 
  Activity, 
  Users,
  Compass
} from 'lucide-react';
import './DirectoryQuickFilterBar.css';

const TOWNS = [
  { id: 'all', label: 'All Thanet' },
  { id: 'Margate', label: 'Margate' },
  { id: 'Ramsgate', label: 'Ramsgate' },
  { id: 'Broadstairs', label: 'Broadstairs' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Vibes', icon: Sparkles },
  { id: 'event', label: 'Music & Gigs', icon: Music },
  { id: 'activity', label: 'Sports & Wellness', icon: Activity },
  { id: 'volunteer', label: 'Community Action', icon: Users },
  { id: 'meetup', label: 'Social Circles', icon: Compass }
];

export default function DirectoryQuickFilterBar({
  selectedTown,
  onSelectTown,
  selectedCategory,
  onSelectCategory,
  selectedTimeFilter,
  onSelectTimeFilter,
  selectedAmenities = [],
  onToggleAmenity,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
  totalEventsCount,
  filteredCount,
  townCounts = {}
}) {
  const searchInputRef = useRef(null);

  const isFreeActive = selectedAmenities.includes('free');
  const isOutdoorActive = selectedAmenities.includes('outdoor');

  return (
    <div className="dir-quick-filter-bar reveal-on-scroll">
      
      {/* Top Row: Town Selector Segment & View Mode Toggle */}
      <div className="dir-filter-top-row">
        <div className="dir-town-segment" role="tablist" aria-label="Select town">
          <div className="dir-town-label">
            <MapPin size={14} className="dir-town-icon" />
            <span>Town:</span>
          </div>
          <div className="dir-town-pills">
            {TOWNS.map(town => {
              const isActive = selectedTown.toLowerCase() === town.id.toLowerCase();
              const count = townCounts[town.id.toLowerCase()] ?? (town.id === 'all' ? totalEventsCount : 0);
              return (
                <button
                  key={town.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`dir-town-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => onSelectTown(town.id)}
                >
                  <span className="town-btn-text">{town.label}</span>
                  {count > 0 && <span className="town-btn-count">{count}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Switcher: Directory vs Map */}
        <div className="dir-view-switch">
          <button
            className={`view-switch-btn ${viewMode === 'directory' ? 'is-active' : ''}`}
            onClick={() => onToggleViewMode('directory')}
            title="Switch to Card & Carousel Directory Grid"
            aria-label="Directory Grid View"
          >
            <Grid size={15} />
            <span className="view-switch-label">Directory</span>
          </button>
          <button
            className={`view-switch-btn ${viewMode === 'map' ? 'is-active' : ''}`}
            onClick={() => onToggleViewMode('map')}
            title="Switch to Interactive Thanet Coastline Map"
            aria-label="Map View"
          >
            <MapIcon size={15} />
            <span className="view-switch-label">Coast Map</span>
          </button>
        </div>
      </div>

      {/* Middle Row: Quick Search & Real-Time Match Badge */}
      <div className="dir-search-row">
        <div className="dir-search-box">
          <Search size={17} className="dir-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="dir-search-input"
            placeholder="Search gigs, venues (e.g. Dreamland, Walpole Bay), sports, free entry..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search events in Thanet"
          />
          {searchQuery ? (
            <button
              className="dir-search-clear"
              onClick={() => {
                onSearchChange('');
                if (searchInputRef.current) searchInputRef.current.focus();
              }}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          ) : (
            <span className="dir-search-hint">Quick Find</span>
          )}
        </div>

        {/* Real-Time Live Results Counter */}
        <div className="dir-results-counter">
          <span className="counter-number">{filteredCount}</span>
          <span className="counter-label">{filteredCount === 1 ? 'event matches' : 'events live'}</span>
        </div>
      </div>

      {/* Bottom Row: Category Vibes & Quick Time/Tag Pills */}
      <div className="dir-chips-row">
        
        {/* Category Pills */}
        <div className="dir-category-pills">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`dir-cat-chip ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <Icon size={14} className="cat-chip-icon" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="dir-chips-divider" aria-hidden="true"></div>

        {/* Quick Time & Vibe Tags */}
        <div className="dir-quick-tags">
          {/* Tonight Toggle */}
          <button
            className={`dir-tag-chip ${selectedTimeFilter === 'today' ? 'is-active is-tonight' : ''}`}
            onClick={() => onSelectTimeFilter(selectedTimeFilter === 'today' ? 'all' : 'today')}
            title="Filter events happening tonight"
          >
            <Moon size={13} className="tag-chip-icon" />
            <span>Tonight</span>
          </button>

          {/* Weekend Toggle */}
          <button
            className={`dir-tag-chip ${selectedTimeFilter === 'weekend' ? 'is-active is-weekend' : ''}`}
            onClick={() => onSelectTimeFilter(selectedTimeFilter === 'weekend' ? 'all' : 'weekend')}
            title="Filter events happening this weekend"
          >
            <Calendar size={13} className="tag-chip-icon" />
            <span>This Weekend</span>
          </button>

          {/* Free Entry Toggle */}
          <button
            className={`dir-tag-chip ${isFreeActive ? 'is-active is-free' : ''}`}
            onClick={() => onToggleAmenity('free')}
            title="Show only free events & gatherings"
          >
            <Tag size={13} className="tag-chip-icon" />
            <span>Free Entry</span>
          </button>

          {/* Coastal / Outdoor Toggle */}
          <button
            className={`dir-tag-chip ${isOutdoorActive ? 'is-active is-outdoor' : ''}`}
            onClick={() => onToggleAmenity('outdoor')}
            title="Show outdoor & coastal events"
          >
            <Sparkles size={13} className="tag-chip-icon" />
            <span>Outdoor / Coast</span>
          </button>
        </div>

      </div>

    </div>
  );
}
