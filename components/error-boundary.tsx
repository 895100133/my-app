import React from 'react'

type ErrorBoundaryProps = {
  children: React.ReactNode
  FallbackComponent: React.ComponentType<{
    error: Error
    resetErrorBoundary: () => void
  }>
  onReset?: () => void
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新 state，下次渲染时显示错误 UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 可以在这里记录错误信息，例如发送到错误跟踪服务
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  resetErrorBoundary = (): void => {
    const { onReset } = this.props
    onReset?.()
    this.setState({ hasError: false, error: null })
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state
    const { children, FallbackComponent } = this.props

    if (hasError && error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return children
  }
}
