import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export const GET_ANIME_DETAIL = gql`
    query ($mediaId: Int, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media(id: $mediaId) {
                id
                mediaListEntry {
                    id
                    status
                }
                coverImage {
                    medium
                }
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                description
            }
        }
    }
`

export const useGetAnimeDetail = () => {
    const params = useParams()
    const { id } = params
    const { loading, error, data } = useQuery(GET_ANIME_DETAIL, {
        variables: { mediaId: id },
    })

    return {
        media: data?.Page?.media || [],
        error,
        loading,
    }
}
