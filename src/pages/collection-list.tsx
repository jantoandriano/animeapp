import styled from '@emotion/styled'
import { PageLayout } from '../layouts'
import { CollectionItem } from '../components/collection-item'
import { useCollectionContext } from '../context/collection'

const CollectionItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
`

export const CollectionList = () => {
    const context = useCollectionContext()

    return (
        <>
            <PageLayout pageTitle="Collection List">
                <CollectionItemWrapper>
                    {Object.keys(context.collections).map((list) => {
                        return (
                            <CollectionItem
                                key={list}
                                name={list}
                                entry={context.collections[list]}
                                onDeleteCollection={context.onDeleteCollection}
                            />
                        )
                    })}
                </CollectionItemWrapper>
            </PageLayout>
        </>
    )
}
