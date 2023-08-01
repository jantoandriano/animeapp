import styled from '@emotion/styled'
import { SetStateAction, useEffect, useState } from 'react'

interface Styled {
    show: boolean
}

interface Button {
    type: string
}

interface Props {
    show: boolean
    onAddNewCollection: any
    onCloseAddCollection: any
    data: any
}

const ModalContainer = styled.div<Styled>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    ${(props) => (props.show ? 'display: block' : 'display: none;')}
`

const ModalMain = styled.div`
    position: fixed;
    background: white;
    width: 80%;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    background-color: ${(props) =>
        props.type === 'yes' ? '#A2FF86' : '#ED2B2A'};
`

const Input = styled.input`
    width: 200px;
    height: 20px;
    border-radius: 8px;
    padding: 5px;
    font-family: 'Poppins', sans-serif;
`

export const AddCollection: React.FC<Props> = ({
    data,
    show,
    onAddNewCollection,
    onCloseAddCollection,
}) => {
    const [state, setSTate] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const re = new RegExp('^[^<>%$]*$');
        if (!re.test(state as string)) {
            setError("dont include special character")
        } else {
            setError("")
        }

    }, [state])

    const onChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSTate(event?.target.value)
    }

    return (
        <ModalContainer show={show}>
            <ModalMain>
                <ModalBody>
                    <Input type="text" value={state} onChange={onChange} />
                    <div style={{ color: 'red' }}>{error}</div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="yes"
                        onClick={() => onAddNewCollection(state, data)}
                    >
                        Add
                    </Button>

                    <Button
                        type="no"
                        onClick={() => onCloseAddCollection(false)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalMain>
        </ModalContainer>
    )
}
