import React, { useEffect, useState } from "react"
import {
    RawAssetData,
} from "./types"
import { useNamespaces } from "./hooks/useNamespaces"
import { BlockDataConfig } from "./BlockDataConfig"
import { Sidebar } from "./Sidebar"

export const ConfigContentMap = (props: {
    namespace?: string
    rawData?: RawAssetData
}) => {
    const namespaces = useNamespaces()
    const [selectedNamespace, setSelectedNamespace] = useState(null as unknown as string)
    const [sideBarIsOpen, setSidebarIsOpen] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const inputElement = e.target as HTMLElement       // Cast to input type since `value` won't exist on the type without it
        setSelectedNamespace(inputElement.innerText)
    }

    return(
        <div className="flex overflow-x-hidden h-screen">
            <Sidebar />

            <div className="container flex-1 mx-auto">
                <header>
                    <h1>Minecraft Asset Reader</h1>
                </header>
                <main className="p-4">
                    <div className="m-4 p-2 block text-xl w-full">
                        <p>
                            Below this section are the detected namespaces we found in your mod/modpack's raw data. To configure your content map,
                            select the namespace you wish to configure, then start selecting records to add to the content map. Once you're
                            ready to save the content map, click the "Export Content Map" so that's saved to the generated content to be used later when
                            generating the page data (such as scaled up assets).
                        </p>
                    </div>
                    <div className="namespace-button-grid">
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
                            <BlockDataConfig 
                                namespace={selectedNamespace}
                            />
                        :
                            null
                        }
                    </div>
                </main>
            </div>
        </div>
        
    )
}
