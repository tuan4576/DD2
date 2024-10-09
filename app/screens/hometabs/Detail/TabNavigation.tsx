import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

interface TabNavigationProps {
  details: string;
  description: string;
}

const { width } = Dimensions.get('window');

const TabNavigation: React.FC<TabNavigationProps> = ({ details, description }) => {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'description' && styles.activeTabButton]}
          onPress={() => setActiveTab('description')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'description' && styles.activeTabButtonText]}>Mô tả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'reviews' && styles.activeTabButton]}
          onPress={() => setActiveTab('reviews')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'reviews' && styles.activeTabButtonText]}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === 'description' ? (
          <Text style={styles.contentText}>{details}</Text>
        ) : (
          <Text style={styles.contentText}>{description}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    overflow: 'hidden',
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 15,
  },
  activeTabButton: {
    backgroundColor: '#FF9966',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
  },
})

export default TabNavigation
