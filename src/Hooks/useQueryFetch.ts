
import { QueryMeta, UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { StpItem } from "../Components/StpTable/TableObjects";
import { api } from "../HTTP/mainApi";
import { _isArr } from "../Helpers/helpersFns";
import { apiRoute, proxyRoute } from "../Routes/routePath";
import { dataExtractor } from "../Helpers/dataExtractor";


export type SSResponse = {
    stps: [string, ...number[]][]
    fields: string[]
}
export type QueryKeyT = [string, object | undefined];
type IFetcherParams = {
    queryKey: QueryKeyT
    pageParam?: object,
    meta?: QueryMeta
}
export interface GetInfiniteRowsInterface<T> {
    nextCursor?: number;
    prevCursor?: number;
    data: T;

}
export const fetcher = <T>({ queryKey, pageParam }: IFetcherParams) => {
    const [url, params] = queryKey;
    return api
        .get<T>(url, { params: { ...params, pageParam } })
        .then((res) => res.data);
};

type FetchFnType = <T>(url: string | null, params?: object, config?: UseQueryOptions<T, Error, T, QueryKeyT>) => UseQueryResult<T, Error>
export const useFetch: FetchFnType = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {


    const query = useQuery<T, Error, T, QueryKeyT>(
=======
  

        {
            queryKey: [url!, params],
            queryFn: ({ queryKey, meta }) => fetcher<T>({ queryKey, meta }),
            enabled: !!url,
            ...config,
        }
    )

    return query;
};
type QueryFetchOptions = {
    forbid_fetch?: boolean

}
export function useQueryGoogleFetch(url: string | null = proxyRoute(apiRoute.stp_db)) {
    const { data, error, isError, isLoading } = useFetch<SSResponse>(url)


    if (isError) console.log('error while fetching', error)
    let stp: StpItem[] = []
    if (data) {
        if (data.stps.length !== 12) return []
        stp = data.stps.map(s => dataExtractor(s as TStpData)!)
        // console.log('query stp', stp)
    }

    return { stp, error, isError, isLoading }

}

export type TStpData = [name: string, Ro: number, Rw: number, Lt: number, Lr: number, Ra: number, Det: number, Er: number, Ea: number, Sf: number, S: number, weight: number]





export const isValidFetchedData = <T extends TStpData>(data: unknown): data is T => {
    const check_result: boolean[] = []
    if (_isArr(data) && data.length === 12) {
        const [name, ...props] = data
        check_result.push(typeof name === 'string' ? true : false)
        check_result.push(props.length === 11 ? true : false)
        check_result.push(props.every(p => typeof p === 'number') ? true : false)
        return !check_result.includes(false)
    } else {
        console.error(data)
        return false
    }
}

