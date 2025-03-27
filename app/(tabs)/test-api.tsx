import React from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Stack } from 'expo-router'
import { useHotProducts } from '@/lib/api'

export default function ApiTestScreen() {
  const { data, isLoading, error } = useHotProducts()

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Stack.Screen options={{ title: 'API测试' }} />

      <View className="mb-6">
        <Text className="text-2xl font-bold mb-4">API 调用测试</Text>
        <Text className="mb-4">
          测试接口:{' '}
          <Text className="font-bold">/api/v1/no-auth/platform-config</Text>
        </Text>
        <Text className="mb-4">
          基础URL:{' '}
          <Text className="font-bold">
            https://b2b-test.shanshu.work/b2b-config
          </Text>
        </Text>

        <View className="bg-white p-4 rounded-lg">
          <Text className="text-lg font-bold mb-4">API响应状态:</Text>

          {isLoading && (
            <View className="items-center py-10">
              <ActivityIndicator size="large" color="#FF4D00" />
              <Text className="mt-4 text-center text-gray-500">
                正在加载数据...
              </Text>
            </View>
          )}

          {error && (
            <View className="py-4">
              <Text className="text-red-500 font-bold">错误:</Text>
              <Text className="text-red-500 mt-2">
                {(error as Error).message}
              </Text>
            </View>
          )}

          {!isLoading && !error && (
            <View>
              <Text className="text-green-600 font-bold mb-4">✓ 连接成功!</Text>

              <Text className="font-bold">响应数据:</Text>
              <View className="mt-2 p-3 bg-gray-100 rounded">
                <Text className="font-mono">
                  {JSON.stringify(data, null, 2)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
