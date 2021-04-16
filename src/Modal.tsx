import React, { useEffect } from 'react'
import { BlockModelData } from './minecraft/types'
import { ContentMap } from './types'

export const Modal = (props: {
    blockModelData?: {
        block: string
        data: BlockModelData
    }
    contentMap?: ContentMap
    dimiss: () => void
}) => {
    let {
        title = `UNSET`,
    } = {}

    console.log(props)

    if (props.blockModelData) {
        title = props.blockModelData.block
    }

    return (
        <>
            <div className="modal-overlay"/>
            <div className="modal">
                <div className="modal-title">
                    <h1>{title}</h1>
                </div>
                <button onClick={props.dimiss}>
                    Dismiss
                </button>
            </div>
        </>
        
    )
}