import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    private currentUserSub?: Subscription;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.isLoggedIn = this.authenticationService.currentUserValue !== null;
        this.currentUserSub = this.authenticationService.currentUserSubject.subscribe(user => {
            this.isLoggedIn = user !== null;
        });
    }

    ngOnDestroy() {
        this.currentUserSub?.unsubscribe();
    }
}
