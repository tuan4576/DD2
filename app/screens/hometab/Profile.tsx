
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

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({navigation} : {navigation : any}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../asset/image/Avatar.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.email}>nguyenvana@example.com</Text>
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
        <InfoItem 
          icon="heart-outline" 
          title="Danh sách yêu thích" 
          onPress={() => navigation.navigate('Wishlist')}
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
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: '#f5f5f5',
    marginBottom: 55,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    marginBottom: 10,
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
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal: 20,
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
