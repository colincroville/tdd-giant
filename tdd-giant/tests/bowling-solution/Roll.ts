export default class Roll {
    isStrike: boolean;
    isSpare: boolean;
    pinsDown: number;

    constructor(pinsDown: number) {
        this.pinsDown = pinsDown;
        this.isSpare = false;
        this.isStrike = false;
    }
}