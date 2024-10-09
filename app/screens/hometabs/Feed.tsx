import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, FlatList, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';

import Swiper from 'react-native-swiper';
import ItemProduct from './items/itemProduct';
import ItemCategory from './items/itemCategory';
import { GET_ALL, GET_IMG, GET_CATEGORIES } from "../../api/apiService"; 
import ItemSearch from './items/itemSearch';
import ItemHeader from './items/itemHeader';

interface ItemProps {
  navigation: any;
  photo: string;
  name: string;
  price: string;
  status: string;
  details: string;
  description: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

const Item: React.FC<ItemProps> = ({ navigation, photo, name, price, status, details, description }) => (
  <ItemProduct 
    navigation={navigation}
    photo={{ uri: GET_IMG(photo) }}
    name={name}
    price={price}
    status={status}
    details={details}
    description={description}
  />
);

const Category: React.FC<CategoryProps> = ({ id, name }) => (
  <ItemCategory 
    id={id}
    name={name}
  />
);
const data = [
  { id: '1', title: 'Áo khoác bomber', price: '1.200.000đ', image: require('../../asset/image/Clothing01.png') },
  { id: '2', title: 'Áo khoác da', price: '1.500.000đ', image: require('../../asset/image/Clothing02.png') },
  { id: '3', title: 'Áo khoác denim', price: '900.000đ', image: require('../../asset/image/Clothing03.png') },
  { id: '4', title: 'Áo khoác gió', price: '800.000đ', image: require('../../asset/image/Clothing04.png') },
  // Thêm sản phẩm khác nếu cần
];


const bannerData = [
  { id: '1', image: require('../../asset/image/hinh01.jpeg') },
  { id: '2', image: require('../../asset/image/hinh02.jpeg') }, 
  { id: '3', image: require('../../asset/image/hinh03.webp') },
  { id: '4', image: require('../../asset/image/hinh04.jpeg') },
  { id: '5', image: require('../../asset/image/hinh05.webp') },
  // Thêm các banner khác nếu cần
];

const newProducts = [
  { 
    id: 'n1', 
    title: 'Áo polo mới', 
    price: '450.000đ', 
    image: require('../../asset/image/Clothing01.png'),
    description: 'Áo polo mới với chất liệu cotton cao cấp, thoáng mát và thấm hút mồ hôi tốt.'
  },
  { 
    id: 'n2', 
    title: 'Quần short kaki', 
    price: '350.000đ', 
    image: require('../../asset/image/Clothing02.png'),
    description: 'Quần short kaki phong cách, phù hợp cho mùa hè năng động.'
  },
  { 
    id: 'n3', 
    title: 'Giày sneaker', 
    price: '1.200.000đ', 
    image: require('../../asset/image/Clothing03.png'),
    description: 'Giày sneaker thời trang, êm ái, phù hợp cho mọi hoạt động hàng ngày.'
  },
  // Thêm các sản phẩm mới khác nếu cần
];

const EcommerceScreen = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Thực hiện các tác vụ làm mới dữ liệu ở đây
    // Ví dụ: fetchNewData().then(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 1400);
  }, []);

  const renderProduct = (item: { id: string; title: string; price: string; image: any }) => (
    <View style={styles.productCard} key={item.id}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );
  // const [coffeeData, setCoffeeData] = useState([]); 
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => { 
    GET_ALL("products") 
      .then((response) => { 
        console.log("Response từ API:", response);
        if (!response || !response.data) {
          console.error("Response or response.data is undefined", response);
          return;
        }
        const responseData = response.data;
        if (Array.isArray(responseData)) { 
          setProducts(responseData as any[]); 
          // console.log('Coffee data:', responseData);
        } else if (typeof responseData === 'object') {
          const arrayData = Object.values(responseData).find(value => Array.isArray(value));
          if (arrayData) {
            setProducts(arrayData as any[]);
            console.log('Coffee data:', arrayData);
          } else {
            console.error("Data received from the API is not in a supported format.");
            setProducts([]);
          }
        } else { 
          console.error("Data received from the API is not in a supported format."); 
          setProducts([]);
        }
      }) 
      .catch((error) => { 
        console.error("Error fetching data: ", error); 
        setProducts([]);
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  }, []); 
  useEffect(() => {
    GET_CATEGORIES("categories")
      .then((response) => {
        console.log("Categories response:", response);
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            setCategory(response.data);
          } else if (typeof response.data === 'object') {
            const categoryArray = Object.values(response.data).find(value => Array.isArray(value));
            if (categoryArray) {
              setCategory(categoryArray);
            } else {
              console.error("Category data is not in a supported format.");
              setCategory([]);
            }
          } else {
            console.error("Category data is not in a supported format.");
            setCategory([]);
          }
        } else {
          console.error("Invalid category response:", response);
          setCategory([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategory([]);
      });
  }, []);
  return (  
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#985445"]}
            tintColor="#985445"
          />
        }
      >
        {/* Header */}
        <ItemHeader navigation={navigation}/>

        {/* Search Bar */}
        <ItemSearch/>
        
        {/* Promo Banner */}
        <View style={styles.swiperContainer}>
          <Swiper
            autoplay
            autoplayTimeout={5}
            showsPagination={true}
            height={170}
            activeDotColor="#985445"
          >
            {bannerData.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={item.image} style={styles.promoBannerImage} />
              </View>
            ))}
          </Swiper>
        </View>

        {/* Category Filter */}
         <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           style={styles.categoryScrollView}
           contentContainerStyle={styles.categoryContainer}
         >
           {categories.map((category) => (
             <ItemCategory 
               key={category.id}
               id={category.id}
               name={category.name}
             />
           ))}
         </ScrollView>
        {/* Product List */}
        <View style={styles.productList}>
          {products.map((item) => (
            <Item
              key={item.id}
              navigation={navigation}
              photo={item.photo}
              name={item.name}
              price={item.price}
              status={item.status}
              details={item.details}
              description={item.description}
            />
          ))}
        </View>
         
      {/* New Products Introduction */}
      <View style={styles.newProductsContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm mới ra mắt</Text>
          <FlatList
            data={newProducts}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.newProductItem}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
              >
                <Image source={item.image} style={styles.newProductImage} />
                <View style={styles.newProductDetails}>
                  <Text style={styles.newProductTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.newProductPrice}>{item.price}</Text>
                  <Text style={styles.newProductDescription} numberOfLines={2}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
       

        <View style={styles.recentlyViewedContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm được xem nhiều</Text>
          <FlatList
            data={data.slice(0, 5)} // Assuming 'data' contains all products, we'll show top 5
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentlyViewedItem}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
              >
                <Image source={item.image} style={styles.recentlyViewedImage} />
                <View style={styles.recentlyViewedDetails}>
                  <Text style={styles.recentlyViewedTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.recentlyViewedPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.recentlyViewedContainer1}>
          <Text style={styles.sectionTitle}>Sản phẩm được mua nhiều nhất</Text>
          <FlatList
            data={data.slice(0, 5)} // Assuming 'data' contains all products, we'll show top 5
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentlyViewedItem}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
              >
                <Image source={item.image} style={styles.recentlyViewedImage} />
                <View style={styles.recentlyViewedDetails}>
                  <Text style={styles.recentlyViewedTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.recentlyViewedPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    width: '48%',
    position: 'relative',
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
    overflow: 'scroll',
  },
  categoryScrollView: {
    flexGrow: 0,
  },
  

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 50,
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
  

  swiperContainer: {
    height: 180,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  newProductsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  newProductItem: {
    width: 250,
    marginRight: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  newProductImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  newProductDetails: {
    marginTop: 10,
  },
  newProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newProductPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  newProductDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },


  
  recentlyViewedContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  recentlyViewedContainer1: {
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentlyViewedItem: {
    width: 120,
    marginRight: 10,
  },
  recentlyViewedImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  recentlyViewedDetails: {
    marginTop: 5,
  },
  recentlyViewedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentlyViewedPrice: {
    fontSize: 12,
    color: '#666',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default EcommerceScreen;