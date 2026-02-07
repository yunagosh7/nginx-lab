export type OrderStatus = "pending" | "paid" | "cancelled" | "shipped";

export interface IOrder {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
}