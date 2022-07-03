import { Module } from '@nestjs/common';
import { CardModule } from './card/card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from '../config/typeorm.config';
import { CalendarModule } from './calendar/calendar.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CardModule, AuthModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
