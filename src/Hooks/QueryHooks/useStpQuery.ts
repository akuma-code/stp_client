import { useQuery } from "@tanstack/react-query";
import { stpBackup_128 } from "../../Components/StpTable/Data/data_spreadsheet";
import { STP } from "../../Components/StpTable/StpFactory/StpFactory";
import { StpData } from "../../Components/StpTableView/StpDataTable";
import { addIdProp } from "../../Helpers/dataExtractor";


export async function GetPartialStpData(): Promise<StpData[]> {
    const stps = stpBackup_128.map(row => new STP(row).stpItem)

    // .map(({ name, cams, depth, tags }) => ({ name, tags, cams, depth }))
    // .map((item, idx) => ({ ...item, id: idx + 1 })) as StpData[];
    return addIdProp(stps)
}
export function useStpQuery(select: <T extends StpData>(data: T[]) => T[]) {
    const context = useQuery({
        queryKey: ['stp_query'],
        queryFn: GetPartialStpData,
        select,
        notifyOnChangeProps: ['data', 'isRefetching']
    })

    return context
}
