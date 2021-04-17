import React, { useEffect, useState } from 'react'
import { useScaledBlockImages } from './hooks/useScaledBlockImages'
import { BlockModelData } from './minecraft/types'
import axios from "axios"
import { ConfiguredBlock } from './types'

const NONE = `none`

export const BlockModal = (props: {
    namespace: string
    blockModelData: {
        block: string
        data: BlockModelData
    }
    dimiss: () => void
}) => {

    const [title, setTitle] = useState(``)
    const [top, setTop] = useState(NONE)
    const [left, setLeft] = useState(NONE)
    const [right, setRight] = useState(NONE)
    
    const blockTextures = useScaledBlockImages({
        namespace: props.namespace,
        block: props.blockModelData.block,
        scale: 8
    })

    const renderDropdownOptions = () => {
        return Object.keys(blockTextures).map(textureName => (
            <option key={`${textureName}_opt`} value={`${textureName}`}>
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

    const setTopHandler = (e: any) => setTop(e.target.value)
    const setRightHandler = (e: any) => setRight(e.target.value)
    const setLeftHandler = (e: any) => setLeft(e.target.value)
    const setTitleHandler = (e: any) => setTitle(e.target.value)
    const saveHandler = () => {
        axios.post(`http://localhost:3000/content-map/blocks`, {
            namespace: props.namespace,
            blocks: [{
                [props.blockModelData.block]: {
                    title,
                    iconData: {
                        top,
                        sideL: left,
                        sideR: right,
                    }
                }
            }]
        })
            .then(res => {
                console.log(`BLOCK RESPONSE: `, res)
            })
            .then(() => props.dimiss())
    }

    // Saving should be disabled when any of these values are unset
    const saveButtonDisabled = title.length === 0 || top === NONE || right === NONE || left === NONE
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
                    <input className="modal-input" type="text" placeholder="Title" value={title} onChange={setTitleHandler}/>
                    <div className="modal-dropdown-row">
                        <h3>top</h3>
                        <select value={top} onChange={setTopHandler}>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                    <div className="modal-dropdown-row">
                        <h3>sideL</h3>
                        <select value={left} onChange={setLeftHandler}>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                    <div className="modal-dropdown-row">
                        <h3>sideR</h3>
                        <select value={right} onChange={setRightHandler}>
                            <option value="none">none</option>
                            {renderDropdownOptions()}
                        </select>
                    </div>
                </div>
                <button className="modal-dismiss-button" onClick={props.dimiss}>
                    Dismiss
                </button>
                
                <button className={
                    !!saveButtonDisabled ?
                    "modal-save-button-disabled" :
                    "modal-save-button"
                } onClick={saveHandler} disabled={saveButtonDisabled}>
                    Save
                </button>
            </div>
        </>
        
    )
}
