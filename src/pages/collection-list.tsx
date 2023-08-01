import styled from '@emotion/styled'
import { PageLayout } from '../layouts'
import { CollectionItem } from '../components/collection-item'
import { useGetCollectionList } from '../hooks/queries/useGetCollectionList'

const CollectionItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
`

export const CollectionList = () => {
    const { collections } = useGetCollectionList()

    function onDeleteCollection(collection: string) {
        const result = sessionStorage.getItem('collections')
        const parseResult = result ? JSON.parse(result as string) : []

        const updatedCollections = parseResult.filter(
            (val: { collectionname: string }) =>
                val.collectionname !== collection
        )
        sessionStorage.setItem(
            'collections',
            JSON.stringify(updatedCollections)
        )
    }

    return (
        <>
            <PageLayout pageTitle="Collection List">
                <CollectionItemWrapper>
                    {Object.keys(collections).map((list) => {
                        return (
                            <CollectionItem
                                key={list}
                                name={list}
                                entry={collections[list]}
                                onDeleteCollection={onDeleteCollection}
                            />
                        )
                    })}
                </CollectionItemWrapper>
            </PageLayout>
        </>
    )
}
