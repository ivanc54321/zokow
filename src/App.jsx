import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplitActionBanner from './components/SplitActionBanner';
import PromoCardsSection from './components/PromoCardsSection';
import AtmospherePillarsSection from './components/AtmospherePillarsSection';
import AboutSection from './components/AboutSection';
import CarouselSection from './components/CarouselSection';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import SubmitEventModal from './components/SubmitEventModal';
import ScraperSyncModal from './components/ScraperSyncModal';
import ThanetMapView from './components/ThanetMapView';
import WeekendPlannerModal from './components/WeekendPlannerModal';
import VenueModal from './components/VenueModal';
import ContactRibbon from './components/ContactRibbon';
import BurgerMenuDrawer from './components/BurgerMenuDrawer';
import BackToTopDock from './components/BackToTopDock';
import AboutUsPage from './components/AboutUsPage';
import SignUpModal from './components/SignUpModal';
import CommunityTestimonialSection from './components/CommunityTestimonialSection';
import { useScrollReveal } from './hooks/useScrollReveal';
import { INITIAL_EVENTS } from './data/eventsData';
import { 
  Sparkles, 
  HeartHandshake, 
  Users, 
  Compass, 
  Filter, 
  CheckCircle2,
  Layers,
  Activity,
  Map as MapIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './App.css';

const CURRENT_YEAR = new Date().getFullYear();

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function App() {
  const [events, setEvents] = useState(() => {
    const DATA_VERSION = '2026.10.v3';
    const currentVersion = localStorage.getItem('zokal_events_version');
    if (currentVersion !== DATA_VERSION) {
      localStorage.setItem('zokal_events_version', DATA_VERSION);
      localStorage.setItem('zokal_events', JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }

    const saved = localStorage.getItem('zokal_events');
    if (!saved) return INITIAL_EVENTS;
    try {
      const parsed = JSON.parse(saved);
      const initialMap = new Map(INITIAL_EVENTS.map(e => [e.id, e]));
      const initialTitles = new Set(INITIAL_EVENTS.map(e => (e.title || '').trim().toLowerCase()));

      // Preserve genuine user-submitted events, excluding legacy duplicates or replaced REWD items
      const userCustom = parsed.filter(e => {
        if (!e || !e.id || !e.title) return false;
        if (initialMap.has(e.id)) return false;
        if (e.id.startsWith('evt-rewd-intro') || e.id.startsWith('evt-rewd-spin') || e.id.startsWith('evt-rewd-pilates')) return false;
        if (e.id.startsWith('evt-dreamland-')) return false;
        if (initialTitles.has(e.title.trim().toLowerCase())) return false;
        return true;
      });

      return [...INITIAL_EVENTS, ...userCustom];
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [savedEventIds, setSavedEventIds] = useState(() => {
    const saved = localStorage.getItem('zokal_saved_ids');
    return saved ? JSON.parse(saved) : ['evt-1', 'evt-3'];
  });

  const [itineraryIds, setItineraryIds] = useState(() => {
    const saved = localStorage.getItem('zokal_itinerary_ids');
    return saved ? JSON.parse(saved) : ['evt-dreamland-1', 'evt-1', 'evt-sports-1'];
  });

  const [viewMode, setViewMode] = useState('directory'); // 'directory' | 'map'
  const [selectedTown, setSelectedTown] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'popular'
  const [isExploreAllExpanded, setIsExploreAllExpanded] = useState(false);

  // Automatically reveal directory if user searches, bookmarks, or applies filters
  const isDirectoryVisible = isExploreAllExpanded || Boolean(
    searchQuery.trim() || 
    showSavedOnly || 
    selectedCategory !== 'all' || 
    selectedAmenities.length > 0 ||
    selectedTown !== 'all' ||
    selectedTimeFilter !== 'all'
  );

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isScrapersOpen, setIsScrapersOpen] = useState(false);
  const [isBurgerDrawerOpen, setIsBurgerDrawerOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('zokal_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('zokal_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(next === 'light' ? "Switched to Light Version" : "Switched to Dark Version");
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('zokal_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('zokal_saved_ids', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  useEffect(() => {
    localStorage.setItem('zokal_itinerary_ids', JSON.stringify(itineraryIds));
  }, [itineraryIds]);

  // Sync URL hash (#about) or query (?view=about) with viewMode
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#about' || search.includes('view=about')) {
        setViewMode('about');
      }
    };
    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Update hash when switching to/from about
  useEffect(() => {
    if (viewMode === 'about') {
      if (window.location.hash !== '#about') {
        window.history.replaceState(null, '', '#about');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.location.hash === '#about') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [viewMode]);

  // Activate scroll reveal animations whenever views or filters update
  useScrollReveal([events, viewMode, selectedTown, selectedCategory, searchQuery, showSavedOnly, isDirectoryVisible]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSave = (id) => {
    setSavedEventIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      showToast(exists ? "Removed from bookmarks" : "Added to your saved events!");
      return updated;
    });
  };

  const toggleItinerary = (id) => {
    setItineraryIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      showToast(exists ? "Removed from weekend plan" : "Added to your weekend schedule!");
      return updated;
    });
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev => {
      return prev.includes(amenityId) 
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId];
    });
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    showToast(`"${newEvent.title}" posted successfully!`);
  };

  const handleSyncComplete = (scrapedEvents) => {
    setIsSyncing(false);
    if (scrapedEvents && Array.isArray(scrapedEvents)) {
      setEvents(prev => {
        const existingIds = new Set(prev.map(e => e.id));
        const newOnes = scrapedEvents.filter(e => !existingIds.has(e.id));
        showToast(`Feed refreshed: ${newOnes.length} new listings added from Meetup & Eventbrite!`);
        return [...newOnes, ...prev];
      });
    } else {
      showToast("Feed refreshed: listings verified from Meetup & Instagram!");
    }
  };

  // Filter logic
  const filteredEvents = useMemo(() => {
    const list = events.filter(evt => {
      // Town filter
      if (selectedTown !== 'all' && evt.town.toLowerCase() !== selectedTown.toLowerCase()) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }
      // Time filter
      if (selectedTimeFilter !== 'all' && evt.timeframe !== selectedTimeFilter) {
        return false;
      }
      // Saved only toggle
      if (showSavedOnly && !savedEventIds.includes(evt.id)) {
        return false;
      }
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const textToSearch = ((evt.title || '') + ' ' + (evt.description || '') + ' ' + (evt.venue || '') + ' ' + (evt.tags || []).join(' ')).toLowerCase();
        for (const amenity of selectedAmenities) {
          if (amenity === 'free') {
            if (!evt.isFree && !evt.price.toLowerCase().includes('free')) return false;
          }
          if (amenity === 'outdoor') {
            if (!textToSearch.match(/outdoor|beach|coast|swim|pool|park|garden|sea|walk|bay/)) return false;
          }
          if (amenity === 'dogFriendly') {
            if (!textToSearch.match(/dog|dogs|puppy|pets/)) return false;
          }
          if (amenity === 'familyFriendly') {
            if (!textToSearch.match(/family|all ages|kids|children|all welcome/)) return false;
          }
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesDesc = evt.description.toLowerCase().includes(q);
        const matchesVenue = evt.venue.toLowerCase().includes(q);
        const matchesTags = evt.tags.some(t => t.toLowerCase().includes(q));
        const matchesTown = evt.town.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesTags && !matchesTown) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.attendees - a.attendees;
      }
      return new Date(a.date) - new Date(b.date);
    });

    // Enforce strict uniqueness by both id and normalized title
    const seen = new Set();
    return list.filter(item => {
      const key = `${item.id}|${item.title.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [events, selectedTown, selectedCategory, selectedTimeFilter, selectedAmenities, showSavedOnly, searchQuery, sortBy, savedEventIds]);

  // Helper to ensure diverse unique venues/organizers per carousel (no repetition of same brand)
  const dedupeByBrand = (items, maxCount = 8) => {
    const seenBrands = new Set();
    const result = [];
    for (const item of items) {
      // Normalize brand / venue / organizer
      const brandKey = (item.organizer || item.venue || item.id).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seenBrands.has(brandKey)) {
        seenBrands.add(brandKey);
        result.push(item);
      }
      if (result.length >= maxCount) break;
    }
    return result;
  };

  // Curated subsets for carousels with strict variety and brand-level deduplication
  const trendingEvents = useMemo(() => {
    const list = events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.trending);
    return dedupeByBrand(list, 8);
  }, [events, selectedTown]);

  const volunteerEvents = useMemo(() => {
    const list = events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'volunteer');
    return dedupeByBrand(list, 8);
  }, [events, selectedTown]);

  const meetupEvents = useMemo(() => {
    const list = events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'meetup');
    return dedupeByBrand(list, 8);
  }, [events, selectedTown]);

  const sportsEvents = useMemo(() => {
    const list = events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'activity');
    return dedupeByBrand(list, 8);
  }, [events, selectedTown]);

  const townCounts = useMemo(() => {
    const counts = { all: events.length, margate: 0, ramsgate: 0, broadstairs: 0 };
    events.forEach(e => {
      const t = (e.town || '').toLowerCase();
      if (counts[t] !== undefined) counts[t]++;
    });
    return counts;
  }, [events]);

  const isFiltering = selectedCategory !== 'all' || selectedTimeFilter !== 'all' || selectedTown !== 'all' || searchQuery.trim() !== '' || showSavedOnly || selectedAmenities.length > 0;

  const resetFilters = () => {
    setSelectedTown('all');
    setSelectedCategory('all');
    setSelectedTimeFilter('all');
    setSelectedAmenities([]);
    setSearchQuery('');
    setShowSavedOnly(false);
  };

  return (
    <div className="app-container" data-theme={theme}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {viewMode === 'about' ? (
        <AboutUsPage 
          onBackToDirectory={() => setViewMode('directory')}
          onOpenSubmit={() => setIsSubmitOpen(true)}
          onOpenVenue={(vid) => setSelectedVenueId(vid)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <>
          {/* Navbar */}
          <Navbar 
            selectedTown={selectedTown}
            onSelectTown={setSelectedTown}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            savedCount={savedEventIds.length}
            onOpenSaved={() => setShowSavedOnly(!showSavedOnly)}
            onOpenSubmit={() => setIsSubmitOpen(true)}
            onOpenScrapers={() => setIsScrapersOpen(true)}
            isSyncing={isSyncing}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            itineraryCount={itineraryIds.length}
            onOpenPlanner={() => setIsPlannerOpen(true)}
            onOpenBurgerMenu={() => setIsBurgerDrawerOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

      <main className="main-content">
        {/* Modern Atmospheric Hero */}
        <Hero 
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (showSavedOnly) setShowSavedOnly(false);
          }}
          selectedTimeFilter={selectedTimeFilter}
          onSelectTimeFilter={setSelectedTimeFilter}
          selectedTown={selectedTown}
          onSelectTown={setSelectedTown}
          selectedAmenities={selectedAmenities}
          onToggleAmenity={toggleAmenity}
          onOpenVenue={(vid) => setSelectedVenueId(vid)}
          onOpenBurgerMenu={() => setIsBurgerDrawerOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onExpandDirectory={() => setIsExploreAllExpanded(true)}
        />

        {/* 1. Full-Width Split Action Banner (inspired by reference) */}
        <SplitActionBanner 
          onSelectCategory={setSelectedCategory}
          onScrollToDirectory={() => {
            setIsExploreAllExpanded(true);
            const el = document.querySelector('.directory-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onBecomeMember={() => setIsSignUpOpen(true)}
        />

        {/* 2. Dual Spotlight Promo Cards (inspired by reference) */}
        <PromoCardsSection 
          onOpenVenue={(vid) => setSelectedVenueId(vid)}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Three Pillars of Atmosphere (FOOD, DRINK, EVENT with distinct sectional colors) */}
        <AtmospherePillarsSection 
          onFilterPillar={(cat) => setSelectedCategory(cat)}
          onOpenVenue={(vid) => setSelectedVenueId(vid)}
        />



        {/* Active Filter Indicators */}
        {isFiltering && (
          <div className="active-filters-bar reveal-on-scroll">
            <div className="filters-label">
              <Filter size={15} />
              <span>Active filters:</span>
            </div>
            <div className="active-pills">
              {selectedTown !== 'all' && (
                <span className="active-pill">
                  Town: {selectedTown}
                  <button onClick={() => setSelectedTown('all')}>×</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="active-pill">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>×</button>
                </span>
              )}
              {selectedTimeFilter !== 'all' && (
                <span className="active-pill">
                  When: {selectedTimeFilter}
                  <button onClick={() => setSelectedTimeFilter('all')}>×</button>
                </span>
              )}
              {selectedAmenities.map(am => (
                <span key={am} className="active-pill highlight-amenity">
                  Vibe: {am}
                  <button onClick={() => toggleAmenity(am)}>×</button>
                </span>
              ))}
              {searchQuery && (
                <span className="active-pill">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>×</button>
                </span>
              )}
              {showSavedOnly && (
                <span className="active-pill highlight">
                  Saved Bookmarks ({savedEventIds.length})
                  <button onClick={() => setShowSavedOnly(false)}>×</button>
                </span>
              )}
              <button className="reset-filters-btn" onClick={resetFilters}>
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* MAP VIEW vs DIRECTORY VIEW */}
        {viewMode === 'map' ? (
          <section id="map-section-anchor" className="map-view-section reveal-on-scroll">
            <div className="map-view-header">
              <div>
                <h2 className="section-title">
                  <MapIcon size={22} className="section-icon inline" />
                  Interactive Thanet Coastline Map
                </h2>
                <p className="section-subtitle">
                  Showing {filteredEvents.length} events across Margate, Ramsgate, and Broadstairs. Click any marker for instant details.
                </p>
              </div>
              <button className="back-directory-btn" onClick={() => setViewMode('directory')}>
                Switch to Directory Grid &rarr;
              </button>
            </div>
            <ThanetMapView 
              events={filteredEvents}
              onSelectEvent={setSelectedEvent}
              selectedTown={selectedTown}
              onSelectTown={setSelectedTown}
            />
          </section>
        ) : (
          <div id="upcoming-events-showcase" className="upcoming-events-showcase">
            {/* Events Showcase Header */}
            <div className="events-showcase-header reveal-on-scroll">
              <div className="showcase-header-left">
                <span className="events-badge-pill">UPCOMING GIGS & HAPPENINGS</span>
                <h2 className="events-showcase-title">WHAT'S ON IN THANET</h2>
              </div>
              <div className="events-quick-stats">
                <span className="events-stat-pill"><strong>{events.length}</strong> Live Listings</span>
                <span className="events-stat-pill highlight">Margate • Ramsgate • Broadstairs</span>
              </div>
            </div>

            {/* When NOT heavily filtered, show the signature Carousels with individual color themes */}
            {!searchQuery && selectedCategory === 'all' && selectedAmenities.length === 0 && !showSavedOnly && (
              <div id="carousels-section">
                {/* Carousel 1: Trending in Thanet (Vibrant Warm Orange Theme) */}
                <CarouselSection 
                  title="Trending This Weekend"
                  subtitle="The most anticipated gatherings, social rides, and coastal happenings"
                  icon={Sparkles}
                  badgeText="HOT & POPULAR"
                  theme="orange"
                  events={trendingEvents}
                  onSelectEvent={setSelectedEvent}
                  savedEventIds={savedEventIds}
                  onToggleSave={toggleSave}
                  itineraryIds={itineraryIds}
                  onToggleItinerary={toggleItinerary}
                  onOpenVenue={(vid) => setSelectedVenueId(vid)}
                />

                {/* Carousel 2: Sports, Fitness & Hartsdown 5-a-Side (Electric Volt Theme) */}
                <CarouselSection 
                  title="Sports, Fitness & Hartsdown 5-a-Side"
                  subtitle="5-a-side floodlit football at Hartsdown Park, coastal runs, boxing bootcamps & tidal swims"
                  icon={Activity}
                  badgeText="ACTIVE THANET"
                  theme="sports"
                  events={sportsEvents}
                  onSelectEvent={setSelectedEvent}
                  savedEventIds={savedEventIds}
                  onToggleSave={toggleSave}
                  itineraryIds={itineraryIds}
                  onToggleItinerary={toggleItinerary}
                  onOpenVenue={(vid) => setSelectedVenueId(vid)}
                />

                {/* Carousel 3: Volunteer & Community (Marine Cyan / Teal Theme) */}
                <CarouselSection 
                  title="Volunteering & Community Action"
                  subtitle="Lend a hand with beach conservation, community permaculture & youth mentorship"
                  icon={HeartHandshake}
                  badgeText="MAKE AN IMPACT"
                  theme="community"
                  events={volunteerEvents}
                  onSelectEvent={setSelectedEvent}
                  savedEventIds={savedEventIds}
                  onToggleSave={toggleSave}
                  itineraryIds={itineraryIds}
                  onToggleItinerary={toggleItinerary}
                  onOpenVenue={(vid) => setSelectedVenueId(vid)}
                />

                {/* Carousel 4: Local Social Meetups (Neon Violet Theme) */}
                <CarouselSection 
                  title="Social Circles & Meetups"
                  subtitle="Connect with friendly groups for co-working, board games, literature & coffee"
                  icon={Users}
                  badgeText="COMMUNITY"
                  theme="social"
                  events={meetupEvents}
                  onSelectEvent={setSelectedEvent}
                  savedEventIds={savedEventIds}
                  onToggleSave={toggleSave}
                  itineraryIds={itineraryIds}
                  onToggleItinerary={toggleItinerary}
                  onOpenVenue={(vid) => setSelectedVenueId(vid)}
                />
              </div>
            )}

            {/* Directory Grid Section: Hidden/Collapsed by default, Expandable on Click */}
            <section className={`directory-grid-section ${!isDirectoryVisible ? 'directory-collapsed-section' : 'directory-expanded-section'} reveal-on-scroll`}>
              {!isDirectoryVisible ? (
                /* Collapsed Directory Trigger Card */
                <div 
                  className="directory-expand-card"
                  onClick={() => setIsExploreAllExpanded(true)}
                  role="button"
                  tabIndex={0}
                  aria-expanded="false"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsExploreAllExpanded(true);
                    }
                  }}
                >
                  <div className="expand-card-glow" />
                  <div className="expand-card-left">
                    <div className="expand-badge-pill">
                      <Layers size={13} className="expand-badge-icon" />
                      <span>COMPLETE DIRECTORY</span>
                    </div>
                    <h3 className="expand-card-title">Explore All Happenings</h3>
                    <p className="expand-card-subtitle">
                      Browse our full directory of {filteredEvents.length} events across Margate, Ramsgate & Broadstairs
                    </p>
                  </div>
                  <div className="expand-card-right">
                    <button className="expand-trigger-btn" type="button" tabIndex={-1}>
                      <span>Show All {filteredEvents.length} Events</span>
                      <ChevronDown size={18} className="expand-chevron-icon" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Expanded Full Directory Grid */
                <>
                  <div className="grid-header">
                    <div className="grid-header-title">
                      <Layers size={22} className="section-icon" />
                      <div>
                        <h2 className="section-title">
                          {showSavedOnly ? "Your Bookmarked Events" : "Explore All Happenings"}
                        </h2>
                        <p className="section-subtitle">
                          Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} across Thanet
                        </p>
                      </div>
                    </div>

                    <div className="grid-header-actions">
                      <div className="grid-sort-controls">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select 
                          id="sort-select"
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          className="sort-dropdown"
                        >
                          <option value="date">Date (Earliest First)</option>
                          <option value="popular">Most Popular / Attendees</option>
                        </select>
                      </div>

                      {/* Collapse Button (shown when user manually expanded on default view) */}
                      {!searchQuery && !showSavedOnly && selectedCategory === 'all' && selectedAmenities.length === 0 && selectedTown === 'all' && (
                        <button 
                          className="directory-collapse-btn"
                          onClick={() => {
                            setIsExploreAllExpanded(false);
                            const el = document.getElementById('carousels-section') || document.getElementById('upcoming-events-showcase');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          title="Hide event grid"
                        >
                          <span>Hide Events</span>
                          <ChevronUp size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {filteredEvents.length === 0 ? (
                    <div className="empty-state">
                      <Compass size={48} className="empty-icon" />
                      <h3>No events match your current filters</h3>
                      <p>Try clearing your search query or switching to "All Thanet".</p>
                      <button className="empty-reset-btn" onClick={resetFilters}>
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="events-grid">
                      {filteredEvents.map(event => (
                        <EventCard 
                          key={event.id}
                          event={event}
                          className="reveal-on-scroll"
                          onSelect={setSelectedEvent}
                          isSaved={savedEventIds.includes(event.id)}
                          onToggleSave={toggleSave}
                          isInItinerary={itineraryIds.includes(event.id)}
                          onToggleItinerary={toggleItinerary}
                          onOpenVenue={(vid) => setSelectedVenueId(vid)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Bottom Collapse Button if multiple events */}
                  {!searchQuery && !showSavedOnly && selectedCategory === 'all' && selectedAmenities.length === 0 && selectedTown === 'all' && filteredEvents.length > 6 && (
                    <div className="directory-bottom-collapse-row">
                      <button 
                        className="directory-bottom-collapse-btn"
                        onClick={() => {
                          setIsExploreAllExpanded(false);
                          const el = document.getElementById('upcoming-events-showcase');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <ChevronUp size={16} />
                        <span>Collapse Directory ({filteredEvents.length} events)</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}

        {/* Community Voices & Testimonial Showcase (GathSession Reference Style) */}
        <CommunityTestimonialSection 
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenAbout={() => {
            setViewMode('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSubmit={() => setIsSubmitOpen(true)}
        />

        {/* Editorial "About the Scene" section with Framed Atmospheric Bar photo */}
        <div id="about-scene-section">
          <AboutSection 
            onOpenVenue={(vid) => setSelectedVenueId(vid)} 
            onOpenAbout={() => {
              setViewMode('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>

      </main>

      {/* Solid High-Impact Orange Contact & Operating Hours Ribbon (inspired by reference) */}
      <ContactRibbon onOpenMap={() => { setViewMode('map'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} />

      {/* Footer (Dark obsidian minimal footer with social links inspired by reference) */}
      <footer className="footer-container reveal-on-scroll">
        <div className="footer-inner">
          <div className="footer-col brand-col">
            <div className="brand-logo footer-logo">
              <span className="logo-text">VERGE</span>
              <span className="logo-dot"></span>
            </div>
            <p className="footer-desc">
              The premier local social & nightlife directory for Thanet. Connecting community gatherers, gig-goers, sports teams, and food lovers across Margate, Ramsgate, and Broadstairs.
            </p>
            <div className="town-tags-footer">
              <span>Margate</span>
              <span>Ramsgate</span>
              <span>Broadstairs</span>
              <span>Cliftonville</span>
              <span>Westgate-on-Sea</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore By Category</h4>
            <ul>
              <li><button onClick={() => { setSelectedCategory('meetup'); window.scrollTo({top: 500, behavior: 'smooth'}); }}>Local Meetups & Circles</button></li>
              <li><button onClick={() => { setSelectedCategory('activity'); window.scrollTo({top: 500, behavior: 'smooth'}); }}>Sports & Hartsdown 5-a-Side</button></li>
              <li><button onClick={() => { setSelectedCategory('event'); window.scrollTo({top: 500, behavior: 'smooth'}); }}>Live Gigs & Dreamland</button></li>
              <li><button onClick={() => { setSelectedCategory('volunteer'); window.scrollTo({top: 500, behavior: 'smooth'}); }}>Volunteering & Coastal Care</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hubs & Venues</h4>
            <ul>
              <li><button onClick={() => setSelectedVenueId('dreamland')}>Dreamland Margate</button></li>
              <li><button onClick={() => setSelectedVenueId('hartsdown')}>Hartsdown Park 5-a-Side</button></li>
              <li><button onClick={() => setSelectedVenueId('walpole')}>Walpole Bay Tidal Pool</button></li>
              <li><button onClick={() => setSelectedVenueId('ramsgatemusichall')}>Ramsgate Music Hall</button></li>
              <li><button onClick={() => setSelectedVenueId('turner')}>Turner Contemporary</button></li>
            </ul>
          </div>

          <div className="footer-col connect-col">
            <h4>Connect With Us</h4>
            <p className="connect-tagline">Stay in the loop with daily event drops and weekend line-ups.</p>
            <div className="social-links-row">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
            <div className="footer-support-box">
              <span>Promoting a local gig?</span>
              <button className="footer-submit-link" onClick={() => setIsSubmitOpen(true)}>
                Post Free Listing &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <button 
              className="footer-bottom-link-btn"
              onClick={() => { setViewMode('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ background: 'none', border: 'none', color: '#ff5e14', cursor: 'pointer', fontWeight: '700', padding: 0 }}
            >
              About Us & Manifesto
            </button>
            <span>•</span>
            <a href="/preview.html" style={{ color: '#ffd600', fontWeight: '800' }}>⚡ Vibe Preview (New)</a>
            <span>•</span>
            <a href="#terms">Terms of Use</a>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#guidelines">Community Guidelines</a>
            <span>•</span>
            <a href="#contact">Support</a>
          </div>
          <p className="copyright-text">© {CURRENT_YEAR} VERGE — Thanet Social & Nightlife Directory. Crafted with passion for coastal culture.</p>
        </div>
      </footer>
      </>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isSaved={savedEventIds.includes(selectedEvent.id)}
          onToggleSave={toggleSave}
        />
      )}

      {/* Weekend Planner Modal */}
      <WeekendPlannerModal 
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        events={events}
        itineraryIds={itineraryIds}
        onToggleItinerary={toggleItinerary}
        onSelectEvent={setSelectedEvent}
      />

      {/* Venue Spotlight Modal */}
      <VenueModal 
        venueId={selectedVenueId}
        onClose={() => setSelectedVenueId(null)}
        events={events}
        onSelectEvent={setSelectedEvent}
      />

      {/* Submit Event Modal */}
      <SubmitEventModal 
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Member Sign Up & Pass Modal */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSuccess={(member) => {
          setToastMessage(`Welcome to VERGE, ${member.name}! Pass #${member.passNumber} activated.`);
          setTimeout(() => setToastMessage(null), 4500);
        }}
      />

      {/* Scraper / Pipeline Modal */}
      <ScraperSyncModal 
        isOpen={isScrapersOpen}
        onClose={() => setIsScrapersOpen(false)}
        onSyncComplete={handleSyncComplete}
      />

      {/* Slide-over Burger Navigation & Filter Drawer */}
      <BurgerMenuDrawer 
        isOpen={isBurgerDrawerOpen}
        onClose={() => setIsBurgerDrawerOpen(false)}
        selectedTown={selectedTown}
        onSelectTown={setSelectedTown}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedTimeFilter={selectedTimeFilter}
        onSelectTimeFilter={setSelectedTimeFilter}
        selectedAmenities={selectedAmenities}
        onToggleAmenity={toggleAmenity}
        onOpenVenue={(vid) => setSelectedVenueId(vid)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        itineraryCount={itineraryIds.length}
        onOpenPlanner={() => setIsPlannerOpen(true)}
        savedCount={savedEventIds.length}
        showSavedOnly={showSavedOnly}
        onOpenSaved={() => setShowSavedOnly(!showSavedOnly)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onOpenScrapers={() => setIsScrapersOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetFilters={resetFilters}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Action Dock: Back to Top & Quick Plan/Saved Launcher */}
      <BackToTopDock 
        itineraryCount={itineraryIds.length}
        onOpenPlanner={() => setIsPlannerOpen(true)}
        savedCount={savedEventIds.length}
        onOpenSaved={() => {
          setShowSavedOnly(true);
          const el = document.querySelector('.directory-grid-section') || document.getElementById('upcoming-events-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
