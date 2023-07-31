import { useGetCollectionDetail } from '../hooks/queries/useGetCollectionDetail'
import { PageLayout, QueryLayout } from '../layouts'
import { useDeleteCollection } from '../hooks/mutations/useDeleteCollection'
import { CollectionItem } from '../components/collection-item'


export const CollectionDetail = () => {
    const { data, loading, error } = useGetCollectionDetail()

    const { deleteColletion } = useDeleteCollection()

    const onDeleteCollectionItem = (id: number) => {
        deleteColletion({ variables: { id } })
    }    


    return (
        <>
            <PageLayout pageTitle="Collection Detail">
                <QueryLayout loading={loading || !data} error={error}>
                    {
                        data?.lists.map((list: any) => (
                            <CollectionItem name={list.name} entries={list.entries} onDelete={onDeleteCollectionItem} typeDetail />
                        ))
                    }
                </QueryLayout>
            </PageLayout>
        </>
    )
}
