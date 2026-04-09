import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomerTextInput';
import IconButton from '../components/IconButton';

const SignInScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInContext } = route.params; // Nhận hàm update state từ App.js

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu!');
      return;
    }
    // Giả lập lưu token vào AsyncStorage khi đăng nhập thành công
    try {
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      signInContext(); // Gọi hàm để cập nhật lại App.js -> chuyển sang Bottom Tab
    } catch (e) {
      console.log('Lỗi lưu token:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Sign In</Text>

      <CustomTextInput
        label="Email ID"
        placeholder="Enter your email here!"
        value={email}
        onChangeText={setEmail}
      />

      <CustomTextInput
        label="Password"
        placeholder="Enter your password here!"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>For got password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>

      <View style={styles.socialRow}>
        <IconButton
          title="Google"
          iconName="google"
          bgColor="#FFF"
          textColor="#000"
          onPress={() => Alert.alert('Login with Google')}
        />
        <IconButton
          title="Facebook"
          iconName="facebook"
          bgColor="#4267B2"
          textColor="#FFF"
          onPress={() => Alert.alert('Login with Facebook')}
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Not yet a member? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20, justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  forgotText: { color: '#F2A900', textAlign: 'right', marginBottom: 20, fontWeight: 'bold' },
  signInButton: { backgroundColor: '#F2A900', padding: 15, borderRadius: 5, alignItems: 'center' },
  signInButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  orText: { textAlign: 'center', marginVertical: 20, color: '#666', fontWeight: 'bold' },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  footerRow: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#333' },
  signUpText: { color: '#F2A900', fontWeight: 'bold' },
});

export default SignInScreen;