import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { UPDATE_USER_AVATAR, GET_IMG } from '../../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAvatar = ({ navigation }: { navigation: any }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserAvatar = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          if (userData.avatar) {
            const avatarUrl = GET_IMG(userData.avatar);
            setImage(avatarUrl);
          }
        }
      } catch (error) {
        console.error('Error loading user avatar:', error);
      }
    };

    loadUserAvatar();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!image) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh trước khi cập nhật');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const formData = new FormData();
      formData.append('photo', {
        uri: image,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);

      // Support for GIF format
      if (image.toLowerCase().endsWith('.gif')) {
        formData.append('photo', {
          uri: image,
          type: 'image/gif',
          name: 'avatar.gif',
        } as any);
      }

      const response = await UPDATE_USER_AVATAR(userId, formData);
      
      if (response && response.data) {
        // Chỉ lưu vào AsyncStorage sau khi cập nhật thành công
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        Alert.alert('Thành công', 'Ảnh đại diện đã được cập nhật');
        navigation.goBack();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Ionicons name="camera" size={40} color="#888" />
              <Text style={styles.placeholderText}>Chọn ảnh</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUpdateAvatar}>
          <Text style={styles.buttonText}>Cập nhật ảnh đại diện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#888',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});