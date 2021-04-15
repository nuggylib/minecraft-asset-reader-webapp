import { useState, useEffect } from "react"
import axios from "axios"
import { BlockModelData } from "../minecraft/types"

export const usePaginatedBlocksForNamespace = (props: {
    page: number
    namespace: string
}) => {
    const [blockRecords, setBlockRecords] = useState([] as {
        block: string
        data: BlockModelData
    }[])

    useEffect(() => {
        axios.get(`http://localhost:3000/raw-data/blocks?page=${props.page}&namespace=${props.namespace}`)
            .then(res => {
                const blocks = res.data.items
                console.log(`BLOCKS: `, blocks)
                setBlockRecords(blocks)
            })
    }, [props.page])

    return blockRecords
}