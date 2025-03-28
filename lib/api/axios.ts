import axios from 'axios'
import { Platform } from 'react-native'

// 开发环境标志
const isDevelopment = process.env.NODE_ENV === 'development' || __DEV__

// 检测是否为Android模拟器
const isAndroidEmulator = Platform.OS === 'android' && isDevelopment

// 根据环境选择baseURL
// 在Android模拟器上需要使用10.0.2.2或172.17.0.1来访问宿主机
// 10.0.2.2是Android模拟器中访问宿主机localhost的专用IP
let API_URL = 'https://b2b-test.shanshu.work'

if (isDevelopment) {
  if (isAndroidEmulator) {
    // Android模拟器使用10.0.2.2访问宿主机
    // 假设Metro服务器运行在8081端口
    API_URL = 'http://10.0.2.2:8081/b2b-config'
    console.log('检测到Android模拟器环境，使用地址:', API_URL)
  } else {
    // 其他开发环境
    API_URL = '' // 使用空字符串作为基础URL
  }
}

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 增加请求超时时间
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 打印请求信息，便于调试
    if (isDevelopment) {
      console.log(
        `请求: ${config.method?.toUpperCase()} ${config.url}`,
        config.params || config.data || ''
      )
      console.log('完整请求URL:', `${API_URL}${config.url}`)
    }
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
    console.error('请求配置错误:', error)
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
    // 网络错误的详细处理
    if (error.message === 'Network Error') {
      console.error('网络连接错误，请检查:')
      console.error('- 网络连接是否正常')
      console.error('- API服务器是否可访问')
      console.error('- 开发环境下Metro服务器是否正确代理请求')

      // 在开发环境提供更多诊断信息
      if (isDevelopment) {
        console.error('当前环境:', Platform.OS)
        console.error('是否为模拟器:', isAndroidEmulator)
        console.error('API_URL:', API_URL)
        console.error('请求配置:', error.config)

        if (isAndroidEmulator) {
          console.error(`
Android模拟器网络问题排查:
1. 确认Metro服务器是否运行在8081端口
2. 尝试在模拟器浏览器中访问 http://10.0.2.2:8081 测试连通性
3. 检查应用是否有网络权限 (AndroidManifest.xml中的INTERNET权限)
4. 如果使用自签名证书，需要在应用中配置信任
5. 尝试将API_URL修改为 http://10.0.2.2:8081 或 http://172.17.0.1:8081`)
        }
      }
    }

    // 超时错误处理
    else if (
      error.code === 'ECONNABORTED' &&
      error.message.includes('timeout')
    ) {
      console.error('请求超时，请检查API服务器响应时间')
    }

    // 处理401错误（未授权），可能是token过期
    else if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true

      try {
        // 尝试刷新token的逻辑
        // const refreshToken = await AsyncStorage.getItem('refreshToken')
        // const response = await axios.post('...', { refreshToken })
        // const { token } = response.data
        // await AsyncStorage.setItem('token', token)
        // 使用新token重试原请求
        // error.config.headers.Authorization = `Bearer ${token}`
        // return axiosInstance(error.config)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (refreshError) {
        // token刷新失败，可能需要重新登录
        // await AsyncStorage.removeItem('token')
        // 重定向到登录页或通知用户
        console.error('身份验证失败，请重新登录')
      }
    }

    // 其他类型的错误
    else if (error.response) {
      // 服务器响应了，但状态码不是2xx
      console.error(
        `服务器响应错误: ${error.response.status}`,
        error.response.data
      )
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
