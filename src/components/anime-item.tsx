import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const AnimeItemContainer = styled.div`
    border: 0.5rem solid;
    height: 200px;
    border-radius: 10px;
    background-color: #fff6e0;
    @media only screen and (min-width: 768px) {
        width: 40%;
    }
`

const AnimeItemImage = styled.img`
    width: 100%;
    height: 100px;
    background-color: #d8d9da;
    border-radius: 10px;
    object-fit: cover;
`

const AnimeItemTitle = styled.div`
    color: black;
    font-size: 10px;
    text-align: center;
    font-size: 1rem;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
`

const AnimeItemContent = styled(Link)`
    text-decoration: none;
    font-weight: bold;
`

interface Props {
    id: string
    image: string
    title: string
}

export const AnimeItem: React.FC<Props> = ({ id, image, title }) => {
    return (
        <AnimeItemContainer>
            <AnimeItemContent to={`/animes/${id}`}>
                <AnimeItemImage alt="card_image" src={image} />
                <AnimeItemTitle>{title}</AnimeItemTitle>
            </AnimeItemContent>
        </AnimeItemContainer>
    )
}
