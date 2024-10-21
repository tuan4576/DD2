import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { SEARCH_PRODUCTS, GET_IMG } from '@/app/api/apiService';

interface SearchProps {
  navigation: NavigationProp<any>;
}

interface Product {
  id: number;
  name: string;
  price: number;
  photo: string;
  category: string;
  description?: string;
  details?: string;
  status?: string;
  stock_id: number;
  wishlist_id?: number;
}

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await SEARCH_PRODUCTS(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ItemProductDetail', {
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          photo: { uri: GET_IMG(item.photo) },
          category: item.category,
          description: item.description,
          details: item.details,
          status: item.status,
          stock_id: item.stock_id,
          wishlist_id: item.wishlist_id
        }
      })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyList = () => {
    if (!hasSearched) return null;
    return (
      <View style={styles.emptyContainer}>
        <Icon name="search-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Sản phẩm tìm kiếm không tồn tại</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Bạn đang cần tìm gì..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Icon name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search-outline" size={24} color="#FF937B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
            <Icon name="filter-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        {showFilter && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>Bộ lọc</Text>
            <Text style={styles.filterOption}>Giá</Text>
            <Text style={styles.filterOption}>Danh mục</Text>
            <Text style={styles.filterOption}>Thương hiệu</Text>
          </View>
        )}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={renderEmptyList}
            contentContainerStyle={hasSearched && searchResults.length === 0 ? styles.emptyListContent : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  filterContainer: {
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterOption: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});