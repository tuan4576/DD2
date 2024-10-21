import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigation from './TabNavigation';
import Status from './Status';
import Price from './Price';
import Name from './Name';
import Images from './Images';
import { ADD_TO_CART, POST_WISHLIST, GET_WISHLIST } from '../../../api/apiService';

interface ProductParams {
  product: {
    id: number;
    photo: any;
    name: string;
    price: string;
    status: string;
    details: string;
    description: string;
    stock_id: number;
    wishlist_id?: number;
  };
}

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as ProductParams;
  const { id, photo, name, price, status, details, description, stock_id, wishlist_id } = product;
  const [quantity, setQuantity] = useState(1);
  const [cartQuantities, setCartQuantities] = useState<{[key: number]: number}>({});
  // const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    loadCartQuantities();
    loadWishlistItems();
  }, []);

  const loadCartQuantities = async () => {
    try {
      const savedQuantities = await AsyncStorage.getItem('cartQuantities');
      if (savedQuantities) {
        setCartQuantities(JSON.parse(savedQuantities));
      }
    } catch (error) {
      console.error('Error loading cart quantities:', error);
    }
  };

  const saveCartQuantities = async (newQuantities: {[key: number]: number}) => {
    try {
      await AsyncStorage.setItem('cartQuantities', JSON.stringify(newQuantities));
    } catch (error) {
      console.error('Error saving cart quantities:', error);
    }
  };

  const loadWishlistItems = async () => {
    try {
      const response = await GET_WISHLIST('wishlist');
      const wishlistProducts = response.data;
      const wishlistIds = wishlistProducts.map((item: any) => item.id);
      // setWishlistItems(wishlistIds);
      setIsInWishlist(wishlistIds.includes(id));
    } catch (error) {
      console.error('Error loading wishlist items:', error);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartData = {
        quantity: quantity,
        stock_id: stock_id,
      };
      const response = await ADD_TO_CART('shopping-cart', cartData);
      console.log('Product added to cart:', cartData);
      
      // Update cartQuantities
      const newQuantities = {
        ...cartQuantities,
        [stock_id]: (cartQuantities[stock_id] || 0) + quantity
      };
      setCartQuantities(newQuantities);
      saveCartQuantities(newQuantities);
      
      setMessage('Sản phẩm đã được thêm vào giỏ hàng');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error) {
      // console.error('Failed to add product to cart:', error);
      setMessage('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      if (!isInWishlist) {
        const wishlistData = {
          product_id: id
        };
        await POST_WISHLIST('wishlist', wishlistData);
        setIsInWishlist(true);
        setMessage('Sản phẩm đã được thêm vào danh sách yêu thích');
      } else {
        // Remove from wishlist
        // const newWishlist = wishlistItems.filter(item => item !== id);
        // setWishlistItems(newWishlist);
        // setIsInWishlist(false);
        // setMessage('Sản phẩm đã được xóa khỏi danh sách yêu thích');
      }
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
      // Update wishlist items after toggling
      await loadWishlistItems();
    } catch (error) {
      // console.error('Failed to toggle wishlist:', error);
      setMessage('Sản phẩm đã có trong danh sách yêu thích');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Images photo={photo} />

        <View style={styles.detailsContainer}>
          <View style={styles.titlePriceContainer}>
            <Name name={name}/>
            <Price price={price} />
          </View>
          <Status status={status} />

          <TabNavigation details={details} description={description} />
          <TouchableOpacity style={styles.wishlistButton} onPress={handleToggleWishlist}>
            <Icon name={isInWishlist ? "heart" : "heart-outline"} size={24} color={isInWishlist ? "#FF0000" : "#000"} />
            <Text style={styles.wishlistText}>Thêm vào yêu thích</Text>
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                <Icon name="remove" size={20} color="#000" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                <Icon name="add" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </ScrollView>
      
      {isVisible && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  messageText: {
    color: '#fff',
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#FF937B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
  },
  wishlistText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default ProductDetailScreen;
