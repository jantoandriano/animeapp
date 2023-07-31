import { Link } from 'react-router-dom'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import styled from '@emotion/styled'
import { MdDeleteOutline } from 'react-icons/md'

interface Props {
    entries: Entry[]
    name: string
    onDelete?: (id: number) => void
    typeDetail?: boolean | undefined
}
interface Entry {
    id: string
    mediaId: number;
    media: {
        bannerImage: string
        title: {
            userPreferred: string
        }
        id: number;
    }
}

interface Styled {
    typeDetail: boolean | undefined;
}

const Content = styled.div<Styled>`
    display: flex;
    flex-direction: row;
    border: 0.3rem solid;
    align-items: center;
    padding: 10px;
    background-color: #fff6e0;
    border-radius: 8px;
    margin-bottom: 20px;
    margin: 0 auto;
    ${props => props.typeDetail ? 'justify-content: space-between;' : ''}

    @media and (min-width: 768px) {
        align-items: center;
        width: 100%;
    }

`

const Title = styled(Link)`
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
    margin-left: 10px;
    text-decoration: none;
    color: #272829;
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

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
`
const CollectionItemWrapper = styled.div`
    padding: 0 10px 0 10px;

    @media only screen and (min-width: 468px) {
        align-items: center;
        padding: 0 40px 0 40px;
    }
    @media (min-width: 768px) {
        align-items: center;
        padding: 0 100px 0 100px;
    }
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

export const CollectionItem: React.FC<Props> = ({ entries, name, onDelete, typeDetail }) => {
    const route = name === 'Watching' ? 'current' : name.toLowerCase()

    return (
        <>
            <CollectionItemWrapper>
                <Header key={name}>
                    <CollectionTitle to={`/collections/${route}`}>
                        {name}
                    </CollectionTitle>
                    <AiOutlineFolderOpen />
                </Header>

                {
                    entries.map((entry: Entry) => {                        
                        return (
                            <Content key={entry.id} typeDetail={typeDetail}>
                                <Image
                                    src={entry.media.bannerImage}
                                    width={50}
                                    height={50}
                                />
                                <Title to={`/animes/${entry.mediaId}`}>{entry.media.title.userPreferred}</Title>

                                {onDelete ? <Delete
                                    onClick={() =>
                                        onDelete(
                                            entry.id as unknown as number
                                        )
                                    }
                                >
                                    <MdDeleteOutline />
                                </Delete> : null}
                            </Content>
                        )
                    })
                }
            </CollectionItemWrapper>
        </>
    )
}
