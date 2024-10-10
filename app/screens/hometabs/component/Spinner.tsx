import React from 'react';
import { ActivityIndicator } from 'react-native';

interface SpinnerProps {
  size?: number | 'small' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'large', color = '#efa092' }) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Spinner;
