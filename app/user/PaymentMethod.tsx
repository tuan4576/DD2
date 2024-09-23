import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethod = ({ navigation }: { navigation: any }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', name: 'Visa', lastDigits: '1234', image: require('../asset/image/Clothing01.png') },
    { id: '2', name: 'MasterCard', lastDigits: '5678', image: require('../asset/image/Clothing01.png') },
    // { id: '1', name: 'Visa', lastDigits: '1234', image: require('../asset/image/visa.png') },
    // { id: '2', name: 'MasterCard', lastDigits: '5678', image: require('../asset/image/mastercard.png') },
  ]);

  const renderPaymentMethodItem = ({ item }: { item: any }) => (
    <View style={styles.paymentItem}>
      <Image source={item.image} style={styles.paymentIcon} />
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentName}>{item.name}</Text>
        <Text style={styles.paymentDetails}>**** **** **** {item.lastDigits}</Text>
      </View>
      <TouchableOpacity onPress={() => {/* Handle edit payment method */}}>
        <Ionicons name="create-outline" size={24} color="#FF937B" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phương thức thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethodItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.paymentList}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {/* Navigate to Add Payment Method screen */}}
      >
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Thêm phương thức thanh toán</Text>
      </TouchableOpacity>
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
  paymentList: {
    padding: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF937B',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PaymentMethod;
