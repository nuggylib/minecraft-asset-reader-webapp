import React, { useEffect, useState } from "react"
import { useContentMap } from "./hooks/useContentMap"

export const Sidebar = () => {
    const [sideBarIsOpen, setSidebarIsOpen] = useState(false)
    const cachedContentMap = useContentMap()

    console.log(`CACHED CONTENT MAP: `, cachedContentMap)

    const namespaces = Object.keys(cachedContentMap)
    
    useEffect(() => {

    }, [sideBarIsOpen])

    console.log(`OPEN: `, sideBarIsOpen)
    
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
                            <ul>
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
                </>
            }
            </>
            
        </aside>
    )
}