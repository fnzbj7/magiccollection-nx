import { Body, Controller, Get, Logger, Post, Put } from '@nestjs/common';
import { DraftDef } from '@pointless/api-interfaces';
import { DraftViewService } from './draft-view.service';

// export interface DraftPicks {
//     cards: string;
// }

// export interface PlayerPicks {
//     playerName: string;
//     rounds: DraftPicks[];
// }

// export interface DraftDef {
//     id: string;
//     name: string;
//     date: Date;
//     setCode: string;
//     cardsPerPack: number;
//     playerPicks: PlayerPicks[];
// }

@Controller('draft-view')
export class DraftViewerController {
    private logger = new Logger('CardController');

    constructor(private draftViewService: DraftViewService) {}

    @Get('/drafts')
    getDrafts(): Promise<DraftDef[]> {
        this.logger.log('Draft definition was loaded');
        return this.draftViewService.getDraftDefs();
    }

    @Post('/create')
    createDraft(@Body() draft: DraftDef) {
        return this.draftViewService.createDraftDefinition(draft);
    }

    @Put('/update')
    updateDraft(@Body() draft: DraftDef) {
        // TODO
    }
}
