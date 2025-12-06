---
applyTo: 'apps/magiccollection/src/app/**/*.ts,apps/magiccollection/src/app/**/*.html,apps/magiccollection/src/app/**/*.scss'
---

# Angular Frontend Instructions

## Component Guidelines

### Mixed Pattern Acceptance

This codebase has components from Angular v5 era through v16. **Both old and new patterns are acceptable.**

**Old Pattern (common in this codebase):**

-   Direct property mutations
-   `any` types (being gradually typed)
-   Traditional change detection
-   Component-level state

**New Pattern (gradually introducing):**

-   NgRx for complex state
-   Reactive forms
-   OnPush change detection (where beneficial)
-   Strict typing

### Component Structure

```typescript
// Typical component structure
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

### State Management

-   **Simple state:** Component properties are fine
-   **Complex state:** Use NgRx (already set up with `@ngrx/store`)
-   **Shared state:** Services or NgRx store
-   Check `apps/magiccollection/src/app/state/` for existing NgRx patterns

### Styling Approach

Multiple styling systems coexist:

-   **SCSS files** - component-specific styles
-   **Tailwind classes** - utility-first in templates
-   **Bootstrap 5** - layout and components
-   **Angular Material** - Material Design components
-   **Custom variables** - see `apps/magiccollection/src/app/variable.scss`

**All approaches are valid** - use what fits the context.

## Template Guidelines

### Binding Patterns

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

### Material Components

Angular Material is available - use Material components when appropriate:

```html
<mat-card>
    <mat-form-field> <mat-button></mat-button></mat-form-field
></mat-card>
```

## Routing

-   Routes defined in `app-routing.module.ts`
-   Lazy loading may or may not be used (varies by module age)
-   Guard files for authentication in `apps/magiccollection/src/app/auth/`

## Services

-   Injectable services for business logic and HTTP calls
-   Existing patterns in various modules (auth, magic, user, etc.)
-   Some services may use older patterns - that's OK

## Forms

Mix of template-driven and reactive forms:

-   Template-driven: Simpler forms
-   Reactive: Complex forms with validation

## HTTP & API Calls

-   Standard `HttpClient` from `@angular/common/http`
-   API services handle backend communication
-   Environment config for API URLs

## Common Imports

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

## Animation

Animation utilities available in `apps/magiccollection/src/app/animation/`

## Folder Organization

```
app/
  auth/          - Authentication components and services
  calendar/      - Calendar-related features
  draft-viewer/  - Card draft viewing
  header/        - Header components
  landing/       - Landing page
  magic/         - Core card management features
  model/         - TypeScript interfaces and models
  shared/        - Shared utilities, pipes, directives
  state/         - NgRx store (newer code)
  ui/            - Reusable UI components
  user/          - User profile and settings
```

## Best Practices for This Project

1. **Don't force modernization** - if touching old code, minor improvements OK but no full rewrites
2. **Consistent with surrounding code** - match the style of the file you're editing
3. **Progressive enhancement** - new features can use newer patterns
4. **Template clarity** - readable templates > clever one-liners
5. **Type safety gradually** - replacing `any` is good but not urgent

## PWA Features

Service Worker is configured - be mindful of caching when making changes to static assets.
