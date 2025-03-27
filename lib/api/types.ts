// 通用API响应类型
export interface ApiResponse<T> {
  data: T
  message?: string
  code?: string
  status: number
}

// 分页接口的通用类型
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

// 通用查询参数类型
export interface QueryParams {
  page?: number
  perPage?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  [key: string]: string | number | boolean | undefined
}

// 基础模型接口
export interface BaseModel {
  id: string | number
  createdAt?: string
  updatedAt?: string
}

// 药品相关类型
export interface Product extends BaseModel {
  title: string
  price: string
  image: string
  description?: string
  category?: string
  tags?: string[]
  manufacturer: string
  expiry: string
  inStock: boolean
  rating?: number
}

// 分类相关类型
export interface Category extends BaseModel {
  name: string
  icon: string
  type?: 'material' | 'fontawesome'
  productCount?: number
}

// 用户相关类型
export interface User extends BaseModel {
  username: string
  email: string
  avatar?: string
  phone?: string
  role: 'user' | 'admin'
  company?: string
}

// 订单状态
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

// 订单项
export interface OrderItem {
  productId: string | number
  title: string
  price: string
  quantity: number
  total: string
}

// 订单相关类型
export interface Order extends BaseModel {
  orderNumber: string
  items: OrderItem[]
  totalAmount: string
  status: OrderStatus
  paymentMethod: string
  shippingAddress: string
  userId: string | number
  notes?: string
}
