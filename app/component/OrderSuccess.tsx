import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const OrderSuccess = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Image 
          source={require('../asset/image/success.png')} 
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
          onPress={() => navigation.navigate('OrderDetails' as never)}
        >
          <Text style={styles.viewOrderButtonText}>Xem chi tiết đơn hàng</Text>
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
