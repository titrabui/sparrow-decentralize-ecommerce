export interface IOrder {
  id: string,
  key:string,
  buyer: string,
  seller?: string,
  shipper?: string,
  shippingAddress: string,
  billingAddress?: string,
  productId: string,
  productName: string,
  quantity: number,
  price: number,
  shippingFee: number,
  totalAmount: number,
  status: string,
  createdAt: number,
  updatedAt: number
};

export interface IUpdateOrderStatus {
  id: string,
  status: string
}
