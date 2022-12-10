import 'expo-asset';
import 'expo-dev-menu';
import 'expo-dev-client';
import React, { useCallback, useEffect, useState } from 'react';
import RootStack from "./Navigation";
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const getFonts = () => Font.loadAsync({
  'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
  'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf')
})

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts(); 
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if(fontsLoaded) {
    return ( 
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <RootStack/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;