import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_IMG, GET_SHOPPING_CART } from '@/app/api/apiService';

interface CartItem {
  stock_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    photo: string;
  };
  isChecked: boolean;
}

const ShoppingBag = ({navigation, route} : {navigation : any, route: any}) => {
  const [shoppingCart, setShoppingCart] = useState<CartItem[] | null>(null);
  const [isAnyItemChecked, setIsAnyItemChecked] = useState(false);

  useEffect(() => {
    fetchShoppingCart();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchShoppingCart();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchShoppingCart = async () => {
    try {
      const response = await GET_SHOPPING_CART('shopping-cart');
      if (response && response.data) {
        const cartWithCheckbox = response.data.map((item: CartItem) => ({
          ...item,
          isChecked: false
        }));
        setShoppingCart(cartWithCheckbox);
      }
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const toggleItemCheck = (stockId: number) => {
    if (shoppingCart) {
      const updatedCart = shoppingCart.map(item => 
        item.stock_id === stockId ? { ...item, isChecked: !item.isChecked } : item
      );
      setShoppingCart(updatedCart);
      setIsAnyItemChecked(updatedCart.some(item => item.isChecked));
    }
  };

  const deleteCheckedItems = () => {
    if (shoppingCart) {
      const updatedCart = shoppingCart.filter(item => !item.isChecked);
      setShoppingCart(updatedCart);
      setIsAnyItemChecked(false);
    }
  };

  if (!shoppingCart) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const totalPrice = shoppingCart.reduce((sum, item) => 
    item.isChecked ? sum + item.product.price * item.quantity : sum, 0
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Giỏ hàng</Text>
        {isAnyItemChecked && (
          <TouchableOpacity style={styles.deleteButton} onPress={deleteCheckedItems}>
            <Text style={styles.deleteButtonText}>Xóa</Text>
          </TouchableOpacity>
        )}
        {!isAnyItemChecked && <View style={styles.placeholder} />}
      </View>

      <View style={styles.itemsContainer}>
        {shoppingCart.map((item: CartItem) => (
          <View key={item.stock_id} style={styles.itemFrame}>
            <View style={styles.itemRow}>
              <Image
                source={{ uri: GET_IMG(item.product.photo) }}
                style={styles.image}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.product.price)}đ</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.checkoutButton, item.isChecked && styles.checkoutButtonActive]} 
                onPress={() => toggleItemCheck(item.stock_id)}
              >
                <Icon 
                  name={item.isChecked ? "checkmark" : "add"} 
                  size={20} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
          <Text style={styles.summaryValue}>{formatPrice(totalPrice)}đ</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Phí vận chuyển:</Text>
          <Text style={styles.summaryValue}>30.000đ</Text>
        </View>
        <View style={styles.dashedLine} />
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Tổng thanh toán:</Text>
          <Text style={styles.totalValue}>{formatPrice(totalPrice + 30000)}đ</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButtonLarge}
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
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF937B',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#FF937B',
    fontSize: 14,
    fontWeight: 'bold',
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
  checkoutButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonActive: {
    backgroundColor: '#FF937B',
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
  checkoutButtonLarge: {
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
