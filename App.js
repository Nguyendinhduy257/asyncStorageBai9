import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Import Screens
import SignInScreen from './screens/SignInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. Tạo Bottom Tab Navigator (Màn hình sau khi Login) ---
function MainTabs({ route }) {
  // Pass hàm signOutContext xuống Home để xử lý đăng xuất
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#F2A900' }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ signOutContext: route.params.signOutContext }}
        options={{ tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Account" 
        component={ProfileScreen} 
        initialParams={{ signOutContext: route.params.signOutContext }} // Truyền hàm đăng xuất
        options={{ tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

// --- 2. Tạo Component Gốc quản lý trạng thái ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // Kiểm tra token lưu trong AsyncStorage mỗi khi mở app
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  // Các hàm cập nhật UI được truyền xuống screens dưới dạng Params
  const authContext = {
    signInContext: () => setUserToken('dummy-auth-token'),
    signOutContext: () => setUserToken(null),
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F2A900" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          // --- KẾT HỢP STACK NAVIGATION (AUTH) ---
          <Stack.Group>
            <Stack.Screen 
              name="SignIn" 
              component={SignInScreen} 
              initialParams={{ signInContext: authContext.signInContext }} 
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen} 
              options={{ headerShown: true, title: 'Quên mật khẩu' }} 
            />
          </Stack.Group>
        ) : (
          // --- KẾT HỢP BOTTOM NAVIGATION (MAIN APP) ---
          <Stack.Screen 
            name="MainApp" 
            component={MainTabs} 
            initialParams={{ signOutContext: authContext.signOutContext }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}