import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function App() {
  const [city, onChangeCity] = React.useState('Toulouse')
  const [main, onChangeMain] = React.useState('')

  async function WeatherCall(city) {
      await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
          params: {
              q: city,
              appid: '09a46f658e613966965f960af56c9ca5'
          }
      })
      .then (function(reponse) {
          console.log(reponse.data)
          onChangeMain(reponse.data.weather[0].main)
      })
      .catch (function (error) {
          console.log(error)
      })
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeCity}
        value={city}
        placeholder="City"
      />
      <Text>{main}</Text>
      <Button
        title="Press me"
        onPress={(e) => WeatherCall(city)}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
