import React from "react"
import { BlockModelData } from "./minecraft/types"

export const BlockDataRow = (props: {
    title: string
    blockModelData: BlockModelData
}) => {
    const {
        textures
    } = props.blockModelData

    const textureNames = textures ? Object.keys(textures!) : []

    return (
        <div>
            <h4>{props.title}</h4>
            <ul>
                {textureNames.map(textureName => {
                    return (
                        <li>
                            {textureName}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}