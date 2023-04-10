/* eslint-disable max-len */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingComponent } from './landing/landing.component';
import { SocialLoginModule, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideMenuComponent } from './header/side-menu/side-menu.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';

// const FB : fb.facebookStatic;

// function appInitializer() {
//     return () => new Promise(resolve => {
//         // wait for facebook sdk to initialize before starting the angular app
//         window['fbAsyncInit'] = function () {
//             FB.init({
//                 appId: environment.facebookAppId,
//                 cookie: true,
//                 xfbml: true,
//                 version: 'v8.0'
//             });

//             // auto authenticate with the api if already logged in with facebook
//             FB.getLoginStatus(({authResponse}) => {
//                 if (authResponse) {
//                     // accountService.apiAuthenticate(authResponse.accessToken)
//                         // .subscribe()
//                         // .add(resolve);
//                 } else {
//                     resolve();
//                 }
//             });
//         };

//         // load facebook sdk script
//         (function (d, s, id) {
//             const js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) { return; }
//             js = d.createElement(s); js.id = id;
//             js.src = "https://connect.facebook.net/en_US/sdk.js";
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'facebook-jssdk'));
//     });
// }

@NgModule({
    declarations: [AppComponent, HeaderComponent, LandingComponent, SideMenuComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production,
        }),
        SocialLoginModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSidenavModule,
        SharedModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider(environment.facebookAppId),
                    },
                ],
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
