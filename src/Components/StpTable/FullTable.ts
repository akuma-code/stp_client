import { _log } from "../../Helpers/helpersFns";
import { updateTags } from "./StpTagsMaker";
import { StpItem } from "./TableObjects";
import { table_data_base } from "./Data/data_base";
import { table_data_BrGr } from "./Data/data_Fenix";
import { table_data_32mm } from "./Data/data_32mm";

export function GetStpData(): StpItem[] {
    const data = table_data_base.concat(table_data_BrGr)

    return data
}

export async function LazyStpData() {
    const withTags32mm = table_data_32mm.map(updateTags)
    const withTagsBase = table_data_base.map(updateTags)
    const withTagsBrGr = table_data_BrGr.map(updateTags)
    const stp_data: StpItem[] = []
    const data = await stp_data.concat(
        withTagsBase,
        withTagsBrGr,
        withTags32mm)
    // const data = table_data_all.concat(table_data_BrGr, withTags32mm)


    return data
}


export const PromisedStpData = async () => {
    const p = new Promise<StpItem[]>(function P(resolve, reject) {
        resolve(LazyStpData())
        reject((error: unknown) => _log(error))
    })
    const d = await p;
    return d;
}

export default PromisedStpData