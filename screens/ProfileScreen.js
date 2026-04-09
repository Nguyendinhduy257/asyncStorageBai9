import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Import thêm icon để làm đẹp nút bấm

const ProfileScreen = ({ route }) => {
  const { signOutContext } = route.params || {};

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      if (signOutContext) {
        signOutContext();
      }
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Phần 1: Header bo cong mượt mà */}
      <View style={styles.headerBackground}></View>

      {/* Phần 2: Thông tin & Avatar */}
      <View style={styles.infoContainer}>
        
        {/* Bao bọc Avatar trong một View để tạo hiệu ứng đổ bóng đẹp hơn */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/NguyenDinhDuy.png')}
            style={styles.avatar}
          />
        </View>
        
        <Text style={styles.nameText}>Zuy Nguyen Dinh</Text>
        
        {/* Nhóm thông tin phụ (MSSV, Role) */}
        <View style={styles.badgeContainer}>
          <Text style={styles.roleText}>23810310435 D18CNPM4</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.roleText}>Mobile developer</Text>
        </View>
        
        <Text style={styles.descText}>
          I have above 5 months of experience in native mobile apps development, now i am learning React Native. Always eager to learn new technologies!
        </Text>

        {/* Nút Sign Out được làm to, thoáng và có icon */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color="#FFF" style={styles.signOutIcon} />
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ==========================================
// STYLES: Đã tinh chỉnh khoảng cách, bo góc và bóng đổ
// ==========================================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA', 
  },
  headerBackground: {
    backgroundColor: '#52C4FF',
    height: 190, // Tăng chiều cao để tạo độ thoáng
    width: '100%',
    borderBottomLeftRadius: 40, // Bo cong góc dưới
    borderBottomRightRadius: 40,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25, // Tăng lề 2 bên
  },
  avatarContainer: {
    marginTop: -65, // Kéo lên nhiều hơn do ảnh đã to ra
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6, // Đổ bóng cho Android
    borderRadius:70, //bo góc
  },
  avatar: {
    width: 130, // Avatar to hơn
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: '#FFF',
    backgroundColor: '#EEE',
  },
  nameText: { 
    fontSize: 26, // Chữ to và rõ ràng hơn
    fontWeight: '800', 
    color: '#2C3E50', 
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25, // Tạo khoảng trắng với đoạn mô tả
  },
  roleText: { 
    fontSize: 15, 
    color: '#52C4FF', 
    fontWeight: '600',
  },
  dotSeparator: {
    fontSize: 15,
    color: '#CCC',
    marginHorizontal: 10,
  },
  descText: {
    fontSize: 15, // Chữ to hơn một chút
    color: '#666',
    textAlign: 'center',
    lineHeight: 24, // Giãn dòng để "thở"
    paddingHorizontal: 20,
    marginBottom: 40, // Đẩy nút Sign Out xuống xa hơn
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2A900',
    paddingVertical: 16, // Nút cao và dễ bấm hơn
    paddingHorizontal: 40,
    borderRadius: 16, // Bo góc mượt mà
    width: '85%', // Chiếm 85% chiều rộng màn hình
    shadowColor: '#F2A900', // Đổ bóng cùng màu với nút
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutBtnText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 17, // Chữ trong nút to hơn
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;