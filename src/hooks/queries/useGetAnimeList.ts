import { gql, useQuery } from '@apollo/client'

const GET_ANIME_LIST = gql`
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(type: ANIME, sort: TRENDING_DESC) {
                id
                title {
                    romaji
                    english
                }
                siteUrl
                coverImage {
                    extraLarge
                    large
                    medium
                }
            }
        }
    }
`

export const useGetAnimeList = (page: number) => {
    const { loading, error, data } = useQuery(GET_ANIME_LIST, {
        variables: { perPage: 10, page },
    })

    return {
        media: data?.Page?.media || [],
        pageInfo: data?.Page?.pageInfo || null,
        error,
        loading,
    }
}
