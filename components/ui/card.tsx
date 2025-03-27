import * as React from 'react'
import { View, ViewProps } from 'react-native'
import { cn } from '@/lib/utils'

interface CardProps extends ViewProps {
  className?: string
}

const Card = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-card p-4 shadow-sm',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card }
