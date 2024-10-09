import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface NameProps {
  name: string;
}

const Name: React.FC<NameProps> = ({ name }) => {
  return (
    <View style={styles.nameContainer}>
      <Icon name="bookmark-outline" size={24} color="#4A90E2" style={styles.nameIcon} />
      <View style={styles.nameTextContainer}>
        <Text style={styles.nameLabel}>Tên sản phẩm:</Text>
        <Text style={styles.productTitle}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  nameIcon: {
    marginRight: 10,
  },
  nameTextContainer: {
    flexDirection: 'column',
  },
  nameLabel: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Name;
