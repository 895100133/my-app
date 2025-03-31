import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { Text } from '@/components/ui/text'

interface OrderStatus {
  icon: 'credit-card' | 'cube' | 'truck' | 'comment' | 'refresh'
  label: string
  count?: number
}

interface Tool {
  icon:
    | 'file-text-o'
    | 'map-marker'
    | 'file-o'
    | 'ticket'
    | 'user'
    | 'users'
    | 'file'
    | 'file-text'
    | 'cog'
  label: string
  link: string
}

interface HelpCenter {
  icon: 'shopping-bag' | 'book' | 'headphones'
  label: string
  link: string
}

export default function ProfileScreen() {
  const [isLoggedIn] = useState(false) // 这里可以替换为真实的登录状态

  const orderStatuses: OrderStatus[] = [
    { icon: 'credit-card', label: '待付款', count: 15 },
    { icon: 'cube', label: '待发货' },
    { icon: 'truck', label: '待收货' },
    { icon: 'comment', label: '评价' },
    { icon: 'refresh', label: '退款/售后' },
  ]

  const tools: Tool[] = [
    { icon: 'file-text-o', label: '发票管理', link: '/invoice' },
    { icon: 'map-marker', label: '地址管理', link: '/address' },
    { icon: 'file-o', label: '药检报告', link: '/report' },
    { icon: 'ticket', label: '优惠券', link: '/coupon' },
    { icon: 'user', label: '我的客户', link: '/customers' },
    { icon: 'users', label: '我的员工', link: '/employees' },
    { icon: 'file', label: '代下单授权', link: '/authorization' },
    { icon: 'file-text', label: '代下单协议', link: '/agreement' },
    { icon: 'cog', label: '设置', link: '/settings' },
  ]

  const helpCenter: HelpCenter[] = [
    { icon: 'shopping-bag', label: '签约店铺', link: '/shop' },
    { icon: 'book', label: '新手引导', link: '/guide' },
    { icon: 'headphones', label: '客服', link: '/service' },
  ]

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={
            isLoggedIn
              ? require('../../assets/images/icon.png')
              : require('../../assets/images/icon.png')
          }
          style={styles.avatar}
        />
        <View style={styles.userMeta}>
          <Text style={styles.userName}>
            {isLoggedIn ? '王恩龙' : '未登录'}
          </Text>
          <Text style={styles.userCompany}>
            {isLoggedIn ? '山西省太原市山一笑堂大药房连锁有限公司' : '公司名称'}
          </Text>
        </View>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome name="star" size={20} color="#fff" />
          <Text style={styles.buttonText}>收藏</Text>
          <Text style={styles.buttonSubText}>关注商品</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome name="paw" size={20} color="#fff" />
          <Text style={styles.buttonText}>足迹</Text>
          <Text style={styles.buttonSubText}>浏览记录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <FontAwesome name="database" size={20} color="#fff" />
          <Text style={styles.buttonText}>资质</Text>
          <Text style={styles.buttonSubText}>查看全部</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderOrders = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>我的订单</Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>查看全部</Text>
          <FontAwesome name="angle-right" size={16} color="#999" />
        </TouchableOpacity>
      </View>
      <View style={styles.orderStatuses}>
        {orderStatuses.map((status, index) => (
          <TouchableOpacity key={index} style={styles.orderStatus}>
            <View style={styles.iconWrapper}>
              <FontAwesome name={status.icon} size={24} color="#666" />
              {status.count && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{status.count}</Text>
                </View>
              )}
            </View>
            <Text style={styles.statusLabel}>{status.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderTools = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>常用工具</Text>
      <View style={styles.toolGrid}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.toolItem}>
            <FontAwesome name={tool.icon} size={24} color="#666" />
            <Text style={styles.toolLabel}>{tool.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const renderHelpCenter = () => (
    <View style={[styles.section, styles.helpCenter]}>
      <Text style={styles.sectionTitle}>帮助中心</Text>
      <View style={styles.helpGrid}>
        {helpCenter.map((item, index) => (
          <TouchableOpacity key={index} style={styles.helpItem}>
            <FontAwesome name={item.icon} size={24} color="#666" />
            <Text style={styles.helpLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView}>
        {renderHeader()}
        {renderOrders()}
        {renderTools()}
        {renderHelpCenter()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF4D00',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userCompany: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  buttonSubText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
    marginRight: 5,
  },
  orderStatuses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderStatus: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF4D00',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toolItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  toolLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  helpCenter: {
    marginBottom: 10,
  },
  helpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  helpItem: {
    alignItems: 'center',
  },
  helpLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
})
