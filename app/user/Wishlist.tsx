import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';

const favoriteItems = [
  { id: '1', name: 'Cotton queen T-shirt', price: '$43.00', image: require('../asset/image/Clothing01.png') },
  { id: '2', name: 'Áo khoác denim', price: '$65.00', image: require('../asset/image/Clothing02.png') },
  // Add more favorite items as needed
];

const FavoriteItem = ({ item, onRemove }: { item: any, onRemove: (id: string) => void }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate('ProductDetails' as never, { item } as never);
  };

  return (
    <TouchableOpacity onPress={handleItemPress} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Icon name="close-circle" size={24} color="#FF937B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Favorites = () => {
  const [items, setItems] = useState(favoriteItems);
  const navigation = useNavigation();

  const handleRemove = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleShopNow = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Danh sách yêu thích</Text>
      </View>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <FavoriteItem item={item} onRemove={handleRemove} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="heart" size={80} color="#FF937B" />
          <Text style={styles.emptyText}>Danh sách yêu thích trống</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={handleShopNow}>
            <Text style={styles.shopNowText}>Chọn sản phẩm yêu thích</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF937B',
    fontWeight: '700',
  },
  removeButton: {
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: '#FF937B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
