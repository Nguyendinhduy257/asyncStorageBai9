import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ route }) => {
  // Lấy hàm đăng xuất được truyền từ App.js qua initialParams
  const { signOutContext } = route.params || {};

  const handleSignOut = async () => {
    try {
      // 1. Xóa token trong ổ cứng
      await AsyncStorage.removeItem('userToken');
      // 2. Cập nhật state ở App.js để văng ra màn hình Login
      if (signOutContext) {
        signOutContext();
      }
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Phần 1: Header màu xanh */}
      <View style={styles.headerBackground}></View>

      {/* Phần 2: Thông tin & Avatar */}
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/id/1005/200/200' }} // Ảnh avatar mẫu
          style={styles.avatar}
        />
        
        <Text style={styles.nameText}>Hung Nguyen</Text>
        <Text style={styles.roleText}>Mobile developer</Text>
        
        <Text style={styles.descText}>
          I have above 5 years of experience in native mobile apps development, now i am learning React Native
        </Text>

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  headerBackground: {
    backgroundColor: '#52C4FF', // Màu xanh nước biển nhạt
    height: 160,
    width: '100%',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF', // Viền trắng xung quanh avatar
    marginTop: -50, // Kéo ảnh lên trên đè vào phần nền xanh
    marginBottom: 10,
  },
  nameText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  roleText: { 
    fontSize: 14, 
    color: '#52C4FF', // Cùng màu với header
    marginBottom: 15 
  },
  descText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  signOutBtn: {
    backgroundColor: '#F2A900', // Màu cam/vàng
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  signOutBtnText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});

export default ProfileScreen;