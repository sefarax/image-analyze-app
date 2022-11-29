import { StyleSheet, View, Text } from "react-native";


export interface ImageTagsProps {
    tags: string[];
}

const ImageTags: React.FC<ImageTagsProps> = ({ tags = [] }) => {

    const renderTag = (tag: string, index: number) => (
        <View style={styles.tag}>
            <Text>{ tag }</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            { tags.map((tag, index) => renderTag(tag, index)) }
        </View>
    )
}
  

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 10
    },
    tag: {
        textAlign: 'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        margin: 2
    },

});

export default ImageTags;