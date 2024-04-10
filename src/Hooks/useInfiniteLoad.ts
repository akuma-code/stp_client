
import { FetchedData, stpBackup_128 } from "../Components/StpTable/Data/data_spreadsheet";
import { StpData } from "../Components/StpTableView/StpDataTable";
import { QueryKeyT } from "./useQueryFetch";
import { dataExtractor } from "../Helpers/dataExtractor";

import { useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../index";
import { CursorRespone } from "../Interfaces/Types";


export const useInfiniteLoad = (queryKey: QueryKeyT) => {
    // const { data } = useFetch<SSResponse>(proxyRoute(apiRoute.stp_db))
    const context = useInfiniteQuery
        // <GetInfiniteRowsInterface<StpData[]>, Error, GetInfiniteRowsInterface<StpData[]>, QueryKeyT, number>
        (
            {
                queryKey: queryKey,
                queryFn: ({ queryKey, pageParam = 0 }) => getDataFromSpreadsheet({ pageParam }),
                initialPageParam: 0,
                getNextPageParam: (last) => last.nextCursor ?? -1,
                getPreviousPageParam: (prev) => prev.prevCursor ?? 0,
            }, queryClient

        );
    return context;
};
type StpDataResponsePromise = CursorRespone<StpData[]>
export const useLoadMore = (rpp = 50) => {
    const context = useInfiniteQuery(
        {
            queryKey: ['load_stp', rpp] as const,
            queryFn: ({ queryKey, pageParam = 0 }) => getDataFromSpreadsheet({ pageParam, count: rpp }),
            initialPageParam: 0,
            getNextPageParam: (last) => last.nextCursor ?? false,
            getPreviousPageParam: (prev) => prev.prevCursor ?? false,

        },
        queryClient

    );

    // console.log('context', context.data)
    return context
}
// const context = useInfiniteQuery<GetInfiniteRowsInterface<StpData[]>, Error, any, any, number>({
//     queryKey: ['load_more', undefined],
//     queryFn: ({ queryKey, pageParam }) => getDataFromSpreadsheet({ pageParam }),
//     initialPageParam: 0,
//     getNextPageParam: (last, pages) => last.nextCursor ?? -1,
//     getPreviousPageParam: (prev) => prev.prevCursor ?? 0,
//     maxPages: 5
// })
type FetchCursorData = { pageParam?: number, count?: number, _cursor?: number }
export const getDataFromSpreadsheet = async ({ pageParam, count = 40, _cursor }: FetchCursorData): Promise<{ prevCursor: number; nextCursor: number; data: StpData[]; }> => {
    // const count = 15
    // const Counter = _cursor ? pageParam ? _cursor : _cursor : pageParam
    const _C = pageParam
        ?
        _cursor
            ?
            _cursor
            : pageParam
        : 0
    const stps = stpBackup_128.map(i => dataExtractor<FetchedData>(i))
        .map((item, idx) => ({ ...item, id: idx + 1 })) as StpData[]
    // _log('current page: ', pageParam)
    const cursor = pageParam ? count + _C : count
    let start = Math.max(cursor - count, 0)
    let end = Math.min(cursor + 1, stps.length)

    const list = stps.slice(start, end)
    return { prevCursor: start, nextCursor: end, data: list }


}

