import styled from '@emotion/styled'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
`

const Enter = styled.div`
    text-decoration: none;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    color: white;
    background-color: #001d6e;
    margin-top: 30px;
    border-radius: 8px;
    a {
        text-decoration: none;
        color: white;
    }

`
const Title = styled.div`
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const Description = styled.div`
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin-top: 20px;
`

export const WelcomePage = () => {
    const navigate = useNavigate()

    const params = useLocation()

    useEffect(() => {
        const temp = queryString.parse(params.hash)
        if (temp.access_token) {
            sessionStorage.setItem('access_token', temp.access_token as string)
            navigate('/animes')
        }
    }, [])

    return (
        <Container>
            <Title>
                Welcome to animeapp
            </Title>
            <Description>
                This is created to fullfil requirement process of GOTO - Principle Enginner - Web Platform 
                and for this app to work propperly you need to click button below to get authenticate
            </Description>
            <Enter>
                <a href="https://anilist.co/api/v2/oauth/authorize?client_id=13790&response_type=token">Click Here</a>
            </Enter>
        </Container>
    )
}
