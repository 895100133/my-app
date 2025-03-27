const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

// 添加Metro服务器配置
config.server = {
  ...config.server,
  // 配置代理中间件
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // 针对特定API路径的请求进行代理
      if (req.url.startsWith('/b2b-config/')) {
        // 创建代理请求
        const options = {
          hostname: 'b2b-test.shanshu.work',
          port: 443,
          path: req.url,
          method: req.method,
          headers: {
            ...req.headers,
            host: 'b2b-test.shanshu.work',
          },
        }

        // 创建安全的https请求
        const proxyReq = require('https').request(options, (proxyRes) => {
          // 复制响应头
          res.writeHead(proxyRes.statusCode, proxyRes.headers)
          // 将代理响应数据传递给原始响应
          proxyRes.pipe(res, { end: true })
        })

        // 处理代理请求错误
        proxyReq.on('error', (error) => {
          console.error('代理请求错误:', error)
          res.writeHead(500)
          res.end('代理请求失败: ' + error.message)
        })

        // 将原始请求体数据传递给代理请求
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
          req.pipe(proxyReq, { end: true })
        } else {
          proxyReq.end()
        }

        return // 不再继续处理中间件链
      }

      // 对于非API请求，继续正常处理
      return middleware(req, res, next)
    }
  },
}

module.exports = withNativeWind(config, { input: './global.css' })
