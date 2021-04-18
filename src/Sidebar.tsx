import React, { useEffect, useState } from "react"
import axios from "axios"
import { useContentMap } from "./hooks/useContentMap"

export const Sidebar = () => {
    const [sideBarIsOpen, setSidebarIsOpen] = useState(false)
    // TODO: Fix this so that the user doesn't have to close and reopen the menu to see an up-to-date reflection of the stored data
    const cachedContentMap = useContentMap({
        watch: sideBarIsOpen
    })

    const namespaces = Object.keys(cachedContentMap)

    const exportHandler = () => {
        axios.post(`http://localhost:3000/content-map/export`)
            .then(res => {
                console.log(`EXPORT RESPONSE: `, res)
            })
    }
    
    return (
        <aside className={`sidebar` + (sideBarIsOpen ? `transform -translate-x-64` : `` )}>
            <>
            <button className="toggle-button" onClick={() => setSidebarIsOpen(!sideBarIsOpen)}>{`<<`}</button>
            {sideBarIsOpen ? 
                null
            :
                <>
                    {/* TODO: Figure out why this text still persists when overflowing - just tired of dealing with UI stuff atm */}
                    <h1>Session details</h1>
                    <h3>Namespaces</h3>
                    {namespaces.map(namespace => {
                        return (
                            <ul key={`${namespace}_data`}>
                                <li>
                                    <div className="sidebar-namespace-label">{namespace}</div>
                                </li>
                                <li>
                                    <div className="sidebar-nested-field-label">Blocks:</div>
                                    <div className="sidebar-nested-field-value">{Object.keys(cachedContentMap[namespace].blocks).length}</div>
                                </li>
                            </ul>
                        )
                    })}
                    <button className="bottom-0" onClick={exportHandler}>Export</button>
                </>
            }
            </>
            
        </aside>
    )
}
