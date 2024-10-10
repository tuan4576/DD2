import { StyleSheet, Text, View  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_IMG } from '../../../api/apiService';
import { Image } from 'react-native';
import React, { useState, useEffect } from 'react'

const itemAvatar = () => {
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
  
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const userAvatar = await AsyncStorage.getItem('userAvatar');
          const userData = await AsyncStorage.getItem('userData');
          if (userAvatar) {
            setAvatarUri(userAvatar);
          }
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUserName(parsedUserData.name || 'User');
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      };
  
      loadUserData();
    }, []);
  return (
    <View style={styles.userInfo}>
        {avatarUri && (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: GET_IMG(avatarUri) }} style={styles.avatarImage} />
          </View>
        )}
        <Text style={styles.greeting}>Xin chào: {userName}</Text>
      </View>
  )
}

export default itemAvatar

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatarContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#82b6ea',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      greeting: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
})