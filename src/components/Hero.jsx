import React from 'react';
import { Sun, Moon } from 'lucide-react';
import './ArconaHero.css';

// Custom SVG Monogram for ZOKAL Thanet (Coastal Arch + Wave Mark)
const ZokalMonogram = () => (
  <svg 
    width="28" 
    height="34" 
    viewBox="0 0 32 38" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="arcona-logo-mark"
    title="ZOKAL Thanet Social Directory"
  >
    {/* Arch frame */}
    <path 
      d="M6 35V16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16V35" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
    {/* Stylized Coastal Z wave */}
    <path 
      d="M11 17H21L11 27H21" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Miniature High-Detail QR Code SVG Icon
const QrCodeIcon = ({ color = '#ffffff' }) => (
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="arcona-qr-icon"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="4.5" y="4.5" width="2" height="2" fill={color} />
    <rect x="15" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="17.5" y="4.5" width="2" height="2" fill={color} />
    <rect x="2" y="15" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="4.5" y="17.5" width="2" height="2" fill={color} />
    {/* Data dots */}
    <rect x="11" y="2.5" width="2" height="2" fill={color} />
    <rect x="11" y="7" width="2" height="2" fill={color} />
    <rect x="11" y="11" width="2" height="2" fill={color} />
    <rect x="2.5" y="11" width="2" height="2" fill={color} />
    <rect x="7" y="11" width="2" height="2" fill={color} />
    <rect x="15" y="11" width="2" height="2" fill={color} />
    <rect x="19.5" y="11" width="2" height="2" fill={color} />
    <rect x="11" y="15" width="2" height="2" fill={color} />
    <rect x="15" y="15" width="2" height="2" fill={color} />
    <rect x="19.5" y="15" width="2" height="2" fill={color} />
    <rect x="11" y="19.5" width="2" height="2" fill={color} />
    <rect x="15" y="19.5" width="2" height="2" fill={color} />
    <rect x="19.5" y="19.5" width="2" height="2" fill={color} />
  </svg>
);

// Mouse Cursor Arrow SVG Icon
const CursorArrow = ({ color = '#fbb929' }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
    className="arcona-cursor-icon"
    aria-hidden="true"
  >
    <path 
      d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z" 
      stroke="rgba(0,0,0,0.15)" 
      strokeWidth="1.2" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default function Hero({
  selectedCategory,
  onSelectCategory,
  selectedTimeFilter,
  onSelectTimeFilter,
  selectedTown,
  onSelectTown,
  selectedAmenities = [],
  onToggleAmenity,
  onOpenVenue,
  onOpenBurgerMenu,
  theme = 'dark',
  onToggleTheme
}) {
  const handleScrollToDirectory = () => {
    const el = document.querySelector('.directory-grid-section') || document.getElementById('upcoming-events-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="arcona-hero-section">
      {/* Top Header / Brand Bar */}
      <header className="arcona-top-header">
        <div 
          className="arcona-logo-wrapper"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="ZOKAL — Thanet Social Directory"
        >
          <span className="arcona-brand-text">ZOKAL</span>
          <span className="arcona-brand-cross">✕</span>
          <ZokalMonogram />
        </div>

        {/* Top-Right Header Actions (Theme Toggle & Menu) */}
        <div className="arcona-top-header-actions">
          <button 
            className={`arcona-theme-trigger ${theme === 'light' ? 'is-light' : 'is-dark'}`}
            onClick={onToggleTheme}
            title={theme === 'light' ? "Switch to Dark Version" : "Switch to Light Version"}
            aria-label={theme === 'light' ? "Switch to Dark Version" : "Switch to Light Version"}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            <span className="arcona-theme-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Top-Right Burger Navigation Trigger */}
          <button 
            className="arcona-burger-trigger"
            onClick={onOpenBurgerMenu}
            aria-label="Open Explore & Filters Navigation Menu"
            title="Explore & Filters Menu"
          >
            <div className="burger-icon-bars" aria-hidden="true">
              <span className="burger-bar" />
              <span className="burger-bar" />
              <span className="burger-bar" />
            </div>
            <span className="burger-trigger-label">Menu</span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Canvas */}
      <div className="arcona-hero-canvas">
        {/* Left Column: Geometric Cutouts & Large Typography */}
        <div className="arcona-left-stage">
          {/* Top Magenta Arch Cutout (Live Gigs & Festival Goer) */}
          <div className="arcona-arch-purple" title="Live Music & Nightlife in Thanet">
            <img 
              src="/arcona/man-purple.jpg" 
              alt="Thanet live music enthusiast with audio earbud"
              className="arcona-cutout-img"
              loading="eager"
            />
          </div>

          {/* Floating Coral Circle (Coastal Sunset Sun) */}
          <div className="arcona-coral-circle" aria-hidden="true" title="Thanet Coastal Sun" />

          {/* Giant Bold Headline */}
          <h1 className="arcona-headline">
            <span className="headline-line line-things">THINGS</span>
            <span className="headline-line line-to">TO</span>
            <span className="headline-line line-do">DO</span>
          </h1>

          {/* Bottom Yellow Cutout (Outdoor Beach Swimmer / Wellness) */}
          <div className="arcona-arch-yellow" title="Outdoor Coastal Wellness & Beach Days">
            <img 
              src="/arcona/woman-yellow.jpg" 
              alt="Joyful coastal swimmer smiling in Thanet sunshine"
              className="arcona-cutout-img"
              loading="eager"
            />
          </div>

          {/* Bottom-Left Floating Two-Tone Date Badge */}
          <div 
            className="arcona-floating-date-badge"
            onClick={handleScrollToDirectory}
            style={{ cursor: 'pointer' }}
            title="Explore This Weekend's Guide"
          >
            <div className="badge-pill badge-white">THANET COAST</div>
            <div className="badge-pill badge-magenta">30+ HAPPENINGS</div>
          </div>
        </div>

        {/* Right Column: 3 Stacked Event & Activity Cards */}
        <div className="arcona-right-cards">
          {/* Card 1: Ocean Teal — Outdoor & Tidal Swims */}
          <article 
            className="arcona-card card-teal"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('activity');
              if (onSelectTown) onSelectTown('Margate');
              handleScrollToDirectory();
            }}
            role="button"
            tabIndex={0}
            aria-label="Walpole Bay Sunrise Tidal Swim & Coffee Social in Margate"
          >
            <div className="card-photo-frame">
              <img 
                src="/arcona/card-swim.jpg" 
                alt="Wild swimmer at Walpole Bay tidal pool sunrise"
                className="card-photo-img"
                loading="eager"
              />
            </div>
            <div className="card-content">
              <span className="card-eyebrow">OUTDOOR & WELLNESS</span>
              <h2 className="card-title">
                Walpole Bay<br />
                Sunrise Tidal<br />
                Swim & Coffee.
              </h2>
              <div className="card-meta-row">
                <div className="qr-date-group">
                  <QrCodeIcon color="#ffffff" />
                  <div className="qr-text">
                    <span>Sunday 07:30</span>
                    <span>Walpole Pool</span>
                  </div>
                </div>
                <div className="speaker-pill-wrapper">
                  <CursorArrow color="#fbb929" />
                  <span className="speaker-badge badge-yellow">Thanet Swimmers</span>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: Royal Violet — Live Gigs & Harbour Music */}
          <article 
            className="arcona-card card-violet"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('event');
              if (onSelectTown) onSelectTown('Ramsgate');
              if (onOpenVenue) onOpenVenue('ramsgatemusichall');
            }}
            role="button"
            tabIndex={0}
            aria-label="Harbour Arches Acoustic Sessions & Craft Tap at Ramsgate Music Hall"
          >
            <div className="card-photo-frame">
              <img 
                src="/arcona/card-music.jpg" 
                alt="Musician playing acoustic guitar in Ramsgate arches"
                className="card-photo-img"
                loading="eager"
              />
            </div>
            <div className="card-content">
              <span className="card-eyebrow">LIVE MUSIC & GIGS</span>
              <h2 className="card-title">
                Harbour Arches<br />
                Acoustic Sessions<br />
                & Craft Tap.
              </h2>
              <div className="card-meta-row">
                <div className="qr-date-group">
                  <QrCodeIcon color="#ffffff" />
                  <div className="qr-text">
                    <span>Tonight 20:00</span>
                    <span>Ramsgate Arches</span>
                  </div>
                </div>
                <div className="speaker-pill-wrapper">
                  <CursorArrow color="#f5b3d6" />
                  <span className="speaker-badge badge-pink">Music Hall Vaults</span>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: Coral Red — Sports & Floodlit 5-a-Side */}
          <article 
            className="arcona-card card-coral"
            onClick={() => {
              if (onSelectCategory) onSelectCategory('activity');
              if (onOpenVenue) onOpenVenue('hartsdown');
            }}
            role="button"
            tabIndex={0}
            aria-label="Hartsdown Park Floodlit 5-a-Side Football League"
          >
            <div className="card-photo-frame">
              <img 
                src="/arcona/card-sports.jpg" 
                alt="Football player with ball on floodlit 5-a-side turf at Hartsdown"
                className="card-photo-img"
                loading="eager"
              />
            </div>
            <div className="card-content">
              <span className="card-eyebrow">SPORTS & COMMUNITY</span>
              <h2 className="card-title">
                Hartsdown Park<br />
                Floodlit 5-a-Side<br />
                Football League.
              </h2>
              <div className="card-meta-row">
                <div className="qr-date-group">
                  <QrCodeIcon color="#ffffff" />
                  <div className="qr-text">
                    <span>Thursday 19:30</span>
                    <span>Hartsdown Park</span>
                  </div>
                </div>
                <div className="speaker-pill-wrapper">
                  <CursorArrow color="#67cbfa" />
                  <span className="speaker-badge badge-blue">Thanet 5s Squad</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
