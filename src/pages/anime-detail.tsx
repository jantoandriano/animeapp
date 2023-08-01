import {
    Key,
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    useState,
    ReactPortal,
} from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { PageLayout } from '../layouts/page-layout'
import { QueryLayout } from '../layouts/query-layout'
import { useGetAnimeDetail } from '../hooks/queries/useGetAnimeDetail'
import { Button } from '../components/button'
import { AddCollection } from '../components/add-collection'
import { useCollectionContext } from '../context/collection'

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
    width: 260px;
    height: 200px;
    object-fit: cover;
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
    text-align: center;
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
    margin-bottom: 10px;
`

const CollectionInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`

export const AnimeDetail: React.FC = () => {
    const [openAddCollection, setOpenAddCollection] = useState(false)
    const { media, loading, error } = useGetAnimeDetail()
    const context = useCollectionContext()
    const params = useParams()


    const onAddNewCollection = (state: any, data: any) => {
        context.onAddColection(data, state)
        setOpenAddCollection(false)
    }

    const temp = context?.collectionsRaw?.filter((val: { id: string | undefined }) => val.id == params.id)


    return (
        <PageLayout pageTitle="Anime Detail">
            <QueryLayout loading={loading} error={error}>
                <Container>
                    {media.map((val: Media) => {
                        return (
                            <Content key={val.id}>
                                <Image src={val.coverImage.medium} />
                                <Title>{val.title.english}</Title>
                                <CollectionInfoWrapper>
                                    {
                                        temp ? temp.map((val: { collectionname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => (
                                            <CollectionInfo to={`/collections/${val.collectionname}`}>
                                                {val.collectionname}
                                            </CollectionInfo>
                                        )) : null
                                    }
                                </CollectionInfoWrapper>

                                <Description>{val.description}</Description>
                                <ButtonGroup>
                                    <Button
                                        type="planning"
                                        onClick={() =>
                                            setOpenAddCollection(true)
                                        }
                                        loading={false}
                                    >
                                        Add To Collection
                                    </Button>
                                </ButtonGroup>
                                <AddCollection
                                    data={val}
                                    show={openAddCollection}
                                    onAddNewCollection={onAddNewCollection}
                                    onCloseAddCollection={setOpenAddCollection}
                                />
                            </Content>
                        )
                    })}
                </Container>
            </QueryLayout>
        </PageLayout>
    )
}
