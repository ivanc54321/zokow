import React, { useState } from "react";

const VIBE_PILLARS = [
  {
    id: "food",
    badge: "🍴 CULINARY COASTAL",
    badgeBg: "bg-[#FFD600] text-[#0A0B0F]",
    cardBg: "bg-[#D64527]",
    title: "FOOD.",
    description:
      "From fresh North Sea catch at harbourside shacks to Neapolitan sourdough & natural wine bars.",
    stat: "18 COASTAL SPOTS",
    cta: "View food spots",
    filterTarget: "SOCIAL & COFFEE",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "drink",
    badge: "🍸 COCKTAILS & CRAFT BEERS",
    badgeBg: "bg-white text-[#0A0B0F]",
    cardBg: "bg-[#6936B5]",
    title: "DRINK.",
    description:
      "Intimate taprooms, natural wine cellars, and speakeasies with signature coastal botanicals.",
    stat: "24 NIGHT BARS",
    cta: "Explore night bars",
    filterTarget: "NIGHTLIFE & GIGS",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "event",
    badge: "🎵 LIVE GIGS & FESTIVALS",
    badgeBg: "bg-[#FFD600] text-[#0A0B0F]",
    cardBg: "bg-[#088F9E]",
    title: "EVENT.",
    description:
      "Outdoor festival stages at Dreamland, indie basement sets, and late DJ sessions by the waves.",
    stat: "48 LIVE LISTINGS",
    cta: "View live gigs",
    filterTarget: "ALL",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  },
];

const INITIAL_SECTIONS = [
  {
    id: "whats-on-row",
    filterKey: "NIGHTLIFE & GIGS",
    badge: "UPCOMING GIGS & HAPPENINGS",
    badgeClass: "bg-[#D64527] text-white",
    title: "NIGHTLIFE, LIVE MUSIC & DAYTIME CLUBBING.",
    subtitle: "The most anticipated gatherings, DJ residencies, and coastal happenings",
    items: [
      {
        category: "DAYTIME CLUBBING",
        title: "80s & 90s Over 30s Daytime Clubbing - Margate (Beyond 30).",
        time: "Sat 16:00",
        subvenue: "The Drill Shed",
        town: "Margate Lido",
        cardBg: "bg-[#6936B5]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "LIVE HOUSE MUSIC",
        title: "Heidi (Jackathon) Live: House Music That Never Forgets to Boogie.",
        time: "Fri 21:00",
        subvenue: "Faith In Strangers",
        town: "Cliftonville",
        cardBg: "bg-[#088F9E]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "PADEL & PILATES",
        title: "REWD Padel, Reformer Pilates & Spin: Taster Sessions & Social.",
        time: "Daily 09:00",
        subvenue: "Rewd Lounge",
        town: "Westwood",
        cardBg: "bg-[#00A878]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "MAKER WORKSHOP",
        title: "Ramsgate Town Shed: Adult Woodwork, DIY & Practical Skills.",
        time: "Wed 18:30",
        subvenue: "Harbour Arches",
        town: "Ramsgate",
        cardBg: "bg-[#D64527]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "sports-row",
    filterKey: "SPORTS & 5-A-SIDE",
    badge: "ACTIVE THANET",
    badgeClass: "bg-[#E62E5C] text-white",
    title: "SPORTS, FITNESS & HARTSDOWN 5-A-SIDE.",
    subtitle:
      "5-a-side floodlit football at Hartsdown Park, coastal runs, boxing bootcamps & tidal swims",
    items: [
      {
        category: "PADEL & FITNESS",
        title: "REWD Padel, Reformer Pilates & Spin: Taster Sessions & Social.",
        time: "Daily 09:00",
        subvenue: "Intro Sessions £10",
        town: "REWD Club",
        cardBg: "bg-[#088F9E]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "COMMUNITY TENNIS",
        title: "Rusty Rackets: Adult Beginner & Returner Tennis (4 Weeks Free).",
        time: "Sun 10:00",
        subvenue: "Spencer Square",
        town: "Ramsgate",
        cardBg: "bg-[#526AE5]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "SOCIAL ROLL-UP",
        title: "Thanet Indoor Bowls: Social Roll-Up & Welcoming Visitors.",
        time: "Thu 14:00",
        subvenue: "Margate Bowls",
        town: "Margate",
        cardBg: "bg-[#D64527]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "INCLUSIVE SPORTS",
        title: "Active Thanet: Inclusive Community Sports & Taster Sessions.",
        time: "Tue 18:00",
        subvenue: "Hartsdown Park",
        town: "Thanet Squad",
        cardBg: "bg-[#6936B5]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "volunteering-row",
    filterKey: "COASTAL CARE",
    badge: "COASTAL CARE",
    badgeClass: "bg-[#00A878] text-white",
    title: "VOLUNTEERING & COASTAL CONSERVATION.",
    subtitle:
      "Lend a hand with beach conservation, community permaculture & youth mentorship",
    items: [
      {
        category: "CRAFT & REPAIR",
        title: "Ramsgate Town Shed: Adult Woodwork, DIY & Practical Skills.",
        time: "Wed 18:30",
        subvenue: "Community Shed",
        town: "Ramsgate",
        cardBg: "bg-[#E59A28]",
        tagBg: "bg-[#0A0B0F] text-white",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "GREEN CARE",
        title: "The Sunken Garden: Volunteer Coastal Gardening & Green Care.",
        time: "Sat 10:30",
        subvenue: "Westbrook Cliff",
        town: "Margate",
        cardBg: "bg-[#00A878]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "SOCIAL PRESCRIBING",
        title: "Simply Connect Thanet: Social Prescribing & Community Hub.",
        time: "Mon 11:00",
        subvenue: "Community Hub",
        town: "Broadstairs",
        cardBg: "bg-[#6936B5]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "MARINE CLEAN",
        title: "Thanet Coast Project: Botany Bay Marine Clean & Ecology Walk.",
        time: "Sun 08:30",
        subvenue: "Botany Bay",
        town: "Broadstairs",
        cardBg: "bg-[#088F9E]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "social-row",
    filterKey: "SOCIAL & COFFEE",
    badge: "COMMUNITY",
    badgeClass: "bg-[#526AE5] text-white",
    title: "SOCIAL CIRCLES & MEETUPS.",
    subtitle:
      "Connect with friendly groups for co-working, board games, literature & coffee",
    items: [
      {
        category: "COOKERY & CRAFT",
        title: "TCDT Community Workshops: Cookery, Craft & Thanet History.",
        time: "Thu 17:30",
        subvenue: "Old Town Hall",
        town: "Margate",
        cardBg: "bg-[#D64527]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "BOARD GAMES",
        title: "Board at Home: Structured Tabletop & Board Game Social Night.",
        time: "Wed 19:00",
        subvenue: "High Street",
        town: "Ramsgate",
        cardBg: "bg-[#00A878]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "TECH & FOUNDERS",
        title: "Margate Creative Tech & Founder Meetup — Co-Working & Drinks.",
        time: "Fri 17:00",
        subvenue: "Marine Terrace",
        town: "Margate",
        cardBg: "bg-[#526AE5]",
        tagBg: "bg-[#FFD600] text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
      },
      {
        category: "CREATIVE ARTS",
        title: "The Judgement-Free Tattoo Learning & Practice Community.",
        time: "Sun 13:00",
        subvenue: "Old Town Studio",
        town: "Margate",
        cardBg: "bg-[#6936B5]",
        tagBg: "bg-white text-[#0A0B0F]",
        image:
          "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export default function VibePreviewApp() {
  const [sections] = useState(INITIAL_SECTIONS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedTitles, setSavedTitles] = useState([
    "Walpole Bay Sunrise Tidal Swim & Coffee",
    "Harbour Arches Acoustic Sessions & Craft Tap",
  ]);
  const [isLightMode, setIsLightMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleSave = (title) => {
    setSavedTitles((prev) => {
      const isSaved = prev.includes(title);
      const next = isSaved ? prev.filter((t) => t !== title) : [...prev, title];
      showToast(isSaved ? `Removed "${title.slice(0, 28)}..." from saved` : `Saved "${title.slice(0, 28)}..."`);
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans antialiased selection:bg-[#FFD600] selection:text-[#0A0B0F] ${
      isLightMode ? "bg-[#f4f5f8] text-[#0A0B0F]" : "bg-[#0A0B0F] text-white"
    }`}>
      
      {/* PREVIEW BANNER SWITCHER */}
      <div className="bg-gradient-to-r from-[#D64527] via-[#6936B5] to-[#088F9E] text-white text-xs font-black py-2 px-4 shadow-md sticky top-0 z-[60]">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFD600] text-[#0A0B0F] px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              ⚡ STANDALONE PREVIEW
            </span>
            <span className="opacity-95">Graphic Poster Vibe Redesign</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <a 
              href="/" 
              className="bg-black/40 hover:bg-black/70 px-3 py-1 rounded transition flex items-center gap-1.5"
            >
              <span>← Return to Main Directory</span>
            </a>
            <a 
              href="/admin.html" 
              className="bg-black/40 hover:bg-black/70 px-3 py-1 rounded transition hidden sm:inline"
            >
              CMS Admin
            </a>
          </div>
        </div>
      </div>

      {/* TOP NAVBAR */}
      <header className={`sticky top-8 z-50 border-b backdrop-blur-md transition-colors ${
        isLightMode 
          ? "bg-white/90 border-black/10 text-black" 
          : "bg-[#0A0B0F]/90 border-white/10 text-white"
      }`}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A878] animate-pulse" />
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isLightMode ? "text-black/60" : "text-white/60"}`}>
              Thanet Live
            </span>
          </div>

          <a href="#top" className="flex items-center gap-3 group">
            <span className="text-xl sm:text-2xl font-black tracking-[0.22em] uppercase">
              VERGE
            </span>
            <span className="text-[#FFD600] text-sm">×</span>
            <span className="w-7 h-7 rounded-lg bg-[#D64527] flex items-center justify-center font-black text-xs text-white border border-white/20 shadow-sm group-hover:scale-105 transition-transform">
              M
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLightMode(!isLightMode)}
              className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-2 rounded-lg border transition ${
                isLightMode 
                  ? "bg-gray-100 hover:bg-gray-200 border-black/15 text-black" 
                  : "bg-[#161922] hover:bg-[#202533] border-white/15 text-white"
              }`}
            >
              {isLightMode ? "🌙 DARK" : "☀️ LIGHT"}
            </button>
            <a 
              href="/"
              className={`text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition ${
                isLightMode 
                  ? "bg-gray-100 hover:bg-gray-200 border-black/15 text-black" 
                  : "bg-[#161922] hover:bg-[#202533] border-white/15 text-white"
              }`}
            >
              ☰ MENU
            </a>
          </div>
        </div>
      </header>

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFD600] text-[#0A0B0F] px-4 py-2.5 rounded-xl font-black text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14" id="top">
        {/* 1. HERO SECTION */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className={`lg:col-span-7 border rounded-[32px] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-center min-h-[450px] shadow-2xl ${
              isLightMode ? "bg-white border-black/10" : "bg-[#12131A] border-white/10"
            }`}>
              <div className="relative z-10 grid grid-cols-12 items-center gap-4">
                <div className="col-span-5 sm:col-span-4">
                  <div className="w-36 sm:w-44 h-56 sm:h-64 rounded-full overflow-hidden border-4 border-[#E59A28] shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                      alt="Thanet Local"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-7 sm:col-span-4 z-20 -ml-6 sm:-ml-8">
                  <h1 className={`text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl ${
                    isLightMode ? "text-[#0A0B0F]" : "text-white"
                  }`}>
                    THINGS
                    <br />
                    <span className="text-[#FFD600]">TO</span>
                    <br />
                    DO.
                  </h1>
                </div>
                <div className="col-span-12 sm:col-span-4 flex justify-end sm:block mt-2 sm:mt-16">
                  <div className="w-36 sm:w-44 h-56 sm:h-64 rounded-full overflow-hidden border-4 border-[#6936B5] shadow-2xl ml-auto transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
                      alt="Thanet Social"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-20 mt-6 sm:mt-2 flex flex-wrap items-center gap-2">
                <span className="bg-white text-[#0A0B0F] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded shadow">
                  THANET COAST
                </span>
                <span className="bg-[#E62E5C] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded -ml-1 shadow">
                  30+ HAPPENINGS
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <article 
                onClick={() => toggleSave("Walpole Bay Sunrise Tidal Swim & Coffee")}
                className="bg-[#088F9E] rounded-[24px] p-4 flex items-center gap-4 text-white shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
                  alt="Walpole Bay"
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-[16px] object-cover shrink-0 border border-white/20 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/85 block mb-0.5">
                    OUTDOOR & WELLNESS
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight mb-3">
                    Walpole Bay Sunrise Tidal Swim & Coffee.
                  </h3>
                  <div className="pt-2 border-t border-white/25 flex items-center justify-between gap-2">
                    <div className="text-[10px] leading-tight font-bold">
                      <div>📅 Sunday 07:30</div>
                      <div className="opacity-80">Walpole Pool</div>
                    </div>
                    <span className="bg-[#FFD600] text-[#0A0B0F] text-[10px] font-black uppercase px-2.5 py-1 rounded shrink-0">
                      ▲ Thanet Swimmers
                    </span>
                  </div>
                </div>
              </article>

              <article 
                onClick={() => toggleSave("Harbour Arches Acoustic Sessions & Craft Tap")}
                className="bg-[#6936B5] rounded-[24px] p-4 flex items-center gap-4 text-white shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
                  alt="Harbour Arches"
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-[16px] object-cover shrink-0 border border-white/20 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/85 block mb-0.5">
                    LIVE MUSIC & GIGS
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight mb-3">
                    Harbour Arches Acoustic Sessions & Craft Tap.
                  </h3>
                  <div className="pt-2 border-t border-white/25 flex items-center justify-between gap-2">
                    <div className="text-[10px] leading-tight font-bold">
                      <div>📅 Tonight 20:00</div>
                      <div className="opacity-80">Ramsgate Arches</div>
                    </div>
                    <span className="bg-[#FFD600] text-[#0A0B0F] text-[10px] font-black uppercase px-2.5 py-1 rounded shrink-0">
                      ▲ Music Hall Vaults
                    </span>
                  </div>
                </div>
              </article>

              <article 
                onClick={() => toggleSave("Hartsdown Park Floodlit 5-a-Side Football League")}
                className="bg-[#D64527] rounded-[24px] p-4 flex items-center gap-4 text-white shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80"
                  alt="Hartsdown Park"
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-[16px] object-cover shrink-0 border border-white/20 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/85 block mb-0.5">
                    SPORTS & COMMUNITY
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight tracking-tight mb-3">
                    Hartsdown Park Floodlit 5-a-Side Football League.
                  </h3>
                  <div className="pt-2 border-t border-white/25 flex items-center justify-between gap-2">
                    <div className="text-[10px] leading-tight font-bold">
                      <div>📅 Thursday 19:30</div>
                      <div className="opacity-80">Hartsdown Park</div>
                    </div>
                    <span className="bg-white text-[#0A0B0F] text-[10px] font-black uppercase px-2.5 py-1 rounded shrink-0">
                      ▲ Thanet 5s Squad
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[20px] overflow-hidden shadow-2xl">
            <a
              href="#community"
              className="bg-[#E59A28] hover:bg-[#f2a633] text-[#0A0B0F] py-5 px-6 flex items-center justify-center gap-3 text-lg sm:text-xl font-black uppercase tracking-wide transition"
            >
              <span>BECOME A MEMBER</span>
              <span className="text-2xl">→</span>
            </a>
            <a
              href="#whats-on"
              className="bg-[#526AE5] hover:bg-[#6178f2] text-white py-5 px-6 flex items-center justify-center gap-3 text-lg sm:text-xl font-black uppercase tracking-wide transition"
            >
              <span>UPCOMING EVENTS</span>
              <span className="text-2xl">→</span>
            </a>
          </div>
        </section>

        {/* 2. EXPERIENCE THE VIBE */}
        <section id="vibe" className="pt-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-[#D64527] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow">
              THREE PILLARS OF THANET CULTURE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.92] mb-3">
              EXPERIENCE THE VIBE.
            </h2>
            <p className={isLightMode ? "text-black/75 text-sm sm:text-base" : "text-white/75 text-sm sm:text-base"}>
              Curated culinary havens, craft mixology, and high-energy live concerts under coastal skies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {VIBE_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className={`${pillar.cardBg} rounded-[28px] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-xl hover:-translate-y-1.5 transition duration-300`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="z-10">
                    <span
                      className={`inline-block ${pillar.badgeBg} text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-5 shadow-sm`}
                    >
                      {pillar.badge}
                    </span>
                    <h3 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-white/95 text-sm leading-relaxed max-w-[220px] font-medium">
                      {pillar.description}
                    </p>
                  </div>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-28 sm:w-32 h-48 sm:h-52 object-cover rounded-full border-4 border-white/25 shadow-xl shrink-0"
                  />
                </div>
                <div className="mt-7 pt-4 border-t border-white/25 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white/90">
                    ✦ {pillar.stat}
                  </span>
                  <button
                    onClick={() => {
                      setActiveCategory(pillar.filterTarget);
                      const el = document.getElementById("whats-on");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-white text-[#0A0B0F] hover:bg-[#FFD600] text-xs font-black uppercase px-4 py-2.5 rounded-full transition shadow"
                  >
                    {pillar.cta} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. WHAT'S ON IN THANET */}
        <section id="whats-on" className="pt-6 space-y-12">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6 ${
            isLightMode ? "border-black/15" : "border-white/15"
          }`}>
            <div>
              <span className="inline-block bg-[#E59A28] text-[#0A0B0F] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mb-3 shadow">
                UPCOMING GIGS & HAPPENINGS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
                WHAT’S ON IN THANET.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#D64527] text-white text-xs font-black uppercase px-3.5 py-2 rounded-xl shadow">
                48 LIVE LISTINGS
              </span>
              <span className="bg-white text-[#0A0B0F] text-xs font-black uppercase px-3.5 py-2 rounded-xl shadow">
                MARGATE • RAMSGATE • BROADSTAIRS
              </span>
            </div>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "ALL", label: "ALL HAPPENINGS (48)" },
                { key: "NIGHTLIFE & GIGS", label: "🎵 NIGHTLIFE & GIGS" },
                { key: "SPORTS & 5-A-SIDE", label: "⚡ SPORTS & 5-A-SIDE" },
                { key: "COASTAL CARE", label: "🌱 VOLUNTEERING & COAST" },
                { key: "SOCIAL & COFFEE", label: "👥 SOCIAL CIRCLES" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition shadow-sm ${
                    activeCategory === tab.key
                      ? "bg-[#FFD600] text-[#0A0B0F]"
                      : isLightMode 
                        ? "bg-gray-200 text-black hover:bg-[#526AE5] hover:text-white"
                        : "bg-[#161922] text-white/80 hover:bg-[#526AE5] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gigs, padel, Margate..."
              className={`w-full lg:w-72 border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition ${
                isLightMode 
                  ? "bg-white border-black/15 focus:border-[#526AE5] text-black placeholder-black/40" 
                  : "bg-[#161922] border-white/15 focus:border-[#FFD600] text-white placeholder-white/40"
              }`}
            />
          </div>

          {/* Event Category Rows */}
          <div className="space-y-14">
            {sections
              .filter(
                (s) => activeCategory === "ALL" || s.filterKey === activeCategory
              )
              .map((section) => {
                const filteredItems = section.items.filter(
                  (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.town.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (filteredItems.length === 0) return null;

                return (
                  <div key={section.id} className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`${section.badgeClass} text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow`}
                        >
                          {section.badge}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded ${
                          isLightMode ? "bg-black/10 text-black" : "bg-white/10 text-white"
                        }`}>
                          {filteredItems.length} LISTINGS
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                        {section.title}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isLightMode ? "text-black/70" : "text-white/70"}`}>
                        {section.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredItems.map((item, i) => {
                        const isSaved = savedTitles.includes(item.title);
                        return (
                          <article
                            key={i}
                            onClick={() => toggleSave(item.title)}
                            className={`${item.cardBg} rounded-[24px] p-4 flex flex-col justify-between text-white shadow-xl hover:-translate-y-1.5 transition duration-200 cursor-pointer`}
                          >
                            <div>
                              <div className="relative mb-3.5">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-44 object-cover rounded-[16px] border border-white/20 shadow-inner"
                                />
                                <span className="absolute top-2.5 left-2.5 bg-[#0A0B0F]/90 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                                  {item.category}
                                </span>
                                <span
                                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow transition-transform ${
                                    isSaved
                                      ? "bg-[#FFD600] text-black scale-110"
                                      : "bg-black/60 text-white hover:scale-105"
                                  }`}
                                  title={isSaved ? "Saved" : "Save event"}
                                >
                                  {isSaved ? "✓" : "+"}
                                </span>
                              </div>
                              <h4 className="text-base sm:text-lg font-black leading-snug tracking-tight mb-4 line-clamp-2">
                                {item.title}
                              </h4>
                            </div>

                            <div className="pt-3 border-t border-white/25 flex items-center justify-between gap-2">
                              <div className="text-[11px] leading-tight font-bold text-white/95">
                                <div>📅 {item.time}</div>
                                <div className="text-white/80 font-semibold">
                                  {item.subvenue}
                                </div>
                              </div>
                              <span
                                className={`${item.tagBg} text-[10px] font-black uppercase tracking-wide px-2.5 py-1.5 rounded shrink-0 shadow-sm`}
                              >
                                ▲ {item.town}
                              </span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Full-Width Split Directory Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 rounded-[24px] overflow-hidden shadow-2xl">
            <div className="md:col-span-8 bg-[#526AE5] p-6 sm:px-8 flex flex-col justify-center text-white">
              <span className="inline-block self-start bg-[#FFD600] text-[#0A0B0F] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-2 shadow">
                COMPLETE DIRECTORY
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-1">
                EXPLORE ALL HAPPENINGS ACROSS THANET.
              </h3>
              <p className="text-white/85 text-xs sm:text-sm">
                Browse our full directory of 48 events across Margate, Ramsgate & Broadstairs.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory("ALL");
                setSearchQuery("");
                const el = document.getElementById("whats-on");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="md:col-span-4 bg-[#E59A28] hover:bg-[#f3a835] text-[#0A0B0F] p-6 sm:px-8 flex items-center justify-center gap-3 text-base sm:text-lg font-black uppercase tracking-wide transition shadow"
            >
              <span>SHOW ALL 48 EVENTS</span>
              <span className="text-xl">↓</span>
            </button>
          </div>
        </section>

        {/* 4. BUILD YOUR BEST COMMUNITY */}
        <section
          id="community"
          className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
        >
          <div className="lg:col-span-7 bg-[#6936B5] rounded-[32px] p-7 sm:p-10 flex flex-col justify-between shadow-xl text-white">
            <div>
              <span className="inline-block bg-[#FFD600] text-[#0A0B0F] text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5 shadow">
                ✦ FOR LOCALS & ORGANISERS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.92] mb-5">
                BUILD YOUR BEST{" "}
                <span className="bg-[#FFD600] text-[#0A0B0F] px-3 py-0.5 rounded-xl inline-block mt-1">
                  COMMUNITY
                </span>{" "}
                STARTING FROM HERE.
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-medium">
                Meet and communicate with the best people to run projects, gigs, sports clubs, or weekend gatherings across Margate, Ramsgate, and Broadstairs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/20">
              <div className="bg-[#0A0B0F]/45 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-[#FFD600] text-xs font-black uppercase mb-1">
                  👥 BUILD COMMUNITY
                </div>
                <div className="text-white/85 text-xs font-semibold">
                  Social circles & local groups
                </div>
              </div>
              <div className="bg-[#0A0B0F]/45 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-[#00E5FF] text-xs font-black uppercase mb-1">
                  📅 SHARE EVENTS
                </div>
                <div className="text-white/85 text-xs font-semibold">
                  List gigs in 60 seconds
                </div>
              </div>
              <div className="bg-[#0A0B0F]/45 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-[#FF2A6D] text-xs font-black uppercase mb-1">
                  🧭 COAST DIRECTORY
                </div>
                <div className="text-white/85 text-xs font-semibold">
                  Margate, Ramsgate & beyond
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className={`border rounded-[32px] p-6 grid grid-cols-3 gap-3 items-center shadow-xl ${
              isLightMode ? "bg-white border-black/10" : "bg-[#12141C] border-white/10"
            }`}>
              <div className="space-y-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Marcus K"
                  className="w-full h-40 object-cover rounded-full border-2 border-[#088F9E] shadow"
                />
                <span className="block bg-white text-[#0A0B0F] text-[10px] font-black uppercase text-center py-1.5 px-2 rounded shadow-sm">
                  MARCUS K. • DJ
                </span>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  alt="Founder"
                  className="w-full h-52 object-cover rounded-full border-2 border-[#FFD600] shadow"
                />
              </div>
              <div className="space-y-2.5">
                <span className="block bg-[#E62E5C] text-white text-[10px] font-black uppercase text-center py-1.5 px-2 rounded shadow-sm">
                  PASS HOLDERS
                </span>
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                  alt="Organiser"
                  className="w-full h-40 object-cover rounded-full border-2 border-[#D64527] shadow"
                />
              </div>
            </div>

            <div className="bg-[#088F9E] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between text-white shadow-xl">
              <p className="text-base sm:text-lg font-extrabold leading-snug mb-5">
                “VERGE helped us pack out our residency without playing the social algorithm game. The most authentic local crowd in Thanet.”
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/25">
                <span className="bg-[#FFD600] text-[#0A0B0F] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded shadow">
                  ✓ VERIFIED THANET PASSHOLDER
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={`border-t py-12 px-4 sm:px-6 lg:px-8 mt-16 transition-colors ${
        isLightMode ? "bg-white border-black/10 text-black/70" : "bg-[#0d0e14] border-white/10 text-white/70"
      }`}>
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-widest uppercase">VERGE</span>
            <span>•</span>
            <span>Margate, Ramsgate & Broadstairs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-[#FFD600] transition">Live Directory</a>
            <a href="/admin.html" className="hover:text-[#FFD600] transition">CMS Admin</a>
            <a href="#top" className="hover:text-[#FFD600] transition">Back to Top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
