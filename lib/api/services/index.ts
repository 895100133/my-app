// 导出所有服务
export * from './products.service'
export * from './categories.service'

// 随着项目扩展，这里可以添加更多服务导出:
// export * from './users.service'
// export * from './orders.service'
// 等等

import { productService } from './product.service'

export { productService }
