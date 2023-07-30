import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom";

const GET_COLLECTION_DETAIL = gql`
query ($userId: Int, $type: MediaType, $status: MediaListStatus) {
    MediaListCollection(userId: $userId, type: $type, status: $status) {
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

export const useGetCollectionDetail = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_COLLECTION_DETAIL, { variables: { type: 'ANIME', userId: process.env.REACT_APP_USER_ID, status: params.type?.toUpperCase() } });

  return {
    data: data?.MediaListCollection || null,
    loading,
    error,
  }

}