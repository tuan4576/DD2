// let API_URL = "http://127.0.0.1:8080/api";
// let API_URL = "http://127.0.0.1:8000/api/mobile";
let API_URL = "http://192.168.1.10:8000/api/mobile";
let IMG_URL = "http://192.168.1.10:8000/img";
// let API_URL = "http://192.168.159.104:8000/api/mobile";
// let IMG_URL = "http://192.168.159.104:8000/img";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// let API_URL = "http://127.0.0.1:8000/api/mobile";
// let IMG_URL = "http://127.0.0.1:8000/img";
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

// export function GET_PRODUCTS_BY_CATEGORY(categoryId, page = 0, size = 10) {
//     const endpoint = `categories/${categoryId}/products?page=${page}&size=${size}`;
//     return callApi(endpoint, "GET");
// }
export function LOGIN(endpoint, data) {
    return axios({
        method: 'POST',
        url: `${API_URL}/${endpoint}`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((error) => {
        console.error('Login error:', error);
        throw error;
    });
}

export function REGISTER(endpoint, data) {
    return axios({
        method: 'POST',
        url: `${API_URL}/${endpoint}`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((error) => {
        console.error('Registration error:', error);
        throw error;
    });
}
export function ADD_TO_CART(endpoint, data) {
    return AsyncStorage.getItem('userToken')
        .then(token => {
            if (!token) {
                throw new Error('User not authenticated');
            }

            return axios({
                method: 'POST',
                url: `${API_URL}/${endpoint}`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .catch((error) => {
            console.error('Add to cart error:', error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access. Please log in again.');
                // You might want to navigate to login screen or refresh token here
            }
            throw error;
        });
}

export function GET_SHOPPING_CART(endpoint) {
    return AsyncStorage.getItem('userToken')
        .then(token => {
            if (!token) {
                throw new Error('User not authenticated');
            }

            return axios({
                method: 'GET',
                url: `${API_URL}/${endpoint}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .catch((error) => {
            console.error('Get shopping cart error:', error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access. Please log in again.');
                // You might want to navigate to login screen or refresh token here
            }
            throw error;
        });
}
export function UPDATE_SHOPPING_CART(endpoint, id, data) {
    return AsyncStorage.getItem('userToken')
        .then(token => {
            if (!token) {
                throw new Error('User not authenticated');
            }

            return axios({
                method: 'PUT',
                url: `${API_URL}/${endpoint}/${id}`,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .catch((error) => {
            console.error('Update shopping cart error:', error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access. Please log in again.');
                // You might want to navigate to login screen or refresh token here
            }
            throw error;
        });
}
export function DELETE_SHOPPING_CART(endpoint, id) {
    return AsyncStorage.getItem('userToken')
        .then(token => {
            if (!token) {
                throw new Error('User not authenticated');
            }

            return axios({
                method: 'DELETE',
                url: `${API_URL}/${endpoint}/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        })
        .catch((error) => {
            console.error('Delete shopping cart item error:', error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access. Please log in again.');
                // You might want to navigate to login screen or refresh token here
            }
            throw error;
        });
}





// export function GET_USER_PROFILE(endpoint) {
//     return callApi(endpoint, "GET");
// }

// export function UPDATE_USER_PROFILE(endpoint) {
//     return callApi(endpoint, "GET");
// }




// export function GET_PAGE(endpoint, page = 0, size = 10, categoryId = null) {
//     let url = `${endpoint}?page=${page}&size=${size}`;

//     if (categoryId !== null) {
//         url += `&categoryId=${categoryId}`;
//     }

//     return callApi(url, "GET");
// }

// export function GET_ID(endpoint, id) {
//     return callApi(endpoint + "/" + id, "GET");
// }

// export function POST_ADD(endpoint, data) {
//     return callApi(endpoint, "POST", data);
// }

// export function PUT_EDIT(endpoint, data) {
//     return callApi(endpoint, "PUT", data);
// }

// export function DELETE_ID(endpoint) {
//     return callApi(endpoint, "DELETE");
// }

export function GET_IMG(imgName) {
    return `${IMG_URL}/image/${imgName}`;
}
export function SliderIntro(imgName) {
    return `${IMG_URL}/sliderintro/`;
}




