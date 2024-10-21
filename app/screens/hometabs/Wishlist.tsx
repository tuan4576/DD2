import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { GET_WISHLIST, DELETE_WISHLIST_ITEM } from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemProductWishlist from './wishlist/itemProductWishlist';

const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await GET_WISHLIST('wishlist');
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch wishlist items:', error);
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { 
          text: "Xóa", 
          onPress: async () => {
            try {
              await DELETE_WISHLIST_ITEM('wishlist', id);
              const newItems = items.filter(item => item.id !== id);
              setItems(newItems);
              
              // Update AsyncStorage
              const savedWishlist = await AsyncStorage.getItem('wishlistItems');
              if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                const updatedWishlist = parsedWishlist.filter((itemId: string) => itemId !== id);
                await AsyncStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
              }
            } catch (error) {
              console.error('Failed to remove item from wishlist:', error);
              Alert.alert("Lỗi", "Không thể xóa sản phẩm. Vui lòng thử lại sau.");
            }
          }
        }
      ]
    );
  };

  const handleShopNow = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchWishlistItems().then(() => setRefreshing(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.header}>Danh sách yêu thích</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {items.length > 0 ? (
          items.map((item) => (
            <ItemProductWishlist
              key={item.id.toString()}
              item={item}
              onRemove={handleRemove}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="heart" size={80} color="#FF937B" />
            <Text style={styles.emptyText}>Danh sách yêu thích trống</Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={handleShopNow}>
              <Text style={styles.shopNowText}>Chọn sản phẩm yêu thích</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#6dd1da',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 50,
  },
});
