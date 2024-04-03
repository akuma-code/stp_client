import { useQuery } from "@tanstack/react-query";
import { FetchedData, stpBackup_128 } from "../Components/StpTable/Data/data_spreadsheet";
import { StpData } from "../Components/StpTableView/StpDataTable";
import { dataExtractor } from "./useQueryFetch";

export const useLoadAllData = () => {
    const context = useQuery({
        queryKey: ['load_stp_all'] as const,
        queryFn: () => getAllTableData(),
        select: data => data.map((s, i) => s.id ? s : ({ ...s, id: i + 1 })) as StpData[]
    });
    return context;
};

export const useLoadDataQuery = (querySearch: string) => {
    const context = useQuery({
        queryKey: ['filter_stp_all', querySearch] as const,
        queryFn: () => getAllTableData(),
        gcTime: 1000,
        select: data => data.filter(d => d.name.includes(querySearch))
    });


    return context;
}
export async function getAllTableData() {
    const stps = await stpBackup_128.map(i => dataExtractor<FetchedData>(i))
        .map((item, idx) => ({ ...item, id: idx + 1 })) as StpData[];
    return stps;
}
