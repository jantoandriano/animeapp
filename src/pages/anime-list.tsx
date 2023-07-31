import styled from '@emotion/styled'
import { AnimeItem } from '../components/anime-item'
import { PageLayout } from '../layouts/page-layout'
import { QueryLayout } from '../layouts/query-layout'
import { useGetAnimeList } from '../hooks/queries/useGetAnimeList'
import { Pagination } from '../components/pagination'
import { useState } from 'react'

const AnimeListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 30px;
    padding: 0 30px 0 30px;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`

interface Media {
    id: string
    title: { english: string }
    siteUrl: string
    coverImage: { extraLarge: string }
}

export const AnimeList: React.FC = () => {
    const [page, setPage] = useState<number>(1)

    const { data, pageInfo, loading, error } = useGetAnimeList(page)

    const onNextPage = () => {
        setPage((prev) => prev + 1)
    }

    const onPreviousPage = () => {
        setPage((prev) => prev - 1)
    }

    return (
        <PageLayout pageTitle="Anime List">
            <QueryLayout loading={loading || !data.length} error={error}>
                <AnimeListContainer>
                    {data.map((val: Media) => (
                        <AnimeItem
                            key={val.id}
                            id={val.id}
                            title={val.title.english}
                            image={val.coverImage.extraLarge}
                        />
                    ))}
                </AnimeListContainer>

                <Pagination
                    currentPage={pageInfo?.currentPage}
                    totalPage={pageInfo?.total}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                />
            </QueryLayout>
        </PageLayout>
    )
}
