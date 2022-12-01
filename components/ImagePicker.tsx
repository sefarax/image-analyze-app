import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import AppButton from "./common/AppButton";

import * as ExpoImagePicker from 'expo-image-picker';
import { ReturnState } from "../app.types";


export interface ImagePickerProps {
    imageHandler: ReturnState;
    disabled?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ imageHandler, disabled = false }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const isDisabled = () => loading || disabled;

    async function pickImage() {
        setLoading(true);
        // No permissions request is necessary for launching the image library
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setImage(uri);
            imageHandler(uri);
        }
        setLoading(false);
    };
  
    function renderImage() {
        if(image) { return (
            <Image source={{ uri: image }} style={styles.image} />
        )}
        return (
            <Text>Select Image</Text>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>{ renderImage() }</View>
            <View style={styles.imageActionBox}>
                <AppButton title="Pick an image from camera roll" onPress={pickImage} disabled={isDisabled()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBox: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 400,
        height: 300
    },
    imageActionBox: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ImagePicker;