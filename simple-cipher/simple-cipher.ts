
class SimpleCipher {

    keyShiftVector: number[]

    // key length range
    keyLengthLowerbound = 100
    keyLengthUpperbound = 200

    // lowercase letter ascii code range bounds
    letterCodesLowerbound = 97
    letterCodesUpperbound = 122

    constructor(key?: string) {
        if (key !== undefined && !/[a-z]+/.test(key)) {
            throw Error('Bad key')
        }

        const _key = key || this.generateRandomKey(this.randomInteger(this.keyLengthLowerbound, this.keyLengthUpperbound))
        this.keyShiftVector = Array.from({ length: _key.length })
            .map((_, index) => _key.charCodeAt(index))
            .map((charCode) => charCode - this.letterCodesLowerbound)
    }

    private generateRandomKey(length: number): string {
        return Array.from({ length }, () => this.randomInteger(this.letterCodesLowerbound, this.letterCodesUpperbound))
            .map((v) => String.fromCharCode(v))
            .join('')
    }

    private randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    private getShiftValue(index: number): number {
        return this.keyShiftVector[index % this.keyShiftVector.length]
    }

    private shiftCharacterCode(charCode: number, shiftValue: number): number {
        // letter index ascending in alphabetical order, starts from 0 with letter a
        const letterIndex = charCode - this.letterCodesLowerbound

        // total number of code points in the code space
        const codeSize = this.letterCodesUpperbound - this.letterCodesLowerbound + 1

        // letter index shifted by current position shift value
        let letterIndexShifted = letterIndex + (shiftValue % codeSize)

        // make sure letter index will be a positive number
        letterIndexShifted = shiftValue > 0 ? letterIndexShifted : letterIndexShifted + codeSize

        // make sure letter index will not get out of bounds in every case
        letterIndexShifted = letterIndexShifted % codeSize

        // transform letter index back to ASCII code
        return letterIndexShifted + this.letterCodesLowerbound
    }

    private transform(data: string, getShiftValue: (index: number) => number) {
        return data
            .split('')
            .map((character) => character.charCodeAt(0))
            .map((charCode, index) => this.shiftCharacterCode(charCode, getShiftValue(index)))
            .map((charCode) => String.fromCharCode(charCode))
            .join('')
    }

    get key(): string {
        return this.keyShiftVector
            .map((v) => v + this.letterCodesLowerbound)
            .map((charCode) => String.fromCharCode(charCode))
            .join('')
    }

    encode(plaintext: string): string {
        return this.transform(plaintext, (index) => this.getShiftValue(index))
    }

    decode(ciphertext: string): string {
        return this.transform(ciphertext, (index) => -this.getShiftValue(index))
    }
}

export default SimpleCipher
