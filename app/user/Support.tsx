import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Support = ({ navigation }: { navigation: any }) => {
  const SupportItem = ({ icon, title, onPress }: { icon: string; title: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.supportItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#333" />
      <Text style={styles.supportTitle}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#333" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trợ giúp & Hỗ trợ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.supportList}>
        <SupportItem 
          icon="help-circle-outline" 
          title="Câu hỏi thường gặp" 
          onPress={() => {/* Navigate to FAQ screen */}}
        />
        <SupportItem 
          icon="chatbubbles-outline" 
          title="Liên hệ với chúng tôi" 
          onPress={() => navigation.navigate('ContactSupport')}
        />
        <SupportItem 
          icon="document-text-outline" 
          title="Điều khoản sử dụng" 
          onPress={() => {/* Navigate to Terms of Service screen */}}
        />
        <SupportItem 
          icon="shield-checkmark-outline" 
          title="Chính sách bảo mật" 
          onPress={() => {/* Navigate to Privacy Policy screen */}}
        />
        <SupportItem 
          icon="information-circle-outline" 
          title="Về chúng tôi" 
          onPress={() => {/* Navigate to About Us screen */}}
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
  supportList: {
    flex: 1,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  supportTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
});

export default Support;
