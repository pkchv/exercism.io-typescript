
class Squares {

    length: number

    constructor(length: number) {
        this.length = length
    }

    get squareOfSums(): number {
        const sum: number = this
            .getIntegerSequence(this.length)
            .reduce((a, b) => a + b)

        return Math.pow(sum, 2)
    }

    get sumOfSquares(): number {
        return this
            .getIntegerSequence(this.length)
            .map((v: number): number => Math.pow(v, 2))
            .reduce((a: number, b: number): number => a + b)
    }

    get difference(): number {
        return this.squareOfSums - this.sumOfSquares
    }

    private getIntegerSequence(length: number): number[] {
        return  Array.from({ length }, (_, key) => key + 1)
    }
}

export default Squares
