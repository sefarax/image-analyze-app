import React from "react";
import { StyleSheet, View } from "react-native";

import ImagePicker from "./../components/ImagePicker";

const HomeScreen = ({ navigation }) => {
  const imageHandler = (img) => {
    navigation.navigate('ImageDesc');
  }

  return (
    <View style={styles.container}>
      <ImagePicker imageHandler={imageHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
});

  export default HomeScreen;