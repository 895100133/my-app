import React, { Suspense } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import { Stack } from 'expo-router'
import { useSuspenseHotProducts, useSuspenseCategories } from '@/lib/api'
import { ErrorBoundary } from '@/components/error-boundary'

// 使用Suspense的热门产品组件
function HotProductsList() {
  // 这里不需要处理loading状态，由Suspense处理
  const { data: products } = useSuspenseHotProducts()

  return (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-sm">
      <Text className="text-lg font-bold mb-2">热门产品</Text>

      {products?.length === 0 ? (
        <Text className="text-gray-500">暂无热门产品</Text>
      ) : (
        products?.map((product) => (
          <View key={product.id} className="mb-2 p-2 border-b border-gray-200">
            <Text className="font-medium">{product.title}</Text>
            <Text className="text-[#FF4D00]">¥{product.price}</Text>
          </View>
        ))
      )}
    </View>
  )
}

// 使用Suspense的分类列表组件
function CategoriesList() {
  // 这里不需要处理loading状态，由Suspense处理
  const { data: categories } = useSuspenseCategories()

  return (
    <View className="p-4 bg-white rounded-lg shadow-sm">
      <Text className="text-lg font-bold mb-2">分类列表</Text>

      {categories?.length === 0 ? (
        <Text className="text-gray-500">暂无分类数据</Text>
      ) : (
        categories?.map((category) => (
          <View key={category.id} className="mb-2 p-2 border-b border-gray-200">
            <Text className="font-medium">{category.name}</Text>
            <Text className="text-gray-500">
              {category.productCount || 0} 个产品
            </Text>
          </View>
        ))
      )}
    </View>
  )
}

// 加载中显示的组件
function LoadingFallback() {
  return (
    <View className="h-32 items-center justify-center bg-white rounded-lg shadow-sm mb-4">
      <ActivityIndicator size="large" color="#FF4D00" />
      <Text className="mt-2 text-gray-500">加载中...</Text>
    </View>
  )
}

// 错误发生时显示的组件
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <View className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <Text className="text-lg font-bold text-red-500 mb-2">出错了</Text>
      <Text className="text-center mb-4">{error.message}</Text>
      <Pressable
        className="p-3 bg-[#FF4D00] rounded-lg items-center"
        onPress={resetErrorBoundary}
      >
        <Text className="text-white font-medium">重试</Text>
      </Pressable>
    </View>
  )
}

// 示例页面
export default function SuspenseDemoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: 'Suspense 示例' }} />

      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">React Suspense 示例</Text>

        {/* 热门产品 - 使用Suspense包裹 */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <HotProductsList />
          </Suspense>
        </ErrorBoundary>

        {/* 分类列表 - 使用Suspense包裹 */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <CategoriesList />
          </Suspense>
        </ErrorBoundary>
      </View>
    </ScrollView>
  )
}
