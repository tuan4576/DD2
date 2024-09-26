import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoppingBag = ({navigation} : {navigation : any}) => {
  const [item1Quantity, setItem1Quantity] = useState(1);
  const [item2Quantity, setItem2Quantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M'); // Kích thước được chọn

  const item1Price = 1200000;
  const item2Price = 900000;
  const shippingFee = 30000;

  const calculateSubtotal = () => (item1Price * item1Quantity) + (item2Price * item2Quantity);

  const calculateTotal = () => calculateSubtotal() + shippingFee;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Giỏ hàng</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.itemsContainer}>
        <View style={styles.itemFrame}>
          <View style={styles.itemRow}>
            <Image
              source={require('../asset/image/Clothing01.png')}
              style={styles.image}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Áo khoác bomber</Text>
              <Text style={styles.itemPrice}>{formatPrice(item1Price)}đ</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem1Quantity(Math.max(1, item1Quantity - 1))}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item1Quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem1Quantity(item1Quantity + 1)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>{selectedSize}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Icon name="trash-outline" size={24} color="#FFB3A2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.itemFrame}>
          <View style={styles.itemRow}>
            <Image
              source={require('../asset/image/Clothing03.png')}
              style={styles.image}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Áo khoác denim</Text>
              <Text style={styles.itemPrice}>{formatPrice(item2Price)}đ</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem2Quantity(Math.max(1, item2Quantity - 1))}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item2Quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem2Quantity(item2Quantity + 1)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>{selectedSize}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Icon name="trash-outline" size={24} color="#FFB3A2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.itemFrame}>
          <View style={styles.itemRow}>
            <Image
              source={require('../asset/image/Clothing03.png')}
              style={styles.image}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Áo khoác denim</Text>
              <Text style={styles.itemPrice}>{formatPrice(item2Price)}đ</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem2Quantity(Math.max(1, item2Quantity - 1))}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item2Quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => setItem2Quantity(item2Quantity + 1)}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.sizeButton}>
                <Text style={styles.sizeButtonText}>{selectedSize}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Icon name="trash-outline" size={24} color="#FFB3A2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.promoContainer}>
        <View style={styles.horizontalLine} />
        <View style={styles.promoInputContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Mã giảm giá"
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tổng tiền hàng:</Text>
          <Text style={styles.summaryValue}>{formatPrice(calculateSubtotal())}đ</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Phí vận chuyển:</Text>
          <Text style={styles.summaryValue}>{formatPrice(shippingFee)}đ</Text>
        </View>
        <View style={styles.dashedLine} />
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Tổng thanh toán:</Text>
          <Text style={styles.totalValue}>{formatPrice(calculateTotal())}đ</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.checkoutButtonText}>Tiến hành thanh toán</Text>
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
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemFrame: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 20,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
    color: '#E53935',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#000',
  },
  quantityText: {
    fontSize: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  sizeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 5,
  },
  sizeButtonText: {
    fontSize: 12,
    color: '#000',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoContainer: {
    marginVertical: 10,
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  promoInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#00A0FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  summary: {
    marginVertical: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  totalRow: {
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53935',
  },
  checkoutButton: {
    backgroundColor: '#FF937B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingBag;
