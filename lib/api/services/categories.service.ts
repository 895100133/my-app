import { ApiService } from '../api-service'
import { Category } from '../types'

// 创建分类DTO
export interface CreateCategoryDTO {
  name: string
  icon: string
  type?: 'material' | 'fontawesome'
}

// 分类服务类
export class CategoriesService extends ApiService<Category, CreateCategoryDTO> {
  constructor() {
    super('/categories')
  }

  // 获取带有产品数量的分类
  async getCategoriesWithProductCount() {
    return this.customGet<Category[]>('with-product-count')
  }

  // 获取热门分类
  async getPopularCategories() {
    return this.customGet<Category[]>('popular')
  }
}

// 创建单例实例
export const categoriesService = new CategoriesService()
