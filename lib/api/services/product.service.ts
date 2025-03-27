import axios from '../axios'

// 产品接口类型
export interface Product {
  id: number
  title: string
  price: string | number
  image: string
  expiry?: string
  manufacturer?: string
  description?: string
  category_id?: number
  stock?: number
  created_at?: string
  updated_at?: string
}

// 产品列表查询参数
export interface ProductQueryParams {
  page?: number
  limit?: number
  category_id?: number
  sort?: string
  order?: 'asc' | 'desc'
  keyword?: string
}

// 产品服务类
class ProductService {
  // 获取产品列表
  async getProducts(params?: ProductQueryParams) {
    try {
      const response = await axios.get('/api/v1/no-auth/platform-config', {
        params,
      })
      return response
    } catch (error) {
      console.error('获取产品列表失败:', error)
      throw error
    }
  }

  // 获取热门产品
  async getHotProducts() {
    try {
      const response = await axios.get('/api/v1/no-auth/platform-config')
      return response
    } catch (error) {
      console.error('获取热门产品失败:', error)
      throw error
    }
  }

  // 获取新品
  async getNewProducts() {
    try {
      const response = await axios.get('/api/v1/no-auth/platform-config')
      return response
    } catch (error) {
      console.error('获取新品失败:', error)
      throw error
    }
  }

  // 获取产品详情
  async getProductDetail(id: number) {
    try {
      const response = await axios.get(`/api/v1/no-auth/platform-config`)
      return response
    } catch (error) {
      console.error(`获取产品ID=${id}详情失败:`, error)
      throw error
    }
  }
}

// 导出产品服务实例
export const productService = new ProductService()
