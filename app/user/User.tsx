import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyenvana@example.com');
  const [phone, setPhone] = useState('0123456789');
  const [address, setAddress] = useState('123 Đường ABC, Quận XYZ, TP. HCM');
  const [avatarUri, setAvatarUri] = useState('../../app/asset/image/Avatar.png');

  const handleSave = () => {
    // Here you would typically save the changes to a backend or local storage
    Alert.alert(
      "Thông báo",
      "Thông tin đã được cập nhật",
      [
        { text: "OK", onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleImagePick = async () => {
    Alert.alert(
      "Chọn ảnh",
      "Bạn muốn chọn ảnh từ đâu?",
      [
        {
          text: "Máy ảnh",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setAvatarUri(result.assets[0].uri);
            }
          }
        },
        {
          text: "Thư viện",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setAvatarUri(result.assets[0].uri);
            }
          }
        },
        {
          text: "Hủy",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.avatarContainer}>
          <Image
            source={avatarUri.startsWith('../../') ? require('../../app/asset/image/Avatar.png') : { uri: avatarUri }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={handleImagePick}>
            <Ionicons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <InfoItem label="Họ và tên" value={name} onChangeText={setName} />
          <InfoItem label="Email" value={email} onChangeText={setEmail} />
          <InfoItem label="Số điện thoại" value={phone} onChangeText={setPhone} />
          <InfoItem label="Địa chỉ" value={address} onChangeText={setAddress} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const InfoItem = ({ label, value, onChangeText }: { label: string; value: string; onChangeText: (text: string) => void }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <TextInput
      style={styles.infoInput}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    right: '50%',
    bottom: -10,
    backgroundColor: '#FF937B',
    borderRadius: 15,
    padding: 5,
    marginRight: -50,
  },
  infoContainer: {
    padding: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  infoInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#FF937B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
