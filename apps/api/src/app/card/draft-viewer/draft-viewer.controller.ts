import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { DraftDef } from '@pointless/api-interfaces';
import { DraftViewService } from './draft-view.service';

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
        return this.draftViewService.updateDraftDefinition(draft);
    }

    @Delete('/delete/:id')
    deleteDraft(@Param('id') id: number) {
        return this.draftViewService.deleteDraftDefinition(id);
    }
}
