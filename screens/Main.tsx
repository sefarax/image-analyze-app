import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import API from "./../api/api";
import ImagePicker from "../components/ImagePicker";
import { NavigationParams } from "../Navigation";
import AppButton from "../components/common/AppButton";

const MainScreen = () => {
  const navigation = useNavigation<NavigationParams>();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);  

  async function describeImage() {
    setLoading(true);
    try {
      let res = await API.describeImageUrl(imageUrl);
      
      navigation.navigate('ImageDesc', res.description);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBox}></View>
      <View style={styles.middleBox}>
        <ImagePicker imageHandler={setImageUrl} disabled={loading}/>
      </View>
      <View style={styles.bottomBox}>
        <AppButton title="Request image info" onPress={describeImage} disabled={loading} visible={imageUrl}/>
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
    justifyContent: 'center'
  }
});

export default MainScreen;