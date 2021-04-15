import { useEffect, useState } from "react"
import axios from "axios"

export const useBlockPageCountForNamespace = (props: {
    namespace: string
}) => {
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:3000/raw-data/blocks?&namespace=${props.namespace}&limit=12`)
            .then(res => {
                setPageCount(res.data.total_pages)
            })
    })

    return pageCount
}