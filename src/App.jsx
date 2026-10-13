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
import { useScrollReveal } from './hooks/useScrollReveal';
import { INITIAL_EVENTS } from './data/eventsData';
import { 
  Sparkles, 
  HeartHandshake, 
  Users, 
  Compass, 
  Calendar, 
  Filter, 
  Heart, 
  ExternalLink, 
  ArrowRight,
  MapPin,
  CheckCircle2,
  Layers,
  Activity,
  Map as MapIcon,
  Tag
} from 'lucide-react';
import './App.css';

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
    const saved = localStorage.getItem('zokal_events');
    if (!saved) return INITIAL_EVENTS;
    try {
      const parsed = JSON.parse(saved);
      const initialMap = new Map(INITIAL_EVENTS.map(e => [e.id, e]));
      // Preserve any custom user-submitted events while updating built-in events
      const userCustom = parsed.filter(e => !initialMap.has(e.id) && !e.id.startsWith('evt-dreamland-'));
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

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isScrapersOpen, setIsScrapersOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('zokal_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('zokal_saved_ids', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  useEffect(() => {
    localStorage.setItem('zokal_itinerary_ids', JSON.stringify(itineraryIds));
  }, [itineraryIds]);

  // Activate scroll reveal animations whenever views or filters update
  useScrollReveal([events, viewMode, selectedTown, selectedCategory, searchQuery, showSavedOnly]);

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
    return events.filter(evt => {
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
  }, [events, selectedTown, selectedCategory, selectedTimeFilter, selectedAmenities, showSavedOnly, searchQuery, sortBy, savedEventIds]);

  // Curated subsets for carousels
  const trendingEvents = useMemo(() => {
    return events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.trending);
  }, [events, selectedTown]);

  const volunteerEvents = useMemo(() => {
    return events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'volunteer');
  }, [events, selectedTown]);

  const meetupEvents = useMemo(() => {
    return events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'meetup');
  }, [events, selectedTown]);

  const sportsEvents = useMemo(() => {
    return events.filter(e => (selectedTown === 'all' || e.town === selectedTown) && e.category === 'activity');
  }, [events, selectedTown]);

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
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

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
        />

        {/* 1. Full-Width Split Action Banner (inspired by reference) */}
        <SplitActionBanner 
          onSelectCategory={setSelectedCategory}
          onScrollToDirectory={() => {
            const el = document.querySelector('.directory-grid-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
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

        {/* 4. Editorial "About the Scene" section with Framed Atmospheric Bar photo */}
        <div id="about-scene-section">
          <AboutSection onOpenVenue={(vid) => setSelectedVenueId(vid)} />
        </div>

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
          <>
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

            {/* Directory Grid Section: All Filtered Events */}
            <section className="directory-grid-section reveal-on-scroll">
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
            </section>
          </>
        )}

      </main>

      {/* Solid High-Impact Orange Contact & Operating Hours Ribbon (inspired by reference) */}
      <ContactRibbon onOpenMap={() => { setViewMode('map'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} />

      {/* Footer (Dark obsidian minimal footer with social links inspired by reference) */}
      <footer className="footer-container">
        <div className="footer-inner">
          <div className="footer-col brand-col">
            <div className="brand-logo footer-logo">
              <span className="logo-text">ZOKAL</span>
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
            <a href="#terms">Terms of Use</a>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#guidelines">Community Guidelines</a>
            <span>•</span>
            <a href="#contact">Support</a>
          </div>
          <p className="copyright-text">© {new Date().getFullYear()} ZOKAL — Thanet Social & Nightlife Directory. Crafted with passion for coastal culture.</p>
        </div>
      </footer>

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

      {/* Scraper / Pipeline Modal */}
      <ScraperSyncModal 
        isOpen={isScrapersOpen}
        onClose={() => setIsScrapersOpen(false)}
        onSyncComplete={handleSyncComplete}
      />
    </div>
  );
}
