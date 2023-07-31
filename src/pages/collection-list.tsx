import styled from '@emotion/styled'
import { useGetCollectionList } from '../hooks/queries/useGetCollectionList'
import { PageLayout, QueryLayout } from '../layouts'
import { CollectionItem } from '../components/collection-item'

const CollectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
`

export const CollectionList = () => {
    const { data, loading, error } = useGetCollectionList()

    return (
        <>
            <PageLayout pageTitle="Collection List">
                <QueryLayout loading={loading || !data} error={error}>
                    <CollectionWrapper>
                        <CollectionItem collections={data?.lists || []} />
                    </CollectionWrapper>
                </QueryLayout>
            </PageLayout>
        </>
    )
}
