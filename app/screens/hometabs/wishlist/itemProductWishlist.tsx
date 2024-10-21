import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_IMG } from '@/app/api/apiService';

interface ItemProductWishlistProps {
  item: {
    id: string;
    name: string;
    price: number;
    photo: any;
    status: string;
    details: string;
    description: string;
    stock_id: number;
    product_id: string;
  };
  onRemove: (id: string) => void;
  navigation: any;
}

const ItemProductWishlist: React.FC<ItemProductWishlistProps> = ({ item, onRemove, navigation }) => {
  const { id, name, price, photo, status, details, description, stock_id, product_id } = item;

  const handlePress = () => {
    navigation.navigate('ItemProductDetail', { product: { photo: { uri: GET_IMG(photo) }, name, price, description, details, status, stock_id, id: product_id, wishlist_id: id } });
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: GET_IMG(photo) }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(id)}>
        <Icon name="close-circle-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemProductWishlist;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#FF937B',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});