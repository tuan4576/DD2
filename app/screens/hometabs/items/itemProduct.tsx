import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

interface ItemProps {
  navigation: any;
  photo: any;
  name: string;
  price: string;
  description?: string;
  details?: string;
  status?: string;
  stock_id: number;
}

const ItemProduct: React.FC<ItemProps> = ({ navigation, photo, name, price, description, details, status, stock_id }) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ItemProductDetail', { product: { photo, name, price, description, details, status, stock_id } })}
    >
      <View style={styles.imageContainer}>
        <Image source={photo} style={styles.productImage} />
        <TouchableOpacity style={styles.heartIconContainer}>
          <Icon name="heart-outline" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={1}>{name}</Text>
        <View style={styles.priceCartContainer}>
          <Text style={styles.productPrice}>{price}</Text>
          <TouchableOpacity style={styles.cartIconContainer}>
            <Icon name="cart-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>
        {/* {status && <Text style={styles.productStatus}>{status}</Text>} */}
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