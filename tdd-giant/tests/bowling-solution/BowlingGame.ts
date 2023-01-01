import Frame from './Frame';
import Roll from './Roll';

export default class BowlingGame {
    finishedFrames: Frame[] = [];
    currentFrame = new Frame();

    public addRolls(pinsDowns: number[]) {
        for(const pinsDown of pinsDowns) {
            this.addRoll(pinsDown);
        }
    }

    public addRoll(pinsDown: number) {
        const roll = new Roll(pinsDown);
        this.currentFrame.addRoll(roll);
        this.updateScoreOfFinishedFrames();
        if(this.finishedFrames.length < 9 && (this.currentFrame.rolls.length === 2 || roll.isStrike)) {
            this.finishedFrames.push(this.currentFrame);
            this.currentFrame = new Frame();
        }
    }

    public get score(): number {
        return [...this.finishedFrames, this.currentFrame].map(x => x.score).reduce((a,b) => a + b, 0);
    }

    public get rolls(): Roll[] {
        return [...this.finishedFrames, this.currentFrame].flatMap(x => x.rolls);
    }

    private updateScoreOfFinishedFrames(): void {
        const lastFinishedFrame = this.getLastFinishedFrame();

        // Spare case
        if(lastFinishedFrame?.lastRoll?.isSpare) {
            lastFinishedFrame.addBonusForSpare(this.currentFrame);
        }

        // Strike case.
        if(lastFinishedFrame?.lastRoll?.isStrike) {
            lastFinishedFrame.addBonusForStrike(this.currentFrame);

            // Double strike case.
            const frameBeforeLastFinishedFrame = this.getFrameBeforeLastFinishedFrame();
            if(frameBeforeLastFinishedFrame?.lastRoll?.isStrike) {
                frameBeforeLastFinishedFrame.addBonusForDoubleStrike(this.currentFrame);
            }
        }
    }

    private getLastFinishedFrame(): Frame | null {
        return this.finishedFrames.length > 0 ? this.finishedFrames[this.finishedFrames.length - 1] : null;
    }

    private getFrameBeforeLastFinishedFrame(): Frame | null {
        return this.finishedFrames.length > 1 ? this.finishedFrames[this.finishedFrames.length - 2] : null;
    }
}