
function keep<T>(collection: T[], predicate: (item: T) => boolean): T[] {
    const filteredCollection: T[] = []

    for (const item of collection) {
        if (predicate(item)) {
            filteredCollection.push(item)
        }
    }

    return filteredCollection
}

function discard<T>(collection: T[], predicate: (item: T) => boolean): T[] {
    return keep<T>(collection, (item: T): boolean => !predicate(item))
}

export {keep, discard}
