import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { GET_LOTTE } from '../../../api/apiService';

interface TestProps {
  navigation: any;
}

const Test: React.FC<TestProps> = ({ navigation }) => {
  const animation = useRef<LottieView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const animationSource = await GET_LOTTE();
        if (animation.current) {
          animation.current.play();
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading animation:', err);
        setError('Failed to load animation');
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3386FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={GET_LOTTE()}
        style={styles.animation}
        onError={(error) => {
          console.error('Lottie animation error:', error);
          setError('Failed to play animation');
        }}
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
  },
  animation: {
    flex: 1,
    width: '100%',
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

export default Test;
