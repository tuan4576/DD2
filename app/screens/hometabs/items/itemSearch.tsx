import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ItemSearch() {
  const [placeholder, setPlaceholder] = useState('');
  const fullPlaceholder = 'Bạn đang cần tìm gì...';
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < fullPlaceholder.length) {
        setPlaceholder(prevPlaceholder => prevPlaceholder + fullPlaceholder[index]);
        setIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setPlaceholder('');
          setIndex(0);
        }, 1000);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [index]);

  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} color="#aaa" />
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>
          {placeholder}
          {showCursor && <Text style={styles.cursor}>|</Text>}
        </Text>
        <TextInput style={styles.searchInput} />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter-outline" size={20} color="#000" />
      </TouchableOpacity>
    </View>
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
    position: 'absolute',
    fontSize: 16,
    color: '#aaa',
    flexDirection: 'row',
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
    color: 'transparent',
  },
  filterButton: {
    padding: 5,
  },
  cursor: {
    color: '#4A90E2', // A vibrant blue color
  },
});

export default ItemSearch;
