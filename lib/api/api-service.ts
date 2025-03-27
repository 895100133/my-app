import axios from './axios'
import { handleApiError } from './error'
import { ApiResponse, PaginatedResponse, QueryParams } from './types'

// 辅助类型，用于安全类型转换
type SafeApiResponse<T> = {
  data: T
  status: number
  message?: string
  code?: string
}

// 通用API服务基类，提供基础CRUD操作
export class ApiService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  // 获取列表
  async getAll(params?: QueryParams): Promise<ApiResponse<T[]>> {
    try {
      const response = await axios.get<SafeApiResponse<T[]>>(this.endpoint, {
        params,
      })
      return response as unknown as ApiResponse<T[]>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 获取分页数据
  async getPaginated(params?: QueryParams): Promise<PaginatedResponse<T>> {
    try {
      const response = await axios.get<SafeApiResponse<PaginatedResponse<T>>>(
        this.endpoint,
        {
          params,
        }
      )
      return response.data as unknown as PaginatedResponse<T>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 根据ID获取单条数据
  async getById(id: string | number): Promise<ApiResponse<T>> {
    try {
      const response = await axios.get<SafeApiResponse<T>>(
        `${this.endpoint}/${id}`
      )
      return response as unknown as ApiResponse<T>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 创建数据
  async create(data: CreateDTO): Promise<ApiResponse<T>> {
    try {
      const response = await axios.post<SafeApiResponse<T>>(this.endpoint, data)
      return response as unknown as ApiResponse<T>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 更新数据
  async update(id: string | number, data: UpdateDTO): Promise<ApiResponse<T>> {
    try {
      const response = await axios.put<SafeApiResponse<T>>(
        `${this.endpoint}/${id}`,
        data
      )
      return response as unknown as ApiResponse<T>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 局部更新数据
  async patch(
    id: string | number,
    data: Partial<UpdateDTO>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axios.patch<SafeApiResponse<T>>(
        `${this.endpoint}/${id}`,
        data
      )
      return response as unknown as ApiResponse<T>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 删除数据
  async delete(id: string | number): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete<SafeApiResponse<void>>(
        `${this.endpoint}/${id}`
      )
      return response as unknown as ApiResponse<void>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 批量删除
  async bulkDelete(ids: (string | number)[]): Promise<ApiResponse<void>> {
    try {
      const response = await axios.delete<SafeApiResponse<void>>(
        this.endpoint,
        {
          data: { ids },
        }
      )
      return response as unknown as ApiResponse<void>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 自定义POST请求
  async customPost<R>(url: string, data: unknown): Promise<ApiResponse<R>> {
    try {
      const response = await axios.post<SafeApiResponse<R>>(
        `${this.endpoint}/${url}`,
        data
      )
      return response as unknown as ApiResponse<R>
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // 自定义GET请求
  async customGet<R>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<ApiResponse<R>> {
    try {
      const response = await axios.get<SafeApiResponse<R>>(
        `${this.endpoint}/${url}`,
        { params }
      )
      return response as unknown as ApiResponse<R>
    } catch (error) {
      throw handleApiError(error)
    }
  }
}
