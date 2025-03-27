import { ApiService } from '../api-service'
import { Product } from '../types'

// 创建产品DTO
export interface CreateProductDTO {
  title: string
  price: string
  image: string
  description?: string
  category?: string
  tags?: string[]
  manufacturer: string
  expiry: string
  inStock: boolean
}

// 产品服务类
export class ProductsService extends ApiService<Product, CreateProductDTO> {
  constructor() {
    super('/products')
  }

  // 根据分类获取产品
  async getByCategory(categoryId: string | number) {
    return this.customGet<Product[]>(`category/${categoryId}`)
  }

  // 获取热门产品
  async getHotProducts() {
    return this.customGet<Product[]>('hot')
  }

  // 获取新品
  async getNewProducts() {
    return this.customGet<Product[]>('new')
  }

  // 搜索产品
  async searchProducts(keyword: string) {
    return this.customGet<Product[]>('search', { keyword })
  }
}

// 创建单例实例
export const productsService = new ProductsService()
