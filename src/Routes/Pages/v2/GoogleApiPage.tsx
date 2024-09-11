import { Button } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import {
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { api } from "../../../HTTP/mainApi";
import { _ID, _log } from "../../../Helpers/helpersFns";
import { TStpData } from "../../../Hooks/useQueryFetch";
import { apiRoute, proxyRoute } from "../../routePath";

export const loader =
    (queryClient: QueryClient) =>
    async ({ request }: LoaderFunctionArgs) => {
        const context = await queryClient.ensureQueryData({
            queryKey: ["google_api"],
            queryFn: async () =>
                api.get<{ stps: TStpData[]; fields: string[] }>(
                    apiRoute.stp_db,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                                "GET, POST, PUT, DELETE, OPTIONS",
                            "Access-Control-Allow-Headers":
                                "Content-Type, Authorization",
                        },
                    }
                ),
        });
        return context;
    };

export default function GoogleApiPage() {
    const { data, ...rest } = useLoaderData() as Awaited<
        ReturnType<ReturnType<typeof loader>>
    >;
    const navigate = useNavigate();
    _log(rest);
    return (
        <div>
            <Button variant="text" onClick={() => navigate(-1)}>
                Вернуться назад
                {/* <MuiLink to={ routePaths.v2 }>Back to v2</MuiLink> */}
            </Button>
            <p className="p-2">
                Data:
                {rest.status === 200 ? (
                    data?.stps?.map((s) => <li key={_ID()}>{s.join("-")}</li>)
                ) : (
                    <div>Error!</div>
                )}
            </p>
        </div>
    );
}
