---
applyTo: 'apps/api/src/**/*.ts'
---

# NestJS Backend Instructions

## Project Structure

NestJS backend with TypeORM, JWT authentication, and modular architecture.

### Module Organization

```
app/
  auth/          - Authentication (JWT, Passport)
  calendar/      - Calendar endpoints
  card/          - Card management API
  migration/     - Database migrations
  shared/        - Shared utilities and middleware
```

## Controller Guidelines

### Standard Pattern

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

### Authentication

-   Use `@UseGuards(JwtAuthGuard)` for protected routes
-   JWT token validation via Passport
-   Auth logic in `apps/api/src/app/auth/`

## Service Guidelines

Services contain business logic and database operations.

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

## TypeORM Patterns

### Entity Definition

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

### Repository Injection

```typescript
@InjectRepository(EntityName)
private repository: Repository<EntityName>
```

### Configuration

-   Main config: `apps/api/ormconfig.json`
-   TypeORM config: `apps/api/typeorm.config.ts`
-   Migrations: `apps/api/src/config/migration-list.ts`

## Middleware

### Frontend Middleware

-   Serves Angular frontend in production
-   Located in `apps/api/src/app/frontend.middleware.ts`

## Environment Configuration

Use `@nestjs/config` for environment variables:

```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const dbHost = this.configService.get<string>('DATABASE_HOST');
```

Environment files:

-   `apps/api/src/environments/environment.ts` (dev)
-   `apps/api/src/environments/environment.prod.ts` (production)

## Module Pattern

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

## Validation & DTOs

Create DTOs for request validation:

```typescript
export class CreateDto {
    name: string;
    description?: string;
}
```

Consider adding class-validator decorators for stricter validation:

```typescript
import { IsString, IsOptional } from 'class-validator';

export class CreateDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
```

## Error Handling

Use NestJS built-in exceptions:

```typescript
import {
    NotFoundException,
    BadRequestException
} from '@nestjs/common';

if (!entity) {
    throw new NotFoundException('Entity not found');
}
```

## Authentication Flow

1. Login endpoint returns JWT token
2. Frontend stores token
3. Protected routes validate token via `JwtAuthGuard`
4. User info extracted from token payload

### Password Hashing

Uses `bcrypt` - see existing auth patterns in `apps/api/src/app/auth/`

## Best Practices for This Project

1. **Match existing patterns** - some may be older NestJS patterns, that's OK
2. **TypeORM best practices** - use repository pattern consistently
3. **Modular structure** - keep related code in same module
4. **Async/await** - prefer over promises for readability
5. **Type safety** - TypeScript types for entities, DTOs, and responses
6. **Gradual improvements** - modernizing old patterns is fine when touching code

## Database Migrations

Use TypeORM migrations for schema changes:

-   Migration tool: `apps/set-sail/`
-   Run: `npm run start:set-sail`
-   Add new migrations to `apps/api/src/config/migration-list.ts`

## Common Imports

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

## Heroku Deployment Notes

-   Auto-deploys on push to main
-   Environment variables set in Heroku config
-   Build command: `npm run build:api:prod`
-   Start command: `npm start` (runs from `dist/apps/api`)
-   Database connection via Heroku Postgres environment variables
