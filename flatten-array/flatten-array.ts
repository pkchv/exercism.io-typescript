
class FlattenArray {
    public static flatten(inputArray: any[]): any[] {
        return inputArray
            .reduce((flatArray, element) => {
                if (Array.isArray(element)) {
                    return flatArray.concat(this.flatten(element))
                }

                return flatArray.concat(element)
            }, [])
            .filter((element: any) => element !== undefined)
    }
}

export default FlattenArray
