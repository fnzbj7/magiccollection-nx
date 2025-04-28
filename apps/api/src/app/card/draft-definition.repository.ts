import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DraftDefinition } from './entity/draft-viewer/draft-definition.enitity';
import { DraftDef } from '@pointless/api-interfaces';

@Injectable()
export class DraftDefinitionRepository {
    constructor(private dataSource: DataSource) {}

    async getDratDefs(): Promise<DraftDefinition[]> {
        return this.dataSource
            .getRepository(DraftDefinition)
            .createQueryBuilder('draft_definition')
            .getMany();
    }

    async createDraftDef(draftDef: DraftDef): Promise<DraftDefinition> {
        const inserDraftDefinition = this.dataSource
            .getRepository(DraftDefinition)
            .create(DraftDefinition);

        inserDraftDefinition.name = draftDef.name;
        inserDraftDefinition.draftDate = draftDef.draftDate;
        inserDraftDefinition.setCode = draftDef.setCode;
        inserDraftDefinition.cardsPerPack = draftDef.cardsPerPack;
        inserDraftDefinition.playerPicks = draftDef.playerPicks;

        return this.dataSource
            .getRepository(DraftDefinition)
            .save<DraftDefinition>(inserDraftDefinition);
    }

    async deleteDraftDef(id: number): Promise<void> {
        await this.dataSource.getRepository(DraftDefinition).delete(id);
    }

    async updateDraftDef(draftDef: DraftDef): Promise<DraftDefinition> {
        const draftDefinition = await this.dataSource
            .getRepository(DraftDefinition)
            .findOneBy({ id: +draftDef.id });

        if (!draftDefinition) {
            throw new Error('Draft definition not found');
        }

        draftDefinition.name = draftDef.name;
        draftDefinition.draftDate = draftDef.draftDate;
        draftDefinition.setCode = draftDef.setCode;
        draftDefinition.cardsPerPack = draftDef.cardsPerPack;
        draftDefinition.playerPicks = draftDef.playerPicks;

        return this.dataSource
            .getRepository(DraftDefinition)
            .save<DraftDefinition>(draftDefinition);
    }
}
