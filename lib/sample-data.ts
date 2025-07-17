import { Product, Location, Order, Analytics } from "@/types/product"

export const sampleLocations: Location[] = [
  {
    id: "loc-1",
    name: "Agrinema Main Farm",
    address: "123 Farm Road, Rural District, Eastern Cape",
    coordinates: { lat: -33.0123, lng: 27.4567 },
   
    phone: "+27 83 123 4567",
    isActive: true,
    products: 2
  },
  {
    id: "loc-2", 
    name: "Agrinema North Farm",
    address: "456 Valley View, Northern District, Eastern Cape",
    coordinates: { lat: -32.8901, lng: 27.6789 },
   
    phone: "+27 84 567 8901",
    isActive: true,
    products: 1
  },
  {
    id: "loc-3",
    name: "Agrinema Coastal Farm", 
    address: "789 Coastal Road, Port Elizabeth, Eastern Cape",
    coordinates: { lat: -33.9608, lng: 25.6022 },

    phone: "+27 82 345 6789",
    isActive: true,
    products: 1
  }
]

export const sampleProducts: Product[] = [
  {
    slug: "fresh-tomatoes",
    title: "Fresh Tomatoes",
    category: "vegetables",
    price: "R 25.00/kg",
    availability: "In Stock",
    featured: true,
    image: "/tomato-hero.jpg",
    content: "Premium quality tomatoes grown with sustainable farming practices. Rich in vitamins and perfect for cooking.",
    location: sampleLocations[0],
    stock: 150,
    orders: 23,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    slug: "organic-onions",
    title: "Organic Onions",
    category: "vegetables", 
    price: "R 18.00/kg",
    availability: "In Stock",
    featured: false,
    image: "/onion.jpeg",
    content: "Certified organic onions with no pesticides. Perfect for cooking and salads.",
    location: sampleLocations[1],
    stock: 200,
    orders: 15,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z"
  },
  {
    slug: "farm-fresh-eggs",
    title: "Farm Fresh Eggs",
    category: "poultry",
    price: "R 35.00/dozen", 
    availability: "In Stock",
    featured: true,
    image: "/poultry1.jpg",
    content: "Free-range eggs from healthy, well-cared-for chickens. High in protein and nutrients.",
    location: sampleLocations[2],
    stock: 80,
    orders: 42,
    createdAt: "2024-01-12T07:30:00Z",
    updatedAt: "2024-01-21T11:15:00Z"
  },
  {
    slug: "premium-ice-blocks",
    title: "Premium Ice Blocks",
    category: "ice",
    price: "R 12.00/block",
    availability: "In Stock", 
    featured: false,
    image: "/iceblock3.jpg",
    content: "Crystal clear ice blocks perfect for cooling and preservation. Made with purified water.",
    location: sampleLocations[0],
    stock: 500,
    orders: 67,
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-20T13:20:00Z"
  }
]

export const sampleOrders: Order[] = [
  {
    id: "ORD-2024-001",
    productId: "fresh-tomatoes",
    customerName: "Nomsa Mbeki",
    customerPhone: "+27 81 234 5678",
    customerEmail: "nomsa.mbeki@email.com",
    quantity: 5,
    totalAmount: 125.00,
    status: "confirmed",
    location: sampleLocations[0],
    locationId: sampleLocations[0].id,
    orderDate: "2024-01-21T10:30:00Z",
    deliveryDate: "2024-01-23T14:00:00Z",
    notes: "Please deliver in the morning. Will pay cash on delivery."
  },
  {
    id: "ORD-2024-002",
    productId: "organic-onions", 
    customerName: "Thabo Molefe",
    customerPhone: "+27 82 345 6789",
    quantity: 10,
    totalAmount: 180.00,
    status: "preparing",
    location: sampleLocations[1],
    locationId: sampleLocations[1].id,
    orderDate: "2024-01-21T14:15:00Z",
    notes: "Urgent order for restaurant. Quality check required."
  },
  {
    id: "ORD-2024-003",
    productId: "farm-fresh-eggs",
    customerName: "Lindiwe Khumalo", 
    customerPhone: "+27 83 456 7890",
    customerEmail: "lindiwe.k@gmail.com",
    quantity: 3,
    totalAmount: 105.00,
    status: "ready",
    location: sampleLocations[2],
    locationId: sampleLocations[2].id,
    orderDate: "2024-01-20T16:45:00Z",
    deliveryDate: "2024-01-22T09:00:00Z"
  },
  {
    id: "ORD-2024-004",
    productId: "premium-ice-blocks",
    customerName: "Sipho Dlamini",
    customerPhone: "+27 84 567 8901", 
    quantity: 2,
    totalAmount: 70.00,
    status: "completed",
    location: sampleLocations[0],
    locationId: sampleLocations[0].id,
    orderDate: "2024-01-19T11:20:00Z",
    deliveryDate: "2024-01-21T15:30:00Z",
    notes: "Customer very satisfied with quality."
  },
  {
    id: "ORD-2024-005",
    productId: "fresh-tomatoes",
    customerName: "Zanele Ntuli",
    customerPhone: "+27 85 678 9012",
    quantity: 8,
    totalAmount: 200.00, 
    status: "pending",
    location: sampleLocations[1],
    locationId: sampleLocations[1].id,
    orderDate: "2024-01-21T17:00:00Z",
    notes: "New customer - verify contact details."
  },
  {
    id: "ORD-2024-006",
    productId: "organic-onions",
    customerName: "Mandla Zulu",
    customerPhone: "+27 86 789 0123",
    customerEmail: "mandla.zulu@business.co.za",
    quantity: 15,
    totalAmount: 375.00,
    status: "cancelled", 
    location: sampleLocations[2],
    locationId: sampleLocations[2].id,
    orderDate: "2024-01-18T13:10:00Z",
    notes: "Customer cancelled due to change in requirements."
  }
]

export const sampleAnalytics: Analytics = {
  totalRevenue: 1055.00,
  totalOrders: 6,
  totalProducts: 4,
  totalLocations: 3,
  ordersToday: 2,
  revenueToday: 325.00,
  topProducts: [
    { product: sampleProducts[3], orders: 67, revenue: 804.00 },
    { product: sampleProducts[2], orders: 42, revenue: 1470.00 },
    { product: sampleProducts[0], orders: 23, revenue: 575.00 },
    { product: sampleProducts[1], orders: 15, revenue: 270.00 }
  ],
  ordersByLocation: [
    { location: sampleLocations[0], orders: 3, revenue: 499.00 },
    { location: sampleLocations[1], orders: 2, revenue: 380.00 },
    { location: sampleLocations[2], orders: 1, revenue: 105.00 }
  ],
  ordersByStatus: [
    { status: "pending", count: 1 },
    { status: "confirmed", count: 1 },
    { status: "preparing", count: 1 },
    { status: "ready", count: 1 },
    { status: "completed", count: 1 },
    { status: "cancelled", count: 1 }
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 1055.00 },
    { month: "Dec", revenue: 2240.00 },
    { month: "Nov", revenue: 1890.00 },
    { month: "Oct", revenue: 2100.00 },
    { month: "Sep", revenue: 1750.00 },
    { month: "Aug", revenue: 2380.00 }
  ]
}
