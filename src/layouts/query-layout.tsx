import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { CgSpinner } from 'react-icons/cg'

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`

interface Props {
    loading: boolean
    error?: {
        message?: string
    }
}

export const QueryLayout: React.FC<PropsWithChildren<Props>> = ({
    error,
    loading,
    children,
}) => {
    if (loading) {
        return (
            <Center>
                <CgSpinner />
            </Center>
        )
    }

    if (error) {
        return <Center>{error.message}</Center>
    }

    return <div>{children}</div>
}
