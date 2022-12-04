import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";

import {BlurView} from '@react-native-community/blur';

import MCV from "../api/ms-computer-vision/api";
import IHS from "../api/image-hosting/api";
import ImagePicker, { ImageInfo } from "../components/ImagePicker";
import { NavigationParams } from "../Navigation";
import AppButton from "../components/common/AppButton";

const {width, height} = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation<NavigationParams>();
  const [imageUri, setImageUri] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false); 
  
  async function onImage(imageData: ImageInfo) {
    console.log("image selected", imageData);

    setImageUri(imageData.uri);
    console.log('imageUri', imageUri);
    IHS.uploadImage(imageData)
    .catch(console.error)
    .then((url) => {
      
      console.log("fileUrl", url);
      setImageURL(url);
    })
  }

  async function describeImage() {
    const testUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
    setLoading(true);
    try {
      let res = await MCV.describeImageUrl(imageURL);
      
      navigation.navigate('ImageDesc', res.description);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      { imageUri &&
        <ImageBackground style={[styles.containerStyle, styles.blur]} source={{uri: imageUri}}>
            <BlurView
              style={styles.containerStyle}
              blurType="light"
              blurAmount={25}
              reducedTransparencyFallbackColor="white"
            />
        </ImageBackground>
      }
      <View style={styles.topBox}></View>
      <View style={styles.middleBox}>
        <ImagePicker imageHandler={onImage} disabled={loading}/>
      </View>
      <View style={styles.bottomBox}>
        <AppButton title="Request image info" onPress={describeImage} disabled={loading} visible={imageUri}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBox: {
    flex: 1
  },
  middleBox: {
    flex: 2
  },
  bottomBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerStyle: {
    height: height * 3,
    width: width * 3
  },
  imageStyle: {
    height: height * 3,
    width: width * 3,
    resizeMode: 'contain',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MainScreen;