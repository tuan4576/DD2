import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_PRODUCT_ORDERS } from '../../../../../../api/apiService';

const OrderSuccess = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await GET_PRODUCT_ORDERS();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Không thể tải đơn hàng. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Image 
          source={require('../../../../../../asset/image/success.png')} 
          style={styles.successImage}
        />
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.message}>
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ giao hàng đến bạn trong thời gian sớm nhất.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.viewOrderButton}
          onPress={() => {
            if (loading) {
              // Show loading indicator or message
              return;
            }
            if (error) {
              // Show error message
              return;
            }
            if (orders.length > 0) {
              navigation.navigate('OrderDetails', { order: orders[0], items: orders[0].items });
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FF937B" />
          ) : (
            <Text style={styles.viewOrderButtonText}>
              {error ? 'Không thể tải đơn hàng' : 'Xem chi tiết đơn hàng'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home' as never)}
        >
          <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF937B',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewOrderButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF937B',
  },
  viewOrderButtonText: {
    color: '#FF937B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderSuccess;
