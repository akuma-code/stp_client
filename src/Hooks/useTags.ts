import { useEffect, useState } from "react";
import { StpTags } from "../Components/StpTable/TableObjects";
import { StpTagsList, StpTypeProps } from "../Interfaces/Types";

export function useTags(_type: StpTypeProps) {

    const [tags, setTags] = useState<StpTags[]>([])

    const _t = Object.entries(_type).reduce((prev, [k, v]) => {
        if (v === true) prev.push(k as StpTagsList)
        return prev
    }, [] as StpTags[])


    useEffect(() => {

        setTags(_t)
    }, [_type])
    return tags
}