import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { magicSetArray } from '@magiccollection/magic/magic-card-list/magic-cards-list.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    private currentUserSub?: Subscription;
    checkCardsMenu = ['/', 'cards', 'list'];

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.isLoggedIn = this.authenticationService.currentUserValue !== null;
        this.currentUserSub = this.authenticationService.currentUserSubject.subscribe(user => {
            this.isLoggedIn = user !== null;
            if (this.isLoggedIn && user?.id) {
                this.checkCardsMenu = [
                    '/',
                    'cards',
                    'list',
                    'user',
                    '' + user.id,
                    magicSetArray[0].name,
                ];
            } else {
                this.checkCardsMenu = ['/', 'cards', 'list'];
            }
        });
    }

    ngOnDestroy() {
        this.currentUserSub?.unsubscribe();
    }
}
