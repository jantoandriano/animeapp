import styled from "@emotion/styled";

interface Styled {
    show: boolean;
}

interface Button {
    type: string
}

interface Props {
    onYes: (id: number) => void;
    onNo: () => void;
    show: boolean;
    id: number;
    title: string;
}

const ModalContainer = styled.div<Styled>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    ${props => props.show ? 'display: block' : 'display: none;'}
`

const ModalMain = styled.div`
    position:fixed;
    background: white;
    width: 80%;
    top:30%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    padding: 20px;
    isplay: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: 568px) {
        width: 60%;
    }
`
const ModalBody = styled.div`
    font-family: 'Poppins', sans-serif;
    text-align: center;
`

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`

const Button = styled.div<Button>`
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    border-radius: 8px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.type === 'yes' ? "#A2FF86" : "#ED2B2A"}
`

export const Modal: React.FC<Props> = ({ id, title, onNo, onYes, show }) => {

    return (
        <ModalContainer show={show}>
            <ModalMain>
                <ModalBody>
                    Are you sure want to remove {title}
                </ModalBody>
                <ModalFooter>
                    <Button type="yes" onClick={() => onYes(id)}>
                        Yes
                    </Button>

                    <Button type="no" onClick={onNo}>
                        No
                    </Button>
                </ModalFooter>
            </ModalMain>
        </ModalContainer>
    );
};