import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function ItemSearch() {
  const [placeholder, setPlaceholder] = useState('');
  const placeholders = ['Bạn đang cần tìm gì...', 'Ở đây chúng tôi có mọi thứ', 'Nhanh gọn tiện lợi', 'Chất lượng uy tín 100%', 'Giá cả hợp lí'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigation = useNavigation();

  const updatePlaceholder = useCallback(() => {
    if (isTyping) {
      if (index < placeholders[placeholderIndex].length) {
        setPlaceholder(prev => prev + placeholders[placeholderIndex][index]);
        setIndex(prev => prev + 1);
      } else {
        setIsTyping(false);
        setTimeout(() => setIndex(placeholders[placeholderIndex].length - 1), 1000);
      }
    } else {
      if (index >= 0) {
        setPlaceholder(prev => prev.slice(0, -1));
        setIndex(prev => prev - 1);
      } else {
        setIsTyping(true);
        setIndex(0);
        setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
      }
    }
  }, [index, isTyping, placeholderIndex, placeholders]);

  useEffect(() => {
    const interval = setInterval(updatePlaceholder, 50);
    return () => clearInterval(interval);
  }, [updatePlaceholder]);

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
      <Icon name="search-outline" size={20} color="#aaa" />
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>
          {placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
    flexDirection: 'row',
  },
});

export default ItemSearch;
