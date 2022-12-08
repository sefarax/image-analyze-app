import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Dimensions, Alert, SafeAreaView, Text, TouchableOpacity } from "react-native";

import {BlurView} from '@react-native-community/blur';

import MCV from "../api/ms-computer-vision/api";
import IHS from "../api/image-hosting/api";
import ImagePicker, { ImageInfo } from "../components/ImagePicker";
import { NavigationParams } from "../Navigation";
import AppButton from "../components/common/AppButton";
import { AxiosError } from "axios";
import { IonIcon } from "../shared/icons";

const {width, height} = Dimensions.get('window');

const MainScreen: React.FC = () => {
  const navigation = useNavigation<NavigationParams>();
  const [imageUri, setImageUri] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false); 
  
  async function onImage(imageData: ImageInfo) {
    console.log("image selected", imageData);
    setImageUri(imageData.uri);
    setLoading(true);
    IHS.uploadImage(imageData)
      .then((url) => {
        console.log("fileUrl", url);
        setImageURL(url);
      })
      .catch(err => showError(err))
      .finally(() => {
        setLoading(false);
      })
  }

  async function describeImage() {
    const testUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
    setLoading(true);
    MCV.describeImageUrl(imageURL)
      .then(res => navigation.navigate('ImageDesc', res.description))
      .catch(err => showError(err))
      .finally(() => setLoading(false));
  }

  function showError(err: AxiosError) {
    let text = "Something went wrong";
    if(err.code === "ECONNABORTED") text = "Server is not responding";

    Alert.alert("Oops", text + "\nPlease try again later", [
      { text: "Close", onPress: () => console.log("extra error data", err) }
    ]);
  } 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.infoBtn} onPress={() => navigation.navigate("Info")}>
          <IonIcon name="information-circle-outline" size={36} color="black" style={styles.topBox}/>
      </TouchableOpacity>
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
      <SafeAreaView style={styles.topBox}></SafeAreaView>
      <View style={styles.middleBox}>
        <ImagePicker imageHandler={onImage} disabled={loading}/>
      </View>
      <View style={styles.bottomBox}>
        <AppButton title="Request image info" onPress={describeImage} disabled={loading} visible={imageURL}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBox: {
    flex: 1,
  },
  middleBox: {
    flex: 3
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
  infoBtn: {
    position: 'absolute',
    top: 60,
    right: 20, 
    zIndex: 100
  }
});

export default MainScreen;