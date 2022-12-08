import 'expo-asset';
import 'expo-dev-menu';
import 'expo-dev-client';
import React from 'react';
import RootStack from "./Navigation";
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Sandbox from './components/Sandbox';

const App = () => {
  function catchInteraction() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={catchInteraction}>
      <View style={styles.container}>
        <RootStack/>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;