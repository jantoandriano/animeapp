import styled from '@emotion/styled'
import { useGetCollectionDetail } from '../hooks/queries/useGetCollectionDetail'
import { MdDeleteOutline } from 'react-icons/md'
import { PageLayout, QueryLayout } from '../layouts'
import { useDeleteCollection } from '../hooks/mutations/useDeleteCollection'

const CollectionTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
`

const CollectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    border-radius: 8px;
`

const Description = styled.div`
    margin-left: 10px;
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
`

const Image = styled.img`
    object-fit: cover;
`

const Delete = styled.div`
    padding: 8px;
    border: 1px solid black;
    background-color: #f24c3d;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

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
                    <CollectionWrapper>
                        {data?.lists.map((list: any) => {
                            return (
                                <div>
                                    <CollectionTitle>
                                        {list.name}
                                    </CollectionTitle>
                                    {list.entries.map((entry: any) => (
                                        <Content key={entry.id}>
                                            <Image
                                                src={entry.media.bannerImage}
                                                width={50}
                                                height={50}
                                            />
                                            <Description>
                                                {
                                                    entry.media.title
                                                        .userPreferred
                                                }
                                            </Description>
                                            <Delete
                                                onClick={() =>
                                                    onDeleteCollectionItem(
                                                        entry.id
                                                    )
                                                }
                                            >
                                                <MdDeleteOutline />
                                            </Delete>
                                        </Content>
                                    ))}
                                </div>
                            )
                        })}
                    </CollectionWrapper>
                </QueryLayout>
            </PageLayout>
        </>
    )
}
