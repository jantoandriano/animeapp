import { Link } from 'react-router-dom'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import styled from '@emotion/styled'

interface Props {
    collections: Collections[]
}

interface Collections {
    name: string
    entries: Entry[]
}

interface Entry {
    id: string
    media: {
        bannerImage: string
        title: {
            userPreferred: string
        }
    }
}

const Content = styled.div`
    display: flex;
    flex-direction: row;
    border: 0.3rem solid;
    align-items: center;
    padding: 10px;
    background-color: #fff6e0;
    border-radius: 8px;
    margin-bottom: 20px;

    @media only screen and (min-width: 768px) {
        align-items: center;
    }
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

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const CollectionItem: React.FC<Props> = ({ collections }) => {

    return (
        <div>
            {collections.map((val: Collections) => {
                const route = val.name === 'Watching' ? 'current' : val.name.toLowerCase()
                return (
                    <>
                        <Header key={val.name}>
                            <CollectionTitle to={`/collections/${route}`}>
                                {val.name}
                            </CollectionTitle>
                            <AiOutlineFolderOpen />
                        </Header>

                        {
                            val.entries.map((entry: Entry) => {
                                return (
                                    <Content key={entry.id}>
                                        <Image
                                            src={entry.media.bannerImage}
                                            width={50}
                                            height={50}
                                        />
                                        <Description>{entry.media.title.userPreferred}</Description>
                                    </Content>
                                )
                            })
                        }
                    </>
                )
            })}
        </div>
    )
}
