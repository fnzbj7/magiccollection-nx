import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
    selector: 'app-magic-card-rarity-filter',
    templateUrl: './card-filter-wrapper.component.html',
    styleUrls: ['./card-filter-wrapper.component.scss'],
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
