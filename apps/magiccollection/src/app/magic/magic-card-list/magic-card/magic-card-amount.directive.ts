import { Directive, Renderer2, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MagicCardAmount } from './model/magic-card-amount.model';

@Directive({
    selector: '[appMagicCardAmount]',
})
export class MagicCardAmountDirective implements OnChanges {
    @Input() appMagicCardAmount: MagicCardAmount = {
        cardAmount: 0,
        cardAmountFoil: 0,
        isLoggedIn: false,
        forceShowAmount: false,
        isDefaultViewMode: false,
    };
    @Input() onlyShow = false;
    amountImg!: HTMLImageElement;
    amountIconVisible = false;

    constructor(private elRef: ElementRef<HTMLPictureElement>, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { cardAmount, cardAmountFoil, isDefaultViewMode, isLoggedIn, forceShowAmount } =
            this.appMagicCardAmount;
        const cardImg: HTMLPictureElement = this.elRef.nativeElement;
        const fullAmount = cardAmount + cardAmountFoil;
        const shouldShowAmount = isLoggedIn || forceShowAmount;

        this.changeIconsIfNeeded(this.appMagicCardAmount, changes);

        if (!isDefaultViewMode && cardAmountFoil > 0) {
            this.renderer.addClass(cardImg, 'dothefoil');
        } else {
            this.renderer.removeClass(cardImg, 'dothefoil');
        }

        if (isDefaultViewMode || !shouldShowAmount || fullAmount > 0) {
            this.renderer.removeClass(cardImg, 'nothave');
        } else {
            this.renderer.addClass(cardImg, 'nothave');
        }
    }

    changeIconsIfNeeded(magicCardAmount: MagicCardAmount, changes: SimpleChanges) {
        const { forceShowAmount, isLoggedIn } = magicCardAmount;
        const shouldShowAmount = isLoggedIn || forceShowAmount;
        const needToChange = this.amountIconVisible !== shouldShowAmount;
        const cardImg: HTMLPictureElement = this.elRef.nativeElement;

        if (!needToChange) {
            return;
        }

        if (this.amountIconVisible) {
            this.removeLoggedInCards(cardImg, changes['appMagicCardAmount'].previousValue);
        } else {
            this.createAmountForImage(
                cardImg,
                magicCardAmount.cardAmount,
                magicCardAmount.cardAmountFoil,
            );
        }

        this.amountIconVisible = shouldShowAmount;
    }

    /**
     * Give an amount it can be any not negative number, and give a card image reference.
     *
     * @param cardAmount how much card do you want to show.
     * @param cardImg nativeElement ref for the card <img> tag.
     */
    createAmountForImage(cardImg: HTMLPictureElement, cardAmount: number, cardAmountFoil: number) {
        const fullAmount = cardAmount + cardAmountFoil;
        if (fullAmount > 0) {
            this.amountImg = this.renderer.createElement('img');
            const amount = fullAmount <= 4 ? fullAmount : 4;
            this.renderer.setAttribute(
                this.amountImg,
                'src',
                'assets/img/amount/icon' + amount + '.png',
            );
            this.renderer.addClass(this.amountImg, 'amountIcon');

            const cardImgParent = cardImg.parentNode;
            this.renderer.insertBefore(cardImgParent, this.amountImg, cardImg);
        } else {
            if (!this.appMagicCardAmount.isDefaultViewMode) {
                this.renderer.addClass(cardImg, 'nothave');
            }
        }
    }

    removeLoggedInCards(cardImg: HTMLPictureElement, previousMagicCardAmount: MagicCardAmount) {
        const fullAmount =
            previousMagicCardAmount.cardAmount + previousMagicCardAmount.cardAmountFoil;

        if (fullAmount === 0) {
            this.renderer.removeClass(this.elRef.nativeElement, 'nothave');
            return;
        }

        if (this.amountImg && cardImg.parentNode) {
            this.renderer.removeChild(cardImg.parentNode, this.amountImg);
        }
    }
}
