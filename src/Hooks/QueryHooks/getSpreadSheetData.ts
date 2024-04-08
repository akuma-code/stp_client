import { useQuery } from "@tanstack/react-query";
import { api } from "../../HTTP/mainApi";
import { apiRoute, proxyRoute } from "../../Routes/routePath";

export function useSS_Data() {
    const context = useQuery({
        queryKey: ['googleApi'],
        queryFn: () => api.get(proxyRoute(apiRoute.stp_db)),
        retry: false
    })

    return context
}