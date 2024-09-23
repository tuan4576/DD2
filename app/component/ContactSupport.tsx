import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactSupport = ({ navigation }: { navigation: any }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Implement logic to send the support message
    console.log('Support message sent:', { subject, message });
    // You might want to show a success message and navigate back
    navigation.goBack();
  };

  const suggestions = [
    'Tôi muốn hủy đơn hàng',
    'Tôi muốn thay đổi địa chỉ giao hàng',
    'Tôi muốn đổi/trả sản phẩm',
    'Tôi cần hỗ trợ về vấn đề thanh toán',
    'Tôi muốn kiểm tra tình trạng đơn hàng',
    'Tôi có câu hỏi về chính sách bảo hành',
    'Khác',
  ];

  const handleSuggestionPress = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liên hệ hỗ trợ</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Nhập tiêu đề"
        />

        <Text style={styles.label}>Nội dung</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập nội dung tin nhắn"
          multiline
          numberOfLines={6}
        />

        <Text style={styles.suggestionTitle}>Gợi ý nội dung:</Text>
        <View style={styles.suggestionContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionButton}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  suggestionContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
  },
  suggestionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FF937B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactSupport;
