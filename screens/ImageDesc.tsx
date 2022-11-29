import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { ImageDescription } from "../app.types";
import ImageCaptions from "../components/ImageCaptions";
import ImageTags from "../components/ImageTags";
import { ScreenProps } from "../Navigation";


export type ImageDescProps = ImageDescription
type Props = ScreenProps<'ImageDesc'>;

const ImageDescScreen: React.FC<Props> = ({ route }) => {
  const { captions, tags } = route.params;

  console.log(captions)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <ImageCaptions captions={captions}/>

      <Text style={styles.label}>Tags</Text>
      <ImageTags tags={tags}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  label: {
    fontSize: 21,
    color: 'gray'
  }
});

export default ImageDescScreen;