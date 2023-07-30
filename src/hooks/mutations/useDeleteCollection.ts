import { gql, useMutation } from "@apollo/client";

const DELETE_COLLECTION = gql`
    mutation ($id: Int) {
        DeleteMediaListEntry(id: $id) {
        deleted
        }
    }
`;


export const useDeleteCollection = () => {

    const [deleteColletion, { data, error, loading }] = useMutation(DELETE_COLLECTION, {
        context: {
            Headers: {
                "Authorization": `Bearer ` + sessionStorage.getItem('access_token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    });

    return {
        deleteColletion,
        data,
        error,
        loading,
    }

}