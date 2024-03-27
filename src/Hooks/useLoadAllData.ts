import { dataExtractor } from "./useQueryFetch";
import { FetchedData, stpBackup_128 } from "../Components/StpTable/Data/data_spreadsheet";
import { StpData } from "../Components/StpTableView/StpDataTable";
import { useQuery } from "@tanstack/react-query";
import { useStpFilter } from "./useCompare";

export const useLoadAllData = () => {
    const context = useQuery({
        queryKey: ['load_stp_all'] as const,
        queryFn: () => getAllTableData(),
        gcTime: 60 * 60 * 1000,
        select: data => data.map((s, i) => ({ ...s, id: i + 1 })) as StpData[]
    });
    return context;
};
async function getAllTableData() {
    const stps = await stpBackup_128.map(i => dataExtractor<FetchedData>(i))
    // .map((item, idx) => ({ ...item, id: idx + 1 })) as StpData[];
    return stps;
}
