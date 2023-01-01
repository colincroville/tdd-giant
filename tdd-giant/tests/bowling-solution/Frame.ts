import Roll from './Roll';

export default class Frame {
    score = 0;
    rolls: Roll[] = [];

    addRoll(roll: Roll) {
        roll.isSpare = this.isRollASpare(roll.pinsDown);
        roll.isStrike = this.isRollAStrike(roll.pinsDown);
        this.rolls.push(roll);
        this.score += roll.pinsDown;
    }

    public get lastRoll(): Roll | null {
        return this.rolls.length > 0 ? this.rolls[this.rolls.length - 1] : null;
    }

    public addBonusForSpare(currentFrame: Frame) {
        if(currentFrame.rolls.length === 1) {
            this.score += currentFrame.rolls[0].pinsDown;
        }
    }

    public addBonusForStrike(currentFrame: Frame) {
        if(currentFrame.lastRoll !== null && currentFrame.rolls.length !== 3) {
            this.score += currentFrame.lastRoll.pinsDown;
        }
    }

    public addBonusForDoubleStrike(currentFrame: Frame): void {
        if(currentFrame.rolls.length === 1) {
            this.score += currentFrame.rolls[0].pinsDown;
        }
    }

    private isRollASpare(pinsDown: number): boolean {
        return this.rolls.length === 1 &&
        this.rolls[0].pinsDown + pinsDown === 10;
    }

    private isRollAStrike(pinsDown: number): boolean {
        return this.rolls.length === 0 && pinsDown === 10;
    }
}