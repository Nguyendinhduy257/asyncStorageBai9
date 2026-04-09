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
import { Ionicons } from '@expo/vector-icons';

// ==========================================
// 1. DỮ LIỆU: TÊN CỬA HÀNG VÀ ĐỊA ĐIỂM
// ==========================================
const CATEGORIES_DATA = [
  { id: '1', title: 'Clothing', image: require('../assets/product-1.png') },
  { id: '2', title: 'Jewelry', image: require('../assets/product-7.png') },
  { id: '3', title: 'Tactical Gear', image: require('../assets/product-5.png') },
];

const NEARBY_STORES_DATA = [
  { id: '1', name: 'Vanguard Tactical Store', area: 'Hà Đông', distance: '1.2 km', rating: '4.8', image: require('../assets/product-4.png') },
  { id: '2', name: 'Silver Wolf Studio', area: 'Đại Mỗ', distance: '2.5 km', rating: '4.5', image: require('../assets/product-5.png') },
  { id: '3', name: 'Urban Apparel', area: 'Cầu Giấy', distance: '3.0 km', rating: '4.2', image: require('../assets/product-6.png') },
  { id: '4', name: 'HighGuard Clothing Store', area: 'Hà Đông', distance: '1.2 km', rating: '4.8', image: require('../assets/product-1.png') },
  { id: '5', name: 'VonFram Studio', area: 'Đại Mỗ', distance: '2.5 km', rating: '4.5', image: require('../assets/product-2.png') },
];

const TOP_RATED_DATA = [
  { id: '1', name: 'Desert Outpost', area: 'Tây Mỗ', rating: '5.0', image: require('../assets/product-7.png') },
  { id: '2', name: 'Elite Paracord & Gear', area: 'Mỹ Đình', rating: '4.9', image: require('../assets/product-8.png') },
  { id: '3', name: 'Mountain Peak', area: 'Hà Đông', rating: '4.8', image: require('../assets/product-4.png') },
  { id: '4', name: 'Elite Apparel Studio', area: 'Đại Mỗ', rating: '4.7', image: require('../assets/product-2.png') },
  { id: '5', name: 'Master Gammar NULL', area: 'Hà Tây', rating: '4.7', image: require('../assets/product-5.png') },
];

// ==========================================
// 2. CÁC COMPONENT DÙNG CHUNG
// ==========================================
const SectionHeader = ({ title, rightText, rightIcon }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.rightAction}>
      {rightIcon && <Ionicons name={rightIcon} size={18} color="#F2A900" style={{ marginRight: 6 }} />}
      <Text style={styles.rightActionText}>{rightText}</Text>
    </TouchableOpacity>
  </View>
);

const HorizontalFlatList = ({ data, renderItemComponent }) => (
  <FlatList
    horizontal
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => renderItemComponent(item)}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }} // Thêm paddingBottom để không cắt bóng đổ
  />
);

// ==========================================
// 3. COMPONENT GIAO DIỆN CHÍNH
// ==========================================
const HomeScreen = () => {

  const renderCategoryItem = (item) => (
    <View style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  const renderNearbyStore = (item) => (
    <TouchableOpacity style={styles.storeCard} activeOpacity={0.8}>
      <Image source={item.image} style={styles.storeImage} resizeMode="cover" />
      <View style={styles.storeInfo}>
        <Text style={styles.storeName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={15} color="#666" />
          <Text style={styles.storeArea}>{item.area} • {item.distance}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={15} color="#F2A900" />
          <Text style={styles.storeRating}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopRatedStore = (item) => (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
      <Image source={item.image} style={styles.featuredImage} resizeMode="cover" />
      <View style={styles.featuredInfo}>
        <View style={{ flex: 1 }}>
          <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.featuredArea}>{item.area}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FFF" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.headerLogo}>Store Finder (Zuy Industries)</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={22} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stores, areas or gear..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={22} color="#F2A900" />
          </TouchableOpacity>
        </View>

        <View style={styles.groupContainer}>
          <SectionHeader title="Browse Categories" rightText="All" />
          <HorizontalFlatList data={CATEGORIES_DATA} renderItemComponent={renderCategoryItem} />
        </View>

        <View style={styles.groupContainer}>
          <SectionHeader title="Nearby Stores" rightText="View map" rightIcon="location" />
          <HorizontalFlatList data={NEARBY_STORES_DATA} renderItemComponent={renderNearbyStore} />
        </View>

        <View style={styles.groupContainer}>
          <SectionHeader title="Top Rated Stores" rightText="See all" />
          <HorizontalFlatList data={TOP_RATED_DATA} renderItemComponent={renderTopRatedStore} />
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 4. STYLES (Đã tinh chỉnh khoảng cách)
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  // Header: Nới rộng paddingTop và paddingBottom
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  headerLogo: { fontSize: 20, fontWeight: '800', color: '#2C3E50', letterSpacing: 0.5 },
  mapButton: { padding: 8, backgroundColor: '#FFF', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },

  // Search Bar: To hơn, cao hơn, bo góc tròn hơn
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    marginHorizontal: 20, marginTop: 10, marginBottom: 35, borderRadius: 14,
    paddingHorizontal: 15, height: 55,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 3,
  },
  searchInput: { flex: 1, height: '100%', fontSize: 16, paddingHorizontal: 12 },
  searchIcon: { padding: 5 },
  filterButton: { padding: 8, backgroundColor: '#FFF8E1', borderRadius: 10 },

  // Khoảng cách giữa các Nhóm (Group) tăng từ 30 lên 40
  groupContainer: { marginBottom: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  rightAction: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  rightActionText: { color: '#F2A900', fontSize: 15, fontWeight: '700' },

  // Categories: Ảnh to ra một chút, cách xa nhau hơn
  categoryItem: { marginRight: 20, alignItems: 'center' },
  categoryImage: { width: 110, height: 80, borderRadius: 14, marginBottom: 12, backgroundColor: '#EEE' },
  categoryText: { fontSize: 15, color: '#4A4A4A', fontWeight: '600' },

  // Store Card (Nearby): Nới rộng bề ngang, tăng padding bên trong, bo góc mạnh hơn
  storeCard: {
    backgroundColor: '#FFF', borderRadius: 16, marginRight: 20, width: 180,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 4, overflow: 'hidden'
  },
  storeImage: { width: '100%', height: 120, backgroundColor: '#EEE' },
  storeInfo: { padding: 16 }, // Padding từ 12 -> 16
  storeName: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  storeArea: { fontSize: 13, color: '#7F8C8D', marginLeft: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  storeRating: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginLeft: 6 },

  // Featured Card (Top Rated): Nới rộng form card ngang, tăng cỡ chữ
  featuredCard: {
    marginRight: 20, borderRadius: 16, overflow: 'hidden', width: 260, backgroundColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 4
  },
  featuredImage: { width: '100%', height: 140, backgroundColor: '#EEE' },
  featuredInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  featuredName: { fontSize: 17, fontWeight: 'bold', color: '#2C3E50', marginBottom: 6 },
  featuredArea: { fontSize: 14, color: '#7F8C8D' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2A900', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, marginLeft: 10 },
  ratingBadgeText: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginLeft: 4 }
});

export default HomeScreen;