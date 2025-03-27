import { createApiHooks, useApiQuery, useSuspenseApiQuery } from '../hooks'
import {
  categoriesService,
  CreateCategoryDTO,
} from '../services/categories.service'
import { Category } from '../types'

// 创建常用的分类相关钩子
export const {
  useGetAll: useGetAllCategories,
  useGetById: useGetCategoryById,
  useCreate: useCreateCategory,
  useUpdate: useUpdateCategory,
  useDelete: useDeleteCategory,
  useSuspenseGetAll: useSuspenseCategories,
  useSuspenseGetById: useSuspenseCategoryDetail,
} = createApiHooks<Category, CreateCategoryDTO>('categories', categoriesService)

// 获取带有产品数量的分类钩子
export function useCategoriesWithProductCount() {
  return useApiQuery<Category[]>(['categories', 'with-product-count'], () =>
    categoriesService.getCategoriesWithProductCount()
  )
}

// Suspense 支持的带产品数量的分类钩子
export function useSuspenseCategoriesWithProductCount() {
  return useSuspenseApiQuery<Category[]>(
    ['categories', 'with-product-count'],
    () => categoriesService.getCategoriesWithProductCount()
  )
}

// 获取热门分类钩子
export function usePopularCategories() {
  return useApiQuery<Category[]>(['categories', 'popular'], () =>
    categoriesService.getPopularCategories()
  )
}

// Suspense 支持的热门分类钩子
export function useSuspensePopularCategories() {
  return useSuspenseApiQuery<Category[]>(['categories', 'popular'], () =>
    categoriesService.getPopularCategories()
  )
}
