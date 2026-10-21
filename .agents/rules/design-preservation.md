# Rule: UI Design Alignment & Brand Identity Preservation

## Core Invariants
1. **Preserve Established Brand Identity**:
   - The primary brand mark (the gradient `VERGE` logo with pulsing amber dot) is the core visual anchor of the site.
   - Never replace, remove, or redesign the brand logo, wordmark, or favicon unless the user explicitly requests a logo redesign.

2. **Default to Style-Only Harmonization**:
   - When asked to "match design", "align look", or "improve design" between sections (e.g., navigation bar matching the hero section):
     - Adjust only visual attributes: background glass opacity, border colors, pill corner radiuses, font weights, and hover effects.
     - Do NOT alter component layout grids, remove navigation links, or discard action buttons.
     - Retain primary action accents (e.g., active tab highlights, primary CTA buttons).

3. **Isolated & Reversible Styling**:
   - Keep design harmonization styles in clear, documented blocks within the stylesheet.
   - Avoid destructive global overwrites that impact unrelated pages or views.
