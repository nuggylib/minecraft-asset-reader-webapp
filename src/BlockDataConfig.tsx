import React, { useState } from "react"
import { usePaginatedBlocksForNamespace } from "./hooks/usePaginatedBlocksForNamespace"

export const BlockDataConfig = (props: {
    namespace: string
}) => {
    const [page, setPage] = useState(1)
    const blockRecords = usePaginatedBlocksForNamespace({
        page,
        namespace: props.namespace
    })

    const nextPageHandler = () => {

    }

    const prevPageHandler = () => {

    }

    return (
        <div className="w-full">
            <div className="block text-xl">
                <p>
                    This section contains a paginated view of the blocks detected for the currently-selected namespace. To add a block to the 
                    content map, simply configure the <code>top</code>, <code>sideL</code> and <code>sideR</code> textures. You can use the same
                    texture for one, two, or all sides (e.g., to add a block defition that uses the same texture for all sides, simply set it
                    as the texture to use for all sides).
                </p>
            </div>
            <ul>
                {blockRecords.map(record => {
                    return (
                        <li key={record.block}>
                            {/* Tailwind CSS block as the classname */}
                            <div className="m-4 p-2 inline-block"> 
                                <h3>{record.block}</h3>
                                <p>Textures: </p>
                                <div>
                                    {!!record.data.textures ? 
                                    Object.keys(record.data.textures).map(textureName => <img key={`${record.block}_${textureName}`} src={record.data.textures![textureName]} alt="textureName"/>) 
                                    : [] }
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}