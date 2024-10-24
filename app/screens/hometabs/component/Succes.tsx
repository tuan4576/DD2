import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface SuccessProps {
  onAnimationFinish?: () => void;
}

const Success: React.FC<SuccessProps> = ({ onAnimationFinish }) => {
  const animation = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animation.current) {
      animation.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('./success.json')}
        autoPlay={true}
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default Success;