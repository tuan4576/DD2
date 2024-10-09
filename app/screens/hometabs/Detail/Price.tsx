import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PriceProps {
  price: string;
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <View style={styles.priceContainer}>
      <Icon name="pricetag-outline" size={24} color="#FF6347" style={styles.priceIcon} />
      <View style={styles.priceTextContainer}>
        <Text style={styles.priceLabel}>Giá bán:</Text>
        <Text style={styles.productPrice}>{price} đ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: '#FF6347',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  priceIcon: {
    marginRight: 10,
  },
  priceTextContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Price;
