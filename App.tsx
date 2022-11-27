import 'expo-dev-menu';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import ImageDescScreen from './screens/ImageDesc';

export type NavigationParams = NativeStackNavigationProp<RootStackParam>
export type RootStackParam = {
  Home,
  ImageDesc
}

const RootStack = createNativeStackNavigator<RootStackParam>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen}/>
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="ImageDesc" component={ImageDescScreen}/>
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

export default App

// export default function App() {
//   const imageUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
//   const [image, setImage] = useState(null);
//   const [imageDesc, setImageDesc] = useState<ImageDescription>(null)

//   function analyzeImage() {
//     API.analyzeImageUrl(imageUrl)
//   }

//   async function describeImage() {
//     let res = await API.describeImageUrl(imageUrl);
//     setImageDesc(res.description);
//   }

//   async function pickImage() {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   function mapImageDesc(desc: ImageDescription) {
//     return (
//       <View>

//       </View>
//     )
//   }

//   const Stack = createNativeStackNavigator();
  
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="home" component={App} />
//       </Stack.Navigator>
//     </NavigationContainer>

//     // <View style={styles.container}>
//     //   <StatusBar style="auto" />
//     //   <Button title='analyze' onPress={ () => analyzeImage() }/>
//     //   <Button title='describe' onPress={ () => describeImage() }/>

//     //   <Button title="Pick an image from camera roll" onPress={pickImage} />
//     //   {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

//     //   {imageDesc && <ImageDesc description={imageDesc}/>}
//     // </View>
//   );
// }
