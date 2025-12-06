---
applyTo: 'libs/**/*.ts'
---

# Shared Libraries Instructions

## API Interfaces Library

Location: `libs/api-interfaces/`

### Purpose

Shared TypeScript interfaces and types used by both frontend (Angular) and backend (NestJS).

### Usage Pattern

```typescript
// In library
export interface User {
    id: number;
    username: string;
    email: string;
}

// Import in frontend
import { User } from '@pointless/api-interfaces';

// Import in backend
import { User } from '@pointless/api-interfaces';
```

### Guidelines

1. **Type Definitions Only**

    - No implementation logic
    - Interfaces, types, enums
    - Shared constants if needed

2. **Keep in Sync**

    - Frontend and backend share these types
    - Changes here affect both apps
    - Ensure compatibility when modifying

3. **Naming Conventions**

    - PascalCase for interfaces/types
    - Descriptive names matching domain concepts
    - Add comments for complex types

4. **Export Pattern**

```typescript
// libs/api-interfaces/src/lib/api-interfaces.ts
export interface CardData {
    // properties
}

// libs/api-interfaces/src/index.ts
export * from './lib/api-interfaces';
```

### Common Patterns

**Response Types:**

```typescript
export interface ApiResponse<T> {
    data: T;
    message?: string;
}
```

**Entity Interfaces:** Match backend TypeORM entities (without decorators)

**DTOs:** Data transfer objects for API communication

### Best Practices

1. Keep interfaces simple and focused
2. Document complex types with comments
3. Use TypeScript utility types when helpful (`Partial<>`, `Pick<>`, etc.)
4. Version carefully - changes affect multiple apps
