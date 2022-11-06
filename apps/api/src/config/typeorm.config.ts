import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Privilege } from '../app/auth/entity/privilege.entity';
import { User } from '../app/auth/entity/user.entity';
import { CalendarEvent } from '../app/calendar/entity/calendar-event.entity';
import { CardAmount } from '../app/card/entity/card-amount.entity';
import { CardSet } from '../app/card/entity/card-set.entity';
import { CardVariation } from '../app/card/entity/card-variation.entity';
import { Card } from '../app/card/entity/card.entity';
import { PossibleCardVariation } from '../app/card/entity/possible-card-variation.entity';
import { UniqueCard } from '../app/card/entity/unique-card.entity';
import { environment } from '../environments/environment';
import migrationsList from './migration-list';

const dbConfig: any = environment.db;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: [
        Card,
        CardSet,
        UniqueCard,
        CardAmount,
        User,
        Privilege,
        CalendarEvent,
        CardVariation,
        PossibleCardVariation,
    ],
    synchronize: dbConfig.synchronize,
    migrations: migrationsList,
    migrationsRun: dbConfig.migrations,
    logging: true,
    // autoLoadEntities: true,
};
