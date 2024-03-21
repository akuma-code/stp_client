import { useMemo, useState } from "react"
import { _isArr } from "../Helpers/helpersFns"
export type SelectorActions = {
    select: (id: number | number[]) => void;
    clear: () => void;
    isSelected: (id: number) => boolean;
    remove: (id: number) => void;
}
export const useIdSelector = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const action = useMemo(() => {
        const select = (id: number | number[]) => { _isArr(id) ? setSelectedIds(prev => [...prev, ...id]) : setSelectedIds(prev => [...prev, id]) }
        const clear = () => setSelectedIds([])
        const isSelected = (id: number) => selectedIds.includes(id)
        const remove = (id: number) => setSelectedIds(prev => prev.filter(p => p !== id))
        return { select, clear, isSelected, remove }
    }, [selectedIds])

    return [selectedIds, action] as const

}