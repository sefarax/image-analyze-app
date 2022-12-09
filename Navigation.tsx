import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import MainScreen from './screens/Main';
import AboutScreen from './screens/About';
import ImageDescScreen, { ImageDescProps } from './screens/ImageDesc';


export type NavigationParams = NativeStackNavigationProp<RootStackParam>;
export type ScreenProps<K extends keyof RootStackParam> = NativeStackScreenProps<RootStackParam, K>;
export type RootStackParam = {
  Main;
  About;
  ImageDesc: ImageDescProps;
}

const RootStack = createNativeStackNavigator<RootStackParam>();

export default function Navigation() {
  return (
    <NavigationContainer>
        <RootStack.Navigator initialRouteName="Main">
          <RootStack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
          <RootStack.Screen name="About" component={AboutScreen}/>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="ImageDesc" component={ImageDescScreen} options={{ headerTitle: "Result" }}/>
          </RootStack.Group>
        </RootStack.Navigator>
    </NavigationContainer>
  )
}

