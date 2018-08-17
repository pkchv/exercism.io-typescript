
export default class Words {
    count(str: string): Map<string, number> {
        return str
        .split(/\s+/)
        .filter((word: string): boolean => word.length !== 0)
        .reduce((wordMap: Map<string, number>, word: string): Map<string, number> => {
            const normalizedWord: string = word.toLowerCase()
            wordMap.set(normalizedWord, (wordMap.get(normalizedWord) || 0) + 1)
            return wordMap
        }, new Map())
    }
}
