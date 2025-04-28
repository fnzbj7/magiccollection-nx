import { PlayerPicks } from '@pointless/api-interfaces';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DraftDefinition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp' })
    draftDate: Date;

    @Column()
    setCode: string;

    @Column()
    cardsPerPack: number;

    @Column('json', { nullable: true })
    playerPicks: PlayerPicks[];
}
