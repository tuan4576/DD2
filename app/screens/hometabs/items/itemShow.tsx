import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const itemShow = ({ navigation }: { navigation: any }) => {
    const data = [
  { id: '1', title: 'Áo khoác bomber', price: '1.200.000đ', image: require('../../../asset/image/Clothing01.png') },
  { id: '2', title: 'Áo khoác da', price: '1.500.000đ', image: require('../../../asset/image/Clothing02.png') },
  { id: '3', title: 'Áo khoác denim', price: '900.000đ', image: require('../../../asset/image/Clothing03.png') },
  { id: '4', title: 'Áo khoác gió', price: '800.000đ', image: require('../../../asset/image/Clothing04.png') },
];
  return (
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
  )
}

export default itemShow

const styles = StyleSheet.create({
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
})