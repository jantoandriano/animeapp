import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const useGetCollectionDetail = () => {
    const [collectionDetail, setCollectionDetail] = useState([])

    const params = useParams()

    useEffect(() => {
        const result = sessionStorage.getItem('collections')
        const resultParsed = JSON.parse(result as string)
        const collections = resultParsed.filter(
            (val: { collectionname: string | undefined }) =>
                val.collectionname === params.type
        )
        setCollectionDetail(collections)
    }, [])

    return {
        collectionDetail,
    }
}
