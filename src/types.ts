export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  verified_email?: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  tags: string;
  available: boolean;
  isAvailable?: boolean;
  description: string;
  image?: string;
  portion?: string;
  spiceLevel?: string;
}

export interface CartItem {
  id: number;
  qty: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  deliveryEstimate: string;
}

export interface CustomerInfo {
  name: string;
  email?: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface OrderItem {
  id: number;
  qty: number;
  name?: string;
  price?: number;
}

export interface StatusHistoryItem {
  status: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderId: string;
  customer: CustomerInfo;
  branch: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  notes?: string;
  created_at: string;
  updated_at: string;
  statusHistory?: StatusHistoryItem[];
}

export interface FilterState {
  category: string;
  search: string;
  vegOnly: boolean;
  spicyOnly: boolean;
  maxPrice: number;
}
