import { useState, useEffect } from "react"
import axios from "axios"
import { BlockModelData } from "../minecraft/types"

export const usePaginatedBlocksForNamespace = (props: {
    page: number
    namespace: string
    sortOrder: `ascending` | `descending`
}) => {
    const [blockRecords, setBlockRecords] = useState([] as {
        block: string
        data: BlockModelData
    }[])

    useEffect(() => {
        axios.get(`http://localhost:3000/raw-data/blocks?page=${props.page}&namespace=${props.namespace}&limit=12&order=${props.sortOrder}`)
            .then(res => {
                const blocks = res.data.items
                setBlockRecords(blocks)
            })
    }, [props.namespace, props.page, props.sortOrder])

    return blockRecords
}
