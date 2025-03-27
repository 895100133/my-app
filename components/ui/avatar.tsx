import * as React from 'react'
import { Image, View, ViewProps, ImageProps, Text } from 'react-native'
import { cn } from '@/lib/utils'

interface AvatarProps extends ViewProps {
  className?: string
}

interface AvatarImageProps extends ImageProps {
  className?: string
}

interface AvatarFallbackProps extends ViewProps {
  className?: string
  children?: React.ReactNode
}

const Avatar = React.forwardRef<View, AvatarProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  )
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
