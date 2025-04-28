import { Injectable } from '@nestjs/common';
import { DraftDefinitionRepository } from '../draft-definition.repository';
import { DraftDefinition } from '../entity/draft-viewer/draft-definition.enitity';
import { DraftDef } from '@pointless/api-interfaces';

@Injectable()
export class DraftViewService {
    constructor(private draftDefinitionRepository: DraftDefinitionRepository) {}

    async getDraftDefs() {
        return (await this.draftDefinitionRepository.getDratDefs()).map(this.convertToDraftDef);
    }

    async createDraftDefinition(draftDef: DraftDef): Promise<DraftDef> {
        const draftDefinition = await this.draftDefinitionRepository.createDraftDef(draftDef);
        return this.convertToDraftDef(draftDefinition);
    }

    async deleteDraftDefinition(id: number): Promise<void> {
        await this.draftDefinitionRepository.deleteDraftDef(id);
    }

    async updateDraftDefinition(draftDef: DraftDef): Promise<DraftDef> {
        const draftDefinition = await this.draftDefinitionRepository.updateDraftDef(draftDef);
        return this.convertToDraftDef(draftDefinition);
    }

    private convertToDraftDef(draftDefinition: DraftDefinition): DraftDef {
        const { id, name, draftDate, setCode, cardsPerPack, playerPicks } = draftDefinition;
        return { id: '' + id, name, draftDate, setCode, cardsPerPack, playerPicks };
    }
}
