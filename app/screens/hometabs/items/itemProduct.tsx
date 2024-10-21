import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_CART, POST_WISHLIST, GET_WISHLIST, GET_IMG } from '@/app/api/apiService';

interface ItemProps {
  navigation: any;
  photo: any;
  name: string;
  price: number;
  description?: string;
  details?: string;
  status?: string;
  stock_id: number;
  id: number;
  wishlist_id?: number;
}

const ItemProduct: React.FC<ItemProps> = ({ navigation, photo, name, price, description, details, status, stock_id, id, wishlist_id }) => {
  const [isInWishlist, setIsInWishlist] = useState(!!wishlist_id);

  useEffect(() => {
    checkWishlistStatus();
  }, []);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await GET_WISHLIST('wishlist');
      const wishlistItems = response.data;
      const isItemInWishlist = wishlistItems.some((item: any) => item.id === id);
      setIsInWishlist(isItemInWishlist);
    } catch (error) {
      console.error('Failed to check wishlist status:', error);
      setIsInWishlist(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartData = {
        quantity: 1,
        stock_id: stock_id
      };
      const response = await ADD_TO_CART('shopping-cart', cartData);
      console.log('Product added to cart:', response);
      
      // Update cartQuantities in AsyncStorage
      const savedQuantities = await AsyncStorage.getItem('cartQuantities');
      const cartQuantities = savedQuantities ? JSON.parse(savedQuantities) : {};
      const newQuantities = {
        ...cartQuantities,
        [stock_id]: (cartQuantities[stock_id] || 0) + 1
      };
      await AsyncStorage.setItem('cartQuantities', JSON.stringify(newQuantities));
    } catch (error) {
      console.error('Failed to add product to cart:', error);
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
        console.log('Product added to wishlist');
      } else {
        // Here you would typically call an API to remove the item from the wishlist
        // Since that's not provided, we'll just toggle the state
        setIsInWishlist(false);
        console.log('Product removed from wishlist');
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ItemProductDetail', { product: { photo, name, price, description, details, status, stock_id, id, wishlist_id } })}
    >
      <View style={styles.imageContainer}>
        <Image source={photo} style={styles.productImage} />
        <TouchableOpacity style={styles.heartIconContainer} onPress={handleToggleWishlist}>
          <Icon name={isInWishlist ? "heart" : "heart-outline"} size={16} color={isInWishlist ? "#FF0000" : "#000"} />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={1}>{name}</Text>
        <View style={styles.priceCartContainer}>
          <Text style={styles.productPrice}>{formatPrice(price)}</Text>
          <TouchableOpacity style={styles.cartIconContainer} onPress={handleAddToCart}>
            <Icon name="bag-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ItemProduct

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetails: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  priceCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
  },
  cartIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
})