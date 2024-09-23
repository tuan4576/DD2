import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StoreMap = ({ navigation }: { navigation: any }) => {
  const address = "Cao Đẳng Công Thương TP.HCM";
  const phoneNumber = "028 3731 2370";
  const mapUrl = "https://maps.app.goo.gl/YjzP8fHZFmB2iKU6A";

  const openMap = () => {
    Linking.openURL(mapUrl).catch((err) => console.error('Đã xảy ra lỗi', err));
  };

  const callStore = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => console.error('Đã xảy ra lỗi', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin cửa hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.addressTitle}>Địa chỉ cửa hàng:</Text>
        <Text style={styles.addressText}>{address}</Text>

        <Text style={styles.phoneTitle}>Số điện thoại:</Text>
        <Text style={styles.phoneText}>{phoneNumber}</Text>

        <TouchableOpacity style={styles.button} onPress={openMap}>
          <Ionicons name="map-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Xem trên Google Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={callStore}>
          <Ionicons name="call-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Gọi cho cửa hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  phoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF937B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default StoreMap;
