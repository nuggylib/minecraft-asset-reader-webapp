import React, { useEffect } from 'react'
import { useScaledBlockImages } from './hooks/useScaledBlockImages'
import { BlockModelData } from './minecraft/types'

export const BlockModal = (props: {
    namespace: string
    blockModelData: {
        block: string
        data: BlockModelData
    }
    dimiss: () => void
}) => {
    const blockTextures = useScaledBlockImages({
        namespace: props.namespace,
        block: props.blockModelData.block,
        scale: 4
    })

    return (
        <>
            <div className="modal-overlay"/>
            <div className="modal">
                <div className="modal-title">
                    <h1>{props.blockModelData.block}</h1>
                </div>
                <div className="space-y-4">
                    {Object.keys(blockTextures).map(textureName => (
                        <div key={`${textureName}_scaled_row`} className="block">
                            <img className="m-4 mx-auto" src={blockTextures[textureName]} alt={textureName}/>
                        </div>
                    ))}
                </div>
                <button onClick={props.dimiss}>
                    Dismiss
                </button>
            </div>
        </>
        
    )
}
