import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateAvarta from './updateAvarta';

const Profile = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const storedUserId = await AsyncStorage.getItem('userId');

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setName(userData.name || '');
        }
        if (savedEmail) {
          setEmail(savedEmail);
        }
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userData = { name, email };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('savedEmail', email);
      
      Alert.alert(
        "Thông báo",
        "Thông tin đã được cập nhật",
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
    }
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

        <UpdateAvarta navigation={navigation} />

        <View style={styles.infoContainer}>
          <InfoItem label="Họ và tên" value={name} onChangeText={setName} />
          <InfoItem label="Email" value={email} onChangeText={setEmail} />
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
