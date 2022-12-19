export class Card {
    suit: string;
    value: number;
    input: string;

    constructor(input: string) {
        this.value = this.extractValueFromInput(input);
        this.suit = input[input.length - 1];
        this.input = input;
    }

    private extractValueFromInput(input: string): number {
        const valueString = input.substring(0, input.length - 1);
        const valueByLetter = {
            'J': 11,
            'Q': 12,
            'K': 13,
            'A': 14
        };
        const value = Number(valueString);
        return isNaN(value) ? valueByLetter[valueString] : value;
    }
}

export abstract class Combination {
    hand: Hand;
    abstract strength: number;
    
    constructor(hand: Hand) {
        this.hand = hand;
    }

    abstract get strengthForTie(): number;
}

export class HighestCard extends Combination {
    strength = 1;
    constructor(hand: Hand) {
        super(hand);
    }
    
    public get strengthForTie(): number {
        let result = 0;
        const sortedValues = this.hand.sortedValues;
        sortedValues.reverse();
        for(let i = 0; i < sortedValues.length; i++) {
            const poweredUpValue = Math.pow(sortedValues[i], sortedValues.length - i);
            result += poweredUpValue;
        }
        return result;
    }
}

export class OnePair extends Combination {
    strength = 2;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class TwoPair extends Combination {
    strength = 3;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class ThreeOfAKind extends Combination {
    strength = 4;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class Straight extends Combination {
    strength = 5;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class Flush extends Combination {
    strength = 6;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class Full extends Combination {
    strength = 7;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class FourOfAKind extends Combination {
    strength = 8;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class StraightFlush extends Combination {
    strength = 9;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class RoyalFlush extends Combination {
    strength = 10;
    constructor(hand: Hand) {
        super(hand);
    }
}

export class Hand {
    cards: Card[];

    constructor(input: string[]) {
        this.cards = input.map(x => new Card(x));
    }

    public get hasPair(): boolean {
        return this.countIdenticalValues(2) === 1;
    }

    public get hasTwoPair(): boolean {
        return this.countIdenticalValues(2) === 2;
    }

    public get hasThreeOfAKind() {
        return this.countIdenticalValues(3) === 1;
    }

    public get hasStraight(): boolean {
        return this.sortedValues[this.sortedValues.length - 1] - this.sortedValues[0] ===
            this.cards.length - 1;
    }

    public get hasFlush(): boolean {
        return this.cards.every(x => x.suit === this.cards[0].suit);
    }

    public get hasFullHouse(): boolean {
        return this.hasPair && this.hasThreeOfAKind;
    }

    public get hasFourOfAKind(): boolean {
        return this.countIdenticalValues(4) === 1;
    }

    public get hasStraightFlush(): boolean {
        return this.hasStraight && this.hasFlush;
    }

    public get hasRoyalFlush(): boolean {
        return this.hasStraightFlush && this.cards.some(x => x.value === 14);
    }

    public get combination(): Combination {
        if(this.hasRoyalFlush) {
            return new RoyalFlush(this);
        }

        if(this.hasStraightFlush) {
            return new StraightFlush(this);
        }

        if(this.hasFourOfAKind) {
            return new FourOfAKind(this);
        }

        if(this.hasFullHouse) {
            return new Full(this);
        }

        if(this.hasFlush) {
            return new Flush(this);
        }

        if(this.hasStraight) {
            return new Straight(this);
        }

        if(this.hasThreeOfAKind) {
            return new ThreeOfAKind(this);
        }

        if(this.hasTwoPair) {
            return new TwoPair(this);
        }

        if(this.hasPair) {
            return new OnePair(this);
        }

        return new HighestCard(this);
    }

    public get sortedValues(): number[] {
        return this.values.sort((a,b)=>a-b);
    }

    private countIdenticalValues(numberOfIdenticalValues: number): number {
        const valuesCount = this.countByValue(this.values);
        return Object.values(valuesCount).filter(x => x === numberOfIdenticalValues).length;
    }

    private countByValue(valuesArray: number[]): { [value: number] : number} {
        const valueCount: { [value: number] : number} = {};
        valuesArray.forEach(x => {
            valueCount[x] = (valueCount[x] || 0) + 1;
        });
        return valueCount;
    }

    private get values(): number[] {
        return this.cards.map(x => x.value);
    }
}

export class Game {
    hands: Hand[];
    constructor(input: string[][]) {
        this.hands = input.map(x => new Hand(x));
    }

    public get winningHand(): string[] {
        const handWithBestCombination = this.hands.sort((a,b) => b.combination.strength - a.combination.strength)[0];

        const handsWithBestCombination = this.hands.filter(x => x.combination.strength === handWithBestCombination.combination.strength);
        if(handsWithBestCombination.length > 1) {
            return this.getBestCombinationTiedHand(handsWithBestCombination);
        }

        return this.mapHandResult(handWithBestCombination);
    }
    
    mapHandResult(hand: Hand): string[] {
        return hand.cards.map(x => x.input);
    }

    getBestCombinationTiedHand(hands: Hand[]): string[] {
        const handTieWinning = this.hands.sort((a,b) => b.combination.strengthForTie - a.combination.strengthForTie)[0];
        return this.mapHandResult(handTieWinning);
    }
}
