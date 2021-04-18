import { useEffect, useState } from "react"
import axios from "axios"
import { ContentMap } from "../types"

export const useContentMap = () => {
    const [contentMap, setContentMap] = useState({} as ContentMap)

    useEffect(() => {
        axios.get(`http://localhost:3000/content-map`)
            .then(res => {
                const contentMap = res.data
                setContentMap(contentMap)
            })
    }, [])

    return contentMap
}