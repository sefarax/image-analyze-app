import { StyleSheet, View, Text } from "react-native";


export interface ImageTagsProps {
    tags: string[];
}

const ImageTags: React.FC<ImageTagsProps> = ({ tags = [] }) => {

    const renderTag = (tag: string) => (
        <View style={styles.tag}>
            <Text>{ tag }</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.tagsContainer}>
                { tags.map(tag => renderTag(tag)) }
            </View>
        </View>
    )
}
  

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    tag: {
        backgroundColor: 'aqua',
        textAlign: 'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        margin: 2
    },

});

export default ImageTags;