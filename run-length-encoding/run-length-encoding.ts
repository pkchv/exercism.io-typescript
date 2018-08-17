
export default class RunLengthEncoding {
    static encode(str: string): string {
        const characterLengthTuples: Array<[number, string]> = this.rawStringToTuples(str)
        return this.runLengthTupleToEncodedString(characterLengthTuples)
    }

    static decode(str: string): string {
        const characterLengthTuples: Array<[number, string]> = this.encodedStringToTuples(str)
        return this.runLengthTupleToDecodedString(characterLengthTuples)
    }

    private static encodedStringToTuples(str: string): Array<[number, string]> {
        const splitEncodedString: string[] = str.split(/(\d+)/)
        const characterLengthTuples: Array<[number, string]> = []
        let currentLength: number = 1

        for (const v of splitEncodedString) {
            if (!this.isNumeric(v)) {
                for (const character of v.split('')) {
                    characterLengthTuples.push([currentLength, character])
                    currentLength = 1
                }
            }
            else {
                currentLength = parseInt(v, 10)
            }
        }

        return characterLengthTuples
    }

    private static isNumeric(str: string): boolean {
        return /\d+/.test(str)
    }

    private static rawStringToTuples(str: string): Array<[number, string]> {
        const characterLengthTuples: Array<[number, string]> = []
        let lastLetter: string = str.charAt(0)
        let runLength: number = 1

        for (const currentLetter of str.substr(1)) {
            if (currentLetter === lastLetter) {
                runLength += 1
            }
            else {
                characterLengthTuples.push([runLength, lastLetter])
                lastLetter = currentLetter
                runLength = 1
            }
        }

        characterLengthTuples.push([runLength, lastLetter])

        return characterLengthTuples
    }

    private static runLengthTupleToDecodedString(characterLengths: Array<[number, string]>): string {
        let decoded_str: string = ""

        for (const [length, character] of characterLengths) {
            decoded_str += character.repeat(length)
        }

        return decoded_str
    }

    private static runLengthTupleToEncodedString(characterLengths: Array<[number, string]>): string {
        let encoded_str: string = ""

        for (const [length, character] of characterLengths) {
            if (length === 1) {
                encoded_str += character
            }
            else {
                encoded_str += length + character
            }
        }

        return encoded_str
    }
}
