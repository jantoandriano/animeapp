import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { CgSpinner } from 'react-icons/cg'

interface Styled {
    type: string
}

interface Props {
    onClick: () => void
    loading?: boolean
    type: string
}

const Container = styled.div<Styled>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    padding: 8px;
    height: 30px;
    background-color: ${(props) =>
        props.type === 'watching' ? '#0A6EBD;' : '#A1C2F1;'}
    color: white;
    border: 1px solid black;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    width: 140px;

`

export const Button: React.FC<PropsWithChildren<Props>> = ({
    children,
    onClick,
    loading,
    type,
}) => {
    return (
        <Container onClick={onClick} type={type}>
            {loading ? <CgSpinner /> : children}
        </Container>
    )
}
