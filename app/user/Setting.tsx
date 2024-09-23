import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Setting = ({ navigation }: { navigation: any }) => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const SettingItem = ({ icon, title, onPress }: { icon: string; title: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.settingTitle}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#333" />
    </TouchableOpacity>
  );

  const ToggleSettingItem = ({ icon, title, value, onValueChange }: { icon: string; title: string; value: boolean; onValueChange: (value: boolean) => void }) => (
    <View style={styles.settingItem}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.settingTitle}>{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.settingsList}>
        <SettingItem 
          icon="key-outline" 
          title="Đổi mật khẩu" 
          onPress={() => {/* Navigate to change password screen */}}
        />
        <ToggleSettingItem 
          icon="finger-print-outline" 
          title="Đăng nhập bằng vân tay" 
          value={isFingerprintEnabled}
          onValueChange={setIsFingerprintEnabled}
        />
        <ToggleSettingItem 
          icon="notifications-outline" 
          title="Nhận thông báo" 
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
        />
        <SettingItem 
          icon="refresh-outline" 
          title="Cập nhật ứng dụng" 
          onPress={() => {/* Check for updates */}}
        />
        <SettingItem 
          icon="trash-outline" 
          title="Yêu cầu xóa tài khoản" 
          onPress={() => {/* Navigate to account deletion confirmation */}}
        />
      </ScrollView>
    </View>
  );
};

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
  settingsList: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
});

export default Setting;


