import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you are using Ionicons for icons

const data = [
  { id: '1', title: 'Áo khoác bomber', price: '1.200.000đ', image: require('../../asset/image/Clothing01.png') },
  { id: '2', title: 'Áo khoác da', price: '1.500.000đ', image: require('../../asset/image/Clothing02.png') },
  { id: '3', title: 'Áo khoác denim', price: '900.000đ', image: require('../../asset/image/Clothing03.png') },
  { id: '4', title: 'Áo khoác gió', price: '800.000đ', image: require('../../asset/image/Clothing04.png') },
  // Thêm sản phẩm khác nếu cần
];

const categories = ['Tất cả', 'Áo khoác', 'Quần jean', 'Giày', 'Áo thun', 'Áo hoodie', 'Phụ kiện'];

const EcommerceScreen = ({ navigation }: { navigation: any }) => {
  const renderProduct = (item: { id: string; title: string; price: string; image: any }) => (
    <View style={styles.productCard} key={item.id}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={require('../../asset/image/Avatar.png')} style={styles.avatarImage} />
          <Text style={styles.greeting}>Xin chào, Selina!</Text>
        </View>
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="heart-outline" size={28} color="#000" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={[styles.iconWrapper, styles.bagIcon]}
            onPress={() => navigation.navigate('ShoppingBag')}
          >
            <Icon name="bag-handle-outline" size={28} color="#000" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#aaa" />
        <TextInput style={styles.searchInput} placeholder="Bạn đang tìm gì..." />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Promo Banner */}
      <ImageBackground 
        source={require('../../asset/image/Slider01.png')}
        style={styles.promoBanner}
        imageStyle={styles.promoBannerImage}
      >
        <View style={styles.promoContent}>
          <Text style={styles.promoText}>Mua sắm cùng chúng tôi!</Text>
          <Text style={styles.promoOffer}>Giảm giá 40% cho sản phẩm</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Mua ngay ➔</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Category Filter */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
      />

      {/* Product List */}
      <View style={styles.productList}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={item.image} style={styles.productImage} />
            <TouchableOpacity style={styles.heartIconContainer}>
              <Icon name="heart-outline" size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <View style={styles.priceCartContainer}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.cartIconContainer}>
                  <Icon name="cart-outline" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  bagIcon: {
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
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  filterButton: {
    padding: 5,
  },
  promoBanner: {
    height: 170,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  promoBannerImage: {
    resizeMode: 'cover',
  },
  promoContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  promoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  promoOffer: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 5,
  },
  shopNowButton: {
    marginTop: 10,
  },
  shopNowText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryFilter: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  productCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '48%',
    marginBottom: 16,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  priceCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    color: '#000',
  },
  cartIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EcommerceScreen;