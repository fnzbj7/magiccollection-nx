import { AfterViewInit, Component, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDetails]',
})
export class DetailsDirective implements AfterViewInit {
    summary!: HTMLElement;
    content!: HTMLElement;
    animation!: Animation | null;
    isClosing!: boolean | null;
    isExpanding!: boolean | null;

    constructor(private el: ElementRef<HTMLDetailsElement>) {}

    ngAfterViewInit(): void {
        // this.el.nativeElement.style.backgroundColor = 'yellow';
        // Store the <summary> element
        const sum = this.el.nativeElement.querySelector<HTMLElement>('summary');
        if (sum) {
            this.summary = sum;
        }
        // Store the <div class="content"> element
        const cont = this.el.nativeElement.querySelector<HTMLElement>('.content');
        if (cont) {
            this.content = cont;
        }

        // Store the animation object (so we can cancel it if needed)
        this.animation = null;
        // Store if the element is closing
        this.isClosing = false;
        // Store if the element is expanding
        this.isExpanding = false;
        // Detect user clicks on the summary element
        this.summary.addEventListener('click', e => this.onClick(e));
    }

    onClick(e: MouseEvent) {
        // Stop default behaviour from the browser
        e.preventDefault();
        // Add an overflow on the <details> to avoid content overflowing
        this.el.nativeElement.style.overflow = 'hidden';
        // Check if the element is being closed or is already closed
        if (this.isClosing || !this.el.nativeElement.open) {
            this.open();
            // Check if the element is being openned or is already open
        } else if (this.isExpanding || this.el.nativeElement.open) {
            this.shrink();
        }
    }

    shrink() {
        // Set the element as "being closed"
        this.isClosing = true;

        // Store the current height of the element
        const startHeight = `${this.el.nativeElement.offsetHeight}px`;
        // Calculate the height of the summary
        const endHeight = `${this.summary.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
            // Cancel the current animation
            this.animation.cancel();
        }

        // Start a WAAPI animation
        this.animation = this.el.nativeElement.animate(
            {
                // Set the keyframes from the startHeight to endHeight
                height: [startHeight, endHeight],
            },
            {
                duration: 250,
                easing: 'ease-out',
            },
        );

        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(false);
        // If the animation is cancelled, isClosing variable is set to false
        this.animation.oncancel = () => (this.isClosing = false);
    }

    open() {
        // Apply a fixed height on the element
        this.el.nativeElement.style.height = `${this.el.nativeElement.offsetHeight}px`;
        // Force the [open] attribute on the details element
        this.el.nativeElement.open = true;
        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => this.expand());
    }

    expand() {
        // Set the element as "being expanding"
        this.isExpanding = true;
        // Get the current fixed height of the element
        const startHeight = `${this.el.nativeElement.offsetHeight}px`;
        // Calculate the open height of the element (summary height + content height)
        const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
            // Cancel the current animation
            this.animation.cancel();
        }

        // Start a WAAPI animation
        this.animation = this.el.nativeElement.animate(
            {
                // Set the keyframes from the startHeight to endHeight
                height: [startHeight, endHeight],
            },
            {
                duration: 250,
                easing: 'ease-out',
            },
        );
        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(true);
        // If the animation is cancelled, isExpanding variable is set to false
        this.animation.oncancel = () => (this.isExpanding = false);
    }

    onAnimationFinish(open: boolean) {
        // Set the open attribute based on the parameter
        this.el.nativeElement.open = open;
        // Clear the stored animation
        this.animation = null;
        // Reset isClosing & isExpanding
        this.isClosing = false;
        this.isExpanding = false;
        // Remove the overflow hidden and the fixed height
        this.el.nativeElement.style.height = this.el.nativeElement.style.overflow = '';
    }
}
