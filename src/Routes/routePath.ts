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