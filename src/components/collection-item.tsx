import { Link } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineFolderOpen } from 'react-icons/ai'
import styled from '@emotion/styled'
import { MdDeleteOutline } from 'react-icons/md'
import { ReactElement, JSXElementConstructor, ReactNode } from 'react'

interface Props {
    entry: any
    name: string
    onDelete?: (id: number, title: string) => void
    typeDetail?: boolean | undefined
    onDeleteCollection?: any
}

interface Entry {
    id: string
    coverImage: { medium: string | undefined }
    title: {
        userPreferred:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
    }
}

interface Styled {
    typeDetail: boolean | undefined
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
    margin-bottom: 10px;
    ${(props) => (props.typeDetail ? 'justify-content: space-between;' : '')}

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
    color: #272829;
    text-decoration: none;
    margin-right: 20px;
    font-family: 'Poppins', sans-serif;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    cursor: pointer;
`

export const CollectionItem: React.FC<Props> = ({
    entry,
    name,
    onDelete,
    typeDetail,
    onDeleteCollection,
}) => {
    const route = name === 'Watching' ? 'current' : name.toLowerCase()

    return (
        <>
            <CollectionItemWrapper>
                <Header key={name}>
                    <CollectionTitle to={`/collections/${route}`}>
                        {name}
                    </CollectionTitle>
                    <AiOutlineDelete onClick={() => onDeleteCollection(name)} style={{ cursor: 'pointer' }} />
                </Header>

                {entry.map((val: Entry) => (
                    <Content key={val.id} typeDetail={typeDetail}>
                        <Image
                            src={val.coverImage.medium}
                            width={50}
                            height={50}
                        />
                        <Title to={`/animes/${val.id}`}>
                            {val.title.userPreferred}
                        </Title>

                        {onDelete ? (
                            <Delete
                                onClick={() =>
                                    onDelete(
                                        val.id as unknown as number,
                                        val.title
                                            .userPreferred as unknown as string
                                    )
                                }
                            >
                                <MdDeleteOutline />
                            </Delete>
                        ) : null}
                    </Content>
                ))}
            </CollectionItemWrapper>
        </>
    )
}
