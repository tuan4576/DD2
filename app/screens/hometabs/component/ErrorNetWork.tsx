import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ErrorNetwork = ({ isOverlay = false }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = () => {
    setIsLoading(true);
    // Simulate network check and reload
    setTimeout(() => {
      setIsLoading(false);
      // Reload the current screen
      // Note: This might need adjustment based on your navigation setup
      navigation.reset({
        index: 0,
        routes: [{ name: navigation.getState().routes[navigation.getState().index].name }],
      });
    }, 2000);
  };

  return (
    <View style={[styles.container, isOverlay && styles.overlay]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="wifi-off" size={80} color="#FF6B6B" />
        </View>
        <Text style={styles.title}>Không có kết nối mạng</Text>
        <Text style={styles.message}>
          Vui lòng kiểm tra kết nối internet của bạn và thử lại.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Thử lại</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: 'rgba(248, 249, 250, 0.8)',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    width: width * 0.8,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFE3E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#343A40',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6C757D',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4DABF7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorNetwork;
