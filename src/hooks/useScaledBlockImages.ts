import { useState, useEffect } from "react"
import axios from "axios"

export const useScaledBlockImages = (props: {
    namespace: string
    block: string,
    scale: number
}) => {
    const [scaledTextures, setScaledTextures] = useState({} as {
        [texture: string]: string
    })

    useEffect(() => {
        axios.get(`http://localhost:3000/raw-data/blocks/scaled-images?&namespace=${props.namespace}&block=${props.block}&scale=${props.scale}`)
            .then(res => {
                setScaledTextures(res.data)
            })
    }, [])

    return scaledTextures
}
