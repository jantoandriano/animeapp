import { gql, useQuery } from '@apollo/client'

const GET_COLLECTION_LIST = gql`
    query ($userId: Int, $type: MediaType) {
        MediaListCollection(userId: $userId, type: $type) {
            lists {
                name
                isCustomList
                isCompletedList: isSplitCompletedList
                entries {
                    ...mediaListEntry
                }
            }
            user {
                id
                name
                avatar {
                    large
                }
            }
        }
    }

    fragment mediaListEntry on MediaList {
        id
        mediaId
        status
        media {
            id
            title {
                userPreferred
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
            }
            bannerImage
        }
    }
`

export const useGetCollectionList = () => {
    const { loading, error, data } = useQuery(GET_COLLECTION_LIST, {
        variables: { type: 'ANIME', userId: process.env.REACT_APP_USER_ID },
    })

    return {
        data: data?.MediaListCollection || null,
        error,
        loading,
    }
}
