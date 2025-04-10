import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftViewerCoreComponent } from './draft-viewer-core/draft-viewer-core.component';
import { DraftModifyComponent } from './draft-modify/draft-modify.component';
import { DraftListComponent } from './draft-list/draft-list.component';

const routes: Routes = [
    {
        path: 'list',
        component: DraftListComponent,
    },
    {
        path: 'edit/:draftId',
        component: DraftModifyComponent,
    },
    {
        path: 'new',
        component: DraftModifyComponent,
    },
    {
        path: 'core/:draftId',
        component: DraftViewerCoreComponent,
    },
    { path: '**', redirectTo: 'list' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DraftViewerRoutingModule {}
