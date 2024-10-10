import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import Status from './Status';
import Price from './Price';
import Name from './Name';
import Images from './Images';
import { ADD_TO_CART } from '../../../api/apiService';

const colors = ['#000000', '#4CAF50', '#6200EA', '#03A9F4']; // Các màu cho sản phẩm
const sizes = ['S', 'M', 'L']; // Kích thước sản phẩm

interface ProductParams {
  product: {
    id: number;
    photo: any;
    name: string;
    price: string;
    status: string;
    details: string;
    description: string;
    stock_id: number; // Thêm stock_id vào interface
  };
}

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as ProductParams;
  const { id, photo, name, price, status, details, description, stock_id } = product;

  const [selectedColor, setSelectedColor] = useState('#000000'); // Màu được chọn
  const [selectedSize, setSelectedSize] = useState('M'); // Kích thước được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [activeTab, setActiveTab] = useState('description'); // Tab hiện tại

  const renderColorOption = (color: string) => (
    <TouchableOpacity
      key={color}
      style={[styles.colorOption, { backgroundColor: color }, selectedColor === color && styles.selectedColor]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const renderSizeOption = (size: string) => (
    <TouchableOpacity
      key={size}
      style={[styles.sizeOption, selectedSize === size && styles.selectedSize]}
      onPress={() => setSelectedSize(size)}
    >
      <Text style={styles.sizeText}>{size}</Text>
    </TouchableOpacity>
  );

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
        stock_id: stock_id
      };
      // console.log('Data being sent to cart:', cartData);
      const response = await ADD_TO_CART('shopping-cart', cartData);
      console.log('Product added to cart:', response);
      // Handle success (e.g., show a success message, update cart count, etc.)
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image and Product Details */}
      <Images photo={photo} />

      <View style={styles.detailsContainer}>
        {/* Product Title, Description and Price */}
        <View style={styles.titlePriceContainer}>
          <Name name={name}/>
          <Price price={price} />
        </View>
        {/* Status */}
        <Status status={status} />

        {/* Tab Navigation */}
          <TabNavigation details={details} description={description} />
       

        {/* Color Selection */}
        <View style={styles.selectionContainer}>
          {/* Color Selection */}
          <View style={styles.selectionSection}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptionsContainer}>
              {colors.map((color) => renderColorOption(color))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={[styles.selectionSection, styles.rightAlignedSection]}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptionsContainer}>
              {sizes.map((size) => renderSizeOption(size))}
            </View>
          </View>
        </View>

        {/* Quantity Selector */}
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
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
  detailsContainer: {
    padding: 16,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  

  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  selectionSection: {
    flex: 1,
  },
  rightAlignedSection: {
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  selectedColor: {
    borderColor: '#aee2dc',
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSize: {
    borderColor: '#d68585',
    backgroundColor: '#F5F5F5',
  },
  sizeText: {
    fontSize: 16,
    color: '#000',
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
});

export default ProductDetailScreen;
