import { PageLayout } from '../layouts'
import { Modal } from '../components/modal'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCollectionContext } from '../context/collection'
import { CollectionItem } from '../components/collection-item'

export const CollectionDetail = () => {
    const [stateModal, setStateModal] = useState({ id: 0, title: '' })
    const params = useParams()

    const context = useCollectionContext()

    const onCloseModal = () => {
        setStateModal({ ...stateModal, id: 0, title: '' })
    }

    const openModal = (id: number, title: string) => {
        setStateModal({ ...stateModal, id, title })
    }

    const onConfirmDelete = (id: number) => {
        context.onConfirm(id, params, onCloseModal)
    }

    const show = stateModal.id ? true : false

    const collectionsItem = context?.collections[params.type as string]

    return (
        <>
            <PageLayout pageTitle="Collection Detail">
                {collectionsItem ? (
                    <CollectionItem
                        name={params.type as string}
                        entry={collectionsItem}
                        onDelete={openModal}
                        onDeleteCollection={context.onDeleteCollection}
                    />
                ) : null}
            </PageLayout>
            <Modal
                id={stateModal.id}
                title={stateModal.title}
                show={show}
                onYes={onConfirmDelete}
                onNo={onCloseModal}
            />
        </>
    )
}
