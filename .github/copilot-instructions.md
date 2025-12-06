# Magic Collection - Copilot Instructions

## Project Overview

This is a **solo-developer project** for personal use - a Magic: The Gathering card collection manager built with Nx monorepo. The project prioritizes functionality over perfection, as the sole user can fix issues as needed.

**Key Philosophy:** Stable, working code over cutting-edge tech. Open to gradual upgrades when beneficial, but no rush.

## Technology Stack

### Monorepo Setup

-   **Nx workspace** (v16.9.1) managing multiple apps
-   Windows development environment
-   Heroku deployment (auto-deploys on push to main)

### Frontend: Angular (Evolving Architecture)

-   **Started with Angular v5**, now on **Angular 16.2.12**
-   Mix of **older patterns** (pre-v5 style) and **newer patterns** (ngrx)
-   **State Management:** NgRx (partial adoption - being gradually introduced)
-   **Styling:** SCSS + Tailwind CSS + Bootstrap 5 + Angular Material
-   **PWA Support:** Service Worker enabled
-   **Prefix:** `pointless` (e.g., `<pointless-component>`)

### Backend: NestJS

-   **NestJS 10.0.2** with TypeORM
-   Authentication: JWT + Passport
-   Some patterns may be outdated - fine to modernize gradually
-   Database ORM: TypeORM with configuration in `ormconfig.json`

### Key Libraries

-   FontAwesome icons
-   Angular Material components
-   Social login (Google OAuth)
-   bcrypt for password hashing

## Development Workflow

### Running the Apps

```powershell
# Frontend dev server
npm run start:frontend
# or
nx serve magiccollection --skip-nx-cache

# Backend API dev server
npm run start:api
# or
nx serve api
```

### Building for Production

```powershell
# Build both apps
npm run build

# Build separately
npm run build:api:prod
npm run build:frontend
```

### Deployment

-   **Auto-deploys to Heroku** when pushed to main branch
-   Built artifacts go to `dist/apps/api` and `dist/apps/magiccollection`
-   Start production: `npm start` (runs API from dist folder)

## Code Style & Conventions

### General Guidelines

-   Follow **Angular style guide** for frontend components/services
-   Follow **NestJS conventions** for backend modules/controllers
-   No strict naming conventions beyond framework standards
-   **Mix of old and new patterns is normal** - don't feel pressure to modernize everything at once

### Angular Component Patterns

**Older Pattern (still in use):**

```typescript
// Traditional component without OnPush, direct mutations
export class OldComponent {
    data: any[] = [];

    addItem(item: any) {
        this.data.push(item); // Direct mutation OK
    }
}
```

**Newer Pattern (with ngrx):**

```typescript
// Using ngrx store for state management
export class NewComponent {
    cards$ = this.store.select(selectCards);

    constructor(private store: Store) {}

    addCard(card: Card) {
        this.store.dispatch(CardActions.addCard({ card }));
    }
}
```

**Both patterns coexist** - use ngrx for new features when appropriate, but don't force refactoring of working older code.

### NestJS Backend Patterns

-   Controllers handle routing and validation
-   Services contain business logic
-   TypeORM entities in `apps/api/src/app/*/` folders
-   Middleware for common concerns (frontend serving, auth)

## Common Gotchas & Solutions

### Windows-Specific

-   Use PowerShell for commands
-   Path separators: use forward slashes `/` in code, backslashes `\` in PowerShell paths
-   Line endings: CRLF is fine (Windows standard)

### Nx Caching

-   Frontend runs with `--skip-nx-cache` flag to avoid stale builds during active development
-   This is intentional for the `start:frontend` script

### TypeORM Configuration

-   Main config: `apps/api/ormconfig.json`
-   Sample config available: `apps/api/ormconfig.sample.json`
-   Migration config: `apps/api/typeorm.config.ts`
-   Migrations stored in `apps/api/src/config/migration-list.ts`

### Environment Files

-   Development: `environment.ts`
-   Production: `environment.prod.ts`
-   File replacements happen during production builds

## Testing Philosophy

**Minimal testing approach** - this is a personal project with one user (you). Tests exist but aren't comprehensive:

-   Jest configured for both apps
-   Test files: `*.spec.ts`
-   Run tests: `npm test` or `nx test [app-name]`
-   **It's OK if something breaks** - can fix it next session

## Project Structure

```
apps/
  api/                    # NestJS backend
    src/
      app/
        auth/            # Authentication module
        calendar/        # Calendar features
        card/            # Card management
        migration/       # Database migrations
        shared/          # Shared backend utilities
      config/            # TypeORM and migration config
      environments/      # Environment configs

  magiccollection/       # Angular frontend
    src/
      app/
        auth/            # Auth components/services
        calendar/        # Calendar views
        magic/           # Card-related components
        model/           # Data models/interfaces
        shared/          # Shared utilities
        state/           # NgRx state (newer code)
        ui/              # UI components
        user/            # User management
      assets/            # Static files (images, cards, etc)

  magiccollection-e2e/   # Cypress E2E tests (rarely used)

  set-sail/              # Database migration tool

libs/
  api-interfaces/        # Shared TypeScript interfaces
```

## When Making Changes

### Preferred Approaches

1. **Pragmatic over perfect** - working code > theoretical best practices
2. **Gradual modernization OK** - can update patterns when touching old code
3. **Don't break working features** - if it works, be cautious with refactors
4. **Windows-friendly commands** - use PowerShell syntax
5. **Test locally before pushing** - Heroku auto-deploys on push

### When Adding Features

-   New Angular features: Consider using ngrx if state management is complex
-   New API endpoints: Follow existing NestJS module structure
-   Database changes: Create TypeORM migrations
-   UI components: Can mix Material, Bootstrap, and custom styles

### When Fixing Bugs

-   Quick fixes are fine - no need for extensive testing
-   Can push directly to main (solo project)
-   If it breaks in production, fix in next session

### When Upgrading Dependencies

-   Nx updates: Follow Nx migration guides (`nx migrate`)
-   Angular updates: Use `ng update`
-   Be cautious with major version bumps - prefer stable over latest
-   Test both frontend and backend after upgrades

## AI Assistant Guidelines

When helping with this project:

1. **Respect the mixed pattern approach** - don't insist on modernizing everything
2. **Provide Windows/PowerShell commands** - not bash/Linux commands
3. **Assume solo development context** - no PR reviews, no team coordination
4. **Prioritize working solutions** - over architecturally "perfect" ones
5. **Suggest gradual improvements** - not massive refactors
6. **Remember Heroku deployment** - changes push to production automatically
7. **Don't add unnecessary complexity** - YAGNI principle applies strongly here
8. **Be pragmatic about testing** - comprehensive test coverage isn't required

## Quick Reference Commands

```powershell
# Development
npm run start:api           # Start backend
npm run start:frontend      # Start frontend (with cache skip)

# Building
npm run build              # Build both apps for production
npm run build:api:prod     # Build API only
npm run build:frontend     # Build frontend only

# Running built app
npm start                  # Run production API from dist/

# Nx commands
nx graph                   # View project dependencies
nx format:write            # Format code
nx affected:test           # Test affected projects

# Database
npm run start:set-sail     # Run migrations tool
```

---

**Last Updated:** December 2025  
**Nx Version:** 16.9.1  
**Angular Version:** 16.2.12  
**NestJS Version:** 10.0.2
