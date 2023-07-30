import styled from "@emotion/styled"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    align-items: center;
`

const PageNumber = styled.div`
    margin: 0 10px 0 10px;
    font-family: 'Poppins', '400', sans-serif;
    background-color: #FAF0E4;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
`

const ButtonPrev = styled(AiOutlineArrowLeft)`
    background-color: #FAF0E4;
    padding: 8px;
    border-radius: 8px;
`

const ButtonNext = styled(AiOutlineArrowRight)`
    background-color: #FAF0E4;
    padding: 8px;
    border-radius: 8px;
`

interface Props {
    currentPage: string;
    totalPage: string;
    onNextPage: () => void,
    onPreviousPage: () => void
}

export const Pagination: React.FC<Props> = ({ currentPage, totalPage, onPreviousPage, onNextPage }) => {
    return (
        <Container>
            <ButtonPrev onClick={onPreviousPage} />
            <PageNumber>{currentPage}/{totalPage}</PageNumber>
            <ButtonNext onClick={onNextPage} />
        </Container>
    )
}