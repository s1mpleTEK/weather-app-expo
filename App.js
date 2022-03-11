import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';

export default function App() {
  const [city, onChangeCity] = React.useState('Toulouse')
  const [weather, onChangeWeather] = React.useState({
    main: '',
    description:'',
    icon:'',
    city:'',
    contry:'',
    date:'',
    temperature:''
  })

  async function WeatherCall(city) {
      await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
          params: {
              q: city,
              appid: '09a46f658e613966965f960af56c9ca5',
              units: 'metric'
          }
      })
      .then (function(reponse) {
          console.log(reponse.data)
          onChangeWeather({
            main:reponse.data.weather[0].main,
            description:reponse.data.weather[0].description,
            icon:reponse.data.weather[0].icon,
            city:reponse.data.name,
            contry:reponse.data.sys.country,
            date:reponse.data.dt,
            temperature:reponse.data.main.temp
          })
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
      <Text>{weather.contry}</Text>
      <Text>{weather.city}</Text>
      <Image source={{uri:'http://openweathermap.org/img/wn/'+weather.icon+'@2x.png'}} style={{width: 100, height:100}}/>
      <Text>{weather.date}</Text>
      <Text>{weather.main}</Text>
      <Text>{weather.description}</Text>
      <Text>{weather.temperature}</Text>
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
