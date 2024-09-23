import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
    <Image source={item.image} style={styles.notificationImage} />
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
    {!item.read && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Đơn hàng đã được xác nhận',
      description: 'Đơn hàng #OD123456 của bạn đã được xác nhận và đang được xử lý.',
      time: '2 giờ trước',
      image: require('../../asset/image/Clothing01.png'),
      read: false,
    },
    {
      id: '2',
      title: 'Khuyến mãi mới',
      description: 'Giảm giá 20% cho tất cả các sản phẩm thời trang nam.',
      time: '1 ngày trước',
      image: require('../../asset/image/Clothing01.png'),
      read: true,
    },
    // Thêm các thông báo khác ở đây
  ]);

  const handleNotificationPress = (item) => {
    // Xử lý khi người dùng nhấn vào thông báo
    console.log('Notification pressed:', item);
    // Cập nhật trạng thái đã đọc
    setNotifications(notifications.map(notification => 
      notification.id === item.id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem item={item} onPress={() => handleNotificationPress(item)} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
      />
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF937B',
    marginLeft: 8,
  },
});

export default Notifications;
