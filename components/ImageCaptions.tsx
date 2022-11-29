import { StyleSheet, View, Text } from "react-native";
import { Caption } from "../app.types";


export interface ImageCaptionsProps {
    captions: Caption[];
}

const ImageCaptions: React.FC<ImageCaptionsProps> = ({ captions = [] }) => {

    const renderCaption = (caption: Caption, index: number) => (
        <Text style={styles.caption}>{ caption.text }</Text>
    )

    return (
        <View style={styles.container}>
            { captions.map((caption, index) => renderCaption(caption, index)) }
        </View>
    )
}
  

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10
    },
    caption: {
        fontSize: 17,
        fontStyle: 'italic',
        padding: 5,
        margin: 2
    },

});

export default ImageCaptions;