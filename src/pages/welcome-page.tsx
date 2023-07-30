import styled from '@emotion/styled'
import { PageLayout } from '../layouts/page-layout'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Enter = styled.a`
    text-decoration: none;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    color: white;
    background-color: #001D6E;
`

export const WelcomePage = () => {
    const navigate = useNavigate()

    const params = useLocation()

    useEffect(() => {
        const temp = queryString.parse(params.hash)
        if (temp.access_token) {
            console.log(temp.access_token)

            sessionStorage.setItem('access_token', temp.access_token as string)
            navigate('/animes')
        }
    }, [])

    return (
        <Container>
            <Enter href="https://anilist.co/api/v2/oauth/authorize?client_id=13290&response_type=token">
                Click Here
            </Enter>
        </Container>
    )
}
