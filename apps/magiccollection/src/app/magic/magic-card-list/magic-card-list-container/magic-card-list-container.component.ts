import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
    selector: 'app-magic-card-list-container',
    templateUrl: './magic-card-list-container.component.html',
    styleUrls: ['./magic-card-list-container.component.scss'],
})
export class MagicCardListContainerComponent implements OnInit {
    userId: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit() {
        console.log('Voltam itt');
        this.userId = this.route.snapshot.params['userId'];
        if (!this.userId) {
            const tmpUserId = this.authenticationService.currentUserValue?.id;
            if (tmpUserId) {
                this.userId = '' + tmpUserId;
            }
        }
    }
}
