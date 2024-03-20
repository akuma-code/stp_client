import { QueryMeta, UseQueryOptions, useQuery } from "react-query";
import { api } from "../HTTP/mainApi";
import { apiRoute, proxyRoute } from "../Routes/routePath";
import { STP } from "../Components/StpTable/StpFactory/StpFactory";
import { StpItem } from "../Components/StpTable/TableObjects";


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
export const useFetch = <T>(
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

export function useQueryFetch() {
    const ss = useFetch<SSResponse>(proxyRoute(apiRoute.stp_db))
    const { data, error, isError, isLoading } = ss
    if (isError) console.log('error while fetching', error.message)
    let stp: StpItem[] = []
    if (data) {
        stp = data.stps.map(dataExtractor)
        // console.log('query stp', stp)
    }

    return { stp, error, isError, isLoading }

}

const dataExtractor = (fetched_data: [string, ...number[]]) => {
    const [name, ...restProps] = fetched_data
    const stp = new STP(name)
    // console.log('stp', name)
    const numeric = restProps.map(p => p)
    const [Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight] = restProps
    stp.initParams(Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight)
    return stp.stpItem
}