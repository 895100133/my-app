import { ExpoConfig } from 'expo/config'

// 确定当前环境
const env = process.env.APP_ENV || 'development'
type EnvType = 'development' | 'staging' | 'production'
const currentEnv = (env as EnvType) || 'development'

// 环境配置
const envConfig = {
  development: {
    apiUrl: 'http://localhost:8080/api', // 开发环境API代理地址
  },
  staging: {
    apiUrl: 'https://staging-api.shanshu.work/b2b-config',
  },
  production: {
    apiUrl: 'https://b2b-test.shanshu.work/b2b-config',
  },
}

const config: ExpoConfig = {
  name: 'my-app',
  slug: 'my-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  sdkVersion: '52.0.0',
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  platforms: ['ios', 'android', 'web'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.mayongliang.myapp',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '74a80eb4-ef47-4a62-b59b-d482f3db6ca0',
    },
    // 添加API配置
    apiConfig: envConfig[currentEnv],
  },
}

export default config
