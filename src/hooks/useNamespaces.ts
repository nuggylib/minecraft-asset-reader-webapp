import { useEffect, useState } from "react"
import axios from "axios"

export const useNamespaces = () => {
    const [namespaces, setNamespaces] = useState([] as string[])

    useEffect(() => {
        axios.get(`http://localhost:3000/raw-data/namespaces`)
            .then(res => {
                const namespaces = res.data.items
                console.log(`NAMESPACES: `, namespaces)
                setNamespaces(namespaces)
            })
    }, [])

    return namespaces
}