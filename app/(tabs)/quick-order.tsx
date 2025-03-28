import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const categories = [
  { id: 1, name: '平台推荐', icon: 'star' as const },
  { id: 2, name: '感冒类', icon: 'thermometer' as const },
  { id: 3, name: '止痛类', icon: 'medkit' as const },
  { id: 4, name: '胃药类', icon: 'heartbeat' as const },
  { id: 5, name: '补益类', icon: 'plus-square' as const },
  { id: 6, name: '消化类', icon: 'tint' as const },
  { id: 7, name: '妇科类', icon: 'female' as const },
  { id: 8, name: '骨科类', icon: 'wheelchair' as const },
  { id: 9, name: '丸药类', icon: 'circle' as const },
  { id: 10, name: '心脑血管', icon: 'heart' as const },
]

const products = [
  {
    id: 1,
    name: '[未知品牌] 保和丸*10丸/盒*120盒/件*五盒',
    price: 6.0,
    image: require('../../assets/images/ceshi.jpg'),
    expiry: '2027-12-16',
    manufacturer: '山西振东和泰制药有限公司',
  },
  {
    id: 2,
    name: '[6542H] 硝苯地平缓释片 (I) *10mg×72片/盒',
    price: 21.0,
    image: require('../../assets/images/ceshi.jpg'),
    expiry: '2026-12-01',
    manufacturer: '德州德药制药有限公司',
  },
  {
    id: 3,
    name: '[6542H] 牛黄解毒片*0.25g×24片×50袋/件',
    price: 1.0,
    image: require('../../assets/images/ceshi.jpg'),
    expiry: '2027-09-29',
    manufacturer: '山西华康药业股份有限公司',
  },
]

const { width } = Dimensions.get('window')
const CATEGORY_ITEM_WIDTH = (width - 40) / 5 // 每行5个图标

export default function QuickOrderScreen() {
  const [selectedTab, setSelectedTab] = useState<'recommend' | 'reorder'>(
    'recommend'
  )
  const [selectedCategory, setSelectedCategory] = useState('感冒类')

  // 渲染搜索栏
  const renderSearchBar = () => (
    <View style={styles.searchWrapper}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <FontAwesome
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索想要的商品"
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </View>
  )

  // 渲染分类网格
  const renderCategoryGrid = () => (
    <View style={styles.categoryWrapper}>
      <View style={styles.categoryGrid}>
        {categories.slice(0, 10).map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => setSelectedCategory(category.name)}
          >
            <View
              style={[
                styles.categoryIcon,
                selectedCategory === category.name && styles.categoryIconActive,
              ]}
            >
              <FontAwesome
                name={category.icon}
                size={24}
                color={selectedCategory === category.name ? '#fff' : '#666'}
              />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  // 渲染商品列表区域
  const renderProductSection = () => (
    <View style={styles.productSection}>
      {/* 左侧标签栏 */}
      <View style={styles.tabsWrapper}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'recommend' && styles.tabActive]}
          onPress={() => setSelectedTab('recommend')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'recommend' && styles.tabTextActive,
            ]}
          >
            平台推荐
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'reorder' && styles.tabActive]}
          onPress={() => setSelectedTab('reorder')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'reorder' && styles.tabTextActive,
            ]}
          >
            再来一单
          </Text>
        </TouchableOpacity>
      </View>

      {/* 商品列表 */}
      <ScrollView style={styles.productList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.productExpiry}>
                有效期至：{product.expiry}
              </Text>
              <Text style={styles.productManufacturer} numberOfLines={1}>
                {product.manufacturer}
              </Text>
              <View style={styles.productBottom}>
                <Text style={styles.productPrice}>
                  ¥{product.price.toFixed(2)}
                </Text>
                <TouchableOpacity style={styles.addToCartButton}>
                  <FontAwesome name="shopping-cart" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* 顶部搜索区域 */}
      {renderSearchBar()}

      {/* 分类网格 */}
      {renderCategoryGrid()}

      {/* 商品列表区域 */}
      {renderProductSection()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchWrapper: {
    backgroundColor: '#FF4D00',
  },
  searchContainer: {
    padding: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 36,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
  },
  categoryWrapper: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  categoryItem: {
    width: CATEGORY_ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconActive: {
    backgroundColor: '#FF4D00',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
  },
  productSection: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsWrapper: {
    width: 100,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  tab: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  tabActive: {
    borderLeftColor: '#FF4D00',
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    color: '#FF4D00',
    fontWeight: 'bold',
  },
  productList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  productExpiry: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  productManufacturer: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#FF4D00',
    fontWeight: 'bold',
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF4D00',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
