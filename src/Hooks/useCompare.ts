import { useEffect, useMemo, useState } from "react";
import { AnyObj } from "../Interfaces/Types";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
import { StpData } from "../Components/DataTable/StpDataTable";

type Order = 'asc' | 'desc';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}



function getComparator<Key extends keyof AnyObj>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const hasTags = (item: StpData, tags: StpTags[]) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCompare<T extends AnyObj>(array: readonly T[], order: Order, sort_field: any, tags: StpTags[]) {
    const sorted = useMemo(() => stableSort(array, getComparator(order, sort_field)), [order, sort_field])

    return sorted
}
export function useSort<T extends AnyObj>(array: readonly T[], order: Order, sort_field: any, tags: StpTags[]) {

    const sorted = useCompare(array, order, sort_field, tags)
    const [sortedWithTags, setSortedWithTags] = useState(sorted)
    const [len, setLen] = useState(tags.length)

    useEffect(() => {

        const tagged = [...sorted].filter(s => hasTags(s as unknown as StpData, tags))
        const nonTagged = [...sorted].filter(s => !hasTags(s as unknown as StpData, tags))
        const gr = [...tagged, ...nonTagged]
        setSortedWithTags(prev => gr)
    }, [len, order, sort_field])
    return sortedWithTags
}