import React, { useEffect, useState } from "react"
import {
    RawAssetData,
    ConfiguredBlock
} from "./types"
import axios from "axios"
import { ChakraProvider } from "@chakra-ui/react"

export const ConfigContentMap = (props: {
    namespace?: string
    rawData?: RawAssetData
}) => {

    const namespace = !!props.namespace ? props.namespace : "minecraft"

    const [selectedBlocks, setSelectedBlocks] = useState([] as string[])
    const [configuredBlocks, setConfiguredBlocks] = useState([] as ConfiguredBlock[])
    const [rawBlocks, setRawBlocks] = useState([] as {}[])

    useEffect(() => {
        // TODO: Use axios to get the data from the back end
        axios.get(`http://localhost:3000/content-map/configure/blocks?namespace=minecraft`)
            .then(res => {
                console.log(`RESPONSE: `, res)
            })
    })

    // const namespaces = Object.keys(props.rawData!)
    // const rawBlockNames = Object.keys(props.rawData![namespaces[0]].model.block)

    return(
        <div className="container">
            <header 
                style={{
                    paddingTop: `2rem`
                }}
            >
                <h1>Minecraft Asset Reader</h1>
            </header>
            <div>
                
            </div>
        </div>
    )
}