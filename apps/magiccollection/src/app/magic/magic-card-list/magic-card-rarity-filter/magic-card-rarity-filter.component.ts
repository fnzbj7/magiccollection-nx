import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
    selector: 'app-magic-card-rarity-filter',
    templateUrl: './magic-card-rarity-filter.component.html',
    styleUrls: ['./magic-card-rarity-filter.component.scss'],
})
export class MagicCardRarityFilterComponent implements OnInit {
    isAuth = false;

    constructor(
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        this.authenticationService.currentUserSubject.subscribe(newStatus => {
            this.isAuth = newStatus !== null;
        });
    }

}
