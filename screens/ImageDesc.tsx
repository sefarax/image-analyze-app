import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { ImageDescription } from "../app.types";
import ImageTags from "../components/ImageTags";
import { ScreenProps } from "../Navigation";


export type ImageDescProps = ImageDescription
type Props = ScreenProps<'ImageDesc'>;

const ImageDescScreen: React.FC<Props> = ({ route }) => {
  const { captions, tags } = route.params;

  return (
    <View style={styles.container}>
      <ImageTags tags={tags}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
});

export default ImageDescScreen;