import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardRepository } from './card.repository';
import { AuthModule } from '../auth/auth.module';
import { DraftViewerController } from './draft-viewer/draft-viewer.controller';
import { DraftViewService } from './draft-viewer/draft-view.service';
import { DraftDefinitionRepository } from './draft-definition.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CardRepository, DraftDefinitionRepository]), AuthModule],
    controllers: [CardController, DraftViewerController],
    providers: [CardRepository, DraftDefinitionRepository, CardService, DraftViewService],
})
export class CardModule {}
