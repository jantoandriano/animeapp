import { gql, useMutation } from '@apollo/client'
import { GET_COLLECTION_DETAIL } from '../queries/useGetCollectionDetail'
import { GET_COLLECTION_LIST } from '../queries/useGetCollectionList'

const DELETE_COLLECTION = gql`
    mutation ($id: Int) {
        DeleteMediaListEntry(id: $id) {
            deleted
        }
    }
`

export const useDeleteCollection = () => {
    const [deleteColletion, { data, error, loading }] = useMutation(
        DELETE_COLLECTION,
        {
            context: {
                Headers: {
                    Authorization:
                        `Bearer ` + sessionStorage.getItem('access_token'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
            refetchQueries: [GET_COLLECTION_DETAIL, GET_COLLECTION_LIST],
        }
    )

    return {
        deleteColletion,
        data,
        error,
        loading,
    }
}
