import axios from '../axios'
import { Platform } from 'react-native'

// 开发环境标志
const isDevelopment = process.env.NODE_ENV === 'development' || __DEV__
// 检测是否为Android模拟器
const isAndroidEmulator = Platform.OS === 'android' && isDevelopment

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

// API响应类型
export interface ApiResponse<T = unknown> {
  data: T
  status: string
  message?: string
}

// 产品服务类
class ProductService {
  // 最大重试次数
  private maxRetries = 2

  // API路径前缀，根据环境自动调整
  private apiPathPrefix = isAndroidEmulator ? '' : '/b2b-config'

  // 带重试机制的请求方法
  private async requestWithRetry<T>(
    url: string,
    options = {},
    retries = 0
  ): Promise<ApiResponse<T>> {
    // 根据运行环境调整API路径
    const adjustedUrl = isDevelopment ? `${this.apiPathPrefix}${url}` : url

    try {
      if (isDevelopment) {
        console.log('发送请求到:', adjustedUrl)
      }

      return await axios.get(adjustedUrl, options)
    } catch (error: unknown) {
      // 网络错误或超时时尝试重试
      if (
        error instanceof Error &&
        (error.message === 'Network Error' ||
          ('code' in error && error.code === 'ECONNABORTED')) &&
        retries < this.maxRetries
      ) {
        console.log(`请求失败，正在进行第${retries + 1}次重试...`)

        // Android模拟器特殊处理
        if (isAndroidEmulator && isDevelopment) {
          console.log('Android模拟器网络问题，请检查:')
          console.log('1. 模拟器是否已启用网络')
          console.log('2. 宿主机是否连接到网络')
          console.log('3. 应用是否有网络访问权限')
          console.log('4. 使用的URL是否正确')
          console.log('- 请求URL:', url)
          console.log('- 调整后URL:', adjustedUrl)
          console.log('- 请求选项:', JSON.stringify(options))

          // 为Android模拟器增加重试间隔
          const delay = Math.pow(2, retries) * 2000
          console.log(`等待${delay}毫秒后重试...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        } else {
          // 其他环境的重试间隔
          const delay = Math.pow(2, retries) * 1000
          console.log(`等待${delay}毫秒后重试...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }

        return this.requestWithRetry(url, options, retries + 1)
      }

      throw error
    }
  }

  // 获取产品列表
  async getProducts(
    params?: ProductQueryParams
  ): Promise<ApiResponse<Product[]>> {
    try {
      const response = await this.requestWithRetry<Product[]>(
        '/api/v1/no-auth/platform-config',
        {
          params,
        }
      )
      return response
    } catch (error) {
      console.error('获取产品列表失败:', error)
      throw error
    }
  }

  // 获取热门产品
  async getHotProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await this.requestWithRetry<Product[]>(
        '/api/v1/no-auth/platform-config'
      )
      return response
    } catch (error) {
      console.error('获取热门产品失败:', error)
      throw error
    }
  }

  // 获取新品
  async getNewProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await this.requestWithRetry<Product[]>(
        '/api/v1/no-auth/platform-config'
      )
      return response
    } catch (error) {
      console.error('获取新品失败:', error)
      throw error
    }
  }

  // 获取产品详情
  async getProductDetail(id: number): Promise<ApiResponse<Product>> {
    try {
      const response = await this.requestWithRetry<Product>(
        '/api/v1/no-auth/platform-config'
      )
      return response
    } catch (error) {
      console.error(`获取产品ID=${id}详情失败:`, error)
      throw error
    }
  }
}

// 导出产品服务实例
export const productService = new ProductService()
