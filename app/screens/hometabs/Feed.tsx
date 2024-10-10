import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, FlatList, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import ItemProduct from './items/itemProduct';
import ItemCategory from './items/itemCategory';
import { GET_ALL, GET_IMG, GET_CATEGORIES } from "../../api/apiService"; 
import ItemSearch from './items/itemSearch';
import ItemShopingCart from './items/itemShopingCart';
import ItemPromo from './items/itemPromo';
import ItemNewProducts from './items/itemNewProducts';
import ItemShow from './items/itemShow';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './component/Spinner';
import ItemAvatar from './items/itemAvatar';

interface ItemProps {
  navigation: any;
  photo: string;
  name: string;
  price: string;
  status: string;
  details: string;
  description: string;
  stock_id: number;
}
interface CategoryProps {
  id: string;
  name: string;
}
const Item: React.FC<ItemProps> = ({ navigation, photo, name, price, status, details, description, stock_id }) => (
  <ItemProduct 
    navigation={navigation}
    photo={{ uri: GET_IMG(photo) }}
    name={name}
    price={price}
    status={status}
    details={details}
    description={description}
    stock_id={stock_id}
  />
);
const Category: React.FC<CategoryProps> = ({ id, name }) => (
  <ItemCategory 
    id={id}
    name={name}
  />
);
interface ShoppingCartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  photo: string;
}

interface ShoppingCart {
  items: ShoppingCartItem[];
  totalItems: number;
  totalPrice: number;
}


const EcommerceScreen = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1400);
  }, []);

  const renderProduct = (item: { id: string; title: string; price: string; image: any; stock_id: number }) => (
    <View style={styles.productCard} key={item.id}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );
  const [products, setProducts] = useState<Array<any>>([]);
  const [categories, setCategory] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    GET_CATEGORIES("categories")
      .then((response) => {
        // console.log("Categories response:", response);
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            setCategory(response.data);
          } else if (typeof response.data === 'object') {
            const categoryArray = Object.values(response.data).find(value => Array.isArray(value));
            if (categoryArray) {
              setCategory(categoryArray);
            } else {
              // console.error("Category data is not in a supported format.");
              setCategory([]);
            }
          } else {
            // console.error("Category data is not in a supported format.");
            setCategory([]);
          }
        } else {
          // console.error("Invalid category response:", response);
          setCategory([]);
        }
      })
      .catch((error) => {
        // console.error("Error fetching categories:", error);
        setCategory([]);
      });
  }, []);
  
  useEffect(() => { 
    loadProducts();
  }, []); 

  const loadProducts = (page = 1) => {
    setIsLoadingMore(true);
    GET_ALL(`products?page=${page}`) 
      .then((response) => { 
        if (!response || !response.data) {
          return;
        }
        const responseData = response.data;
        let newProducts = [];
        if (Array.isArray(responseData)) { 
          newProducts = responseData;
        } else if (typeof responseData === 'object') {
          const arrayData = Object.values(responseData).find(value => Array.isArray(value));
          if (arrayData) {
            newProducts = arrayData;
          }
        }
        if (page === 1) {
          setProducts(newProducts);
        } else {
          setProducts(prevProducts => [...prevProducts, ...newProducts]);
        }
        setCurrentPage(page);
      }) 
      .catch((error) => { 
        console.error("Error fetching data: ", error); 
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingMore(false);
      }); 
  };


  const loadMoreProducts = () => {
    if (!isLoadingMore) {
      loadProducts(currentPage + 1);
    }
  };

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
        }>
        {/* Header */}
        <View style={styles.header}>
        <ItemAvatar/>
        <ItemShopingCart navigation={navigation}/>
        </View>
        {/* Search Bar */}
        <ItemSearch/>
        {/* Promo Banner */}
        <ItemPromo/>
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
              stock_id={item.stock_id}
            />
          ))}
        </View> 
        <View style={styles.seeMoreContainer}>
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={loadMoreProducts}
            disabled={isLoadingMore}
          >
            <Text style={styles.seeMoreButtonText}>
              {isLoadingMore ? (
                <>
                  <Text style={styles.loadingText}>Đang tải </Text>
                  <Spinner size="small" color="#985445" />
                </>
              ) : 'Xem thêm'}
            </Text>
            {!isLoadingMore && (
              <Icon name="chevron-down-outline" size={20} color="#985445" style={styles.seeMoreIcon} />
            )}
          </TouchableOpacity>
        </View>
      {/* New Products Introduction */}
      <ItemNewProducts navigation={navigation}/>

      <ItemShow navigation={navigation}/>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
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
  
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  seeMoreContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  seeMoreButton: {
    backgroundColor: '#FFF0ED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#985445',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreButtonText: {
    color: '#985445',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  seeMoreIcon: {
    marginLeft: 5,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default EcommerceScreen;
// useEffect(() => { 
  //   GET_ALL("products") 
  //     .then((response) => { 
  //       // console.log("Response từ API:", response);
  //       if (!response || !response.data) {
  //         // console.error("Response or response.data is undefined", response);
  //         return;
  //       }
  //       const responseData = response.data;
  //       if (Array.isArray(responseData)) { 
  //         setProducts(responseData as any[]); 
  //         // console.log('Coffee data:', responseData);
  //       } else if (typeof responseData === 'object') {
  //         const arrayData = Object.values(responseData).find(value => Array.isArray(value));
  //         if (arrayData) {
  //           setProducts(arrayData as any[]);
  //           // console.log('Coffee data:', arrayData);
  //         } else {
  //           // console.error("Data received from the API is not in a supported format.");
  //           setProducts([]);
  //         }
  //       } else { 
  //         // console.error("Data received from the API is not in a supported format."); 
  //         setProducts([]);
  //       }
  //     }) 
  //     .catch((error) => { 
  //       // console.error("Error fetching data: ", error); 
  //       setProducts([]);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     }); 
  // }, []); 
