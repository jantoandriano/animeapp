export const groupCollection = (parseResult: any) => {
    return parseResult.reduce(function (
        r: { [x: string]: any[] },
        a: { collectionname: string | number }
    ) {
        r[a.collectionname] = r[a.collectionname] || []
        r[a.collectionname].push(a)
        return r
    }, Object.create(null))
}