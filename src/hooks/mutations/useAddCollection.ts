import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const ADD_COLLECTION = gql`
    mutation ($mediaId: Int, $status: MediaListStatus) {
        SaveMediaListEntry(mediaId: $mediaId, status: $status) {
            id
            mediaId
            media {
                description
            }
        }
    }
`

export const useAddCollection = () => {
    const [addToCollection, { data, error, loading }] = useMutation(
        ADD_COLLECTION,
        {
            context: {
                Headers: {
                    Authorization:
                        `Bearer ` + sessionStorage.getItem('access_token'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        }
    )

    return {
        addToCollection,
        data,
        error,
        loading,
    }
}