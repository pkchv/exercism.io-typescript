
function accumulate<T, U>(collection: T[], accumulator: (item: T) => U): U[] {
    const transformedCollection = []
    for (const item of collection) {
        transformedCollection.push(accumulator(item))
    }

    return transformedCollection
}

export { accumulate }
