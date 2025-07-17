export interface Product {
  slug: string;
  title: string;
  price: string;
  availability: "In Stock" | "Out of Stock" | "Limited Stock";
  image: string;
  featured: boolean;
  category: "vegetables" | "poultry" | "ice" | "other";
  content: string;
  location: {
    id: string;
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  stock: number;
  orders: number;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  phone: string;
  email?: string;
  isActive: boolean;
  products: number;
  productAvailability?: ProductAvailability[];
}

export interface ProductAvailability {
  name: string;
  status: 'available' | 'upcoming';
  availableDate: string;
  category: 'vegetables' | 'poultry' | 'ice' | 'other';
  details?: {
    area?: string;
    plants?: string;
    production?: string;
    price?: string;
    stock?: string;
    pricing?: Array<{
      range: string;
      price: string;
    }>;
    description?: string;
  };
}

export interface Order {
  id: string;
  productId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  quantity: number;
  totalAmount: number;
  locationId: string;
  location: Location;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  updatedAt?: string;
}

export interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalLocations: number;
  ordersToday: number;
  revenueToday: number;
  topProducts: Array<{
    product: Product;
    orders: number;
    revenue: number;
  }>;
  ordersByLocation: Array<{
    location: Location;
    orders: number;
    revenue: number;
  }>;
  ordersByStatus: Array<{
    status: string;
    count: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
}
