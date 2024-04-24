import { makeAutoObservable } from "mobx";
import { api } from "../../HTTP/mainApi";
import { apiRoute } from "../../Routes/routePath";



const canAuth = [
    'root',
    'i can auth'
]
export class AuthStore {
    isAuth = false;
    isAuthInProgress = false;

    possibleAuth: string[]
    constructor(auth_var: string[]) {
        this.possibleAuth = auth_var
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(password: string) {
        this.isAuthInProgress = true;
        try {
            // const resp = await AuthService.auth(password);
            // console.log('resp: ', resp)
            // localStorage.setItem("token", resp.data.accessToken);
            if (this.possibleAuth.includes(password)) {
                localStorage.setItem('isAuth', 'true')
                this.isAuth = true;
            } else this.isAuth = false

        } catch (err) {
            console.log("login error", err);
        } finally {
            this.isAuthInProgress = false;
        }
    }

    checkAuth() {
        this.isAuthInProgress = true;
        try {
            const local = localStorage.getItem('isAuth')
            if (!local) {
                // localStorage.setItem('isAuth', 'false')
                this.isAuth = false
            } else this.isAuth = true
            // const resp = await AuthService.refreshToken();
            // localStorage.setItem("token", resp.data.accessToken);

        } catch (err) {
            console.log("login error", err);
        } finally {
            this.isAuthInProgress = false;
        }
    }

    async logout() {
        this.isAuthInProgress = true;
        try {
            // await AuthService.logout();
            this.isAuth = false;
            localStorage.removeItem("token");
            localStorage.removeItem("isAuth");
        } catch (err) {
            console.log("logout error");
        } finally {
            this.isAuthInProgress = false;
        }
    }

}

export const AuthService = {
    auth(pass: string) {

    },

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
