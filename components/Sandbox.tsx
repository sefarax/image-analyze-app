import { StyleSheet, Text, View } from "react-native";


const Sandbox: React.FC = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.text}>text</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#333',
    },
    text: {
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'violet'
    },
})

export default Sandbox;

