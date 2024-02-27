import { useMemo } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpTags } from "../Components/StpTable/TableObjects";
import { AnyObj } from "../Interfaces/Types";
import { useDebounce } from "./useDebounce";

type Order = 'asc' | 'desc';
type TSort = { [key: string]: string | number }


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
export function useCompare<T extends AnyObj>(array: readonly T[], order: Order, sort_field: any) {
    const sorted = useMemo(() => stableSort(array, getComparator(order, sort_field)), [order, sort_field])

    return sorted
}

export function useSortAndFilter<T extends AnyObj>(array: readonly T[], order: Order, sort_field: any, query: string) {
    const _query = useDebounce(query, 1500)

    const sorted = useCompare(array, order, sort_field)

    const filtered = useMemo(() => {

        return [...sorted].filter(item => {
            if ('name' in item) {
                return (typeof item.name === 'string') ? item.name.toLowerCase().includes(_query.toLowerCase()) : false
            }
            else return []
        })

    }, [_query, sorted])

    return filtered
}

export function useFilterTags<T extends AnyObj>(array: readonly T[], order: Order, sort_field: any, tags: StpTags[], query: string) {

    const sorted = useSortAndFilter(array, order, sort_field, query)

    const tagged = useMemo(() => tags.length > 0 ? [...sorted].filter(s => hasTags(s as unknown as StpData, tags)) : [...sorted],
        [array, order, sort_field, tags, query])

    return tagged
}