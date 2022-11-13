import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NSFW from "./api/nsfw/nsfw-api";

export default function App() {
  const [apiVersion, setVersion] = useState('none')
  const [result, setResult] = useState([])
  
  NSFW.getVersion()
    .then(ver => setVersion(ver))
    .catch(err => console.error(err))

  function checkResult() {
    NSFW.checkImageUrl()
      .then(res => setResult(res))
      .catch(err => console.error(err))
  }
  
  return (
    <View style={styles.container}>
      <Text>nsfw api version: {apiVersion}</Text>
      <StatusBar style="auto" />
      <Button title='check result' onPress={ () => checkResult() }/>

      {
        result.map((res, index) => (
          <View key={index}>
            <Text>code: {res.code}</Text>
            <Text>msg: {res.message}</Text>
            <Text>name: {res.relatedTo}</Text>
            <Text>md5: {res.md5}</Text>
            <Text>nsfw: {res.nsfw}</Text>
            <Text>sfw: {res.sfw}</Text>
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
