# Modify Card Badge System Instructions

## Overview

The modify-card upload component uses a badge system to visually indicate where cards will be stored in the collection. Badges appear below card images and use color-coding with FontAwesome icons to show card destinations and status.

**Location:** `apps/magiccollection/src/app/magic/modify-card/modify-upload/modify-upload.component.html`

## Badge Types & Colors

### 1. Blue Badge - "Main Collection" (bg-blue-500)

-   **Icon:** `faStar` (star)
-   **Text:** "Main"
-   **Purpose:** Indicates card goes to the main collection
-   **Trigger Conditions:**
    -   For cards without foil: `card.have === 1`
    -   For foil cards: `card.haveF === 1` (when foil displaces normal)

### 2. Green Badge - "Bulk Collection" (bg-green-500)

-   **Icon:** `faBoxes` (boxes)
-   **Text:** "Bulk"
-   **Purpose:** Indicates card goes to bulk storage
-   **Trigger Conditions:**
    -   Without foil: `card.have > 1 && card.have <= 5`
    -   With foil present: `card.have <= 4`
-   **Yellow Corner Mark:** Small yellow dot appears when shield/card protector is needed
    -   Without foil: `card.have === 5` (1 in main + 4 in bulk = shield needed)
    -   With foil: `card.have === 4` (4 cards in bulk = shield needed)

### 3. Red Badge - "Throw Away" (bg-red-500)

-   **Icon:** `faTrash` (trash can)
-   **Text:** "Throw Away"
-   **Purpose:** Indicates card should be discarded (excess copies)
-   **Trigger Conditions:**
    -   Without foil: `card.have > 5`
    -   With foil present: `card.have > 4`

### 4. Purple Badge - "Foil Graveyard" (bg-purple-500)

-   **Icon:** `faHandSparkles` (sparkles)
-   **Text:** "Foil Graveyard"
-   **Purpose:** Indicates extra foil cards
-   **Trigger Condition:** `card.haveF > 1`

### 5. Mashed Small Badge (Icon-Only)

-   **Purpose:** Shows what happens to the normal card when a foil displaces it
-   **Styling:** Small icon-only badge attached to the right of the blue "Main" badge
-   **Variants:**
    -   **Green version:** Normal card goes to bulk (`card.was <= 4`)
    -   **Red version:** Normal card gets thrown away (`card.was > 4`)
-   **Usage:** Only appears when `card.wasF !== card.haveF && card.haveF === 1 && card.was > 0`

## Card Quantity Thresholds

### Without Foil Present (`wasF === 0`)

-   **1 card** → Main Collection (Blue)
-   **2-5 cards** → Bulk Collection (Green)
-   **6+ cards** → Throw Away (Red)

### With Foil Present (`wasF > 0`)

-   **Foil card** → Main Collection (Blue)
-   **1-4 normal cards** → Bulk Collection (Green)
-   **5+ normal cards** → Throw Away (Red)
-   **Extra foils (>1)** → Foil Graveyard (Purple)

## Badge Styling Patterns

### Standard Badge

```html
<span
    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-[COLOR] text-white mr-1"
>
    <fa-icon [icon]="[ICON]" class="mr-1"></fa-icon>[TEXT]
</span>
```

### Badge with Yellow Corner Mark (Shield Indicator)

```html
<span
    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-green-500 text-white mr-1 relative"
>
    <fa-icon [icon]="faBoxes" class="mr-1"></fa-icon>Bulk
    <span
        class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
        title="Pajzs szükséges (Shield needed for 4 cards)"
    ></span>
</span>
```

**Purpose:** Indicates that 4 cards will be in bulk storage and need a card protector/shield for physical organization.

### Left-Rounded Badge (Main when combined with mashed badge)

```html
<span
    class="inline-flex items-center pl-2 pr-3 py-1 text-xs font-medium rounded-l bg-blue-500 text-white mr-0"
>
    <fa-icon [icon]="faStar" class="mr-1"></fa-icon>Main
</span>
```

### Mashed Small Badge (Icon-Only)

```html
<span
    class="inline-flex items-center justify-center px-1 py-1 text-xs font-medium rounded-r bg-[COLOR] text-white -ml-1 border-l border-white shadow"
>
    <fa-icon [icon]="[ICON]" class="text-white"></fa-icon>
</span>
```

**Key styling features:**

-   `rounded-l` on the left badge, `rounded-r` on the right badge
-   `-ml-1` creates overlap effect
-   `border-l border-white` adds visual separation
-   `shadow` adds depth
-   `mr-0` on left badge removes gap before mashed badge

## Badge Display Logic

### Priority Order

1. **Check foil changes first:** `card.wasF !== card.haveF`

    - If foil added (haveF === 1): Show blue "Main" badge
    - If extra foils (haveF > 1): Show purple "Foil Graveyard" badge
    - If normal displaced: Add mashed badge showing normal's destination

2. **Check normal changes:** `card.was !== card.have && card.wasF === card.haveF`
    - If foil exists (`wasF > 0`): Use 4-card threshold for normal cards
    - If no foil (`wasF === 0`): Use 5-card threshold for normal cards

### Badge Logic Flow

```typescript
// Foil changes (primary logic)
if (card.wasF !== card.haveF) {
    if (card.haveF === 1) {
        // Blue "Main" badge for foil
        // Check if normal was displaced (card.was > 0)
        if (card.was > 0) {
            if (card.was <= 4) {
                // Green mashed badge (normal to bulk)
            } else {
                // Red mashed badge (normal to trash)
            }
        }
    } else if (card.haveF > 1) {
        // Purple "Foil Graveyard" badge
    }
}

// Normal changes (secondary logic)
if (card.was !== card.have && card.wasF === card.haveF) {
    if (card.wasF > 0) {
        // Foil exists - use 4-card threshold
        if (card.have <= 4) {
            // Green "Bulk" badge
        } else {
            // Red "Throw Away" badge
        }
    } else {
        // No foil - use 5-card threshold
        if (card.have === 1) {
            // Blue "Main" badge
        } else if (card.have <= 5) {
            // Green "Bulk" badge
        } else {
            // Red "Throw Away" badge
        }
    }
}
```

## Required FontAwesome Icons

Import these icons in the component TypeScript file:

```typescript
import {
    faAngleDoubleRight, // Used for quantity arrows
    faBoxes, // Bulk badge
    faHandSparkles, // Foil Graveyard badge
    faStar, // Main Collection badge
    faTrash // Throw Away badge
} from '@fortawesome/free-solid-svg-icons';
```

## Tooltip Titles

All badges include tooltips for clarity:

-   **Main:** "Fő gyűjtemény (Main Collection)"
-   **Bulk:** "Bulk gyűjtemény (Bulk Collection)"
-   **Bulk Yellow Corner:** "Pajzs szükséges (Shield needed for 4 cards)" or "Pajzs szükséges (Shield needed for 4 cards in bulk)"
-   **Throw Away:** "Kidobandó (Throw Away)"
-   **Foil Graveyard:** "Foil Graveyard (Extra foil cards)"
-   **Mashed Green:** "A normál példány a Bulk-ba kerül"
-   **Mashed Red:** "A normál példány kidobandó"

## Visual Hierarchy

Badges are positioned:

-   Below the card image
-   Above the quantity indicators
-   Using `z-index: 10` and negative margin (`-mt-6`) to overlay slightly
-   Centered using `flex justify-center`
-   Text is small (`text-xs`), bold (`font-bold`)

## Shield Indicator Logic

The yellow corner mark appears on bulk badges to indicate when a card protector/shield is needed for physical organization:

**Logic:**

-   **Without foil:** When `card.have === 5` → 1 card in main collection + 4 cards in bulk = need shield
-   **With foil present:** When `card.have === 4` → 4 normal cards in bulk = need shield

**Purpose:** Helps during physical card sorting to know when to prepare a card protector for the 4-card bulk set.

**Visual Style:**

-   Small yellow dot (`w-3 h-3`)
-   Positioned at top-right corner (`-top-1 -right-1`)
-   Minimalist design (no icon, just colored circle)
-   Uses `bg-yellow-400` for visibility

## Notes for Future Development

-   Badges are currently only used in the modify-upload component
-   If badges need to be reused elsewhere, consider extracting them into a shared component
-   Thresholds (4/5 cards) are hardcoded and intentional - change requires updating logic in multiple places
-   Badge colors follow Tailwind CSS standard color palette (500 shade)
-   All badge text is currently in Hungarian with English tooltips
-   Yellow corner marks are minimalist by design - no icons to avoid visual clutter

## Example Usage Context

These badges appear in the "new cards" section after successfully uploading cards, showing users:

1. Where each card will be stored
2. What happens when foils displace normal cards
3. When cards exceed collection limits

The badge system helps users understand the automated card organization logic before finalizing their upload.
