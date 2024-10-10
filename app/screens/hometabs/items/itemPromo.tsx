import { StyleSheet, Text, View , Image} from 'react-native'
import Swiper from 'react-native-swiper';
import React from 'react'
import { SliderIntro } from '../../../api/apiService';

const itemPromo = () => {
    const bannerData = [
        { id: '1', image: 'hinh01.jpeg' },
        { id: '2', image: 'hinh02.jpeg' }, 
        { id: '3', image: 'hinh03.webp' },
        { id: '4', image: 'hinh04.jpeg' },
        { id: '5', image: 'hinh05.webp' },
        // Thêm các banner khác nếu cần
      ];
  return (
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
                <Image source={{ uri: SliderIntro() + item.image }} style={styles.promoBannerImage} />
              </View>
            ))}
          </Swiper>
        </View>
  )
}

export default itemPromo

const styles = StyleSheet.create({
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
    
})