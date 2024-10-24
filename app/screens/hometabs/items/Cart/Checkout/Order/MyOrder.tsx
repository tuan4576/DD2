// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const MyOrder = ({ navigation }: { navigation: any }) => {
//   const [orders, setOrders] = useState([
//     { id: '1', date: '2023-06-01', status: 'Đã giao', total: '500.000 đ', items: [] },
//     { id: '2', date: '2023-05-28', status: 'Đang giao', total: '750.000 đ', items: [] },
//     { id: '3', date: '2023-05-25', status: 'Đã hủy', total: '300.000 đ', items: [] },
//   ]);

//   const renderOrderItem = ({ item }: { item: any }) => (
//     <TouchableOpacity 
//       style={styles.orderItem} 
//       onPress={() => navigation.navigate('OrderDetails', { order: item })}
//     >
//       <View style={styles.orderHeader}>
//         <Text style={styles.orderDate}>Ngày đặt: {item.date}</Text>
//         <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>{item.status}</Text>
//       </View>
//       <View style={styles.orderFooter}>
//         <Text style={styles.orderTotal}>Tổng tiền: {item.total}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Đã giao':
//         return '#4CAF50';
//       case 'Đang giao':
//         return '#2196F3';
//       case 'Đã hủy':
//         return '#F44336';
//       default:
//         return '#666';
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
//         <View style={{ width: 24 }} />
//       </View>
//       <FlatList
//         data={orders}
//         renderItem={renderOrderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   orderItem: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   orderDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   orderStatus: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   orderFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   orderTotal: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default MyOrder;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GET_PRODUCT_ORDERS } from '../../../../../../api/apiService';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  order_code: string;
  order_date: string;
  total_quantity: number;
  total_amount: number;
  status: string;
  items: OrderItem[];
}

const MyOrder = ({ navigation }: { navigation: any }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      style={styles.orderItem} 
      onPress={() => navigation.navigate('OrderDetails', { order: item, items: item.items })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderCode}>{item.order_code}</Text>
        <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>{getStatusText(item.status)}</Text>
      </View>
      <Text style={styles.orderDate}>Ngày đặt: {new Date(item.order_date).toLocaleDateString('vi-VN')}</Text>
      <View style={styles.orderFooter}>
        <Text style={styles.orderQuantity}>Số lượng: {item.total_quantity}</Text>
        <Text style={styles.orderTotal}>Tổng tiền: {item.total_amount.toLocaleString('vi-VN')} đ</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'processing':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Đã giao';
      case 'processing':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
        <View style={{ width: 24 }} />
      </View>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.order_code}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text>Không có đơn hàng nào</Text>
        </View>
      )}
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
  listContainer: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderQuantity: {
    fontSize: 14,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyOrder;
