import type { ComponentType } from 'react'
import { cssInterop } from 'nativewind'

/**
 * 为 @expo/vector-icons 图标添加 className 支持
 * @param icon Expo vector icon 组件
 */
export function iconWithClassName(icon: ComponentType<any>) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
        fontSize: 'size',
      },
    },
  })
}
