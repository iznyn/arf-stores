export type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  date: string;
  items: number;
};
