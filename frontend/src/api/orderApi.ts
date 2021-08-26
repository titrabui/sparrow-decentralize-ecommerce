import AxiosClient from "./axiosClient";

const OrderApi = {
    getMyPurchased: (address: any) => AxiosClient.get(`/orders/my-order/${address}`),
}

export default OrderApi;