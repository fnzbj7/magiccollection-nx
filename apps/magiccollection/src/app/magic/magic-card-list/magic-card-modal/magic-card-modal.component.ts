/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Card } from '../../../model/card.model';
import { MagicCardModalService } from '../../../shared/magic-card-modal.service';
import { SwipeModel } from '../../../shared/swipe/swipe.model';

interface CardPos {
    comp: Card | null;
    pos: number;
}

@Component({
    selector: 'app-magic-card-modal',
    templateUrl: './magic-card-modal.component.html',
    styleUrls: ['./magic-card-modal.component.scss'],
})
export class MagicCardModalComponent implements OnInit, AfterViewInit {
    @Input() magicCard!: Card;
    @ViewChild('swipable') swipable!: ElementRef<HTMLDivElement>;
    @ViewChild('cardContainer') cardContainer!: ElementRef<HTMLDivElement>;

    changedCard?: Card;
    order = 0;
    positionArr: CardPos[] = [];

    isLoggedIn!: boolean;
    otherVersionCards?: Card[];
    allVerions?: Card[];

    defaultPos = -280;
    baseStep = 450; //375;
    actualPos = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private magicCardModalService: MagicCardModalService,
    ) {}

    ngOnInit(): void {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
        const basePosition = 335 - this.baseStep;
        this.positionArr.push({
            comp: this.magicCardModalService.getPreviousCard(false),
            pos: basePosition,
        });
        this.positionArr.push({ comp: this.magicCard, pos: basePosition + this.baseStep });
        this.positionArr.push({
            comp: this.magicCardModalService.getNextCard(false),
            pos: basePosition + 2 * this.baseStep,
        });
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

        const swipeable: HTMLDivElement | null = this.swipable.nativeElement;
        if (swipeable) {
            new SwipeModel(swipeable, {
                callbackLeft: this.onNextCard.bind(this),
                callbackRight: this.getPreviousCard.bind(this),
                dragStart: ((cardContainer: HTMLElement) => {
                    if (this.changedCard && this.order != 0) {
                        this.positionArr[1 - this.order].comp = this.changedCard;
                        this.order = 0;
                        this.changedCard = undefined;
                    }
                    cardContainer.style.transition = 'none';
                }).bind(this, this.cardContainer.nativeElement),
                dragEvent: this.dragEvent.bind(this),
                dragStop: this.dragStop.bind(this),
            });
        }
    }

    onNextCard() {
        const nextMagicCard = this.magicCardModalService.getNextCard();
        if (nextMagicCard) {
            this.actualPos -= this.baseStep;
            if (this.otherVersionCards) {
                this.order = 1;
            }
            this.allVerions = undefined;
            this.otherVersionCards = undefined;
            this.cycleNext(this.magicCardModalService.getNextCard(false));
        }
    }

    getPreviousCard() {
        const nextMagicCard = this.magicCardModalService.getPreviousCard();
        if (nextMagicCard) {
            this.actualPos += this.baseStep;
            if (this.otherVersionCards) {
                this.order = -1;
            }
            this.allVerions = undefined;
            this.otherVersionCards = undefined;
            this.cyclePrev(this.magicCardModalService.getPreviousCard(false));
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
            this.cardContainer.nativeElement.style.transform = `translate3d(${
                this.defaultPos + this.actualPos + num
            }px,0,0)`;
            console.log(this.defaultPos + this.actualPos + num);
        }
    }

    dragStop() {
        this.cardContainer.nativeElement.style.transition = '0.2s';
        this.cardContainer.nativeElement.style.transform = `translate3d(${
            this.defaultPos + this.actualPos
        }px,0,0)`;
    }

    onShowAllVersion() {
        if (this.positionArr[1].comp?.uniqueCardId) {
            this.magicCardModalService
                .getAllVersionForCard(
                    this.positionArr[1].comp.uniqueCardId,
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
        if (this.changedCard && this.order != 0) {
            this.positionArr[1 - this.order].comp = this.changedCard;
        }

        if (this.positionArr[1].comp) {
            this.changedCard = this.positionArr[1].comp;
            this.order = 0;
        }
        this.positionArr[1].comp = changeVersion;
    }

    private cycleNext(nextCard: Card | null) {
        const a = this.positionArr.shift();
        if (a !== undefined) {
            a.pos = this.positionArr[this.positionArr.length - 1].pos + this.baseStep;
            a.comp = nextCard;
            this.positionArr.push(a);
        }
    }

    private cyclePrev(prevCard: Card | null) {
        const a = this.positionArr.pop();

        if (a !== undefined) {
            a.pos = this.positionArr[0].pos - this.baseStep;
            a.comp = prevCard;
            this.positionArr.unshift(a);
        }
    }
}
