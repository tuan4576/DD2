import axiosInstance from "./axios";

interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const apiProduct = {
  getAll: () => {
    return axiosInstance.get<Product[]>(`/mobile/products`);
  },
  getProductById: (id: number) => {
    return axiosInstance.get<Product>(`/mobile/products/${id}`);
  },
  getProductsByCategory: (category: string) => {
    return axiosInstance.get<Product[]>(`/mobile/products/category/${category}`);
  },
  searchProducts: (query: string) => {
    return axiosInstance.get<Product[]>(`/mobile/products/search?q=${query}`);
  },
  // createProduct: (data: Partial<Product>) => {
  //   return axiosInstance.post<Product>(`/products`, data);
  // },

  // deleteProductById: (id: number) => {
  //   return axiosInstance.delete<void>(`/products/${id}`);
  // },

  
  // getIDAdmin: () => {
  //   return axiosInstance.get<Product[]>(`/products/user`);
  // },

  // getProductPagination: (page: number, perPage: number) => {
  //   return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`/products`, {
  //     params: { page, perPage },
  //   });
  // },

  // getOne: (id: number) => {
  //   return axiosInstance.get<Product>(`/products/${id}`);
  // },

  // getProductByCatId: (catid: number, page: number) => {
  //   return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`/products/categories/${catid}`, {
  //     params: { page },
  //   });
  // },

  // getNewestTopSelling: (query: string) => {
  //   return axiosInstance.get<Product[]>(`/products/${query}`);
  // },

  // getMostView: () => {
  //   return axiosInstance.get<Product[]>(`/products`);
  // },

  // getProductBySearch: (name: string) => {
  //   return axiosInstance.get<Product[]>(`/products/search/${name}`);
  // },
  
  // editProduct: (id: number, product: Partial<Product>) => {
  //   return axiosInstance.put<Product>(`/products/${id}`, product);
  // },
};

export default apiProduct;
