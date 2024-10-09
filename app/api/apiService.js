// let API_URL = "http://127.0.0.1:8080/api";
// let API_URL = "http://127.0.0.1:8000/api/mobile";
let API_URL = "http://192.168.1.10:8000/api/mobile";
let IMG_URL = "http://192.168.1.10:8000/img";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// let API_URL = "http://127.0.0.1:8000/api/mobile";
// let IMG_URL = "http://127.0.0.1:8000/img";

// class ApiService {
//     constructor() {
//         this.axios = axios.create({
//             baseURL: API_URL,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         this.axios.interceptors.request.use(
//             async (config) => {
//                 const token = await AsyncStorage.getItem('userToken');
//                 if (token) {
//                     config.headers['Authorization'] = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => {
//                 return Promise.reject(error);
//             }
//         );
//     }

//     async callApi(endpoint, method = "GET", body) {
//         try {
//             const response = await this.axios({
//                 method,
//                 url: endpoint,
//                 data: body
//             });
//             return response.data;
//         } catch (error) {
//             console.error('API call error:', error);
//             throw error;
//         }
//     }
// }

// const apiService = new ApiService();

// function callApi(endpoint, method = "GET", body) {
//     return apiService.callApi(endpoint, method, body);
// }
function callApi(endpoint, method = "GET", body) {
    return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    }).catch((e) => {
    console.log(e);
    });
    }
export function GET_ALL(endpoint) {
    return callApi(endpoint, "GET");
}

export function GET_CATEGORIES(endpoint) {
    return callApi(endpoint, "GET");
}

export function GET_PAGE(endpoint, page = 0, size = 10, categoryId = null) {
    let url = `${endpoint}?page=${page}&size=${size}`;

    if (categoryId !== null) {
        url += `&categoryId=${categoryId}`;
    }

    return callApi(url, "GET");
}

export function GET_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}

export function POST_ADD(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}

export function GET_IMG(imgName) {
    return `${IMG_URL}/image/${imgName}`;
}




