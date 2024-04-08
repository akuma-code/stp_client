import axios from 'axios';
import type { AxiosHeaders, AxiosHeaderValue } from 'axios'
import Cookies from 'js-cookie'
import { _log } from '../Helpers/helpersFns';
import { apiRoute } from '../Routes/routePath';

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
    config.headers.Authorization = `Bearer ${Cookies.get('token') || ""}`
    // config.headers.set('Origin', host)
    // config.headers.set('Origin', )

    // console.log('config: ', config)
    return config
}
const authInterceptor = (config: { headers: AxiosHeaders }) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    console.log('config: ', config.headers.getAuthorization())
    return config
}

$axios.interceptors.request.use(headerInterceptor, (e) => _log("error: ", e))
$axios.interceptors.request.use(authInterceptor, async (error) => {
    // предотвращаем зацикленный запрос, добавляя свойство _isRetry 
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
        // проверим, что ошибка именно из-за невалидного accessToken
        error.response.status === 401 &&
        // проверим, что запрос не повторный
        error.config &&
        !error.config._isRetry
    ) {
        try {
            // запрос на обновление токенов
            const resp = await api.get<{ accessToken: string }>(apiRoute.auth);
            // сохраняем новый accessToken в localStorage
            localStorage.setItem("token", resp.data.accessToken);
            // переотправляем запрос с обновленным accessToken
            return $axios.request(originalRequest);
        } catch (error) {
            console.log("AUTH ERROR");
        }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку 
    throw error;
})

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
            withCredentials: true
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

