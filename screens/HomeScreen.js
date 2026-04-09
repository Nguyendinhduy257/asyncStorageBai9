import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Sử dụng icon từ Expo

// ==========================================
// 1. DỮ LIỆU MẪU (Mock Data)
// ==========================================
const CATEGORIES_DATA = [
  { id: '1', title: 'Pizza', image: 'https://picsum.photos/id/431/200/100' },
  { id: '2', title: 'Burgers', image: 'https://picsum.photos/id/42/200/100' },
  { id: '3', title: 'Steak', image: 'https://picsum.photos/id/292/200/100' },
];

const POPULAR_DATA = [
  { id: '1', title: 'Food 1', subtitle: 'By Viet Nam', price: '1$', image: 'https://picsum.photos/id/102/100' },
  { id: '2', title: 'Food 2', subtitle: 'By Viet Nam', price: '3$', image: 'https://picsum.photos/id/108/100' },
];

const SALE_DATA = [
  { id: '1', title: 'Steak Box', discount: '10% OFF', image: 'https://picsum.photos/id/292/150/100' },
  { id: '2', title: 'Salad Combo', discount: '15% OFF', image: 'https://picsum.photos/id/108/150/100' },
];

// ==========================================
// 2. CÁC COMPONENT DÙNG CHUNG (Reusable Components)
// ==========================================

// --- COMPONENT CHUNG 1: Header cho từng Group ---
const SectionHeader = ({ title, rightText, rightIcon }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.rightAction}>
      {rightIcon && <Ionicons name={rightIcon} size={16} color="#F2A900" style={{ marginRight: 4 }} />}
      <Text style={styles.rightActionText}>{rightText}</Text>
    </TouchableOpacity>
  </View>
);

// --- COMPONENT CHUNG 2: FlatList ngang ---
// Component này nhận một prop là `renderItemComponent` để vẽ các kiểu UI khác nhau cho từng group
const HorizontalFlatList = ({ data, renderItemComponent }) => (
  <FlatList
    horizontal
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => renderItemComponent(item)}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 20 }}
  />
);

// ==========================================
// 3. COMPONENT GIAO DIỆN CHÍNH
// ==========================================
const HomeScreen = () => {
  // Giao diện cho 1 Item của Top Categories
  const renderCategoryItem = (item) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  // Giao diện cho 1 Item của Popular Items (Dạng Card ngang)
  const renderPopularItem = (item) => (
    <View style={styles.popularCard}>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularInfo}>
        <Text style={styles.popularTitle}>{item.title}</Text>
        <Text style={styles.popularSubtitle}>{item.subtitle}</Text>
        <Text style={styles.popularPrice}>{item.price}</Text>
      </View>
    </View>
  );

  // Giao diện cho 1 Item của Sale-off Items (Có Badge giảm giá)
  const renderSaleItem = (item) => (
    <View style={styles.saleCard}>
      <Image source={{ uri: item.image }} style={styles.saleImage} />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.discount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerLogo}>Explorer</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* GROUP 1: Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="location-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for meals or area"
            placeholderTextColor="#999"
          />
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        </View>

        {/* GROUP 2: Top Categories */}
        <View style={styles.groupContainer}>
          <SectionHeader title="Top Categories" rightText="Filter" rightIcon="funnel-outline" />
          <HorizontalFlatList data={CATEGORIES_DATA} renderItemComponent={renderCategoryItem} />
        </View>

        {/* GROUP 3: Popular Items */}
        <View style={styles.groupContainer}>
          <SectionHeader title="Popular Items" rightText="View all" />
          <HorizontalFlatList data={POPULAR_DATA} renderItemComponent={renderPopularItem} />
        </View>

        {/* GROUP 4: Sale-off Items */}
        <View style={styles.groupContainer}>
          <SectionHeader title="Popular Items" rightText="View all" /> {/* Tiêu đề trong ảnh ghi là Popular Items nhưng badge là Sale */}
          <HorizontalFlatList data={SALE_DATA} renderItemComponent={renderSaleItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 4. STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  headerTop: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10 },
  headerLogo: { fontSize: 22, fontWeight: 'bold', color: '#333' },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Bóng cho Android
  },
  searchInput: { flex: 1, height: '100%', fontSize: 15, paddingHorizontal: 10 },
  searchIcon: { padding: 5 },

  // Group & Section Header
  groupContainer: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  rightAction: { flexDirection: 'row', alignItems: 'center' },
  rightActionText: { color: '#F2A900', fontSize: 14, fontWeight: 'bold' },

  // Top Categories Items
  categoryItem: { marginRight: 15, alignItems: 'center' },
  categoryImage: { width: 100, height: 60, borderRadius: 8, marginBottom: 8 },
  categoryText: { fontSize: 14, color: '#333', fontWeight: '500' },

  // Popular Items (Card ngang)
  popularCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 15,
    padding: 10,
    width: 220, // Độ rộng cố định cho card ngang
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  popularImage: { width: 70, height: 70, borderRadius: 8, marginRight: 15 },
  popularInfo: { flex: 1, justifyContent: 'center' },
  popularTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  popularSubtitle: { fontSize: 12, color: '#888', marginBottom: 8 },
  popularPrice: { fontSize: 15, fontWeight: 'bold', color: '#333' },

  // Sale-off Items (Có Badge giảm giá)
  saleCard: { marginRight: 15, position: 'relative', borderRadius: 10, overflow: 'hidden' },
  saleImage: { width: 180, height: 110, borderRadius: 10 },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});

export default HomeScreen;