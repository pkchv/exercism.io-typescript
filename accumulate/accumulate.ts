
/* tslint:disable:no-any */
function accumulate(collection: any[], accumulator: (item: any) => any): any[] {
    const transformedCollection: any[] = []
    for (const item of collection) {
        transformedCollection.push(accumulator(item))
    }

    return transformedCollection
}

export { accumulate }
