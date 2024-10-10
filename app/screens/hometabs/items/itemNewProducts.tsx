import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const itemNewProducts = ({ navigation }: { navigation: any }) => {
    const newProducts = [
        { 
          id: 'n1', 
          title: 'Áo polo mới', 
          price: '450.000đ', 
          image: require('../../../asset/image/Clothing01.png'),
          description: 'Áo polo mới với chất liệu cotton cao cấp, thoáng mát và thấm hút mồ hôi tốt.'
        },
        { 
          id: 'n2', 
          title: 'Quần short kaki', 
          price: '350.000đ', 
          image: require('../../../asset/image/Clothing02.png'),
          description: 'Quần short kaki phong cách, phù hợp cho mùa hè năng động.'
        },
        { 
          id: 'n3', 
          title: 'Giày sneaker', 
          price: '1.200.000đ', 
          image: require('../../../asset/image/Clothing03.png'),
          description: 'Giày sneaker thời trang, êm ái, phù hợp cho mọi hoạt động hàng ngày.'
        },
        // Thêm các sản phẩm mới khác nếu cần
      ];
      
    return (
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
  )
}

export default itemNewProducts

const styles = StyleSheet.create({
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
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
    
})