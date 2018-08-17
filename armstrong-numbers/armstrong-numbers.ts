
export default class ArmstrongNumbers {
    static toDigits(n: number): number[] {
        const digits: number[] = []

        while (n > 0) {
            const digit: number = n % 10
            digits.push(digit)
            n /= 10
            n = Math.floor(n)
        }

        return digits
    }

    static isArmstrongNumber(n: number): boolean {
        const digits: number[] = this.toDigits(n)
        const exponent: number = digits.length

        return digits
            .map((digit: number): number => Math.pow(digit, exponent))
            .reduce((sum: number, value: number): number => sum + value, 0) === n
    }
}
