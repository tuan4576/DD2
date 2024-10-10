import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ItemSearch() {
  const [placeholder, setPlaceholder] = useState('');
  const fullPlaceholder = 'Bạn đang cần tìm gì...';
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    let cursorInterval;

    if (!isFocused) {
      interval = setInterval(() => {
        if (isTyping) {
          if (index < fullPlaceholder.length) {
            setPlaceholder(prevPlaceholder => prevPlaceholder + fullPlaceholder[index]);
            setIndex(prevIndex => prevIndex + 1);
          } else {
            setIsTyping(false);
            setTimeout(() => {
              setIndex(fullPlaceholder.length - 1);
            }, 1000);
          }
        } else {
          if (index >= 0) {
            setPlaceholder(prevPlaceholder => prevPlaceholder.slice(0, -1));
            setIndex(prevIndex => prevIndex - 1);
          } else {
            setIsTyping(true);
            setIndex(0);
          }
        }
      }, 100);

      cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
    }

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [index, isTyping, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (inputText === '') {
      setIsFocused(false);
      setIndex(0);
      setIsTyping(true);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} color="#aaa" />
      <View style={styles.inputContainer}>
        {!isFocused && inputText === '' && (
          <Text style={styles.placeholderText}>
            {placeholder}
            {showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>
        )}
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputText}
          onChangeText={setInputText}
        />
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
    color: '#000',
  },
  filterButton: {
    padding: 5,
  },
  cursor: {
    color: '#4A90E2',
  },
});

export default ItemSearch;
