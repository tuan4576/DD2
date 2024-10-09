import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Zoom from '../component/Zoom'

interface ProductImageProps {
  photo: any;
}

function ProductImage({ photo }: ProductImageProps) {
  const navigation = useNavigation<any>()

  const handleZoom = () => {
    navigation.navigate('Zoom', { imageSource: photo })
  }

  return (
    <View style={styles.imageContainer}>
      <View style={styles.mainImageWrapper}>
        <Image source={photo} style={styles.productImage} />
        {/* Back Icon */}
        <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartIconContainer}>
          <Icon name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
        {/* Zoom Icon */}
        <TouchableOpacity style={styles.zoomIconContainer} onPress={handleZoom}>
          <Icon name="expand-outline" size={24} color="#000" />
        </TouchableOpacity>
        {/* Product Thumbnails */}
        {/* <View style={styles.thumbnailContainer}>
          <View style={styles.thumbnailWrapper}>
            <Image source={photo} style={styles.thumbnail} />
          </View>
          <View style={styles.thumbnailWrapper}>
            <Image source={photo} style={styles.thumbnail} />
          </View>
          <View style={styles.thumbnailWrapper}>
            <Image source={photo} style={styles.thumbnail} />
          </View>
        </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    padding: 16,
  },
  mainImageWrapper: {
    width:400,
    height: 550,
    borderRadius: 15,
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
  zoomIconContainer: {
    position: 'absolute',
    top: 60,
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
})

export default ProductImage
