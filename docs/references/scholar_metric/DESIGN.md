# Design System Document: Academic Editorial

## 1. Overview & Creative North Star: "The Modern Scholar"
This design system moves away from the utilitarian, "admin-panel" feel typical of campus apps. Our Creative North Star is **The Modern Scholar**—an experience that feels like a high-end digital journal or a curated library. It balances the gravity of institutional tradition with the fluid, airy movement of modern digital editorial design.

We achieve this through **Intentional Asymmetry** and **Tonal Depth**. By avoiding rigid, centered grids in favor of purposeful whitespace and overlapping "paper" layers, we create a sense of prestige. This isn't just an app for checking grades; it’s a premium digital companion for an academic journey.

---

## 2. Colors: Tonal Prestige
The palette is rooted in deep, authoritative navies, but it lives in the subtle shifts between surface tiers.

### The Palette
- **Primary Focus:** `primary` (#000666) and `primary_container` (#1A237E). Use these for high-level branding and primary actions.
- **The Academic Accent:** `secondary` (#705d00) and `secondary_fixed` (#ffe16d). These "Gold" tones are reserved for achievement, highlights, and critical "hero" moments.
- **Surface Neutrals:** From `surface` (#f9f9fb) to `surface_container_highest` (#e2e2e4).

### Key Rules for Implementation
*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for sectioning. Use background shifts (e.g., a `surface_container_low` card on a `surface` background) to define boundaries.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine vellum. An inner container should always be one tier "higher" or "lower" than its parent (e.g., a `surface_container_lowest` search bar nested inside a `surface_container_high` header).
*   **The "Glass & Gradient" Rule:** To avoid a "flat" template look, use a subtle linear gradient from `primary` to `primary_container` on large buttons or hero sections. This adds a "soul" to the color that flat hex codes lack.
*   **Signature Textures:** For modal overlays or floating navigation bars, use **Glassmorphism**. Apply `surface_container_low` at 80% opacity with a 20px backdrop blur to let campus imagery or content bleed through softly.

---

## 3. Typography: The Editorial Scale
We utilize **Inter** to bridge the gap between technical clarity and editorial elegance.

*   **Display (lg/md/sm):** Use for bold, impactful moments like "Welcome back" or "Dean's List." These should feel like magazine headers—tight letter spacing (-0.02em) and authoritative.
*   **Headline & Title:** These are your navigational anchors. `headline-sm` (1.5rem) should be used for section titles to maintain a "journal" feel.
*   **Body (lg/md/sm):** Content is king. `body-lg` (1rem) is the workhorse for course descriptions. Ensure line heights are generous (1.5x) to prevent "academic density" fatigue.
*   **Labels:** Use `label-md` (0.75rem) in All Caps with slightly increased letter spacing (+0.05em) for category tags or metadata.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines. We use light.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_lowest` (Pure White) card sitting on a `surface_container_low` background creates a natural, soft lift.
*   **Ambient Shadows:** When a floating effect is required (like a Floating Action Button or a featured Course Card), use an extra-diffused shadow.
    *   *Shadow Formula:* Y: 8px, Blur: 24px, Color: `on_surface` at 6% opacity.
*   **The "Ghost Border" Fallback:** If a container lacks sufficient contrast, use a "Ghost Border": `outline_variant` at 15% opacity. Never use 100% opaque borders.
*   **Glassmorphism:** Use for persistent elements (Bottom Nav, Top App Bar). This keeps the user connected to the "scroll" behind the interface, making the app feel like a single, cohesive environment.

---

## 5. Components

### Cards & Lists
*   **The Rule:** Forbid divider lines.
*   **Implementation:** Separate list items using 12px of vertical whitespace or a subtle shift to `surface_container_low` on every second item.
*   **Corner Radius:** Cards must use `lg` (1rem / 16px) for a modern, approachable feel.

### Buttons
*   **Primary:** `primary` background with `on_primary` text. Use `xl` (1.5rem) corner radius for a "pill" shape that stands out against rectangular cards.
*   **Secondary:** `secondary_container` background. Use for "Apply" or "Register" to leverage the gold accent.
*   **Tertiary:** Ghost style. No background, `primary` text.

### Inputs & Fields
*   **Style:** Use `surface_container_highest` for the input track. No border.
*   **State:** On focus, transition the background to `surface_container_lowest` and add a 1px "Ghost Border" using `primary`.

### Specialized Campus Components
*   **The Grade Badge:** A `secondary_fixed` circular container with `on_secondary_fixed` text, using `title-md` for the grade letter.
*   **The Course Timeline:** A vertical track using a 2px `outline_variant` line, but only "connecting" icons—do not box the text.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical padding. For example, a 24px left margin and a 16px right margin on a headline can create a sophisticated editorial look.
*   **Do** use Ionicons at "Light" or "Outline" weights to maintain the airy, premium feel.
*   **Do** use high-quality campus photography with a subtle `primary` color overlay (10-20% opacity) to unify imagery with the brand.

### Don't
*   **Don't** use 1px solid dividers between list items. It breaks the "paper layer" illusion.
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1a1c1d) to maintain tonal softness.
*   **Don't** crowd the interface. If a screen feels "busy," increase the `surface` padding from 16px to 24px and remove a piece of metadata. Less is more in a premium academic setting.