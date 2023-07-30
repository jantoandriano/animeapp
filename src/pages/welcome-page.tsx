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
        <PageLayout pageTitle="Welcome To Animeapp">
            <Container>
                <a href="https://anilist.co/api/v2/oauth/authorize?client_id=13290&response_type=token">
                    Login with AniList
                </a>{' '}
            </Container>
        </PageLayout>
    )
}
