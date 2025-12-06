# Magic: The Gathering - Draft Mechanics & Formats

## Applies To

-   `apps/magiccollection/src/app/draft-viewer/**/*`
-   Any draft-related components, services, and models

## Purpose

This instruction file provides context about MTG draft formats, rules, and terminology to assist in developing draft-related features without requiring repeated explanations.

**Primary Focus**: Normal booster draft (the standard 8-player format). Other formats are documented for reference but are not actively used.

---

## What is Draft?

**Draft** is a limited format where players open booster packs, select cards from them, and build decks on the spot. It's one of the most popular ways to play Magic.

### Core Draft Mechanics

1. **Pack Opening**: Players open booster packs containing 15 cards (typically)
2. **Pick Phase**: Each player picks one card from their pack
3. **Pass**: The remaining cards are passed to the next player
4. **Repeat**: Continue picking and passing until all cards are selected
5. **Deck Building**: Build a 40-card minimum deck from picked cards (plus basic lands)

---

## Common Draft Formats

### 1. Booster Draft (Standard/Normal Draft)

**PRIMARY FORMAT - This is what we play**

-   **Players**: Usually 8 players (can be 4-12)
-   **Packs**: 3 booster packs per player (typically from the same set)
-   **Passing Direction**:
    -   Pack 1: Pass left
    -   Pack 2: Pass right
    -   Pack 3: Pass left
-   **Cards per pack**: 15 cards
-   **Total picks**: 45 cards per player
-   **Deck size**: Minimum 40 cards (usually play exactly 40)
-   **Basic lands**: Unlimited, provided separately

**Timing**:

-   Pick timer: Often 60-90 seconds per pick (decreases as pack gets smaller)
-   Total draft time: ~20-30 minutes

### 2. Sealed Deck

**Not technically a "draft" but related limited format**

-   **No passing**: Each player opens 6 booster packs (90 cards total)
-   **Build from pool**: Build a 40-card deck from those cards only
-   **Simpler**: No pick/pass decision-making
-   **Build time**: Usually 30 minutes

### 4. Winston Draft

**2-player draft variant**

-   **Players**: Exactly 2 players
-   **Packs**: Use 6 booster packs (90 cards) as shared pool
-   **Piles**: Cards arranged in 3 face-down piles
-   **Mechanics**:
    -   Active player looks at pile 1
    -   Take entire pile OR add a card and look at pile 2
    -   Continue through piles or take from main deck
    -   Non-selected piles grow over time

### 5. Rochester Draft

**Old-school public draft**

-   **Public picks**: All cards laid out face-up
-   **Snake draft**: Pick order reverses each pack
-   **Rare today**: Too slow for most events
-   **Strategic**: Players can hate-draft or signal

### 7. Chaos Draft

**Mixed set madness**

-   **Random packs**: Each pack from different sets
-   **Unpredictable**: Wild power level variations
-   **Fun format**: Casual, chaotic gameplay

---

## Special Rules & Variations

### Set-Specific Rules

#### Double-Faced Cards (DFCs)

-   **Checklist cards**: Used in draft to hide identity
-   **Pick normally**: DFC counted as single pick

#### Conspiracy Cards (Conspiracy sets)

-   **Draft matters**: Cards that affect the draft itself
-   **Special rules**: May grant extra picks or affect other players

### House Rules / Custom Variations

#### Continuous Draft

-   **Rotating pool**: Players can draft multiple times from same pool
-   **Evolving meta**: Pool changes as cards are picked

#### Pick 2, Pass

-   **Double picks**: Select 2 cards per pack instead of 1
-   **Faster**: Half the rounds

#### Backdraft

-   **Build opponent's deck**: You draft your opponent's deck
-   **Strategic inversion**: Pick worst cards for them

---

## Draft Terminology

### During Draft

-   **Signal**: Picking cards that indicate color/archetype to neighbors
-   **Stay open**: Avoiding committing to colors early
-   **Wheel**: A card that comes back around (nobody picked it)
-   **Hate draft**: Picking strong cards to deny opponents (not for your deck)
-   **Speculate**: Picking a card for potential synergy

### Card Evaluation

-   **Bomb**: Extremely powerful card (often wins game alone)
-   **Removal**: Cards that destroy/exile opponent's threats
-   **Evasion**: Creatures that are hard to block (flying, menace, etc.)
-   **Mana curve**: Distribution of cards by mana cost
-   **BREAD**: Classic draft priority (Bombs, Removal, Evasion, Aggro, Duds)

### Deck Construction

-   **Splash**: Playing a few cards of a third color
-   **2-color deck**: Most common and stable
-   **3-color deck**: Riskier but more powerful if mana works
-   **17 lands**: Standard land count for 40-card deck
-   **23 spells**: Standard spell count (40 - 17 = 23)

### Archetypes

-   **Aggro**: Fast, low-curve aggressive strategy
-   **Midrange**: Balanced, value-oriented strategy
-   **Control**: Slow, reactive, wins with late-game advantage
-   **Synergy**: Built around specific card interactions
-   **Train wreck**: A deck that didn't come together (bad draft)

---

## Common Draft Viewer Features

When building a draft viewer, consider these typical features:

### Pre-Draft

-   Draft format selection
-   Player count configuration
-   Set selection (or cube selection)
-   Timer settings

### During Draft

-   Pack display (current pack)
-   Pick history (cards selected)
-   Color/archetype tracking
-   Timer countdown
-   Pack number indicator (Pack 1/2/3)
-   Pick number indicator (Pick 1/15, etc.)
-   "Passed cards" view (what you didn't take)

### Post-Draft

-   Full card pool view
-   Deck builder interface
-   Export to collection
-   Draft statistics (colors, curve, etc.)
-   Replay draft picks

### Analytics

-   Win/loss tracking
-   Color pair performance
-   Archetype success rates
-   Average mana curve
-   Pick order analysis (when certain cards were picked)

---

## Development Notes

### Data Structures to Consider

```typescript
interface DraftSession {
    id: string;
    format: 'booster' | 'sealed' | 'cube' | 'winston' | 'chaos';
    playerCount: number;
    sets: string[]; // Set codes or cube name
    currentPack: number; // 1, 2, or 3
    currentPick: number; // 1-15
    pickedCards: Card[];
    currentPackCards: Card[];
    passedCards: Card[][]; // History of passed packs
    deckList?: DeckList; // Built after draft
    draftDate: Date;
}
```

### State Tracking

-   Active pack
-   Cards remaining in pack
-   Pick timer state
-   Direction of pass (left/right)
-   Round number

### Special Considerations

-   **Basic lands**: Not drafted, unlimited supply
-   **DFC handling**: May need special card views
-   **Timers**: Optional but common in competitive
-   **Auto-pass**: If timer expires, random card picked
-   **Reconnection**: Important for digital implementations

---

## References & Resources

-   **17Lands**: Popular draft analytics site (17lands.com)
-   **Draft guides**: Channel Fireball, StarCityGames
-   **Limited Resources podcast**: Comprehensive draft strategy
-   **MTG Arena**: Official digital implementation

---

**Last Updated**: December 2025  
**Note**: This document focuses on practical draft mechanics relevant to building a draft viewer/tracker application.
