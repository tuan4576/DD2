import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface CategoryProps {
  id: string;
  name: string;
  onSelectCategory: (id: string) => void;
}

const ItemCategory: React.FC<CategoryProps> = ({ id, name, onSelectCategory }) => (
  <TouchableOpacity key={id} onPress={() => onSelectCategory(id)} style={styles.categoryButton}>
    <Text style={styles.categoryText}>{name}</Text>
  </TouchableOpacity>
);

const itemCategory = ({ id, name, onSelectCategory }: CategoryProps) => {
  return (
    <ItemCategory id={id} name={name} onSelectCategory={onSelectCategory} />
  )
}

export default itemCategory

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 16,
        color: '#000',
    },
    categoryButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
    },
})