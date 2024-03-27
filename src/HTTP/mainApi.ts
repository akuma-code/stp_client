import axios from 'axios';
import type { AxiosHeaders, AxiosHeaderValue } from 'axios'
import Cookies from 'js-cookie'
import { _log } from '../Helpers/helpersFns';

const host = process.env.REACT_APP_HOST_URL

const $axios = axios.create({
    baseURL: host,
    withCredentials: false,
    // proxy: {
    //     protocol: 'http',
    //     host: 'https://thingproxy.freeboard.io/fetch/',
    //     port: 3128,
    // },


})
$axios.defaults.headers.common['Access-Control-Allow-Origin'] = host
$axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST'
$axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'


const headerInterceptor = (config: { headers: AxiosHeaders }) => {
    config.headers.set('Access-Control-Allow-Origin', host)
    // config.headers.set('Access-Control-Content-Type', 'application/json, text/plain, */*')
    config.headers.authorization = `Bearer ${Cookies.get('token') || ""}`
    // config.headers.set('Origin', host)
    // config.headers.set('Origin', )
    _log("config interceptor: ", config)

    return config
}


$axios.interceptors.request.use(headerInterceptor, (e) => _log("error: ", e))


export const api = {
    get: async <T>(url: string, params?: object) =>
        await $axios.get<T>(url, {
            headers: {
                // token: Cookies.get('token'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST'



            },
            withCredentials: false,
            ...params,
        }),
    post: async <T>(url: string, data: any) => {
        return await $axios.post<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        });
    },
    patch: async<T>(url: string, data: any) =>
        await $axios.patch<T>(url, data, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    delete: async <T>(url: string) =>
        await $axios.delete<T>(url, {
            headers: {
                token: Cookies.get('token'),
            },
        }),
    head: async <T>(url: string) => {
        await $axios.head<T>(url, {

        })
    }
};

