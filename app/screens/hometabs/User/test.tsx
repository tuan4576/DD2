
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Success from '../../../screens/hometabs/component/Succes'

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleAnimationFinish = () => {
    // Restart the animation when it finishes
    setIsLoading(false);
    setTimeout(() => setIsLoading(true), 0);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <Success onAnimationFinish={handleAnimationFinish} />
      )}
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})