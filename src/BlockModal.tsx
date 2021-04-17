import React, { useEffect, useState } from 'react'
import { useScaledBlockImages } from './hooks/useScaledBlockImages'
import { BlockModelData } from './minecraft/types'
import axios from "axios"
import { ConfiguredBlock } from './types'

export const BlockModal = (props: {
    namespace: string
    blockModelData: {
        block: string
        data: BlockModelData
    }
    dimiss: () => void
}) => {

    const [top, setTop] = useState(null as unknown as string)
    const [left, setLeft] = useState(null as unknown as string)
    const [right, setRight] = useState(null as unknown as string)
    
    const blockTextures = useScaledBlockImages({
        namespace: props.namespace,
        block: props.blockModelData.block,
        scale: 8
    })

    const renderDropdownOptions = () => {
        return Object.keys(blockTextures).map(textureName => (
            <option key={`${textureName}_opt`} value={textureName}>
                {textureName}
            </option>
        ))
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/content-map/block`)
            .then(res => {
                console.log(`BLOCK RESPONSE: `, res)
            })
    }, [top, left, right])

    return (
        <>
            <div className="modal-overlay"/>
            <div className="modal rounded-lg">
                <div className="modal-title">
                    <h1>{props.blockModelData.block}</h1>
                </div>
                <br/>
                <table className="table-auto mx-auto">
                    <thead >
                        <tr>
                            <th>
                                Texture Name
                            </th>
                            <th>
                                Image
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(blockTextures).map(textureName => (
                            <tr key={`${textureName}_scaled_row`}>
                                <td>
                                    "{textureName}"
                                </td>
                                <td>
                                    <img className="m-4 mx-auto" src={blockTextures[textureName]} alt={textureName}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center">
                    <div className="modal-dropdown-row">
                        <h3>top</h3>
                        <select>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                    <div className="modal-dropdown-row">
                        <h3>sideL</h3>
                        <select>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                    <div className="modal-dropdown-row">
                        <h3>sideR</h3>
                        <select>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                </div>
                <button className="modal-dismiss-button" onClick={props.dimiss}>
                    Dismiss
                </button>
                <button className="modal-save-button" onClick={() => console.log(`SAVE!`)}>
                    Save
                </button>
            </div>
        </>
        
    )
}
