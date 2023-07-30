import { Key, ReactElement, JSXElementConstructor, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { CgAdd } from 'react-icons/cg'
import { PageLayout } from '../layouts/page-layout'
import { QueryLayout } from '../layouts/query-layout'
import { useGetAnimeDetail } from '../hooks/queries/useGetAnimeDetail'
import { Button } from '../components/button'
import { useAddCollection } from '../hooks/mutations/useAddCollection'

interface Media {
    mediaListEntry: {
        status: string
    }
    description: ReactNode
    id: Key | null | undefined
    coverImage: { medium: string | undefined }
    title: {
        english:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
    }
}

const Container = styled.div`
    border: 1px; solid blue;
    padding: 10px;

`
const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
`

const Image = styled.img`
    width: 300px;
    height: 200px;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0 10px 0;
    font-family: 'Poppins', sans-serif;
    padding: 8px;
    background-color: #ffc95f;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

const Description = styled.div`
    font-size: 13px;
    justify-content: center;
    align-items: center;
    text-align: justify;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const CollectionInfo = styled(Link)`
    padding: 8px;
    width: 100px;
    background-color: #faf0d7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    color: #000000;
`

export const AnimeDetail: React.FC = () => {
    const { media, loading, error } = useGetAnimeDetail()
    const { addToCollection, loading: loadingMutate } = useAddCollection()

    function onAddPlaningCollection(mediaId: number) {
        addToCollection({ variables: { mediaId, status: 'PLANNING' } })
    }

    function onAddWatchingCollection(mediaId: number) {
        addToCollection({ variables: { mediaId, status: 'CURRENT' } })
    }

    return (
        <PageLayout pageTitle="Anime Detail">
            <QueryLayout loading={loading} error={error}>
                <Container>
                    {media.map((val: Media) => {
                        const url = val?.mediaListEntry?.status.toLowerCase()
                        const status = val?.mediaListEntry
                            ? val?.mediaListEntry?.status
                            : ''

                        return (
                            <Content key={val.id}>
                                <Image src={val.coverImage.medium} />
                                <Title>{val.title.english}</Title>
                                {status ? (
                                    <CollectionInfo to={`/collections/${url}`}>
                                        {status}
                                    </CollectionInfo>
                                ) : null}
                                <Description>{val.description}</Description>
                                <ButtonGroup>
                                    <Button
                                        type="planning"
                                        onClick={() =>
                                            onAddPlaningCollection(
                                                val.id as number
                                            )
                                        }
                                        loading={loadingMutate}
                                    >
                                        <CgAdd /> Planning
                                    </Button>

                                    <Button
                                        type="watching"
                                        onClick={() =>
                                            onAddWatchingCollection(
                                                val.id as number
                                            )
                                        }
                                        loading={loadingMutate}
                                    >
                                        <CgAdd />
                                        Watching
                                    </Button>
                                </ButtonGroup>
                            </Content>
                        )
                    })}
                </Container>
            </QueryLayout>
        </PageLayout>
    )
}
