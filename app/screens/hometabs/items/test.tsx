

// // import apiProduct from "@/app/api/apiProduct";
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { GET_ALL } from "@/app/api/apiService";
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   photo: string;
//   // Add other fields as necessary
// }

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = () => {
//     setIsLoading(true);
//     GET_ALL("products")
//       .then((response: any) => {
//         console.log("Full API response:", response);
        
//         if (response && response.data && Array.isArray(response.data.data)) {
//           const responseData = response.data.data;
//           setProducts(responseData); 
//         } else {
//           console.error("Data received from the API is not an array.");
//         }
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//         setIsLoading(false);
//       });
//   };
//   console.log("dữ liệu",products)

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const renderItem = ({ item }: { item: Product }) => (
//     <View style={styles.productItem}>
//       <Image source={{ uri: item.photo }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productDescription}>{item.description}</Text>
//     </View>
//   );

//   const handleReset = () => {
//     fetchProducts();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>Product List</Text>
//       <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
//         <Text style={styles.resetButtonText}>Reset</Text>
//       </TouchableOpacity>
//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={products}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   productItem: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   productImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   resetButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   resetButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProductList;

import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar 
          backgroundColor="#6dafce" // Màu xanh đậm
          barStyle="light-content" // Màu nội dung là trắng
          translucent={false} // Không làm thanh trạng thái trong suốt
        />
        {/* Nội dung khác của ứng dụng */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0080FF', 
  },
  container: {
    flex: 1,
    backgroundColor: '#6dafce', 
  },
});

export default App;


