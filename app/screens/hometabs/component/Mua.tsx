import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import muaData from '@/app/asset/image/mua.json';

const Mua = () => {
  return (
    <View>
      <Text>{JSON.stringify(muaData, null, 2)}</Text>
    </View>
  )
}

export default Mua

const styles = StyleSheet.create({
  content: {
    padding: 10,
  }
})