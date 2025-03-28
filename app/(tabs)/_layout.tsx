import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable, TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: '#FF4D00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // 自定义tabBarButton，使用TouchableOpacity替代默认的Pressable，移除涟漪效果
        tabBarButton: (props) => {
          // 从props中提取需要的属性，忽略不兼容的属性
          const {
            children,
            style,
            onPress,
            onPressIn,
            onPressOut,
            onLongPress,
            accessibilityRole,
            accessibilityState,
            accessibilityLabel,
            disabled,
          } = props

          // 处理事件处理函数的null值
          const handlePress = onPress === null ? undefined : onPress
          const handlePressIn = onPressIn === null ? undefined : onPressIn
          const handlePressOut = onPressOut === null ? undefined : onPressOut
          const handleLongPress = onLongPress === null ? undefined : onLongPress

          return (
            <TouchableOpacity
              style={style}
              onPress={handlePress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onLongPress={handleLongPress}
              activeOpacity={1}
              accessibilityRole={accessibilityRole}
              accessibilityState={accessibilityState}
              accessibilityLabel={accessibilityLabel}
              disabled={disabled === null ? undefined : disabled}
            >
              {children}
            </TouchableOpacity>
          )
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="quick-order"
        options={{
          title: '快速下单',
          headerTitle: '快速下单',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
