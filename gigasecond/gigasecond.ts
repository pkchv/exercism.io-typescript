
class Gigasecond {

    fromDate: Date;

    constructor(date: Date) {
        this.fromDate = date
    }

    date(): Date {
        const gigaConstant: number = Math.pow(10, 9)
        return new Date(this.fromDate.valueOf() + 1000 * gigaConstant)
    }
}

export default Gigasecond
