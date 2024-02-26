import { useCallback, useEffect, useState } from "react";
import { AnyObj } from "../Interfaces/Types";

type UpdaterFn<TState> = (currentState: TState) => TState;

type Result<TState> = [
    state: TState,
    wrappedSetState: (update: TState | UpdaterFn<TState>) => void
];

export function useLocalStorage<TState extends AnyObj | string | number>(
    key: string,
    initialValue: TState
): Result<TState> {
    const [state, setState] = useState<TState>(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);

            return initialValue;
        }
    });

    const wrappedSetState = useCallback<(update: TState | UpdaterFn<TState>) => void>(
        (update) => {
            try {
                setState((currentState) => {

                    const nextState = typeof update === "function" ? update(currentState) : update;

                    window.localStorage.setItem(key, JSON.stringify(nextState));
                    return nextState;
                });
            } catch (error) {
                console.error(error);
            }
        },
        [key]
    );

    return [state, wrappedSetState] as const;
}
const loadValue = (key: string) => {
    try {
        const item = window.localStorage.getItem(key)
        if (item) return JSON.parse(item)
        else return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const useLs = <TState>(key: string) => {
    const [state, setState] = useState<TState | null>(null)
    useEffect(() => {
        const saved = loadValue(key)
        if (saved) setState(saved)


    }, [key])

    const save = (v: TState) => window.localStorage.setItem(key, JSON.stringify(v))
    // const load = () => loadValue(key)
    return [state, save] as const
}