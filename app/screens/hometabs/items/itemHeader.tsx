import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

const itemHeader = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.header}>
          <View style={styles.userInfo}>
            {/* <Image source={require('../../asset/image/Avatar.png')} style={styles.avatarImage} /> */}
            <Text style={styles.greeting}>Xin chào, Selina!</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity 
              style={[styles.iconWrapper, styles.bagIcon]}
              onPress={() => navigation.navigate('ShoppingBag')}
            >
              <Icon name="bag-handle-outline" size={28} color="#000" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
  )
}
export default itemHeader

const styles = StyleSheet.create({
    bagIcon: {
        marginLeft: 10,
      },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 16,
      },
      avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      greeting: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
      },
      notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF937B',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },
      
})