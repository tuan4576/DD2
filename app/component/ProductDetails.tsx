import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const colors = ['#000000', '#4CAF50', '#6200EA', '#03A9F4']; // Các màu cho sản phẩm
const sizes = ['S', 'M', 'L']; // Kích thước sản phẩm

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState('#000000'); // Màu được chọn
  const [selectedSize, setSelectedSize] = useState('M'); // Kích thước được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm

  const renderColorOption = (color) => (
    <TouchableOpacity
      key={color}
      style={[styles.colorOption, { backgroundColor: color }, selectedColor === color && styles.selectedColor]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const renderSizeOption = (size) => (
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

  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Image and Product Details */}
      <View style={styles.imageContainer}>
        <View style={styles.mainImageWrapper}>
          <Image source={require('../../app/asset/image/tshirt.png')} style={styles.productImage} />
          {/* Back Icon */}
          <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          {/* Heart Icon */}
          <TouchableOpacity style={styles.heartIconContainer}>
            <Icon name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          {/* Product Thumbnails */}
          <View style={styles.thumbnailContainer}>
            <View style={styles.thumbnailWrapper}>
              <Image source={require('../../app/asset/image/tshirt.png')} style={styles.thumbnail} />
            </View>
            <View style={styles.thumbnailWrapper}>
              <Image source={require('../../app/asset/image/tshirt.png')} style={styles.thumbnail} />
            </View>
            <View style={styles.thumbnailWrapper}>
              <Image source={require('../../app/asset/image/tshirt.png')} style={styles.thumbnail} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        {/* Product Title, Description and Price */}
        <View style={styles.titlePriceContainer}>
          <Text style={styles.productTitle}>Cotton queen T-shirt</Text>
          <Text style={styles.productPrice}>$43.00</Text>
        </View>
        <Text style={styles.productDescription}>Áo phông cotton chất lượng cao, thiết kế hiện đại và thoải mái. Phù hợp cho mọi dịp, từ đi chơi đến đi làm.</Text>

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

          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  mainImageWrapper: {
    width: 350,
    height: 480, // Increased height from 450 to 480
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  detailsContainer: {
    marginTop: 20,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  productPrice: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
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
