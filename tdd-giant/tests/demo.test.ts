/*
Ecrire un programme qui retourne les entiers de 1 à 100
Avec les contraintes suivantes :
Pour les multiples de 3, on retourne Fizz à la place.
Pour les multiples de 5, on retourne Buzz à la place.
Pour les multiples de 15, on retourne FizzBuzz à la place.

Attendu:
"12Fizz4BuzzFizz78FizzBuzz......Buzz"
*/
import { describe, expect, it } from 'vitest';

class FizzBuzz {
    generate(start: number, end: number): string {
        let result = '';
        
        for(let i = start; i <= end; i++) {
            result += this.generateString(i);
        }
        
        return result;
    }

    private generateString(integer: number): string {
        if(integer % 15 === 0) {
            return 'FizzBuzz';
        }

        if(integer % 5 === 0) {
            return 'Buzz';
        }

        if(integer % 3 === 0) {
            return 'Fizz';
        }

        return integer.toString();
    }    
}

describe('FizzBuzz', () => {
    it('should return 1 if number is 1', () => {
        expect(new FizzBuzz().generate(1, 1)).toEqual('1');
    });

    it('should return Fizz if number is 3', () => {
        expect(new FizzBuzz().generate(3, 3)).toEqual('Fizz');
    });

    it('should return Buzz if number is 5', () => {
        expect(new FizzBuzz().generate(5, 5)).toEqual('Buzz');
    });

    it('should return FizzBuzz if number is 15', () => {
        expect(new FizzBuzz().generate(15, 15)).toEqual('FizzBuzz');
    });

    it('should return Fizz if number is 27', () => {
        expect(new FizzBuzz().generate(27, 27)).toEqual('Fizz');
    });

    it('should return 31 if number is 31', () => {
        expect(new FizzBuzz().generate(31, 31)).toEqual('31');
    });

    it('should return Fizz if number is multiple of 3', () => {
        // Prepare.
        const fizzBuzz = new FizzBuzz();
        const testIntegers = [
            3, 6, 9, 12, 18, 27, 66, 99
        ];

        // Act.
        const results = testIntegers.map(x => fizzBuzz.generate(x, x));

        // Assert.
        expect(results.every(x => x === 'Fizz')).toEqual(true);
    });

    it('should return Buzz if number is multiple of 5', () => {
        // Prepare.
        const fizzBuzz = new FizzBuzz();
        const testIntegers = [
            5, 10, 20, 50, 95
        ];

        // Act.
        const results = testIntegers.map(x => fizzBuzz.generate(x, x));

        // Assert.
        expect(results.every(x => x === 'Buzz')).toEqual(true);
    });

    it('should return FizzBuzz if number is multiple of 15', () => {
        // Prepare.
        const fizzBuzz = new FizzBuzz();
        const testIntegers = [
            15, 45, 75
        ];

        // Act.
        const results = testIntegers.map(x => fizzBuzz.generate(x, x));

        // Assert.
        expect(results.every(x => x === 'FizzBuzz')).toEqual(true);
    });

    it('should return numbers from 1 to 100 with multiple replaced', () => {
        // Prepare.
        const fizzBuzz = new FizzBuzz();

        // Act.
        const result = fizzBuzz.generate(1, 100);

        // Assert.
        expect(result.substring(0, 25)).toEqual('12Fizz4BuzzFizz78FizzBuzz');
    })
});