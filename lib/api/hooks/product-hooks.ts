import { createApiHooks, useApiQuery, useSuspenseApiQuery } from '../hooks'
import { productsService, CreateProductDTO } from '../services/products.service'
import { Product } from '../types'
import { useQuery } from '@tanstack/react-query'
import { productService, ProductQueryParams } from '../services/product.service'

// 创建常用的产品相关钩子
export const {
  useGetAll: useGetAllProducts,
  useGetById: useGetProductById,
  useCreate: useCreateProduct,
  useUpdate: useUpdateProduct,
  useDelete: useDeleteProduct,
  useSuspenseGetAll: useSuspenseProducts,
  useSuspenseGetById: useSuspenseProductDetail,
} = createApiHooks<Product, CreateProductDTO>('products', productsService)

// 查询键前缀
const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductQueryParams) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

// 获取产品列表
export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => productService.getProducts(params),
  })
}

// 获取热门产品
export function useHotProducts() {
  return useQuery({
    queryKey: [...productKeys.lists(), 'hot'],
    queryFn: () => productService.getHotProducts(),
  })
}

// 获取新品
export function useNewProducts() {
  return useQuery({
    queryKey: [...productKeys.lists(), 'new'],
    queryFn: () => productService.getNewProducts(),
  })
}

// 获取产品详情
export function useProductDetail(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductDetail(id),
    enabled: !!id, // 只有当id存在时才发起请求
  })
}

// 根据分类获取产品钩子
export function useProductsByCategory(categoryId?: string | number) {
  return useApiQuery<Product[]>(
    ['products', 'category', categoryId],
    () => productsService.getByCategory(categoryId as string | number),
    {
      enabled: !!categoryId,
    }
  )
}

// Suspense 支持的分类产品钩子
export function useSuspenseProductsByCategory(categoryId: string | number) {
  return useSuspenseApiQuery<Product[]>(
    ['products', 'category', categoryId],
    () => productsService.getByCategory(categoryId)
  )
}

// 搜索产品钩子
export function useSearchProducts(keyword: string) {
  return useApiQuery<Product[]>(
    ['products', 'search', keyword],
    () => productsService.searchProducts(keyword),
    {
      enabled: !!keyword && keyword.length > 1,
    }
  )
}
