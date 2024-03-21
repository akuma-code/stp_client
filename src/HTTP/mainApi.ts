import axios from 'axios';
import type { AxiosHeaders, AxiosHeaderValue } from 'axios'
import Cookies from 'js-cookie'
import { _log } from '../Helpers/helpersFns';

const host = process.env.REACT_APP_HOST_URL

const $api = axios.create({
    baseURL: host,
    withCredentials: false,
    proxy: {
        protocol: 'http',
        host: '192.168.0.250',
        port: 3128,
    },


})
$api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'


const headerInterceptor = (config: { headers: AxiosHeaders }) => {
    config.headers.set('Access-Control-Allow-Origin', '*')
    // config.headers.set('Origin', )
    _log("config", config)

    return config
}
$api.interceptors.request.use(headerInterceptor, (e) => _log("error: ", e))
export const api = {
    get: async <T>(url: string, params?: object) =>
        await $api.get<T>(url, {
            headers: {
                token: Cookies.get('token'),
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: false,
            ...params,
        }),
    post: async <T>(url: string, data: any) => {
        return await $api.post<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        });
    },
    patch: async<T>(url: string, data: any) =>
        await $api.patch<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    delete: async <T>(url: string) =>
        await $api.delete<T>(url, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    head: async <T>(url: string) => {
        await $api.head<T>(url, {

        })
    }
};

