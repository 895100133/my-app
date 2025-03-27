import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import { ApiError, handleApiError, getFriendlyErrorMessage } from './error'
import { ApiResponse, PaginatedResponse, QueryParams } from './types'
import { Alert } from 'react-native'

// 统一处理API错误的钩子选项类型
type UseApiOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
> & {
  // 是否自动显示错误提示
  showErrorToast?: boolean
}

// 查询钩子封装
export function useApiQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<ApiResponse<TData>>,
  options?: UseApiOptions<TData, ApiError>
) {
  const { showErrorToast = true, ...restOptions } = options || {}

  return useQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await queryFn()
        return response.data
      } catch (error) {
        const apiError = handleApiError(error)

        // 如果配置了自动显示错误提示
        if (showErrorToast) {
          const errorMessage = getFriendlyErrorMessage(apiError)
          Alert.alert('错误', errorMessage)
        }

        throw apiError
      }
    },
    ...restOptions,
  })
}

// 分页查询钩子封装
export function usePaginatedQuery<TData>(
  queryKey: QueryKey,
  queryFn: (params: QueryParams) => Promise<PaginatedResponse<TData>>,
  params: QueryParams = {},
  options?: UseApiOptions<PaginatedResponse<TData>, ApiError>
) {
  const { showErrorToast = true, ...restOptions } = options || {}

  return useQuery<PaginatedResponse<TData>, ApiError>({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      try {
        return await queryFn(params)
      } catch (error) {
        const apiError = handleApiError(error)

        if (showErrorToast) {
          const errorMessage = getFriendlyErrorMessage(apiError)
          Alert.alert('错误', errorMessage)
        }

        throw apiError
      }
    },
    ...restOptions,
  })
}

// 统一处理突变的钩子选项类型
type UseApiMutationOptions<TData, TVariables, TContext = unknown> = Omit<
  UseMutationOptions<TData, ApiError, TVariables, TContext>,
  'mutationFn'
> & {
  // 是否自动显示错误提示
  showErrorToast?: boolean
  // 是否自动显示成功提示
  showSuccessToast?: boolean
  // 成功提示信息
  successMessage?: string
  // 突变成功后需要自动失效的查询键
  invalidateQueries?: QueryKey[]
}

// 突变钩子封装
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: UseApiMutationOptions<TData, TVariables>
) {
  const {
    showErrorToast = true,
    showSuccessToast = true,
    successMessage = '操作成功',
    invalidateQueries,
    ...restOptions
  } = options || {}

  const queryClient = useQueryClient()

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await mutationFn(variables)
        return response.data
      } catch (error) {
        const apiError = handleApiError(error)

        if (showErrorToast) {
          const errorMessage = getFriendlyErrorMessage(apiError)
          Alert.alert('错误', errorMessage)
        }

        throw apiError
      }
    },
    onSuccess: (data, variables, context) => {
      // 如果配置了成功后需要失效的查询
      if (invalidateQueries && invalidateQueries.length > 0) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }

      // 如果配置了自动显示成功提示
      if (showSuccessToast) {
        Alert.alert('成功', successMessage)
      }

      // 如果传入了原始的onSuccess回调，也执行它
      if (restOptions.onSuccess) {
        restOptions.onSuccess(data, variables, context)
      }
    },
    ...restOptions,
  })
}

// Suspense 支持的查询钩子封装
export function useSuspenseApiQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<ApiResponse<TData>>,
  options?: Omit<
    UseSuspenseQueryOptions<TData, ApiError, TData, QueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  return useSuspenseQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await queryFn()
        return response.data
      } catch (error) {
        const apiError = handleApiError(error)
        throw apiError
      }
    },
    ...options,
  })
}

// Suspense 支持的分页查询钩子
export function useSuspensePaginatedQuery<TData>(
  queryKey: QueryKey,
  queryFn: (params: QueryParams) => Promise<PaginatedResponse<TData>>,
  params: QueryParams = {},
  options?: Omit<
    UseSuspenseQueryOptions<
      PaginatedResponse<TData>,
      ApiError,
      PaginatedResponse<TData>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useSuspenseQuery<PaginatedResponse<TData>, ApiError>({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      try {
        return await queryFn(params)
      } catch (error) {
        const apiError = handleApiError(error)
        throw apiError
      }
    },
    ...options,
  })
}

// 自定义hooks包装器
export const createApiHooks = <
  T,
  CreateDTO = Partial<T>,
  UpdateDTO = Partial<T>,
>(
  serviceName: string,
  service: {
    getAll: (params?: QueryParams) => Promise<ApiResponse<T[]>>
    getById: (id: string | number) => Promise<ApiResponse<T>>
    create: (data: CreateDTO) => Promise<ApiResponse<T>>
    update: (id: string | number, data: UpdateDTO) => Promise<ApiResponse<T>>
    delete: (id: string | number) => Promise<ApiResponse<void>>
  }
) => {
  // 获取列表hook
  const useGetAll = (
    params?: QueryParams,
    options?: UseApiOptions<T[], ApiError>
  ) => {
    return useApiQuery<T[]>(
      [serviceName, 'list', params],
      () => service.getAll(params),
      options
    )
  }

  // 获取单条数据hook
  const useGetById = (
    id: string | number,
    options?: UseApiOptions<T, ApiError>
  ) => {
    return useApiQuery<T>(
      [serviceName, 'detail', id],
      () => service.getById(id),
      {
        enabled: !!id,
        ...options,
      }
    )
  }

  // 创建数据hook
  const useCreate = (options?: UseApiMutationOptions<T, CreateDTO>) => {
    return useApiMutation<T, CreateDTO>((data) => service.create(data), {
      successMessage: '创建成功',
      invalidateQueries: [[serviceName, 'list']],
      ...options,
    })
  }

  // 更新数据hook
  const useUpdate = (
    options?: UseApiMutationOptions<T, { id: string | number; data: UpdateDTO }>
  ) => {
    return useApiMutation<T, { id: string | number; data: UpdateDTO }>(
      ({ id, data }) => service.update(id, data),
      {
        successMessage: '更新成功',
        invalidateQueries: [
          [serviceName, 'list'],
          [serviceName, 'detail'],
        ],
        ...options,
      }
    )
  }

  // 删除数据hook
  const useDelete = (
    options?: UseApiMutationOptions<void, string | number>
  ) => {
    return useApiMutation<void, string | number>((id) => service.delete(id), {
      successMessage: '删除成功',
      invalidateQueries: [[serviceName, 'list']],
      ...options,
    })
  }

  // Suspense 支持的获取列表钩子
  const useSuspenseGetAll = (
    params?: QueryParams,
    options?: Omit<
      UseSuspenseQueryOptions<T[], ApiError, T[], QueryKey>,
      'queryKey' | 'queryFn'
    >
  ) => {
    return useSuspenseApiQuery<T[]>(
      [serviceName, 'list', params],
      () => service.getAll(params),
      options
    )
  }

  // Suspense 支持的获取详情钩子
  const useSuspenseGetById = (
    id: string | number,
    options?: Omit<
      UseSuspenseQueryOptions<T, ApiError, T, QueryKey>,
      'queryKey' | 'queryFn'
    >
  ) => {
    return useSuspenseApiQuery<T>(
      [serviceName, 'detail', id],
      () => service.getById(id),
      options
    )
  }

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useSuspenseGetAll,
    useSuspenseGetById,
  }
}
