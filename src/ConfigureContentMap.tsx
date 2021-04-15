import React, { useEffect, useState } from "react"
import {
    RawAssetData,
} from "./types"
import { useNamespaces } from "./hooks/useNamespaces"
import { BlockDataConfig } from "./BlockDataConfig"
import { Modal } from "./Modal"

export const ConfigContentMap = (props: {
    namespace?: string
    rawData?: RawAssetData
}) => {
    const namespaces = useNamespaces()
    const [selectedNamespace, setSelectedNamespace] = useState(null as unknown as string)
    const [hasModal, setHasModal] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const inputElement = e.target as HTMLElement       // Cast to input type since `value` won't exist on the type without it
        setSelectedNamespace(inputElement.innerText)
    }

    const openModal = () => {

    }

    const dismissModal = () => {
        
    }

    return(
        <>
            {!!hasModal ? 
                <Modal />
            : 
                null
            }
            <div>

            </div>
            <div className="container mx-auto">
                <header 
                    style={{
                        paddingTop: `2rem`,
                        textAlign: `center`
                    }}
                >
                    <h1>Minecraft Asset Reader</h1>
                </header>
                <div className="m-4 p-2 block text-xl w-full">
                    <p>
                        Below this section are the detected namespaces we found in your mod/modpack's raw data. To configure your content map,
                        select the namespace you wish to configure, then start selecting records to add to the content map. Once you're
                        ready to save the content map, click the "Export Content Map" so that's saved to the generated content to be used later when
                        generating the page data (such as scaled up assets).
                    </p>
                </div>
                <div className="m-4 p-2 grid grid-cols-3 gap-4">
                    {(namespaces.length > 0) ? 
                        <ul>
                            {namespaces.map(namespace => (
                                <button onClick={handleClick} key={namespace}>
                                    <div className="namespace-button">
                                        <h3>{namespace}</h3>
                                    </div>
                                </button>
                            ))}
                        </ul>
                    :
                        null
                    }
                </div>
                <div>
                    {!!selectedNamespace ? 
                        <div>
                                <BlockDataConfig 
                                    namespace={selectedNamespace}
                                />
                        </div>
                    :
                        null
                    }
                </div>
            </div>
        </>
        
    )
}
