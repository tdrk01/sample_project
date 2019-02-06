import axios from 'axios'
import store from "../stores";

export default class Api {

    static getAuthorization () {
        return  "Bearer "+store.getState().auth.auth_token;
    }

    static getAuthHeader() {
        if(store.getState().auth !== null){
            return {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: Api.getAuthorization()
                }
            }
        }
        return { headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }};
    }

    static get($url, params={}) {
        var getParam = this.getAuthHeader();
        getParam["params"] = params;
        return axios.get($url, getParam).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }

    static post($url, params={}) {
        return axios.post($url, params, this.getAuthHeader()).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }

    static put($url, params={}) {
        return axios.put($url, params, this.getAuthHeader()).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }

    static delete($url, params={}) {
        var delParam = this.getAuthHeader();
        delParam["params"] = params;
        return axios.delete($url, delParam).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }

    static upload($url, params={}, cancelToken=null) {
        return axios.post($url, params, {
            headers: { Authorization: Api.getAuthorization() },
            cancelToken: cancelToken
        }).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }

    static getImage($url) {
        return axios.get($url, {
            headers: { 
                Authorization: Api.getAuthorization(),
            },
            responseType: 'arraybuffer'
        }).then( response => {
            return {
                status: response.status,
                message: response.data.message,
                data: response.data.data,
                errors: response.data.errors,
                response: response
            };
        }).catch(error => {
            if(error.response == null){
                return {
                    status: 500
                };
            }
            return {
                status: error.response.status,
                message: error.response.data.message,
                data: error.response.data.data,
                errors: error.response.data.errors,
            };
        });
    }
}

