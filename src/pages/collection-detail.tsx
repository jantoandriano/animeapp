import { useGetCollectionDetail } from '../hooks/queries/useGetCollectionDetail'
import { PageLayout, QueryLayout } from '../layouts'
import { useDeleteCollection } from '../hooks/mutations/useDeleteCollection'
import { CollectionItem } from '../components/collection-item'
import { Modal } from '../components/modal'
import { useState } from 'react'
import { List } from '../types'

export const CollectionDetail = () => {
    const [stateModal, setStateModal] = useState({ id: 0, title: '' })
    const { data, loading, error } = useGetCollectionDetail()

    const { deleteColletion } = useDeleteCollection()

    const onCloseModal = () => {
        setStateModal({ ...stateModal, id: 0, title: '' })
    }

    const openModal = (id: number, title: string) => {
        setStateModal({ ...stateModal, id, title });
    }

    const onConfirm = () => {
        deleteColletion({ variables: { id: stateModal.id } })
        setStateModal({ ...stateModal, id: 0, title: '' })
    }

    const show = stateModal.id ? true : false;


    return (
        <>
            <PageLayout pageTitle="Collection Detail">
                <QueryLayout loading={loading || !data} error={error}>
                    {
                        data?.lists.map((list: List) => (
                            <CollectionItem key={list.name} name={list.name} entries={list.entries} onDelete={openModal} typeDetail />
                        ))
                    }
                </QueryLayout>
            </PageLayout>
            <Modal id={stateModal.id} title={stateModal.title} show={show} onYes={onConfirm} onNo={onCloseModal} />
        </>
    )
}
