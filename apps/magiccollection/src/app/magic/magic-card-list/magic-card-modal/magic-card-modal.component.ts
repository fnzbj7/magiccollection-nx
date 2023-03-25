/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Card } from '../../../model/card.model';
import { MagicCardModalService } from '../../../shared/magic-card-modal.service';
import { SwipeModel } from '../../../shared/swipe/swipe.model';

@Component({
    selector: 'app-magic-card-modal',
    templateUrl: './magic-card-modal.component.html',
    styleUrls: ['./magic-card-modal.component.css'],
})
export class MagicCardModalComponent implements OnInit, AfterViewInit {
    @Input() magicCard!: Card;
    @ViewChild('swipable') swipable!: ElementRef<HTMLDivElement>;
    @ViewChild('cardContainer') cardContainer!: ElementRef<HTMLDivElement>;

    nextMagicCard!: Card | null;
    previousMagicCard!: Card | null;

    isLoggedIn!: boolean;
    otherVersionCards?: Card[];
    allVerions?: Card[];

    defaultPos = -280;
    actualPos = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private magicCardModalService: MagicCardModalService,
    ) {}

    ngOnInit(): void {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
        this.nextMagicCard = this.magicCardModalService.getNextCard(false);
        this.previousMagicCard = this.magicCardModalService.getPreviousCard(false);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const modalContainer = document.getElementById('modal-container');
            if (modalContainer) {
                modalContainer.classList.add('show-after');
            }
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.classList.add('show-after');
            }
        }, 10);

        const c: HTMLDivElement | null = this.swipable.nativeElement;
        if (c) {
            new SwipeModel(c, {
                callbackLeft: this.onNextCard.bind(this),
                callbackRight: this.getPreviousCard.bind(this),
                dragStart: ((cardContainer: HTMLElement) => {
                    cardContainer.style.transition = 'none';
                }).bind(null, this.cardContainer.nativeElement),
                dragEvent: this.dragEvent.bind(this),
                dragStop: this.dragStop.bind(this),
            });
        }
    }

    onNextCard() {
        this.actualPos -= 340; 
        const nextMagicCard = this.magicCardModalService.getNextCard();
        if (nextMagicCard) {
            this.magicCard = nextMagicCard;
            this.allVerions = undefined;
            this.otherVersionCards = undefined;
        }
    }

    getPreviousCard() {
        this.actualPos += 340; 
        const nextMagicCard = this.magicCardModalService.getPreviousCard();
        if (nextMagicCard) {
            this.magicCard = nextMagicCard;
            this.allVerions = undefined;
            this.otherVersionCards = undefined;
        }
    }

    dragEvent(x0: number | null, clientX: number) {
        if (x0 === null) {
            return;
        }
        const minLimit = 4;
        const maxLimit = 350;
        const actual = clientX - x0;
        if (actual > minLimit || actual < -minLimit) {
            const num = Math.min(Math.max(actual, -maxLimit), maxLimit); // Math.min(Math.max(actual / 1, -maxLimit), maxLimit);
            this.cardContainer.nativeElement.style.transform = `translate3d(${this.defaultPos + this.actualPos + num}px,0,0)`;
        }
    }

    dragStop() {
        this.cardContainer.nativeElement.style.transition = '0.2s'
        this.cardContainer.nativeElement.style.transform = `translate3d(${this.defaultPos + this.actualPos}px,0,0)`;
    }

    onShowAllVersion() {
        if (this.magicCard.uniqueCardId) {
            this.magicCardModalService
                .getAllVersionForCard(
                    this.magicCard.uniqueCardId,
                    this.authenticationService.currentUserValue?.id,
                )
                .subscribe(cards => {
                    this.allVerions = cards;

                    this.otherVersionCards = cards.filter(
                        card =>
                            !(
                                card.cardExpansion === this.magicCard.cardExpansion &&
                                card.cardNumber === this.magicCard.cardNumber
                            ),
                    );
                });
        }
    }

    onChangeVersion(changeVersion: Card) {
        this.magicCard = changeVersion;
        // this.otherVersionCards = this.allVerions.filter(
        //     card =>
        //         !(
        //             card.cardExpansion === this.magicCard.cardExpansion &&
        //             card.cardNumber === this.magicCard.cardNumber
        //         ),
        // );
    }
}
