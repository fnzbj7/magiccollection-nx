import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEventRepository } from './repository/calendar-event.repository';
import { CalendarEvent } from './entity/calendar-event.entity';
import { User } from '../auth/entity/user.entity';
import { CalendarParticipantUserDto } from './dto/calendar-participant-user.dto';

@Injectable()
export class CalendarService {
    constructor(private calendarEventRepository: CalendarEventRepository) {}

    async getAllCalendarEvent(): Promise<CalendarEvent[]> {
        return this.calendarEventRepository.getAllCalendarEvent();
    }

    async saveCalendarEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
        return this.calendarEventRepository.save(calendarEvent);
    }

    async deleteCalendarEvent(id: number) {
        await this.calendarEventRepository.delete({ id });
    }

    async joinCalendarEvent(calendarEvent: CalendarEvent, user: User) {
        await this.calendarEventRepository.joinCalendarEvent(calendarEvent, user);
    }

    async leaveCalendarEvent(calendarId: number, user: User) {
        await this.calendarEventRepository.leaveCalendarEvent(calendarId, user);
    }

    async allCalendarEventParticipant(calendarId: number): Promise<string[]> {
        const calendarEvent: CalendarEvent = await this.calendarEventRepository.findOne({
            where: { id: calendarId },
            relations: ['users'],
        }); //calendarId,
        return calendarEvent.users.map(user => user.name);
    }

    async allCalendarEventParticipantUser(
        calendarId: number,
        user: User,
    ): Promise<CalendarParticipantUserDto> {
        const calendarEvent: CalendarEvent = await this.calendarEventRepository.findOne({
            where: { id: calendarId },
            relations: ['users'],
        });
        const calendarParticipantUserDto: CalendarParticipantUserDto =
            new CalendarParticipantUserDto();
        calendarParticipantUserDto.participants = calendarEvent.users.map(u => u.name);
        calendarParticipantUserDto.isUser = calendarEvent.users.some(u => u.id === user.id);
        return calendarParticipantUserDto;
    }
}
