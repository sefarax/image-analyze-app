import 'expo-asset';
import 'expo-dev-menu';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import RootStack from "./Navigation";


const App = () => {
  return (
    <View style={styles.container}>
      <RootStack/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;