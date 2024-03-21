import { _log } from "../../Helpers/helpersFns";
import { setupStpArray, updateTags } from "./StpTagsMaker";
import { StpItem } from "./TableObjects";
import { table_data_base } from "./Data/data_base";
import { table_data_BrGr } from "./Data/data_Fenix";
import { table_data_32mm } from "./Data/data_32mm";
import { apiRoute, proxyRoute } from "../../Routes/routePath";
import stpdata from "./Data/data_last";

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


    const stp_setup = setupStpArray(
        table_data_base,
        table_data_BrGr,
        table_data_32mm,
    )

    const last = stpdata
    return last
}


export const getDataFromSpreadsheet = async () => {

    const ss_url = proxyRoute(apiRoute.stp_db)

}