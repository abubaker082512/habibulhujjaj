# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Sacred Editorial."** 

This system moves away from the "utility-first" look of standard travel agencies to embrace a high-end, editorial aesthetic that evokes the serenity of a spiritual journey. It treats every interface as a digital concierge—sophisticated, calm, and authoritative. By breaking the rigid, boxed-in grids typical of the industry, we use intentional asymmetry, generous whitespace (using the `20` and `24` spacing tokens), and layered surfaces to create a sense of wandering through a premium physical space. 

The goal is to move the user from "booking a trip" to "beginning a pilgrimage," using a visual language that feels as intentional as a leather-bound journal or a gallery monograph.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, scholarly Primary Teal (`#013334`) and a radiant Secondary Gold (`#CD9933`). This is supported by a sophisticated range of neutral surfaces that provide "air" to the layout.

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting directly on a `surface` background creates a natural, soft-edge transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create depth:
- **Lowest Tier (`surface_container_lowest`):** Use for primary content cards to make them "pop" against a darker background.
- **High Tier (`surface_container_high`):** Use for sidebar or navigation elements to provide a subtle sense of elevation without shadows.

### The "Glass & Gradient" Rule
To add visual "soul," avoid flat blocks of color. 
- **Signature Textures:** Use subtle linear gradients for hero sections, transitioning from `primary_container` (#013334) to `primary` (#001c1d). 
- **Glassmorphism:** For floating navigation or modal overlays, use `surface` colors at 80% opacity with a `20px` backdrop-blur. This allows the spiritual imagery beneath to bleed through, softening the interface.

---

## 3. Typography
The typographic system creates an interplay between the traditional (Serif) and the modern (Sans-Serif), establishing a rhythm of "The Scholar" and "The Guide."

*   **Headings (`notoSerif`):** Used for `display` and `headline` scales. This represents the "Traditional" aspect of the brand—authoritative, timeless, and elegant.
*   **Body & Labels (`manrope`):** Used for `title`, `body`, and `label` scales. This provides the "Modern" clarity required for high-readability logistics and travel details.

**Hierarchy Strategy:** 
Large-scale `display-lg` typography should be used as an atmospheric element—often overlapping images or sitting asymmetrically in the whitespace—rather than just a "header."

---

## 4. Elevation & Depth
Elevation is achieved through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section to create a natural "lift."
*   **Ambient Shadows:** If a card requires a floating effect, use an extra-diffused shadow: `blur: 40px`, `y-offset: 8px`, `opacity: 6%`, tinted with the `primary` color. Never use pure black or grey shadows.
*   **The "Ghost Border" Fallback:** If a container must be defined against a similar background, use a "Ghost Border": the `outline_variant` token at **15% opacity**. This keeps the interface feeling "open."

---

## 5. Components

### Buttons
*   **Primary:** A gradient-filled container (`secondary` to `secondary_fixed_dim`) with `on_secondary` text. Roundedness: `md` (0.375rem).
*   **Secondary (Outlined):** A "Ghost Border" using the `secondary` color at 40% opacity.
*   **Tertiary:** Text-only in `primary` with a `secondary` 2px underline that only spans 60% of the text width for an editorial flair.

### Input Fields
*   **Style:** Minimalist. No four-sided borders. Use a `1px` bottom border in `outline_variant`. On focus, the border transitions to `secondary_gold` and the label slides up into a `label-sm` style.

### Cards & Lists
*   **Forbid Dividers:** Do not use horizontal lines between list items. Use the spacing scale (`4` or `5`) to create separation or alternate background shades between `surface_container_low` and `surface_container_lowest`.
*   **Package Cards:** Use an asymmetrical image crop (e.g., one rounded corner at `xl` and others at `none`) to break the "template" look.

### Specific Components for Umrah & Travel
*   **The "Itinerary Timeline":** A vertical line using a gradient from `secondary_gold` to transparent. Stop points are small `surface_container_lowest` circles with `secondary_gold` centers.
*   **The "Luxury Package" Badge:** A floating glassmorphic chip with a `secondary_gold` 10% opacity fill and a backdrop-blur.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts where text blocks and images slightly overlap to create an editorial feel.
*   **Do** use "Breathing Room." If you think there is enough whitespace, add one increment more from the spacing scale.
*   **Do** ensure all "Call to Action" elements use the Gold (`#CD9933`) accents sparingly to maintain their "premium" value.

### Don't:
*   **Don't** use 100% opaque, high-contrast borders. It breaks the "Sacred Editorial" flow.
*   **Don't** use standard "Drop Shadows." Stick to Tonal Layering or Ambient Shadows.
*   **Don't** center-align long blocks of body text. Keep body text left-aligned for a modern, clean reading experience, reserving center-alignment only for high-level `display` quotes.
*   **Don't** use generic stock photography. Use images with a warm, natural tint that complements the Teal and Gold palette.