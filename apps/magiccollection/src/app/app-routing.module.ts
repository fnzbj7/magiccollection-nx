import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const appRoute: Routes = [
    {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'cards',
        loadChildren: () => import('./magic/magic.module').then(m => m.MagicModule),
    },
    { path: '', component: LandingComponent, pathMatch: 'full' },
    {
        path: 'animation',
        loadChildren: () => import('./animation/animation.module').then(m => m.AnimationModule),
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    { path: '**', component: LandingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
