export class InvalidTokenError extends Error {
    constructor(public override message: string) {
        super();
        this.name = 'InvalidTokenError';
    }
}
