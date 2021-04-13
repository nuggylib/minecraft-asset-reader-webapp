import React, { useEffect, useState } from "react"
import {
    RawAssetData,
    ConfiguredBlock
} from "./types"
import { ChakraProvider } from "@chakra-ui/react"

export const ConfigContentMap = (props: {
    rawData?: RawAssetData
}) => {
    const [selectedBlocks, setSelectedBlocks] = useState([] as string[])
    const [configuredBlocks, setConfiguredBlocks] = useState([] as ConfiguredBlock[])

    useEffect(() => {
        // TODO: Use axios to get the data from the back end
    })

    const namespaces = Object.keys(props.rawData!)
    const rawBlockNames = Object.keys(props.rawData![namespaces[0]].model.block)

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