import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { iconWithClassName } from './iconWithClassName'
import { ViewProps } from 'react-native'

// 创建一个简化的组件，不使用 forwardRef
const X = ({
  size,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof AntDesign>, 'name'> &
  ViewProps) => {
  return <AntDesign name="close" size={size} {...props} />
}

// 应用 className 支持
iconWithClassName(X)

export { X }
