import React, { useEffect, useState } from "react"
import {
    RawAssetData,
    ConfiguredBlock
} from "./types"
import axios from "axios"
import { ChakraProvider } from "@chakra-ui/react"
import { BlockModelData } from "./minecraft/types"

export const ConfigContentMap = (props: {
    namespace?: string
    rawData?: RawAssetData
}) => {

    const namespace = !!props.namespace ? props.namespace : "minecraft"

    const [selectedBlocks, setSelectedBlocks] = useState([] as string[])
    const [configuredBlocks, setConfiguredBlocks] = useState([] as ConfiguredBlock[])
    const [blockRecords, setBlockRecords] = useState([] as {
        block: string
        data: BlockModelData
    }[])

    useEffect(() => {
        // TODO: Use axios to get the data from the back end
        axios.get(`http://localhost:3000/content-map/configure/blocks?namespace=minecraft`)
            .then(res => {
                console.log(`RESPONSE: `, res)
                const blocks = res.data.items
                console.log(`BLOCKS: `, blocks)
                setBlockRecords(blocks)
            })
    })

    // const namespaces = Object.keys(props.rawData!)
    // const rawBlockNames = Object.keys(props.rawData![namespaces[0]].model.block)

    return(
        <div className="container mx-auto">
            <header 
                style={{
                    paddingTop: `2rem`
                }}
            >
                <h1>Minecraft Asset Reader</h1>
            </header>
            <div className="w-full">
                <ul>
                    {blockRecords.map(record => {
                        return (
                            <li>
                                {/* Tailwind CSS block as the classname */}
                                <div className="m-4 p-2 w-full bg-gray-400 bg-opacity-70"> 
                                    <h3>{record.block}</h3>
                                    <p>Textures: </p>
                                    <div className="inline">
                                        {!!record.data.textures ? 
                                        Object.keys(record.data.textures).map(textureName => <img src={record.data.textures![textureName]} alt="textureName"/>) 
                                        : [] }
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}