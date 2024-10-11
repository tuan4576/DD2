import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_SHOPPING_CART, UPDATE_SHOPPING_CART, DELETE_SHOPPING_CART, GET_IMG } from '@/app/api/apiService';

interface CartItem {
  id: number;
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

interface ItemProductProps {
  item: CartItem;
  onDelete: (id: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

const ItemProduct: React.FC<ItemProductProps> = ({ item, onDelete, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
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
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ShoppingBag = ({navigation, route} : {navigation : any, route: any}) => {
  const [shoppingCart, setShoppingCart] = useState<CartItem[] | null>(null);
  const [isAnyItemChecked, setIsAnyItemChecked] = useState(false);
  const [localCart, setLocalCart] = useState<CartItem[] | null>(null);

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
        
        // Load saved quantities
        const savedQuantities = await AsyncStorage.getItem('cartQuantities');
        if (savedQuantities) {
          const quantities = JSON.parse(savedQuantities);
          const updatedCart = cartWithCheckbox.map((item: CartItem) => ({
            ...item,
            quantity: quantities[item.id] || item.quantity
          }));
          setLocalCart(updatedCart);
        } else {
          setLocalCart(cartWithCheckbox);
        }
      }
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
    }
  };

  const deleteCheckedItems = () => {
    if (localCart) {
      const updatedCart = localCart.filter(item => !item.isChecked);
      setLocalCart(updatedCart);
      setIsAnyItemChecked(false);
      saveCartQuantities(updatedCart);
    }
  };

  const toggleItemCheck = (id: number) => {
    if (localCart) {
      const updatedCart = localCart.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      );
      setLocalCart(updatedCart);
      setIsAnyItemChecked(updatedCart.some(item => item.isChecked));
    }
  };

  const updateShoppingCart = async () => {
    if (localCart) {
      try {
        for (const item of localCart) {
          await UPDATE_SHOPPING_CART('shopping-cart', item.id, item);
        }
        setShoppingCart(localCart);
      } catch (error) {
        console.error('Error updating shopping cart:', error);
      }
    }
  };

  const saveCartQuantities = async (cart: CartItem[]) => {
    const quantities = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as Record<number, number>);
    await AsyncStorage.setItem('cartQuantities', JSON.stringify(quantities));
  };

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (localCart) {
      const updatedCart = localCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setLocalCart(updatedCart);
      await saveCartQuantities(updatedCart);
    }
  };

  const totalPrice = useMemo(() => {
    if (!localCart) return 0;
    return localCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [localCart]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await DELETE_SHOPPING_CART('shopping-cart', itemId);
      if (localCart) {
        const updatedCart = localCart.filter(item => item.id !== itemId);
        setLocalCart(updatedCart);
        await saveCartQuantities(updatedCart);
      }
    } catch (error) {
      console.error('Error deleting item from shopping cart:', error);
    }
  };

  if (!localCart) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Giỏ hàng</Text>
        {!isAnyItemChecked && <View style={styles.placeholder} />}
      </View>

      <View style={styles.itemsContainer}>
        {localCart.map((item: CartItem) => (
          <ItemProduct
            key={item.id}
            item={item}
            onDelete={handleDeleteItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
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
        onPress={() => {
          updateShoppingCart();
          navigation.navigate('Checkout', {
            items: localCart.filter(item => item.isChecked).map(item => ({
              ...item,
              stock_id: item.stock_id
            })),
            totalItems: localCart.filter(item => item.isChecked).reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: localCart.filter(item => item.isChecked).reduce((sum, item) => sum + (item.quantity * item.product.price), 0)
          });
        }}
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
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
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
