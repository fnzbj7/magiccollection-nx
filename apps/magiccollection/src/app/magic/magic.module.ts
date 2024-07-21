import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyCardComponent } from './modify-card/modify-card.component';
import { SharedModule } from '../shared/shared.module';
import { ModifyPreviewComponent } from './modify-card/modify-preview/modify-preview.component';
import { MagicSetListComponent } from './magic-set-list/magic-set-list.component';
import { MagicSetIconComponent } from './magic-set-list/magic-set-icon/magic-set-icon.component';
import { FormsModule } from '@angular/forms';
import { MagicCardComponent } from './magic-card-list/magic-card/magic-card.component';
import { MagicCardAmountDirective } from './magic-card-list/magic-card/magic-card-amount.directive';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MagicCardListComponent } from './magic-card-list/magic-card-list.component';
import { MagicCardRarityFilterComponent } from './magic-card-list/card-filter-wrapper/card-filter-wrapper.component';
import { MagicCardModalComponent } from './magic-card-list/magic-card-modal/magic-card-modal.component';
import { MagicCardAftermathComponent } from './magic-card-list/magic-card-modal/card-layouts/aftermath/magic-card-aftermath.component';
import { MagicCardMeldComponent } from './magic-card-list/magic-card-modal/card-layouts/meld/magic-card-meld.component';
import { MagicCardNormalComponent } from './magic-card-list/magic-card-modal/card-layouts/normal/magic-card-normal.component';
import { MagicCardSplitComponent } from './magic-card-list/magic-card-modal/card-layouts/split/magic-card-split.component';
import { MagicCardTransformComponent } from './magic-card-list/magic-card-modal/card-layouts/transform/magic-card-transform.component';
import { MagicRoutingModule } from './magic-routing.module';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { ModifyFormComponent } from './modify-card/modify-form/modify-form.component';
import { MagicCardListContainerComponent } from './magic-card-list/magic-card-list-container/magic-card-list-container.component';
import { CardCariationComponent } from './card-variation/card-variation.component';
import { CardTypeFilterComponent } from './magic-card-list/filters/card-type-filter/card-type-filter.component';
import { EmptyMagicCardComponent } from './magic-card-list/magic-card/empty-card/empty-magic-card.component';
import { CardLayoutWrapperComponent } from './magic-card-list/magic-card-modal/card-layout-wrapper/card-layout-wrapper.component';
import { CardRarityFilterComponent } from './magic-card-list/filters/card-rarity-filter/card-rarity-filter.component';
import { CardQuantityFilterComponent } from './magic-card-list/filters/card-quantity-filter/card-quantity-filter.component';
import { CardColorFilterComponent } from './magic-card-list/filters/card-color-filter/card-color-filter.component';
import { MagicCardBattleformComponent } from './magic-card-list/magic-card-modal/card-layouts/battleform/magic-card-battleform.component';
import { ModifyUploadComponent } from './modify-card/modify-upload/modify-upload.component';

@NgModule({
    declarations: [
        MagicCardListContainerComponent,
        ModifyCardComponent,
        ModifyPreviewComponent,
        ModifyFormComponent,
        ModifyUploadComponent,
        MagicSetListComponent,
        MagicSetIconComponent,
        MagicCardComponent,
        EmptyMagicCardComponent,
        MagicCardAmountDirective,
        MagicCardListComponent,
        MagicCardRarityFilterComponent,
        CardRarityFilterComponent,
        MagicCardModalComponent,
        MagicCardMeldComponent,
        MagicCardTransformComponent,
        MagicCardSplitComponent,
        MagicCardAftermathComponent,
        MagicCardBattleformComponent,
        MagicCardNormalComponent,
        CardCariationComponent,
        CardTypeFilterComponent,
        CardColorFilterComponent,
        CardQuantityFilterComponent,
        CardLayoutWrapperComponent,
    ],
    entryComponents: [MagicCardModalComponent],
    imports: [
        CommonModule,
        MagicRoutingModule,
        SharedModule,
        FormsModule,
        LazyLoadImageModule,
        PaginationModule,
    ],
})
export class MagicModule {}
