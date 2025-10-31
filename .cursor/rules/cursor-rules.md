# Cursor Rules for Magic Collection NX

## Project Structure
- This is an Nx monorepo with multiple applications
- **Frontend**: Angular 16 app in `apps/magiccollection/`
- **Backend**: NestJS app in `apps/api/`
- **Shared**: TypeScript interfaces in `libs/api-interfaces/`
- **Tooling**: `apps/set-sail/` for migration utilities

## Code Style & Practices

### TypeScript
- Use TypeScript strict mode conventions
- Prefer explicit types over `any`
- Use path aliases: `@magiccollection/*` for frontend, `@pointless/api-interfaces` for shared interfaces
- Follow existing patterns in each module

### Angular Frontend (`apps/magiccollection/`)
- Use Angular 16 patterns and conventions
- Prefer Angular Material components where applicable
- Use Tailwind CSS for styling (utility classes)
- Follow the existing module structure (auth, calendar, magic, etc.)
- Use RxJS observables for async operations
- Keep components focused and single-responsibility

### NestJS Backend (`apps/api/`)
- Follow NestJS module pattern (controller, service, repository)
- Use TypeORM entities for database models
- Use DTOs for data transfer validation (class-validator)
- Follow existing structure: each feature has its own folder with controller, service, repository, dto, entity subfolders
- Use JWT authentication (Passport strategies are in place)

### Database
- Use TypeORM migrations (stored in `apps/api/src/app/migration/`)
- Follow existing migration patterns and helpers
- Always create migrations for schema changes

### General
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Follow existing code patterns in each file
- Run format checks: `npm run format:check` and `npm run format:write`
- Test changes when possible

## Common Patterns

### Frontend Routes
- Use Angular Router with route modules (`-routing.module.ts`)
- Follow lazy loading patterns where appropriate

### API Endpoints
- RESTful conventions
- Use proper HTTP status codes
- Include authentication guards where needed

### Styling
- Use Tailwind utility classes
- SCSS files for component-specific styles
- Keep styles modular and scoped to components

