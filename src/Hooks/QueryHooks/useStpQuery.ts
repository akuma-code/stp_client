import { useQuery } from "@tanstack/react-query";
import { stpBackup_128 } from "../../Components/StpTable/Data/data_spreadsheet";
import { StpData } from "../../Components/StpTableView/StpDataTable";
import { dataExtractor } from "../useQueryFetch";


export async function GetPartialStpData() {
    const stps = await stpBackup_128.map(dataExtractor)
        .map(({ name, cams, depth, tags }) => ({ name, tags, cams, depth }))
        .map((item, idx) => ({ ...item, id: idx + 1 })) as StpData[];
    return stps;
}
export function useStpQuery(select: <T extends StpData>(data: T[]) => T[]) {
    const context = useQuery({
        queryKey: ['stp_query'],
        queryFn: GetPartialStpData,
        select,
        notifyOnChangeProps: ['data']
    })

    return context
}
