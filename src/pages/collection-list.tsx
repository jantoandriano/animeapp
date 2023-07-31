import styled from '@emotion/styled'
import { useGetCollectionList } from '../hooks/queries/useGetCollectionList'
import { PageLayout, QueryLayout } from '../layouts'
import { CollectionItem } from '../components/collection-item'

const CollectionItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
`

export const CollectionList = () => {
    const { data, loading, error } = useGetCollectionList()

    return (
        <>
            <PageLayout pageTitle="Collection List">
                <QueryLayout loading={loading || !data} error={error}>
                    <CollectionItemWrapper>
                        <CollectionItem collections={data?.lists || []} />
                    </CollectionItemWrapper>
                </QueryLayout>
            </PageLayout>
        </>
    )
}
