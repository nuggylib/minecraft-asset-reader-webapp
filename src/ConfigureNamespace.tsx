import React from "react"
import { BlockDataConfig } from "./BlockDataConfig"
import { usePaginatedBlocksForNamespace } from "./hooks/usePaginatedBlocksForNamespace"

export const ConfigureNamespace = (props: {
    namespace: string
}) => {

    return (
        <div>
            <h2>{props.namespace}</h2>
            <br />
            <BlockDataConfig 
                namespace={props.namespace}
            />
        </div>
    )
}