import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GET_GIF } from '../../../api/apiService';

interface TestProps {
  navigation: any;
}

const Succes: React.FC<TestProps> = ({ navigation }) => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: GET_GIF('thanhcong') }}
        style={styles.animation}
        resizeMode="contain"
        onError={() => setError('Failed to load animation')}
      />
      <Text style={styles.successText}>
        Mua hàng thành công!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  animation: {
    width: 300,
    height: 300,
  },
  successText: {
    marginTop: 20,
    color: '#3386FF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Succes;
