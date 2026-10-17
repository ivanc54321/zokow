# ZOKAL Design System Guide (`DESIGN.md`)

> **Architectural & Visual Reference for ZOKAL • Thanet Social & Cultural Directory**  
> Use this design system to maintain visual consistency, color harmony, typography, and geometry across all current and future components, cards, banners, modals, and views.

---

## 1. Design Philosophy & Aesthetic Core

The ZOKAL visual identity combines **bold modern editorial design**, **saturated geometric color blocking**, and **high-contrast typography** against a deep obsidian dark mode.

### Key Tenets:
1. **Bold Overlapping Geometry**: Prominent arch/tombstone photo cutouts, circular sun accents, and floating staggered badges that layer over typography and backgrounds.
2. **Vibrant Category Color Signatures**: Highly saturated, distinct colors assigned to lifestyle categories (Teal for Coastal Wellness, Violet for Live Gigs, Coral for Sports, Yellow for Highlights).
3. **Pristine Typography**: High-weight, tightly kerned geometric sans-serif (`Plus Jakarta Sans`) with tight line heights (`0.88` to `1.15`) and no accidental text truncation.
4. **Depth without Clutter**: Flat color cards layered over dark obsidian backdrops, accented with playful micro-elements like angled cursor pointers, vector QR codes, and two-tone badge pairings.

---

## 2. Color Palette & Tokens

### Canvas & Base Backgrounds
| Token / Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Canvas Dark** | `#0b0e1a` | Main page background, hero canvas, footer |
| **Canvas Elevated** | `#121826` | Card backgrounds, modal backdrops, dropdowns |
| **Canvas Surface** | `#182032` | Hover states, pill containers, table rows |
| **Canvas Border** | `rgba(255, 255, 255, 0.10)` | Crisp subtle borders and dividers |

### Category & Accent Colors
| Swatch | Name | Hex Code | Assigned Domain / Mood |
| :---: | :--- | :--- | :--- |
| 🟦 | **Ocean Teal** | `#0097a8` | Outdoor, Tidal Swims, Coastline, Ecology, Walpole Bay |
| 🟪 | **Royal Violet** | `#5d47e8` | Live Music, Gigs, Concerts, Nightlife, Ramsgate Music Hall |
| 🟥 | **Coral Red** | `#f1513a` | Sports, Fitness, 5-a-Side Football, Hot & Trending, High Action |
| 🟨 | **Golden Amber** | `#fab828` / `#fbb929` | Daylight, Beach Socials, Speaker Badges, Cursor Highlights |
| 🟪 | **Magenta / Plum** | `#a8438b` / `#b3458e` | Arts, Culture, Festivals, Staggered Badges |
| 🌸 | **Soft Lilac / Pink** | `#f5b3d6` | Acoustic badges, Secondary host pills |
| 🩵 | **Sky Cyan** | `#67cbfa` | Sports squad tags, Tech meetups, Free entry badges |

### Neutral & Typography Colors
- **Headline Primary**: `#ffffff` (Pure White, 100% opacity)
- **Eyebrow / Subtitles**: `rgba(255, 255, 255, 0.90)`
- **Body & Captions**: `#cbd5e1` (Slate 300)
- **Muted Text**: `#94a3b8` (Slate 400)
- **Tag Dark Text**: `#0c101d` (Deep charcoal used on yellow, pink, and cyan badges)

---

## 3. Typography Hierarchy

Primary Font: **`'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`**  
Secondary Font: **`'Inter', sans-serif`**

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
```

### Typographic Scales & Rules
| Role | Size | Weight | Line Height | Letter Spacing | Styling Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `80px – 88px` | `900` | `0.88` | `-0.035em` | Uppercase, overlapping, no line clamp |
| **Section Header** | `32px – 40px` | `800` | `1.10` | `-0.025em` | Uppercase, white with subtle gradient accents |
| **Card Heading** | `21px – 22px` | `800` | `1.15` | `-0.015em` | 3-line wrap (`<br/>`), punctuated, no ellipsis |
| **Eyebrow / Kicker** | `11px – 12px` | `800` | `1.00` | `0.12em` | Uppercase, high-contrast tint |
| **Badge / Pill Label** | `11.5px – 13px`| `700 – 800` | `1.10` | `0.01em` | Bold, compact padding (`4px 12px`) |
| **Micro Metadata** | `9.5px – 10px` | `700` | `1.18` | `0.02em` | 2-line stacked date/time next to QR codes |

> [!IMPORTANT]
> **Headline Truncation Rule**: Never apply `-webkit-line-clamp` or `text-overflow: ellipsis` to editorial headlines (`.card-title` in feature cards). Always allow titles to wrap naturally into 2 or 3 lines.

---

## 4. Geometry & Shape Language

### 1. The Signature Arch / Tombstone
The semicircular arch is the core visual motif of ZOKAL.
```css
/* Full Arch / Tombstone (curved top, flat bottom) */
.arch-frame {
  border-radius: 9999px 9999px 0 0;
  overflow: hidden;
}

/* Card Photo Arch dimensions */
.card-photo-arch {
  width: 114px;
  min-width: 114px;
  height: 136px;
  border-radius: 57px 57px 0 0;
  overflow: hidden;
  align-self: flex-end;
}
```

### 2. Floating Circular Accent
Used as a cosmic/sunset element intersecting bold text.
```css
.coral-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #f1513a;
}
```

### 3. Staggered Two-Tone Badges
Two overlapping rectangular pill badges creating dimension.
```css
.two-tone-badge-group {
  display: flex;
  align-items: flex-start;
}
.two-tone-badge-primary {
  background-color: #ffffff;
  color: #0b0e1a;
  font-weight: 800;
  font-size: 14px;
  padding: 5px 14px;
  border-radius: 2px;
  z-index: 2;
}
.two-tone-badge-secondary {
  background-color: #b3458e;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  padding: 5px 14px;
  border-radius: 2px;
  margin-left: -4px;
  margin-top: 12px;
  z-index: 1;
}
```

---

## 5. Reusable Component Patterns & Code Recipes

### Recipe A: Stacked Feature Activity Card
Use for spotlight cards, featured event callouts, and category showcases.

```jsx
<article className="arcona-card card-teal" onClick={handleClick}>
  {/* Left: Arch Photo */}
  <div className="card-photo-frame">
    <img src={imageUrl} alt={title} className="card-photo-img" />
  </div>

  {/* Right: Content */}
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
```

```css
.arcona-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-radius: 12px;
  padding: 16px 20px;
  min-height: 154px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}

.arcona-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}
```

---

### Recipe B: Angled Cursor Pointer SVG
Points towards a badge or tag to create a tactile interactive feeling.

```jsx
const CursorArrow = ({ color = '#fbb929' }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'rotate(45deg)', flexShrink: 0 }}
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
```

---

### Recipe C: Miniature Crisp QR Code SVG
Adds authentic event ticketing / check-in styling to any card or modal.

```jsx
const QrCodeIcon = ({ color = '#ffffff' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="4.5" y="4.5" width="2" height="2" fill={color} />
    <rect x="15" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="17.5" y="4.5" width="2" height="2" fill={color} />
    <rect x="2" y="15" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.8" />
    <rect x="4.5" y="17.5" width="2" height="2" fill={color} />
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
```

---

### Recipe D: ZOKAL Coastal Arch Monogram
The signature brand mark pairing an arch with the coastal wave `Z`.

```jsx
const ZokalMonogram = () => (
  <svg width="28" height="34" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M6 35V16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16V35" 
      stroke="white" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M11 17H21L11 27H21" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);
```

---

## 6. Guidelines for Other Pages & Sections

When implementing new features or redesigning existing areas:

1. **Event Cards in Directory Grid**:
   - Give cards a subtle arch-clipped top image (`border-radius: 16px 16px 0 0` or internal arch thumbnail).
   - Use category-tinted badge pills (`badge-yellow`, `badge-pink`, `badge-blue`) for towns and categories.
2. **Interactive Thanet Map View**:
   - Marker pins should use the category tokens (Teal for Walpole, Violet for Ramsgate Music Hall, Coral for Hartsdown Park).
   - Popups should match the `.arcona-card` layout with miniature arch images.
3. **Modals (Event & Venue Details)**:
   - Header banner should feature the arch-framed photography with category colored backdrop.
   - Host / organizer should be rendered with the signature pill badge and pointer cursor.
4. **Call to Action Banners**:
   - Use high-contrast solid backgrounds (`#f1513a` or `#5d47e8`) with bold white uppercase headings and pill buttons.

---

## 7. Responsive Breakpoint Rules
- **Desktop (`>= 1080px`)**: Two-column layout (58% Left Stage / 42% Right Cards).
- **Tablet (`600px – 1079px`)**: Single column stack with left stage centered (`max-width: 500px`) and full-width stacked cards.
- **Mobile (`< 600px`)**:
  - Hero left stage scales to `400px` height.
  - Headline font size reduces from `88px` to `64px`.
  - Card title font size scales to `18px`.
  - Photo frame adjusts to `92px × 112px`.
