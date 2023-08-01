import { PageLayout } from '../layouts'
import { CollectionItem } from '../components/collection-item'
import { Modal } from '../components/modal'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCollectionDetail } from '../hooks/queries/useGetCollectionDetail'

export const CollectionDetail = () => {
    const [stateModal, setStateModal] = useState({ id: 0, title: '' })
    const { collectionDetail } = useGetCollectionDetail()
    const params = useParams()

    const onCloseModal = () => {
        setStateModal({ ...stateModal, id: 0, title: '' })
    }

    const openModal = (id: number, title: string) => {
        setStateModal({ ...stateModal, id, title })
    }

    const onConfirm = () => {
        setStateModal({ ...stateModal, id: 0, title: '' })
    }

    const onDeleteCollection = (collection: string) => {
        console.log(collection)
    }

    const show = stateModal.id ? true : false

    return (
        <>
            <PageLayout pageTitle="Collection Detail">
                <CollectionItem
                    name={params?.type as string}
                    entry={collectionDetail}
                    onDelete={openModal}
                    onDeleteCollection={onDeleteCollection}
                    typeDetail
                />
            </PageLayout>
            <Modal
                id={stateModal.id}
                title={stateModal.title}
                show={show}
                onYes={onConfirm}
                onNo={onCloseModal}
            />
        </>
    )
}
