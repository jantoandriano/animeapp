import { useEffect, useState } from 'react'

export const useGetCollectionList = () => {
    const [collections, setCollections] = useState<any>([])

    useEffect(() => {
        const result = sessionStorage.getItem('collections')
        const parseResult = result ? JSON.parse(result as string) : []

        const collections = parseResult.reduce(function (
            r: { [x: string]: any[] },
            a: { collectionname: string | number }
        ) {
            r[a.collectionname] = r[a.collectionname] || []
            r[a.collectionname].push(a)
            return r
        }, Object.create(null))

        setCollections(collections)
    }, [])

    return {
        collections,
    }
}
