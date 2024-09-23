import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const DetailsScreen = ({navigation} : {navigation : any}) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  )
}   

export default DetailsScreen

const styles = StyleSheet.create({
    container:{
     flex: 1,
     alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#a8d3d9'
    }
})