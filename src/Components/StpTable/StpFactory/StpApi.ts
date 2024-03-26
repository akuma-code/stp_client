

export function StpApiFetch<T>(data: T[], count?: number) {
    async function getCursor(cursor: number, prevCursor?: number) {
        let l = data.length
        let start = prevCursor ? prevCursor : 0
        let end = prevCursor ? prevCursor + cursor : cursor
        let nextCursor = end
        const sliced = data.slice(start, end)
        return { data: sliced, nextCursor }
    }

    return getCursor
}

