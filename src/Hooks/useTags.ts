import { useEffect, useState } from "react";
import { StpTag } from "../Components/StpTable/TableObjects";
import { StpTypeProps } from "../Interfaces/Types";

export function useTags(_type: StpTypeProps) {

    const [tags, setTags] = useState<StpTag[]>([])

    const _t = Object.entries(_type).reduce((prev, [k, v]) => {
        if (v === true) prev.push(k as StpTag)
        return prev
    }, [] as StpTag[])


    useEffect(() => {

        setTags(_t)
    }, [_t, _type])
    return tags
}