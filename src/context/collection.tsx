import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

const CollectionContext = createContext<any>([])

export const CollectionProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [collections, setCollections] = useState<any>([])
    const [collectionsRaw, setCollectionsRaw] = useState([])
    const [detailCollection, setDetailCollection] = useState([])

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
        setCollectionsRaw(parseResult)
    }, [sessionStorage.getItem('collections')])

    const onAddColection = (data: any, state: any) => {
        const collection = sessionStorage.getItem('collections')
        const result = collection ? JSON.parse(collection as string) : []

        const dataSameCollections = { collectionname: state, ...data }
        sessionStorage.setItem(
            'collections',
            JSON.stringify([...result, dataSameCollections])
        )
    }

    const onConfirm = (
        id: number,
        params: { type: string | undefined },
        callback: any
    ) => {
        const result = sessionStorage.getItem('collections')
        const parseResult = result ? JSON.parse(result as string) : []

        const updatedCollections = parseResult.findIndex(
            (val: { id: number; collectionname: string | undefined }) =>
                val.id === id && val.collectionname === params.type
        )
        parseResult.splice(updatedCollections, 1)

        if (!parseResult.length) {
            sessionStorage.setItem('collections', JSON.stringify(parseResult))
            setDetailCollection(parseResult)
            callback()
        } else {
            sessionStorage.setItem('collections', JSON.stringify(parseResult))
            setDetailCollection(parseResult)
            callback()
        }
    }

    const onDeleteCollection = (collection: string) => {
        const result = sessionStorage.getItem('collections')
        const parseResult = result ? JSON.parse(result as string) : []

        const updatedCollections = parseResult.filter(
            (val: { collectionname: string }) =>
                val.collectionname !== collection
        )
        setCollections(updatedCollections)
    }

    return (
        <CollectionContext.Provider
            value={{
                detailCollection,
                collections,
                collectionsRaw,
                onAddColection,
                onDeleteCollection,
                onConfirm,
            }}
        >
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollectionContext = () => {
    const context = useContext(CollectionContext)

    return context
}
