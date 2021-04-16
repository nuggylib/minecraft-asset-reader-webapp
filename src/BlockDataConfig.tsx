import React, { useReducer, useState } from "react"
import { useBlockPageCountForNamespace } from "./hooks/useBlockPageCountForNamespace"
import { usePaginatedBlocksForNamespace } from "./hooks/usePaginatedBlocksForNamespace"
import { BlockModelData } from "./minecraft/types"
import { Modal } from "./Modal"

const reducer = (prevState: any, nextState: any) => {
    switch (nextState.type) {
        case 'open_modal': {
            return {
                showModal: true,
                modalData: nextState.payload.modalData
            }
        }
        case 'close_modal': {
            return {
                showModal: false,
                modalData: null
            }
        }
    }
}

export const BlockDataConfig = (props: {
    namespace: string
}) => {
    const [page, setPage] = useState(1)
    const [modalState, dispatch] = useReducer(reducer, {
        showModal: false,
        modalData: null
    })
        
    const pageCount = useBlockPageCountForNamespace({
        namespace: props.namespace
    })
    const blockRecords = usePaginatedBlocksForNamespace({
        page,
        namespace: props.namespace
    })

    const nextPageHandler = () => {
        if (page !== pageCount) {
            setPage(page + 1)
        } 
    }

    const prevPageHandler = () => {
        if (page !== 1) {
            setPage(page - 1)
        }
    }

    const dismissModal = () => {
        dispatch({ type: 'close_modal' })
    }

    return (
        <>
            {!!modalState?.showModal ? 
                <Modal 
                    blockModelData={modalState?.modalData}
                    dimiss={dismissModal}
                />
            :
                null
            }
            <div className="w-full">
                <div className="block text-xl">
                    <p>
                        This section contains a paginated view of the blocks detected for the currently-selected namespace. To add a block to the 
                        content map, simply configure the <code>top</code>, <code>sideL</code> and <code>sideR</code> textures. You can use the same
                        texture for one, two, or all sides (e.g., to add a block defition that uses the same texture for all sides, simply set it
                        as the texture to use for all sides).
                    </p>
                </div>
                <div className="block-grid">
                    {blockRecords.map(record => {
                        return (
                            <button key={record.block} className="block-record" onClick={() => dispatch({ type: 'open_modal', payload: { modalData: {
                                block: record.block,
                                data: record.data
                            } }})}>
                                <h3>{record.block}</h3>
                                <br/>
                                <div className="space-x-4">
                                    {!!record.data.textures ? 
                                        Object.keys(record.data.textures).map(textureName => {
                                            if (!record.data.textures![textureName]!.includes(`#`)) {
                                                return (
                                                    <img className="inline-block" key={`${record.block}_${textureName}`} src={record.data.textures![textureName]} alt={textureName}/>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        (reference image)
                                                    </>
                                                )
                                            }
                                        }) 
                                    : [] }
                                </div>
                            </button>
                        )
                    })}
                </div>
                <div className="m-4 grid grid-cols-3 gap-6 text-center">
                    <button onClick={prevPageHandler} className="pagination-button">
                        Prev
                    </button>
                    <div>
                        Page {page} out of {pageCount}
                    </div>
                    <button onClick={nextPageHandler} className="pagination-button">
                        Next
                    </button>
                </div>
            </div>
        </>
        
    )
}