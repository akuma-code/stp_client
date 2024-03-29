export const proxyRoute = (route: string) => `https://thingproxy.freeboard.io/fetch/${route}` as const
export const routePaths = {
    root: '/' as const,
    table: '/table' as const,
    stp_data: '/data' as const,
    stp_info: '/data/info' as const,
    stp_info_id: '/:info_id' as const,
    stp_id: 'table/:id' as const,
    compare: '/compare' as const,
    export: '/export' as const,
}

export const apiRoute = {
    stp_db: `https://script.google.com/macros/s/AKfycbz2FrlUXh0JNFIqc9VT2OBSLUvUdGhRq-6RZ775asudiBdT8DGfS8q5hZ8QIlZCeyfVnA/exec` as const,
    stp2: 'https://script.google.com/macros/s/AKfycbz2FrlUXh0JNFIqc9VT2OBSLUvUdGhRq-6RZ775asudiBdT8DGfS8q5hZ8QIlZCeyfVnA/exec' as const,
}
