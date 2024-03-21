import { QueryMeta, UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { api } from "../HTTP/mainApi";
import { apiRoute, proxyRoute } from "../Routes/routePath";
import { STP } from "../Components/StpTable/StpFactory/StpFactory";
import { StpItem } from "../Components/StpTable/TableObjects";
import stpMap from "../Components/StpTable/Data/data_spreadsheet";
import { _log } from "../Helpers/helpersFns";
_log(stpMap.size)

export type SSResponse = {
    stps: [string, ...number[]][]
    fields: string[]
}
type QueryKeyT = [string, object | undefined];
type IFetcherParams = {
    queryKey: QueryKeyT
    pageParam?: object,
    meta?: QueryMeta
}
export const fetcher = <T>({ queryKey, pageParam }: IFetcherParams): Promise<T> => {
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
        [url!, params],
        ({ queryKey, meta, pageParam }) => fetcher<T>({ queryKey, meta }),
        {
            enabled: !!url,
            ...config,
        }
    )

    return query;
};
type QueryFetchOptions = {
    forbid_fetch?: boolean

}
export function useQueryFetch(url: string | null = proxyRoute(apiRoute.stp_db)) {
    const { data, error, isError, isLoading } = useFetch<SSResponse>(url)


    if (isError) console.log('error while fetching', error)
    let stp: StpItem[] = []
    if (data) {
        stp = data.stps.map(dataExtractor)
        // console.log('query stp', stp)
    }

    return { stp, error, isError, isLoading }

}
type FetchedDataItem = readonly [string, ...Array<number>]
export const dataExtractor = (fetched_data: FetchedDataItem) => {
    const [name, ...restProps] = fetched_data
    const stp = new STP(name)
    // console.log('stp', name)

    const [Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight] = restProps

    stp.initParams(Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight)
    return stp.stpItem
}