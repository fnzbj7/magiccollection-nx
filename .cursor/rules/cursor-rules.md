# Cursor Rules for Magic Collection NX

## Project Overview

This is a **solo-developer project** for personal use - a Magic: The Gathering card collection manager built with Nx monorepo. The project prioritizes functionality over perfection, as the sole user can fix issues as needed.

**Key Philosophy:** Stable, working code over cutting-edge tech. Open to gradual upgrades when beneficial, but no rush.

## Technology Stack

### Monorepo Setup

- **Nx workspace** (v16.9.1) managing multiple apps
- Windows development environment
- Heroku deployment (auto-deploys on push to main)

### Frontend: Angular (Evolving Architecture)

- **Started with Angular v5**, now on **Angular 16.2.12**
- Mix of **older patterns** (pre-v5 style) and **newer patterns** (ngrx)
- **State Management:** NgRx (partial adoption - being gradually introduced)
- **Styling:** SCSS + Tailwind CSS + Bootstrap 5 + Angular Material
- **PWA Support:** Service Worker enabled
- **Prefix:** `pointless` (e.g., `<pointless-component>`)

### Backend: NestJS

- **NestJS 10.0.2** with TypeORM
- Authentication: JWT + Passport
- Some patterns may be outdated - fine to modernize gradually
- Database ORM: TypeORM with configuration in `ormconfig.json`

### Key Libraries

- FontAwesome icons
- Angular Material components
- Social login (Google OAuth)
- bcrypt for password hashing

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

- **Auto-deploys to Heroku** when pushed to main branch
- Built artifacts go to `dist/apps/api` and `dist/apps/magiccollection`
- Start production: `npm start` (runs API from dist folder)

## Code Style & Conventions

### General Guidelines

- Follow **Angular style guide** for frontend components/services
- Follow **NestJS conventions** for backend modules/controllers
- No strict naming conventions beyond framework standards
- **Mix of old and new patterns is normal** - don't feel pressure to modernize everything at once
- Use path aliases: `@magiccollection/*` for frontend, `@pointless/api-interfaces` for shared interfaces

### TypeScript

- Use TypeScript strict mode conventions
- Prefer explicit types over `any` (being gradually typed)
- Follow existing patterns in each module

### Angular Frontend (`apps/magiccollection/`)

**Mixed Pattern Acceptance:** This codebase has components from Angular v5 era through v16. **Both old and new patterns are acceptable.**

**Old Pattern (common in this codebase):**
- Direct property mutations
- `any` types (being gradually typed)
- Traditional change detection
- Component-level state

**New Pattern (gradually introducing):**
- NgRx for complex state
- Reactive forms
- OnPush change detection (where beneficial)
- Strict typing

**Component Structure:**
```typescript
@Component({
    selector: 'app-component-name', // prefix: app
    templateUrl: './component-name.component.html',
    styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent implements OnInit {
    // Public properties for template

    constructor() {} // Inject services

    ngOnInit() {
        // Initialization
    }

    // Public methods for template
    // Private helper methods
}
```

**State Management:**
- **Simple state:** Component properties are fine
- **Complex state:** Use NgRx (already set up with `@ngrx/store`)
- **Shared state:** Services or NgRx store
- Check `apps/magiccollection/src/app/state/` for existing NgRx patterns

**Styling Approach:**
Multiple styling systems coexist:
- **SCSS files** - component-specific styles
- **Tailwind classes** - utility-first in templates
- **Bootstrap 5** - layout and components
- **Angular Material** - Material Design components
- **Custom variables** - see `apps/magiccollection/src/app/variable.scss`

**All approaches are valid** - use what fits the context.

**Template Patterns:**
```html
<!-- Property binding -->
<div [class.active]="isActive">
    <!-- Event binding -->
    <button (click)="handleClick()">
        <!-- Two-way binding -->
        <input [(ngModel)]="value" />
        
        <!-- Structural directives -->
        <div *ngIf="condition">
            <div *ngFor="let item of items"></div>
        </div>
    </button>
</div>
```

**Routing:**
- Routes defined in `app-routing.module.ts`
- Lazy loading may or may not be used (varies by module age)
- Guard files for authentication in `apps/magiccollection/src/app/auth/`

**Forms:**
- Mix of template-driven and reactive forms
- Template-driven: Simpler forms
- Reactive: Complex forms with validation

**Common Imports:**
```typescript
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
```

### NestJS Backend (`apps/api/`)

**Module Organization:**
- Controllers handle routing and validation
- Services contain business logic
- TypeORM entities in `apps/api/src/app/*/` folders
- Middleware for common concerns (frontend serving, auth)
- Follow existing structure: each feature has its own folder with controller, service, repository, dto, entity subfolders

**Controller Pattern:**
```typescript
@Controller('resource')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Get()
    findAll() {
        return this.resourceService.findAll();
    }

    @Post()
    create(@Body() createDto: CreateDto) {
        return this.resourceService.create(createDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.resourceService.findOne(id);
    }
}
```

**Service Pattern:**
```typescript
@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Entity)
        private repository: Repository<Entity>
    ) {}

    async findAll(): Promise<Entity[]> {
        return this.repository.find();
    }

    async create(data: CreateDto): Promise<Entity> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
}
```

**TypeORM Patterns:**
```typescript
@Entity()
export class EntityName {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

**Authentication:**
- Use `@UseGuards(JwtAuthGuard)` for protected routes
- JWT token validation via Passport
- Auth logic in `apps/api/src/app/auth/`
- Uses `bcrypt` for password hashing

**Validation & DTOs:**
- Create DTOs for request validation
- Use class-validator decorators for stricter validation
- Use NestJS built-in exceptions for error handling

**Module Pattern:**
```typescript
@Module({
    imports: [
        TypeOrmModule.forFeature([Entity])
        // other imports
    ],
    controllers: [ResourceController],
    providers: [ResourceService],
    exports: [ResourceService] // if needed by other modules
})
export class ResourceModule {}
```

**Common Imports:**
```typescript
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
```

### Database

- Use TypeORM migrations (stored in `apps/api/src/app/migration/`)
- Follow existing migration patterns and helpers
- Always create migrations for schema changes
- Main config: `apps/api/ormconfig.json`
- Sample config available: `apps/api/ormconfig.sample.json`
- Migration config: `apps/api/typeorm.config.ts`
- Migrations stored in `apps/api/src/config/migration-list.ts`
- Migration tool: `apps/set-sail/` - Run: `npm run start:set-sail`

### Shared Libraries (`libs/api-interfaces/`)

- Shared TypeScript interfaces and types used by both frontend and backend
- Type definitions only - no implementation logic
- Interfaces, types, enums, shared constants if needed
- Keep in sync - changes affect both apps
- Export pattern: Define in `libs/api-interfaces/src/lib/api-interfaces.ts`, export from `libs/api-interfaces/src/index.ts`
- Import using: `@pointless/api-interfaces`

## Common Gotchas & Solutions

### Windows-Specific

- Use PowerShell for commands
- Path separators: use forward slashes `/` in code, backslashes `\` in PowerShell paths
- Line endings: CRLF is fine (Windows standard)

### Nx Caching

- Frontend runs with `--skip-nx-cache` flag to avoid stale builds during active development
- This is intentional for the `start:frontend` script

### TypeORM Configuration

- Main config: `apps/api/ormconfig.json`
- Sample config available: `apps/api/ormconfig.sample.json`
- Migration config: `apps/api/typeorm.config.ts`
- Migrations stored in `apps/api/src/config/migration-list.ts`

### Environment Files

- Development: `environment.ts`
- Production: `environment.prod.ts`
- File replacements happen during production builds

## Testing Philosophy

**Minimal testing approach** - this is a personal project with one user (you). Tests exist but aren't comprehensive:

- Jest configured for both apps
- Test files: `*.spec.ts`
- Run tests: `npm test` or `nx test [app-name]`
- **It's OK if something breaks** - can fix it next session

## When Making Changes

### Preferred Approaches

1. **Pragmatic over perfect** - working code > theoretical best practices
2. **Gradual modernization OK** - can update patterns when touching old code
3. **Don't break working features** - if it works, be cautious with refactors
4. **Windows-friendly commands** - use PowerShell syntax
5. **Test locally before pushing** - Heroku auto-deploys on push

### When Adding Features

- New Angular features: Consider using ngrx if state management is complex
- New API endpoints: Follow existing NestJS module structure
- Database changes: Create TypeORM migrations
- UI components: Can mix Material, Bootstrap, and custom styles

### When Fixing Bugs

- Quick fixes are fine - no need for extensive testing
- Can push directly to main (solo project)
- If it breaks in production, fix in next session

### When Upgrading Dependencies

- Nx updates: Follow Nx migration guides (`nx migrate`)
- Angular updates: Use `ng update`
- Be cautious with major version bumps - prefer stable over latest
- Test both frontend and backend after upgrades

## Domain-Specific Knowledge

### Magic: The Gathering - Draft Mechanics

**Primary Format:** Normal booster draft (8-player format)

**Core Draft Mechanics:**
1. Pack Opening: Players open booster packs containing 15 cards
2. Pick Phase: Each player picks one card from their pack
3. Pass: The remaining cards are passed to the next player
4. Repeat: Continue picking and passing until all cards are selected
5. Deck Building: Build a 40-card minimum deck from picked cards (plus basic lands)

**Standard Booster Draft:**
- Players: Usually 8 players (can be 4-12)
- Packs: 3 booster packs per player (typically from the same set)
- Passing Direction:
  - Pack 1: Pass left
  - Pack 2: Pass right
  - Pack 3: Pass left
- Cards per pack: 15 cards
- Total picks: 45 cards per player
- Deck size: Minimum 40 cards (usually play exactly 40)
- Basic lands: Unlimited, provided separately

**Draft Viewer Features:**
- Pack display (current pack)
- Pick history (cards selected)
- Color/archetype tracking
- Timer countdown
- Pack number indicator (Pack 1/2/3)
- Pick number indicator (Pick 1/15, etc.)
- "Passed cards" view (what you didn't take)
- Full card pool view
- Deck builder interface
- Export to collection
- Draft statistics (colors, curve, etc.)

### Card Badge System

The modify-card upload component uses a badge system to visually indicate where cards will be stored in the collection.

**Badge Types:**
1. **Blue Badge - "Main Collection"** (`bg-blue-500`)
   - Icon: `faStar` (star)
   - Text: "Main"
   - Trigger: `card.have === 1` (without foil) or `card.haveF === 1` (with foil)

2. **Green Badge - "Bulk Collection"** (`bg-green-500`)
   - Icon: `faBoxes` (boxes)
   - Text: "Bulk"
   - Trigger: `card.have > 1 && card.have <= 5` (without foil) or `card.have <= 4` (with foil)
   - Yellow corner mark when shield/card protector needed

3. **Red Badge - "Throw Away"** (`bg-red-500`)
   - Icon: `faTrash` (trash can)
   - Text: "Throw Away"
   - Trigger: `card.have > 5` (without foil) or `card.have > 4` (with foil)

4. **Purple Badge - "Foil Graveyard"** (`bg-purple-500`)
   - Icon: `faHandSparkles` (sparkles)
   - Text: "Foil Graveyard"
   - Trigger: `card.haveF > 1`

5. **Mashed Small Badge (Icon-Only)**
   - Shows what happens to normal card when foil displaces it
   - Green version: Normal card goes to bulk (`card.was <= 4`)
   - Red version: Normal card gets thrown away (`card.was > 4`)

**Card Quantity Thresholds:**
- **Without Foil:** 1 card → Main, 2-5 cards → Bulk, 6+ cards → Throw Away
- **With Foil:** Foil → Main, 1-4 normal → Bulk, 5+ normal → Throw Away, Extra foils → Foil Graveyard

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
9. **Match existing patterns** - be consistent with surrounding code
10. **Progressive enhancement** - new features can use newer patterns

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
nx format:check            # Check formatting
nx affected:test           # Test affected projects

# Database
npm run start:set-sail     # Run migrations tool

# Testing
npm test                   # Run all tests
nx test [app-name]         # Test specific app
```

## Best Practices for This Project

### Frontend
1. **Don't force modernization** - if touching old code, minor improvements OK but no full rewrites
2. **Consistent with surrounding code** - match the style of the file you're editing
3. **Progressive enhancement** - new features can use newer patterns
4. **Template clarity** - readable templates > clever one-liners
5. **Type safety gradually** - replacing `any` is good but not urgent

### Backend
1. **Match existing patterns** - some may be older NestJS patterns, that's OK
2. **TypeORM best practices** - use repository pattern consistently
3. **Modular structure** - keep related code in same module
4. **Async/await** - prefer over promises for readability
5. **Type safety** - TypeScript types for entities, DTOs, and responses
6. **Gradual improvements** - modernizing old patterns is fine when touching code

### General
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Follow existing code patterns in each file
- Run format checks: `npm run format:check` and `npm run format:write`
- Test changes when possible

---

**Last Updated:** December 2025  
**Nx Version:** 16.9.1  
**Angular Version:** 16.2.12  
**NestJS Version:** 10.0.2
