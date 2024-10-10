import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_SHOPPING_CART } from '@/app/api/apiService'
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const ItemShopingCart = ({ navigation }: { navigation: any }) => {
  interface CartItem {
    stock_id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      photo: string;
    }
  }
  
  interface ShoppingCart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  }

  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);
  
  const fetchShoppingCart = useCallback(async () => {
    try {
      const response = await GET_SHOPPING_CART('shopping-cart');
      if (response && response.data) {
        const cartData = response.data;
        const totalItems = cartData.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
        const totalPrice = cartData.reduce((sum: number, item: CartItem) => sum + (item.quantity * item.product.price), 0);
        
        setShoppingCart({
          items: cartData,
          totalItems: totalItems,
          totalPrice: totalPrice
        });
        console.log({
          items: cartData,
          totalItems: totalItems,
          totalPrice: totalPrice
        });
      }
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchShoppingCart();
  }, [fetchShoppingCart]);

  useFocusEffect(
    useCallback(() => {
      fetchShoppingCart();
    }, [fetchShoppingCart])
  );

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity 
        style={[styles.iconWrapper, styles.bagIcon]}
        onPress={() => navigation.navigate('ShoppingBag', { shoppingCart: shoppingCart?.items })}
      >
        <Icon name="bag-handle-outline" size={28} color="#000" />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{shoppingCart?.totalItems || 0}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ItemShopingCart

const styles = StyleSheet.create({
    bagIcon: {
        marginLeft: 10,
      },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF937B',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },
})