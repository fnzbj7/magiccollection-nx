import { SwipeOption } from './swipe-option.model';

interface SwipeEvent extends Event {
    clientX?: number;
    changedTouches?: TouchList;
}

export class SwipeModel {
    private initialX: number | null = null;
    private readonly bodyElement: HTMLBodyElement | null;
    private readonly swipeThreshold = 100;

    // Store bound handlers
    private readonly boundHandleStart = (e: Event, isMobile: boolean) =>
        this.handleStart(e as SwipeEvent, isMobile);
    private readonly boundHandleMove = (e: Event) => this.handleMove(e as SwipeEvent);
    private readonly boundHandleEnd = (e: Event) => this.handleEnd(e as SwipeEvent);

    constructor(private readonly element: HTMLElement, private readonly options: SwipeOption) {
        this.bodyElement = document.querySelector('body');
        this.initializeEventListeners();
        if (this.options.enableGrabCursor) {
            this.element.classList.add('cursor-grab');
        }
    }

    private initializeEventListeners(): void {
        // Touch events
        this.element.addEventListener('touchstart', e => this.boundHandleStart(e, true));
        this.element.addEventListener('mousedown', e => this.boundHandleStart(e, false));

        if (this.bodyElement) {
            // Movement and end events
            this.bodyElement.addEventListener('mouseup', this.boundHandleEnd);
            this.bodyElement.addEventListener('touchend', this.boundHandleEnd);
            this.bodyElement.addEventListener('mousemove', this.boundHandleMove);
            this.bodyElement.addEventListener('touchmove', this.boundHandleMove);
        }
    }

    private normalizeEvent(event: SwipeEvent): number {
        if ('changedTouches' in event && event.changedTouches?.[0]) {
            return event.changedTouches[0].clientX;
        }
        return (event as MouseEvent).clientX;
    }

    private handleStart(event: SwipeEvent, isMobile: boolean): void {
        if (!isMobile) {
            event.preventDefault();
        }

        if (this.options.enableGrabCursor) {
            this.element.classList.remove('cursor-grab');
            this.element.classList.add('cursor-grabbing');
        }

        this.options.dragStart?.();
        this.initialX = this.normalizeEvent(event);
    }

    private handleMove(event: SwipeEvent): void {
        event.preventDefault();

        if (this.options.dragEvent && this.initialX !== null) {
            const currentX = this.normalizeEvent(event);
            this.options.dragEvent(this.initialX, currentX);
        }
    }

    private handleEnd(event: SwipeEvent): void {
        if (this.initialX === null) return;

        if (this.options.enableGrabCursor) {
            this.element.classList.remove('cursor-grabbing');
            this.element.classList.add('cursor-grab');
        }

        const currentX = this.normalizeEvent(event);
        const deltaX = currentX - this.initialX;

        this.handleSwipeDirection(deltaX);
        this.options.dragStop?.();
        this.initialX = null;
    }

    private handleSwipeDirection(deltaX: number): void {
        if (deltaX > this.swipeThreshold) {
            this.options.callbackRight?.();
        } else if (deltaX < -this.swipeThreshold) {
            this.options.callbackLeft?.();
        }
    }

    public removeEvent(): void {
        if (!this.element || !this.bodyElement) return;

        if (this.options.enableGrabCursor) {
            this.element.classList.remove('cursor-grab', 'cursor-grabbing');
        }

        // Remove element event listeners
        this.element.removeEventListener('touchstart', e => this.boundHandleStart(e, true));
        this.element.removeEventListener('mousedown', e => this.boundHandleStart(e, false));

        // Remove body event listeners
        if (this.bodyElement) {
            this.bodyElement.removeEventListener('mouseup', this.boundHandleEnd);
            this.bodyElement.removeEventListener('touchend', this.boundHandleEnd);
            this.bodyElement.removeEventListener('mousemove', this.boundHandleMove);
            this.bodyElement.removeEventListener('touchmove', this.boundHandleMove);
        }
    }
}
