import 'expo-dev-menu';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import API from "./api/api";

export default function App() {
  const imageUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
  const [image, setImage] = useState(null);

  function analyzeImage() {
    API.analyzeImageUrl(imageUrl)
  }

  function describeImage() {
    API.describeImageUrl(imageUrl)
  }

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title='analyze' onPress={ () => analyzeImage() }/>
      <Button title='describe' onPress={ () => describeImage() }/>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
