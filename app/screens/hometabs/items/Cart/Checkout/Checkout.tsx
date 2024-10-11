import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Checkout = ({ navigation, route }: { navigation: any; route: any }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Gpay');
  const [selectedAddress, setSelectedAddress] = useState(1);

  const { items, totalItems, totalPrice } = route.params;
  const deliveryDate = '25 tháng 3 năm 2024';

  const addresses = [
    { id: 1, name: "Nguyễn Văn A", address: "21/3, Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM" },
    { id: 2, name: "Trần Thị B", address: "44, Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM" },
    { id: 3, name: "Lê Văn C", address: "55, Đường Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM" },
  ];

  const renderAddressItem = ({ item }: { item: { id: number; name: string; address: string } }) => (
    <TouchableOpacity 
      style={[styles.addressCard, selectedAddress === item.id && styles.selectedAddress]} 
      onPress={() => setSelectedAddress(item.id)}
    >
      <View style={styles.addressHeader}>
        <View style={[styles.radioButtonOuter, selectedAddress === item.id && styles.selectedRadioButtonOuter]}>
          {selectedAddress === item.id && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={[styles.addressName, selectedAddress === item.id && styles.selectedAddressText]}>{item.name}</Text>
      </View>
      <View style={styles.addressDetails}>
        <Text style={[styles.addressText, selectedAddress === item.id && styles.selectedAddressText]}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thanh toán</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Phần Phương thức thanh toán */}
      <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
      <View style={styles.radioGroup}>
        {['Gpay', 'Thẻ ghi nợ / Thẻ tín dụng', 'Paypal', 'Chuyển khoản ngân hàng'].map((method, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.radioRow} 
            onPress={() => setSelectedPaymentMethod(method)}
          >
            <View style={styles.radioButtonOuter}>
              {selectedPaymentMethod === method && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.radioText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Phần Địa chỉ giao hàng */}
      <View style={styles.sectionTitleContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
      </View>
      <View style={styles.addressContainer}>
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.addNewAddress} onPress={() => navigation.navigate('AddAdress')}>
          <Text style={styles.addNewAddressText}>+ Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
      {/* Thông tin giao hàng */}
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryRow}>
          {/* <Image source={require('../asset/image/Car.png')} style={{ width: 40, height: 30 }} /> */}
          <Text style={styles.deliveryText}>Dự kiến giao hàng: {deliveryDate}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.amountText}>Tổng thanh toán:</Text>
          <Text style={styles.priceText}>{totalPrice.toLocaleString('vi-VN')}đ</Text>
        </View>
      </View>

      {/* Nút Thanh toán và Hoàn tất đơn hàng */}
      <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('OrderSuccess')}>
        <Text style={styles.payButtonText}>Thanh toán và Hoàn tất đơn hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  addressContainer: {
    marginTop: 10,
    marginBottom: 20,
    height: 180
  },
  addressCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 250,
    height: 130,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  selectedAddress: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  addressDetails: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
  },
  selectedAddressText: {
    color: '#fff',
  },
  selectedRadioButtonOuter: {
    borderColor: '#fff',
  },
  addNewAddress: {
    marginTop: 10,
  },
  addNewAddressText: {
    color: '#FF937B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    marginTop: 10,
    marginBottom: 20,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 16,
    marginLeft: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF937B',
    textAlign: 'right',
  },
  payButton: {
    backgroundColor: '#FF937B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
