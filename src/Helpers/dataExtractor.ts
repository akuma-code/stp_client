import { STP } from "../Components/StpTable/StpFactory/StpFactory";
import { TStpData } from "../Hooks/useQueryFetch";

export const dataExtractor = <T extends TStpData>(fetched_data: T) => {

    const [name, Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight] = fetched_data;

    const stp = new STP(name);
    // console.log('stp', name)
    stp.initParams(Ro, Rw, Lt, Lr, Ra, Det, Er, Ea, Sf, S, weight);
    return stp.stpItem;

};
