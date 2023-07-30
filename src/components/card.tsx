import styled from '@emotion/styled'
import { Link } from 'react-router-dom';


const CardContainer = styled.div`
    border: 1px solid black;
    height: 200px;
    border-radius: 10px;
    @media only screen and (min-width: 768px) {
        width: 40%;        
    }
`

const CardImage = styled.img`
    width: 100%;
    height: 100px;
    background-color: #D8D9DA;
    border-radius: 10px;
    object-fit: cover;
`

const CardTitle = styled.div`
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

const Content = styled(Link)`
    text-decoration: none;
    font-weight: bold;
`

interface Props {
    id: string;
    image: string;
    title: string;
}

export const Card: React.FC<Props> = ({ id, image, title }) => {
    return (
        <CardContainer>
            <Content to={`/animes/${id}`}>
                <CardImage alt="card_image" src={image} />
                <CardTitle>
                    {title}
                </CardTitle>
            </Content>

        </CardContainer>
    )
}

