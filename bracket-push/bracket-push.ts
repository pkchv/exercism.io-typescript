class BracketPush {

    input: string
    bracketPairs: {[index: string]: string} = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    startBracket: string[] = Object.keys(this.bracketPairs)
    stopBracket: string[] = Object.values(this.bracketPairs)

    constructor(input: string) {
        this.input = input
    }

    isPaired(): boolean {
        const bracketStack: string[] = []

        for (const character of this.input) {

            if (this.startBracket.includes(character)) {
                bracketStack.push(character)
            }

            if (this.stopBracket.includes(character)) {
                const topBracket: string | undefined = bracketStack.pop()

                if (topBracket === undefined) {
                    return false
                }

                if (character !== this.bracketPairs[topBracket]) {
                    return false
                }
            }
        }
        return bracketStack.length === 0
    }
}

export default BracketPush
