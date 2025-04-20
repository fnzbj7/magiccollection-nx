import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DraftViewerCoreComponent } from './draft-viewer-core/draft-viewer-core.component';
import { DraftModifyComponent } from './draft-modify/draft-modify.component';
import { DraftListComponent } from './draft-list/draft-list.component';
import { DraftViewerRoutingModule } from './draft-viewer-routing.module';
import { DraftViewerService } from './draft-viewer.service';

@NgModule({
    declarations: [DraftViewerCoreComponent, DraftModifyComponent, DraftListComponent],
    providers: [DraftViewerService],
    imports: [DraftViewerRoutingModule, CommonModule, SharedModule, FormsModule],
})
export class DraftViewerModule {}
