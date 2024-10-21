
// import { StyleSheet, Dimensions, StatusBar } from 'react-native'
// import { TabView, SceneMap } from 'react-native-tab-view';
// import FirstRoute from './profiletab/FirstRoute';
// import SecondRoute from './profiletab/SecondRoute';
// import React from 'react'

// export default class Profile extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'first', title: 'First' },
//       { key: 'second', title: 'Second' },
//     ],
//   };

//   render() {
//     return (
//       <TabView
//         navigationState={this.state}
//         renderScene={SceneMap({
//           first: FirstRoute,
//           second: SecondRoute,
//         })}
//         onIndexChange={index => this.setState({ index })}
//         initialLayout={{ width: Dimensions.get('window').width }}
//         style={styles.container}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//       marginTop: StatusBar.currentHeight,
//     },
//     scene: {
//       flex: 1,
//     },
//   });

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_IMG } from '@/app/api/apiService';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({navigation} : {navigation : any}) => {
  const [userData, setUserData] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const avatarUri = await AsyncStorage.getItem('userAvatar');

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        if (savedEmail) {
          setUserEmail(savedEmail);
        }
        if (avatarUri) {
          setUserAvatar(avatarUri);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('savedEmail');
      await AsyncStorage.removeItem('userAvatar');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF937B', '#FFAC8E']}
        style={styles.backgroundGradient}
      />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {userAvatar && (
              <Image
                source={{ uri: GET_IMG(userAvatar) }}
                style={styles.avatar}
              />
            )}
          </View>
          <Text style={styles.name}>{userData?.name || 'Người dùng'}</Text>
          <Text style={styles.email}>{userEmail || 'Email chưa được cung cấp'}</Text>
        </View>
        <View style={styles.infoSection}>
          <InfoItem 
            icon="person-outline" 
            title="Thông tin cá nhân" 
            onPress={() => navigation.navigate('User')}
          />
          <InfoItem 
            icon="cart-outline" 
            title="Đơn hàng của tôi" 
            onPress={() => navigation.navigate('MyOrder')}
          />
          <InfoItem icon="location-outline" title="Địa chỉ giao hàng" onPress={() => navigation.navigate('ShippingAddress')} />
          <InfoItem icon="card-outline" title="Phương thức thanh toán" onPress={() => navigation.navigate('PaymentMethod')} />
          <InfoItem icon="map-outline" title="Xem cửa hàng trên bản đồ" onPress={() => navigation.navigate('StoreMap')} />
        </View>

        <View style={styles.infoSection}>
          <InfoItem icon="settings-outline" title="Cài đặt" onPress={() => navigation.navigate('Setting')} />
          <InfoItem icon="help-circle-outline" title="Trợ giúp & Hỗ trợ" onPress={() => navigation.navigate('Support')} />
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const InfoItem = ({ icon, title, onPress }: { icon: string; title: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.infoItem} onPress={onPress}>
    <Ionicons name={icon as any} size={24} color="#333" />
    <Text style={styles.infoTitle}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={24} color="#333" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 55,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  avatarContainer: {
    marginBottom: 10,
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#FF937B',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
