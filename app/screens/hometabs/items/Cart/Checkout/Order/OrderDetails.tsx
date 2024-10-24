import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { GET_IMG } from '@/app/api/apiService';

const OrderDetails = ({ navigation, route } : { navigation: any, route: any }) => {
  const [copiedText, setCopiedText] = useState('');

  const order = route?.params?.order || {};
  const items = route?.params?.items || [];

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      ToastAndroid.show('Đã sao chép mã đơn hàng', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Failed to copy text: ', error);
      ToastAndroid.show('Không thể sao chép mã đơn hàng', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
        <TouchableOpacity 
          style={styles.printIcon}
          onPress={() => navigation.navigate('PrintProduct', { 
            order: {
              ...order,
              order_items: items.map((item: any) => ({
                product_name: item.product_name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
              }))
            }
          })}
        >
          <Ionicons name="print-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.orderInfoContainer}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Mã đơn hàng:</Text>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderValue}>{order.order_code}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(order.order_code)}>
              <Ionicons name="copy-outline" size={20} color="#666" style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Ngày đặt hàng:</Text>
          <Text style={styles.orderValue}>{new Date(order.order_date).toLocaleDateString('vi-VN')}</Text>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Tổng tiền:</Text>
          <Text style={[styles.orderValue, styles.totalPrice]}>{order.total_amount.toLocaleString('vi-VN')}đ</Text>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Trạng thái:</Text>
          <Text style={[styles.orderValue, styles.orderStatus]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsHeader}>Sản phẩm</Text>
        {items.map((item: any, index: number) => (
          <TouchableOpacity 
            key={index} 
            style={styles.item} 
            onPress={() => navigation.navigate('ItemProductDetail', { 
              product: { 
                photo: { uri: GET_IMG(item.photo) }, 
                name: item.product_name, 
                price: item.price, 
                description: item.description, 
                details: item.details, 
                status: item.status, 
                stock_id: item.stock_id, 
                id: item.product_id, 
                wishlist_id: item.id 
              } 
            })}
          >
            <Image 
              source={{ uri: GET_IMG(item.photo) }} 
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.contactButton}
        onPress={() => navigation.navigate('ContactSupport')}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FF937B" />
        <Text style={styles.contactButtonText}>Liên hệ hỗ trợ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backIcon: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  printIcon: {
    marginLeft: 15,
  },
  orderInfoContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderLabel: {
    fontSize: 16,
    color: '#666',
  },
  orderValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: 10,
  },
  totalPrice: {
    color: '#FF937B',
  },
  orderStatus: {
    color: '#4CAF50',
  },
  itemsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF937B',
    fontWeight: 'bold',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF937B',
  },
  contactButtonText: {
    color: '#FF937B',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default OrderDetails;
