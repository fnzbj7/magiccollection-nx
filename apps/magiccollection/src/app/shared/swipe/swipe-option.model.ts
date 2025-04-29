export class SwipeOption {
    //
    callbackLeft?: () => void;
    callbackRight?: () => void;
    dragStart?: () => void;
    dragEvent?: (startPx: number | null, actualPx: number) => void;
    dragStop?: () => void;
    enableGrabCursor?: boolean;
}
