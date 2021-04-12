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

    return(
        <body>
            <h1>Test</h1>
        </body>
    )
}