
function isDivisor(n: number, k: number) {
    return n % k === 0
}

function isLeapYear(year: number) {
    return isDivisor(year, 4) && !isDivisor(year, 100)
    || isDivisor(year, 4) && isDivisor(year, 100) && isDivisor(year, 400)
}

export default isLeapYear
