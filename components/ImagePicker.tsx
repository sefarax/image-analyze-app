import React, { useState } from "react";
import { StyleSheet, View, Button, StatusBar, Image } from "react-native";

import * as ExpoImagePicker from 'expo-image-picker';

export interface ImagePickerProps {
    imageHandler: (imgUrl: string) => void
}

const ImagePicker: React.FC<ImagePickerProps> = ({ imageHandler }) => {
    const imageUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
    const [image, setImage] = useState(null);

    async function pickImage() {
        // No permissions request is necessary for launching the image library
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            imageHandler(imageUrl);
        }
    };
  
    return (
        <View style={styles.container}>
        <StatusBar style="auto" />

        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});

export default ImagePicker;