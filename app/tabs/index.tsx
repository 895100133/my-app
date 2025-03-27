import { ScrollView } from 'react-native'
import { View } from '@/components/Themed'
import { Text } from '@/components/ui/text'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { MaterialIcons } from '@expo/vector-icons'

// 类型定义
type MenuItem = {
  icon: JSX.Element
  label: string
}

// 订单状态数据
const orderItems: MenuItem[] = [
  {
    icon: <MaterialIcons name="payment" size={24} color="#FF4D00" />,
    label: '待付款',
  },
  {
    icon: <MaterialIcons name="inventory" size={24} color="#FF4D00" />,
    label: '待发货',
  },
  {
    icon: <MaterialIcons name="local-shipping" size={24} color="#FF4D00" />,
    label: '待收货',
  },
  {
    icon: <MaterialIcons name="rate-review" size={24} color="#FF4D00" />,
    label: '待评价',
  },
  {
    icon: <MaterialIcons name="assignment-return" size={24} color="#FF4D00" />,
    label: '退款/售后',
  },
]

// 常用工具数据
const toolItems: MenuItem[] = [
  {
    icon: <MaterialIcons name="receipt" size={24} color="#FF9500" />,
    label: '发票管理',
  },
  {
    icon: <MaterialIcons name="location-on" size={24} color="#007AFF" />,
    label: '地址管理',
  },
  {
    icon: <MaterialIcons name="description" size={24} color="#007AFF" />,
    label: '药检报告',
  },
  {
    icon: <MaterialIcons name="local-offer" size={24} color="#FF4D00" />,
    label: '优惠券',
  },
  {
    icon: <MaterialIcons name="assignment" size={24} color="#FF9500" />,
    label: '代下单授权',
  },
  {
    icon: <MaterialIcons name="fact-check" size={24} color="#007AFF" />,
    label: '代下单协议',
  },
  {
    icon: <MaterialIcons name="settings" size={24} color="#007AFF" />,
    label: '设置',
  },
]

// 帮助中心数据
const helpItems: MenuItem[] = [
  {
    icon: <MaterialIcons name="store" size={24} color="#FF9500" />,
    label: '签约店铺',
  },
  {
    icon: <MaterialIcons name="menu-book" size={24} color="#007AFF" />,
    label: '新手引导',
  },
  {
    icon: <MaterialIcons name="headset-mic" size={24} color="#FF4D00" />,
    label: '客服',
  },
]

// 可复用的菜单项组件
const MenuItemComponent = ({ icon, label }: MenuItem) => (
  <View className="items-center">
    {icon}
    <Text className="text-sm mt-1">{label}</Text>
  </View>
)

// 可复用的卡片标题组件
const CardTitle = ({
  title,
  showMore = false,
}: {
  title: string
  showMore?: boolean
}) => (
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-lg font-bold">{title}</Text>
    {showMore && <Text className="text-gray-500 text-sm">查看全部</Text>}
  </View>
)

// 头部用户信息组件
const UserHeader = () => (
  <View className="p-4 bg-[#FF4D00]">
    <View className="flex-row items-center gap-3">
      <Avatar className="h-12 w-12 border-2 border-white">
        <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
        <AvatarFallback>头像</AvatarFallback>
      </Avatar>
      <View className="bg-transparent">
        <Text className="text-xl font-bold text-white">好</Text>
        <Text className="text-sm text-white/90">
          武汉武水泰科智能科技有限公司
        </Text>
      </View>
    </View>

    <View className="flex-row justify-between mt-6">
      {['收藏', '足迹', '资质'].map((item, index) => (
        <Card key={index} className="flex-1 mx-2 bg-white/20 border-0">
          <View className="items-center py-2">
            <Text className="text-white">{item}</Text>
            <Text className="text-sm text-white/90">
              {index === 0 ? '关注商品' : index === 1 ? '浏览记录' : '查看全部'}
            </Text>
          </View>
        </Card>
      ))}
    </View>
  </View>
)

export default function TabOneScreen() {
  return (
    <ScrollView className="flex-1 bg-[#FF4D00]">
      <UserHeader />

      <View className="flex-1 bg-gray-100 pt-4 rounded-t-3xl">
        {/* 订单状态 */}
        <Card className="mx-4 mb-4">
          <CardTitle title="我的订单" showMore />
          <View className="flex-row justify-between">
            {orderItems.map((item, index) => (
              <MenuItemComponent key={index} {...item} />
            ))}
          </View>
        </Card>

        {/* 常用工具 */}
        <Card className="mx-4 mb-4">
          <CardTitle title="常用工具" />
          <View className="flex-row flex-wrap">
            {toolItems.map((item, index) => (
              <View key={index} className="w-1/4 items-center mb-6">
                <MenuItemComponent {...item} />
              </View>
            ))}
          </View>
        </Card>

        {/* 帮助中心 */}
        <Card className="mx-4 mb-4">
          <CardTitle title="帮助中心" />
          <View className="flex-row flex-wrap">
            {helpItems.map((item, index) => (
              <View key={index} className="w-1/4 items-center mb-4">
                <MenuItemComponent {...item} />
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}
