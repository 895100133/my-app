import axios, { AxiosError } from 'axios'

// API错误类型
export type ApiError = {
  status: number
  message: string
  code?: string
  details?: Record<string, unknown>
}

// 将Axios错误转换为标准化的API错误
export function handleApiError(error: unknown): ApiError {
  // Axios错误
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<Record<string, unknown>>

    // 服务器返回的错误
    if (axiosError.response) {
      return {
        status: axiosError.response.status,
        message: (axiosError.response.data?.message as string) || '服务器错误',
        code: axiosError.response.data?.code as string | undefined,
        details: axiosError.response.data?.details as
          | Record<string, unknown>
          | undefined,
      }
    }

    // 请求超时
    if (axiosError.code === 'ECONNABORTED') {
      return {
        status: 408,
        message: '请求超时，请检查网络连接',
      }
    }

    // 网络错误
    if (axiosError.message.includes('Network Error')) {
      return {
        status: 0,
        message: '网络错误，请检查网络连接',
      }
    }

    // 其他Axios错误
    return {
      status: 500,
      message: axiosError.message || '未知错误',
    }
  }

  // 非Axios错误
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message || '应用错误',
    }
  }

  // 未知错误
  return {
    status: 500,
    message: '未知错误',
  }
}

// 用于检查是否是业务逻辑错误(4xx)还是服务器/网络错误(5xx或网络问题)
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500
}

// 创建友好的错误消息
export function getFriendlyErrorMessage(error: ApiError): string {
  const statusMessages: Record<number, string> = {
    400: '请求参数有误',
    401: '未授权，请重新登录',
    403: '没有权限访问该资源',
    404: '请求的资源不存在',
    408: '请求超时，请稍后再试',
    409: '资源冲突，请稍后再试',
    422: '提交的数据无效',
    429: '请求过于频繁，请稍后再试',
    500: '服务器错误，请稍后再试',
    502: '网关错误，请稍后再试',
    503: '服务暂时不可用，请稍后再试',
    504: '网关超时，请稍后再试',
  }

  // 返回状态码对应的友好消息，如果没有预设消息则返回原始错误信息
  return statusMessages[error.status] || error.message
}
