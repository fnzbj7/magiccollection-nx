import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'nx-testmagic',
    migrations: [__dirname + '/**/*.migration.ts'],
    entities: [__dirname + '/**/*.entity.ts'],
});
