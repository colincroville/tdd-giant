import { describe, expect, test, beforeEach } from 'vitest';

class Roll {
    isStrike: boolean;
    isSpare: boolean;
    pinsDown: number;

    constructor(pinsDown: number, isSpare: boolean, isStrike: boolean) {
        this.pinsDown = pinsDown;
        this.isSpare = isSpare;
        this.isStrike = isStrike;
    }
}

class Frame {
    score = 0;
    rolls: Roll[] = [];
    addRoll(roll: Roll) {
        this.rolls.push(roll);
        this.score += roll.pinsDown;
    }

    public get lastRoll(): Roll | null {
        return this.rolls.length > 0 ? this.rolls[this.rolls.length - 1] : null;
    }
}

class BowlingGame {
    finishedFrames: Frame[] = [];
    currentFrame = new Frame();

    addRolls(pinsDowns: number[]) {
        for(const pinsDown of pinsDowns) {
            this.addRoll(pinsDown);
        }
    }

    addRoll(pinsDown: number) {
        const roll = this.createRoll(pinsDown);
        this.updateFrames(roll);
    }

    public get score(): number {
        return [...this.finishedFrames, this.currentFrame].map(x => x.score).reduce((a,b) => a + b, 0);
    }

    public get rolls(): Roll[] {
        return [...this.finishedFrames, this.currentFrame].flatMap(x => x.rolls);
    }

    private createRoll(pinsDown: number): Roll {
        const isSpare = this.currentFrame.rolls.length === 1 && this.currentFrame.rolls[0].pinsDown + pinsDown === 10;
        const isStrike = this.currentFrame.rolls.length === 0 && pinsDown === 10;
        return new Roll(pinsDown, isSpare, isStrike);
    }

    private updateFrames(roll: Roll): void {
        this.currentFrame.addRoll(roll);
        this.updateScoreOfFinishedFrames();
        if(this.finishedFrames.length < 9 && (this.currentFrame.rolls.length === 2 || roll.isStrike)) {
            this.finishedFrames.push(this.currentFrame);
            this.currentFrame = new Frame();
        }
    }

    private updateScoreOfFinishedFrames(): void {
        const lastFinishedFrame = this.getLastFinishedFrame();
        if(lastFinishedFrame?.lastRoll?.isSpare) {
            this.addBonusForSpare(lastFinishedFrame);
        }

        if(lastFinishedFrame?.lastRoll?.isStrike) {
            this.addBonusForStrike(lastFinishedFrame);
        }

        const frameBeforeLastFinishedFrame = this.getFrameBeforeLastFinishedFrame();
        if(frameBeforeLastFinishedFrame?.lastRoll?.isStrike && lastFinishedFrame?.lastRoll?.isStrike) {
            this.addBonusForDoubleStrike(frameBeforeLastFinishedFrame);
        }
    }

    private addBonusForSpare(lastFinishedFrame: Frame): void {
        if(this.currentFrame.rolls.length === 1) {
            lastFinishedFrame.score += this.currentFrame.rolls[0].pinsDown;
        }
    }

    private addBonusForStrike(lastFinishedFrame: Frame): void {
        if(this.currentFrame.lastRoll !== null && this.currentFrame.rolls.length !== 3) {
            lastFinishedFrame.score += this.currentFrame.lastRoll.pinsDown;
        }
    }

    private addBonusForDoubleStrike(frameBeforeLastFinishedFrame: Frame): void {
        if(this.currentFrame.rolls.length === 1) {
            frameBeforeLastFinishedFrame.score += this.currentFrame.rolls[0].pinsDown;
        }
    }

    private getLastFinishedFrame(): Frame | null {
        return this.finishedFrames.length > 0 ? this.finishedFrames[this.finishedFrames.length - 1] : null;
    }

    private getFrameBeforeLastFinishedFrame(): Frame | null {
        return this.finishedFrames.length > 1 ? this.finishedFrames[this.finishedFrames.length - 2] : null;
    }
}

describe('Bowling', () => {
    let game: BowlingGame;
    beforeEach(() => {
        game = new BowlingGame();
    })
    test('when create game then rolls number is 0', () => {
        expect(game.rolls.length).toEqual(0);
    });
    
    test('when add roll then rolls length is 1', () => {
        game.addRoll(4);
        expect(game.rolls.length).toEqual(1);
    });
    
    test('when add roll 0 then 1st roll value 0', () => {
        game.addRoll(0);
        expect(game.rolls[0].pinsDown).toEqual(0);
    });
    
    test('when add roll 10 then 1st roll value 10', () => {
        game.addRoll(10);
        expect(game.rolls[0].pinsDown).toEqual(10);
    });
    
    test('when add 2 rolls then rolls length is 2', () => {
        game.addRolls([2, 5]);
        expect(game.rolls.length).toEqual(2);
    });
    
    test('when add 2 rolls then rolls values are the incoming pins down', () => {
        game.addRolls([2, 5]);
        expect(game.rolls[0].pinsDown).toEqual(2);
        expect(game.rolls[1].pinsDown).toEqual(5);
    });
    
    test('when add roll 10 then score is 10', () => {
        game.addRoll(10);
        expect(game.score).toEqual(10);
    });
    
    test('when add roll 5 then score is 5', () => {
        game.addRoll(5);
        expect(game.score).toEqual(5);
    });
    
    test('when add rolls 2 and 5 then score is 7', () => {
        game.addRolls([2, 5]);
        expect(game.score).toEqual(7);
    });
    
    test('when add rolls 5 and 5 then score is 10', () => {
        game.addRolls([5, 5]);
        expect(game.score).toEqual(10);
    });
    
    test('when add only 4 rolls during all game then score is 10', () => {
        game.addRolls([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
        expect(game.score).toEqual(80);
    });
    
    test('when add rolls 5 then finished frame count is 0', () => {
        game.addRolls([5]);
        expect(game.finishedFrames.length).toEqual(0);
    });
    
    test('when add rolls 5 and 5 then finished frame count is 1', () => {
        game.addRolls([5, 5]);
        expect(game.finishedFrames.length).toEqual(1);
    });
    
    test('when add rolls 10 and 10 then finished frame count is 2', () => {
        game.addRolls([10, 10]);
        expect(game.finishedFrames.length).toEqual(2);
    });
    
    test('when add rolls 5 and 5 then 2nd roll is spare', () => {
        game.addRolls([5, 5]);
        expect(game.rolls[1].isSpare).toEqual(true);
    });
    
    test('when add rolls 5 and 2 then 2nd roll is not spare', () => {
        game.addRolls([5, 2]);
        expect(game.rolls[1].isSpare).toEqual(false);
    });
    
    test('when add rolls 10 then roll is strike', () => {
        game.addRolls([10]);
        expect(game.rolls[0].isStrike).toEqual(true);
    });
    
    test('when add rolls 5 then roll is not strike', () => {
        game.addRolls([5]);
        expect(game.rolls[0].isStrike).toEqual(false);
    });
    
    test('when add rolls 5 and 2 and 10 then 1st frame score is 7 and 2nd frame score is 10', () => {
        game.addRolls([5, 2, 10]);
        expect(game.finishedFrames[0].score).toEqual(7);
        expect(game.finishedFrames[1].score).toEqual(10);
    });
    
    test('when add rolls 0 and 10 then 2nd roll is spare and not strike', () => {
        game.addRolls([0, 10]);
        expect(game.rolls[1].isSpare).toEqual(true);
        expect(game.rolls[1].isStrike).toEqual(false);
    });
    
    test('when add rolls 10 and 10 then both rolls are strikes', () => {
        game.addRolls([10, 10]);
        expect(game.rolls[0].isSpare).toEqual(false);
        expect(game.rolls[0].isStrike).toEqual(true);
        expect(game.rolls[1].isSpare).toEqual(false);
        expect(game.rolls[1].isStrike).toEqual(true);
    });
    
    test('when add rolls 0 and 10 and 2 then score is 14', () => {
        game.addRolls([4, 6, 2]);
        expect(game.score).toEqual(14);
    });
    
    test('when add rolls 10 and 2 and 4 and 5 then score is 27', () => {
        game.addRolls([10, 2, 4, 5]);
        expect(game.score).toEqual(27);
    });
    
    test('when add rolls 10 and 2 and 4 and 5 then score is 57', () => {
        game.addRolls([10, 10, 4, 5, 5]);
        expect(game.score).toEqual(57);
    });
    
    test('when given 1st exemple then score is 120', () => {
        game.addRolls([5, 2, 4, 6, 10, 4, 4, 2, 3, 0, 0, 10, 10, 4, 6, 4, 0]);
        expect(game.score).toEqual(120);
    });
    
    test('when given 2nd exemple then score is 104', () => {
        game.addRolls([5, 2, 4, 6, 3, 4, 10, 8, 2, 1, 5, 9, 1, 0, 2, 4, 6, 5, 5, 3]);
        expect(game.score).toEqual(104);
    });
    
    test('when given 3rd exemple then score is 300', () => {
        game.addRolls([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
        expect(game.score).toEqual(300);
    });
});