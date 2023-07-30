import { Link } from 'react-router-dom'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import styled from '@emotion/styled'
import { useGetCollectionList } from '../hooks/queries/useGetCollectionList'
import { PageLayout, QueryLayout } from '../layouts'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    border: 0.3rem solid;
    align-items: center;
    padding: 10px;
    background-color: #fff6e0;
    border-radius: 8px;
    margin-bottom: 20px;
`

const Description = styled.div`
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
    margin-left: 10px;
`

const Image = styled.img`
    object-fit: cover;
`

const CollectionTitle = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #272829;
    text-decoration: none;
    margin-right: 10px;
    font-family: 'Poppins', sans-serif;
`

const CollectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
`

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const CollectionList = () => {
    const { data, loading, error } = useGetCollectionList()

    return (
        <>
            <PageLayout pageTitle="Collection List">
                <Container>
                    <QueryLayout loading={loading || !data} error={error}>
                        <CollectionWrapper>
                            {data?.lists.map((list: any) => {
                                const route =
                                    list.name === 'Watching'
                                        ? 'current'
                                        : list.name.toLowerCase()
                                return (
                                    <div>
                                        <Header>
                                            <CollectionTitle
                                                to={`/collections/${route}`}
                                            >
                                                {list.name}
                                            </CollectionTitle>
                                            <AiOutlineFolderOpen />
                                        </Header>
                                        {list.entries.map((entry: any) => (
                                            <Content key={entry.id}>
                                                <Image
                                                    src={
                                                        entry.media.bannerImage
                                                    }
                                                    width={50}
                                                    height={50}
                                                />
                                                <Description>
                                                    {
                                                        entry.media.title
                                                            .userPreferred
                                                    }
                                                </Description>
                                            </Content>
                                        ))}
                                    </div>
                                )
                            })}
                        </CollectionWrapper>
                    </QueryLayout>
                </Container>
            </PageLayout>
        </>
    )
}
