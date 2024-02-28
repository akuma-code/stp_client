import { useCallback, useEffect, useRef, useState } from 'react'


// export default function useDebounce<F extends (...args: any) => any | void>(callback: F, delay = 500) {
//     const timer = useRef();

//     const debouncedCallback = useCallback((...args: any) => {
//         if (timer.current) {
//             clearTimeout(timer.current)
//         }
//         timer.current = setTimeout(() => {
//             callback(...args)
//         }, delay ?? 500)
//     }, [callback, delay])

//     return debouncedCallback;
// }