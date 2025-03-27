import axios from 'axios'

// 开发环境标志
const isDevelopment = process.env.NODE_ENV === 'development' || __DEV__

// 根据环境选择baseURL
// 在开发环境中使用相对路径，让请求通过Metro代理
const API_URL = isDevelopment
  ? '/b2b-config' // 使用相对路径，这样请求会首先发送到Metro服务器
  : 'https://b2b-test.shanshu.work/b2b-config'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么
    // 例如：从AsyncStorage获取token并添加到请求头
    // const token = await AsyncStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  async (error) => {
    // 对响应错误做点什么
    const originalRequest = error.config

    // 处理401错误（未授权），可能是token过期
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 尝试刷新token的逻辑
        // const refreshToken = await AsyncStorage.getItem('refreshToken')
        // const response = await axios.post('...', { refreshToken })
        // const { token } = response.data
        // await AsyncStorage.setItem('token', token)
        // 使用新token重试原请求
        // originalRequest.headers.Authorization = `Bearer ${token}`
        // return axiosInstance(originalRequest)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // token刷新失败，可能需要重新登录
        // await AsyncStorage.removeItem('token')
        // 重定向到登录页或通知用户
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
