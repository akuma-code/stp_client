import { makeAutoObservable } from "mobx";
import { api } from "../../HTTP/mainApi";
import { apiRoute } from "../../Routes/routePath";

export class AuthStore {
    isAuth = false;
    isAuthInProgress = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(email: string, password: string) {
        this.isAuthInProgress = true;
        try {
            const resp = await AuthService.login(email, password);
            console.log('resp: ', resp)
            localStorage.setItem("token", resp.data.accessToken);
            this.isAuth = true;

        } catch (err) {
            console.log("login error", err);
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async checkAuth() {
        this.isAuthInProgress = true;
        try {
            const resp = await AuthService.refreshToken();
            localStorage.setItem("token", resp.data.accessToken);
            this.isAuth = true;

        } catch (err) {
            console.log("login error", err);
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            await AuthService.logout();
            this.isAuth = false;
            localStorage.removeItem("token");
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

}

export const AuthService = {

    login(email: string, password: string) {
        return api.post<{ accessToken: string }>('/api/' + apiRoute.login, { email, password })
    },

    refreshToken() {
        return api.get<{ accessToken: string }>('/api/' + apiRoute.auth);
    },

    logout() {
        return api.post("/api/logout", null)
    },
}

