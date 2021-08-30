export interface IOrder {
  id: string;
  buyer: string;
  seller?: string;
  shipper?: string;
  shippingAddress: string;
  billingAddress?: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  shippingFee: number;
  totalAmount: number;
  status: number;
  createdAt: number;
  updatedAt: number;
  color: string;
  size: string;
}

export interface IUpdateOrderStatus {
  id: string;
  status: number;
}
