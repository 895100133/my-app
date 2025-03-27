import {
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { View } from '@/components/Themed'
import { Text } from '@/components/ui/text'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useHotProducts } from '@/lib/api'

// 商品分类数据
const categories = [
  { icon: 'pills', type: 'fontawesome', label: '饮片专区1' },
  { icon: 'bolt', type: 'fontawesome', label: '秒杀' },
  { icon: 'heartbeat', type: 'fontawesome', label: '五和专区' },
  { icon: 'industry', type: 'fontawesome', label: '工业精品' },
  { icon: 'chart-line', type: 'fontawesome', label: '控销专区' },
]

// 商品数据
const localProducts = [
  {
    id: 1,
    title: '【未知品牌】保和丸*10丸/盒×120盒/件*五和中药饮片',
    price: '6.**',
    image:
      'https://img.alicdn.com/imgextra/i1/O1CN01K2D8R71O7xOHeJAkU_!!6000000001661-0-tps-350-350.jpg',
    expiry: '有效期至：2027-12-16',
    manufacturer: '山西振东五和堂制药有限公司',
  },
  {
    id: 2,
    title: '【6542针】硝苯地平缓释片（Ⅰ）*10mg×72片*德药',
    price: '2*.**',
    image:
      'https://img.alicdn.com/imgextra/i2/O1CN01NRSQjV1VF0XGUwLME_!!6000000002624-0-tps-350-350.jpg',
    expiry: '有效期至：2026-12-01',
    manufacturer: '德州德药制药有限公司',
  },
]

// 添加平台配置接口类型定义
interface PlatformProduct {
  id: number | string
  title?: string
  name?: string
  price?: string | number
  image?: string
  expiry?: string
  manufacturer?: string
  [key: string]: unknown
}

interface PlatformConfig {
  products?: PlatformProduct[]
  [key: string]: unknown
}

// 分类图标组件
const CategoryIcon = ({
  icon,
  type = 'material',
  label,
}: {
  icon: string
  type?: 'material' | 'fontawesome'
  label: string
}) => (
  <TouchableOpacity activeOpacity={0.7} className="items-center flex-1">
    <View className="bg-white rounded-full w-14 h-14 items-center justify-center mb-2">
      {type === 'material' ? (
        <MaterialIcons
          name={icon as unknown as keyof typeof MaterialIcons.glyphMap}
          size={30}
          color="#FF4D00"
        />
      ) : (
        <FontAwesome5 name={icon} size={24} color="#FF4D00" />
      )}
    </View>
    <Text className="text-sm">{label}</Text>
  </TouchableOpacity>
)

// 商品卡片组件
const ProductCard = ({
  title,
  price,
  image,
  expiry,
  manufacturer,
}: {
  title: string
  price: string | number
  image: string
  expiry?: string
  manufacturer?: string
}) => (
  <View className="w-[48%] mb-3 bg-white rounded-lg overflow-hidden">
    <Image
      source={{ uri: image }}
      className="w-full h-40"
      resizeMode="contain"
    />
    <View className="p-2">
      <Text className="text-sm font-medium mb-3" numberOfLines={2}>
        {title}
      </Text>
      {expiry && <Text className="text-xs text-gray-400 mb-1">{expiry}</Text>}
      {manufacturer && (
        <Text className="text-xs text-gray-400 mb-3">{manufacturer}</Text>
      )}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-sm text-[#FF4D00] font-bold">¥</Text>
          <Text className="text-xl text-[#FF4D00] font-bold">{price}</Text>
        </View>
        <TouchableOpacity className="bg-[#FF4D00] w-10 h-10 rounded-full items-center justify-center">
          <MaterialIcons name="shopping-cart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

// API数据展示区域
const ApiProductsSection = () => {
  const { data, isLoading, error } = useHotProducts()

  // 处理API数据，适应实际返回结构
  const platformConfig = (data || {}) as PlatformConfig
  const products = platformConfig.products || []

  if (isLoading) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="large" color="#FF4D00" />
        <Text className="mt-4 text-center text-gray-500">
          正在从 https://b2b-test.shanshu.work/b2b-config 加载数据...
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="py-10 items-center justify-center">
        <MaterialIcons name="error-outline" size={48} color="#FF4D00" />
        <Text className="mt-4 text-center text-red-500">
          加载失败: {(error as Error).message}
        </Text>
        <Text className="mt-2 text-center text-gray-500">
          API地址: /api/v1/no-auth/platform-config
        </Text>
      </View>
    )
  }

  if (!products || products.length === 0) {
    return (
      <View className="py-10 items-center justify-center">
        <Text className="text-center text-gray-500">暂无平台配置数据</Text>
        <Text className="mt-2 text-center text-gray-500">
          API地址: /api/v1/no-auth/platform-config
        </Text>
      </View>
    )
  }

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">平台配置数据</Text>
        <TouchableOpacity>
          <Text className="text-[#FF4D00]">查看更多</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {products.map((product: PlatformProduct) => (
          <ProductCard
            key={product.id}
            title={product.title || product.name || '未命名产品'}
            price={product.price || '0.00'}
            image={product.image || 'https://via.placeholder.com/350'}
            expiry={product.expiry}
            manufacturer={product.manufacturer}
          />
        ))}
      </View>
      <Text className="text-center text-gray-400 text-xs mt-2">
        数据来源: /api/v1/no-auth/platform-config
      </Text>
    </View>
  )
}

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* 头部 */}
      <View className="bg-[#FF4D00] px-4 pt-4 pb-2">
        <View className="flex-row justify-center mb-4">
          <Text className="text-white text-xl font-bold">振东医药平台</Text>
        </View>

        {/* 搜索栏 */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1 flex-row items-center bg-white/90 rounded-full px-3 py-2 mr-2">
            <MaterialIcons name="search" size={20} color="#999" />
            <Text className="ml-2 text-gray-400">搜索想要的商品</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 轮播图 */}
      <View>
        <Image
          source={{
            uri: 'https://img.alicdn.com/imgextra/i2/O1CN01j9MhYG29z9nZjPJR0_!!6000000008131-0-tps-750-400.jpg',
          }}
          className="w-full h-44"
          resizeMode="cover"
        />
        <View className="absolute bottom-2 w-full flex-row justify-center">
          <View className="flex-row bg-black/30 rounded-full px-2 py-1">
            <View className="w-2 h-2 rounded-full bg-white mr-1" />
            <View className="w-2 h-2 rounded-full bg-white/50 mr-1" />
            <View className="w-2 h-2 rounded-full bg-white/50" />
          </View>
        </View>
      </View>

      {/* 分类图标 */}
      <View className="bg-gray-100 px-4 py-6">
        <View className="flex-row justify-between">
          {categories.map((item, index) => (
            <CategoryIcon
              key={index}
              icon={item.icon}
              type={item.type as 'material' | 'fontawesome'}
              label={item.label}
            />
          ))}
        </View>
      </View>

      {/* API 数据展示区域 */}
      <View className="px-4">
        <ApiProductsSection />
      </View>

      {/* 促销横幅 */}
      <View className="mx-4 mb-4">
        <Image
          source={{
            uri: 'https://gw.alicdn.com/imgextra/i3/O1CN01iZTaxL1vhQoOLhN3c_!!6000000006205-0-tps-1125-320.jpg',
          }}
          className="w-full h-28 rounded-lg"
          resizeMode="cover"
        />
      </View>

      {/* 本地商品列表 */}
      <View className="px-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">本地静态商品</Text>
          <TouchableOpacity>
            <Text className="text-[#FF4D00]">查看更多</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap justify-between">
          {localProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              expiry={product.expiry}
              manufacturer={product.manufacturer}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
