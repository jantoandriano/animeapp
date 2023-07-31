import { PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

interface Props {
    pageTitle: string
}
const AppContainer = styled.div`
    padding: 10px;
    flex-direction: column;
    @media screen and (min-width: 768px) {
        padding: 30px 100px 30px 100px;
    }
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: #ebebeb;
    padding: 8px;
    border-radius: 8px;
`

const MenuItem = styled(Link)`
    border: 1px solid black;
    background-color: #272829;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
    color: #fff6e0;
    font-family: 'Poppins', sans-serif;
`

const PageTitle = styled.div`
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
    font-family: 'Poppins', '400', sans-serif;
    margin-top: 30px;
    letter-spacing: 8px;
`

export const PageLayout: React.FC<PropsWithChildren<Props>> = ({
    children,
    pageTitle,
}) => {
    return (
        <AppContainer>
            <MenuContainer>
                <MenuItem to="/animes" reloadDocument>Anime List</MenuItem>
                <MenuItem to="/collections" reloadDocument>Collection</MenuItem>
            </MenuContainer>
            <PageTitle>{pageTitle}</PageTitle>
            {children}
        </AppContainer>
    )
}
