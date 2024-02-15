import { useState } from "react";

export function useToggle(init?: boolean) {
    const [flag, setFlag] = useState(init || false)

    const on = () => setFlag(true)
    const off = () => setFlag(false)
    const toggle = () => setFlag(prev => !prev)

    const control = { toggle, off, on }

    return [flag, control] as const
}