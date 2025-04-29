import { DataSource, FindOneOptions, FindOptionsWhere, ObjectId, Repository } from 'typeorm';
import { CalendarEvent } from '../entity/calendar-event.entity';
import { User } from '../../auth/entity/user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CalendarEventRepository {
    private calendarEventRepository: Repository<CalendarEvent>;

    constructor(private dataSource: DataSource) {
        this.calendarEventRepository = this.dataSource.getRepository(CalendarEvent);
    }

    async getAllCalendarEvent(): Promise<CalendarEvent[]> {
        return this.calendarEventRepository.find();
    }

    async joinCalendarEvent(calendarEvent: CalendarEvent, user: User) {
        try {
            await this.calendarEventRepository
                .createQueryBuilder()
                .relation(CalendarEvent, 'users')
                .of(calendarEvent.id)
                .add(user.id);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User already joined this event!');
            } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new ConflictException(
                    `There is no Calendar event with id ${calendarEvent.id}!`,
                );
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async leaveCalendarEvent(calendarId: number, user: User) {
        try {
            await this.calendarEventRepository
                .createQueryBuilder()
                .relation(CalendarEvent, 'users')
                .of(calendarId)
                .remove(user.id);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User already joined this event!');
            } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new ConflictException(`There is no Calendar event with id ${calendarId}!`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async save(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
        return this.calendarEventRepository.save(calendarEvent);
    }

    async delete(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectId
            | ObjectId[]
            | FindOptionsWhere<CalendarEvent>,
    ) {
        this.calendarEventRepository.delete(criteria);
    }

    async findOne(options: FindOneOptions<CalendarEvent>): Promise<CalendarEvent> {
        return this.calendarEventRepository.findOne(options);
    }
}
