import { describe, expect, test } from 'vitest';
import { Card, Hand,
    HighestCard,
    OnePair,
    TwoPair,
    ThreeOfAKind, 
    Straight,
    Flush,
    Full,
    FourOfAKind,
    StraightFlush,
    RoyalFlush,
    Game } from './poker';

describe('Poker cards', () => {
    test('given 2♠ when create card then have suit ♠ and value 2', () => {
        genericCardValueAndSuitTest('2♠', 2, '♠');
    });
    
    test('given K♥ when create card then have suit ♥ and value 13', () => {
        genericCardValueAndSuitTest('K♥', 13, '♥');
    });
    
    test('given 10♦ when create card then have suit ♦ and value 10', () => {
        genericCardValueAndSuitTest('10♦', 10, '♦');
    });
    
    test('given A♦ when create card then have suit ♦ and value 14', () => {
        genericCardValueAndSuitTest('A♦', 14, '♦');
    });

    const genericCardValueAndSuitTest = (input: string, expectedValue: number, expectedSuit: string) => {        // Act.
        const card = new Card(input);
        expect(card.value).toEqual(expectedValue);
        expect(card.suit).toEqual(expectedSuit);
    };
});

describe('Poker Hand', () => {
    test('Given [2♠, K♥, 10♦, 10♠, 10♥] then create hand with 5 cards', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '10♥'];
        const hand = new Hand(input);
        expect(hand.cards.length).toEqual(5);
        expect(hand.cards[0]).toBeInstanceOf(Card);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 10♥] then create hand with 5 cards with input values', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '10♥'];
        const hand = new Hand(input);
        expect(hand.cards[0].value).toEqual(2);
        expect(hand.cards[1].value).toEqual(13);
        expect(hand.cards[2].value).toEqual(10);
        expect(hand.cards[3].value).toEqual(10);
        expect(hand.cards[4].value).toEqual(10);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 3♥] then create hand then has pair', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '3♥'];
        const hand = new Hand(input);
        expect(hand.hasPair).toEqual(true);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 2♥] then create hand then not one pair', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '2♥'];
        const hand = new Hand(input);
        expect(hand.hasPair).toEqual(false);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 2♥] then create hand then has two pairs', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '2♥'];
        const hand = new Hand(input);
        expect(hand.hasTwoPair).toEqual(true);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 10♥] then create hand then not two pairs', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasTwoPair).toEqual(false);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 10♥] then create hand then has three of a kind', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasThreeOfAKind).toEqual(true);
    });

    test('Given [4♠, 5♥, 6♦, 7♠, 8♥] then create hand then not three of a kind', () => {
        const input = ['4♠', '5♥', '6♦', '7♠', '8♥'];
        const hand = new Hand(input);
        expect(hand.hasThreeOfAKind).toEqual(false);
    });

    test('Given [4♠, 5♥, 6♦, 7♠, 8♥] then create hand then has straight', () => {
        const input = ['4♠', '5♥', '6♦', '7♠', '8♥'];
        const hand = new Hand(input);
        expect(hand.hasStraight).toEqual(true);
    });

    test('Given [2♠, K♥, 10♦, 10♠, 10♥] then create hand then not straight', () => {
        const input = ['2♠', 'K♥', '10♦', '10♠', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasStraight).toEqual(false);
    });

    test('has Flush', () => {
        const input = ['4♥', 'J♥', '6♥', '7♥', '8♥'];
        const hand = new Hand(input);
        expect(hand.hasFlush).toEqual(true);
    });
    test('not has Flush', () => {
        const input = ['4♥', 'J♦', '6♥', '7♥', '8♥'];
        const hand = new Hand(input);
        expect(hand.hasFlush).toEqual(false);
    });

    test('has Full house', () => {
        const input = ['J♥', 'J♦', '7♦', '7♥', '7♠'];
        const hand = new Hand(input);
        expect(hand.hasFullHouse).toEqual(true);
    });
    test('not has Full house', () => {
        const input = ['4♥', 'J♦', '6♥', '7♥', '8♥'];
        const hand = new Hand(input);
        expect(hand.hasFullHouse).toEqual(false);
    });

    test('has Four of a kind', () => {
        const input = ['J♥', 'J♦', 'J♠', 'J♣', '8♠'];
        const hand = new Hand(input);
        expect(hand.hasFourOfAKind).toEqual(true);
    });
    test('not has Four of a kind', () => {
        const input = ['J♥', 'J♦', 'J♠', '8♣', '8♠'];
        const hand = new Hand(input);
        expect(hand.hasFourOfAKind).toEqual(false);
    });

    test('has Straight flush', () => {
        const input = ['6♥', '7♥', '8♥', '9♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasStraightFlush).toEqual(true);
    });
    test('not has Straight flush', () => {
        const input = ['6♥', '7♦', '8♥', '9♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasStraightFlush).toEqual(false);
    });

    test('has Royal flush', () => {
        const input = ['A♥', 'J♥', 'K♥', 'Q♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasRoyalFlush).toEqual(true);
    });
    test('not has Royal flush', () => {
        const input = ['9♥', 'J♥', 'K♥', 'Q♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.hasRoyalFlush).toEqual(false);
    });

    test('given hand with no combination when get combination then return HighestCard', () => {
        const input = ['2♥', 'J♥', 'K♦', 'Q♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(HighestCard);
    });
    test('given hand with pair when get combination then return OnePair', () => {
        const input = ['2♥', 'K♥', 'K♦', 'Q♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(OnePair);
    });
    test('given hand with two pair when get combination then return TwoPair', () => {
        const input = ['2♥', 'K♥', 'K♦', 'Q♥', '2♦'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(TwoPair);
    });
    test('given hand with three of a kind when get combination then return ThreeOfAKind', () => {
        const input = ['2♥', 'K♥', 'K♦', 'Q♥', 'K♠'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(ThreeOfAKind);
    });
    test('given hand with straight when get combination then return Straight', () => {
        const input = ['4♠', '5♥', '6♦', '7♠', '8♥'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(Straight);
    });
    test('given hand with flush when get combination then return Flush', () => {
        const input = ['4♠', '5♠', '6♠', '7♠', 'K♠'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(Flush);
    });
    test('given hand with full when get combination then return Full', () => {
        const input = ['J♥', 'J♦', '7♦', '7♥', '7♠'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(Full);
    });
    test('given hand with four of a kind when get combination then return FourOfAKind', () => {
        const input = ['7♣', 'J♦', '7♦', '7♥', '7♠'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(FourOfAKind);
    });
    test('given hand with straight flush when get combination then return StraightFlush', () => {
        const input = ['6♥', '7♥', '8♥', '9♥', '10♥'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(StraightFlush);
    });
    test('given hand with royal flush when get combination then return RoyalFlush', () => {
        const input = ['10♥', 'A♥', 'J♥', 'K♥', 'Q♥'];
        const hand = new Hand(input);
        expect(hand.combination).toBeInstanceOf(RoyalFlush);
    });
});

describe('Compare hands', () => {
    test('Given hand with full and with three of a kind when check winner then return full', () => {
        const game = new Game([
            ['2♠', 'K♥', '10♦', '10♠', '10♥'],
            ['J♥', 'J♦', '7♦', '7♥', '7♠']
        ]);
        expect(game.winningHand).toEqual(['J♥', 'J♦', '7♦', '7♥', '7♠']);
    });
    test('Given hand with full and with three of a kind in other order when check winner then return full', () => {
        const game = new Game([
            ['J♥', 'J♦', '7♦', '7♥', '7♠'],
            ['2♠', 'K♥', '10♦', '10♠', '10♥']
        ]);
        expect(game.winningHand).toEqual(['J♥', 'J♦', '7♦', '7♥', '7♠']);
    });

    test('Given 5 hands when check winner then return best hand', () => {
        const game = new Game([
            ['J♥', 'J♦', '7♦', '7♥', '7♠'],
            ['2♠', 'K♥', '10♦', '10♠', '10♥'],
            ['A♣', 'K♣', 'J♣', 'Q♣', '10♣'],
            ['3♠', 'A♥', 'J♦', 'J♠', 'J♥'],
            ['4♣', 'A♦', '4♦', '4♥', '4♠'],
        ]);
        expect(game.winningHand).toEqual(['A♣', 'K♣', 'J♣', 'Q♣', '10♣']);
    });

    test('Given two highest card when check winner then return hand with best cards', () => {
        const game = new Game([
            ['A♣', '7♥', '8♣', 'J♣', '10♣'],
            ['3♠', 'A♥', 'J♦', '4♠', '2♥'],
        ]);
        expect(game.winningHand).toEqual(['A♣', '7♥', '8♣', 'J♣', '10♣']);
    });

    test('Given two highest card in other order when check winner then return hand with best cards', () => {
        const game = new Game([
            ['3♠', 'A♥', 'J♦', '4♠', '2♥'],
            ['A♣', '7♥', '8♣', 'J♣', '10♣'],
        ]);
        expect(game.winningHand).toEqual(['A♣', '7♥', '8♣', 'J♣', '10♣']);
    });
});