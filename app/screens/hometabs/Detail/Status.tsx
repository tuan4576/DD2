import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.productStatus}>
        Trạng thái: {status == '1' ? 'Đang bán' : 'Dừng bán'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: '#F0F8FF', // Light blue background
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#4682B4', // Steel blue border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productStatus: {
    fontSize: 14,
    color: '#4682B4', // Steel blue text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Status;
