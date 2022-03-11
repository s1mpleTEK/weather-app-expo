import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';

export default function App() {
  const [city, onChangeCity] = React.useState('')
  const [weather, onChangeWeather] = React.useState({
    main: '',
    description:'',
    icon:'',
    city:'',
    contry:'',
    temperature:'',
    min: '',
    max:''
  })

  async function WeatherCall() {
    console.log(city)
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
            temperature:parseFloat(reponse.data.main.temp).toFixed()+"°",
            min:"Min. "+parseFloat(reponse.data.main.temp_min).toFixed()+"°",
            max:"Max. "+parseFloat(reponse.data.main.temp_max).toFixed()+"°"
          })
      })
      .catch (function (error) {
          console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'white',
            borderWidth: 1,
            color:'#595959',
            backgroundColor: 'white',
            fontSize:20, 
            paddingHorizontal: 10,
            flex:1,
            borderTopLeftRadius:10,
            borderBottomLeftRadius:10,
          }}
          onChangeText={onChangeCity}
          value = {city}
          placeholder="Search your city"
        />  
        <Button
          title="Search"
          color="#AF1B3F"
          onPress={(e) => WeatherCall()}
        />
      </View>
      <View style={styles.title}>
        <Text style={{fontSize:50, color: 'white'}}>{weather.contry}</Text>
        <Text style={{fontSize:70, textAlign:'center', color:'white'}}>{weather.city}</Text>
      </View>
      <View style={styles.main}>
        <Image source={{uri:'http://openweathermap.org/img/wn/'+weather.icon+'@2x.png'}} style={{width: 200, height:200}}/>
        <Text style={{fontSize:50, color: 'white'}}>{weather.main}</Text>
        <Text style={{fontSize:25, color: 'white'}}>{weather.description}</Text>
        <Text style={{fontSize:50, color: 'white'}}>{weather.temperature}</Text>
        <Text style={{fontSize:25, color: 'white'}}>{weather.max} {weather.min}</Text>
      </View>

      <StatusBar hidden/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F3B',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    // backgroundColor:'red',
    flexDirection:'row',
    marginTop:30,
    marginHorizontal: 20,
    marginBottom:30
  },
  title: {
    // backgroundColor:'yellow',
    alignItems: 'center',
  },
  main: {
    // backgroundColor:'purple',
    alignItems:'center'
  }
});
