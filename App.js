import React from 'react';
import {
    Text, 
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    Platform,
    StatusBar,
    ScrollView,
    Animated,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import SearchInput from './components/SearchInput';
import getImage from './utils/getImageForWeather';
import {fetchLocationId,fetchWeather }from './utils/api.js';
import {windowHeight, windowWidth} from './utils/Dimentions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Locations from './model/locations';
import { getFiveDays } from './utils/getDay';

import SunIcon from './assets/svg/sunny.svg';
import HailIcon from './assets/svg/hail.svg';
import HeavyCloudIcon from './assets/svg/heavy-cloud.svg';
import LightCloudIcon from './assets/svg/light-cloud.svg';
import LightRainIcon from './assets/svg/light-rain.svg';
import HeavyRainIcon from './assets/svg/heavy-rain.svg';
import ShowersIcon from './assets/svg/showers.svg';
import SleeTIcon from './assets/svg/sleet.svg';
import SnowIcon from './assets/svg/snow.svg';
import ThunderIcon from './assets/svg/thunder.svg';

/*exercice visiblité et humidité à envoyer */

export default class App extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     location : "Miami",
     temperature: 0,
     climat: 'Clear',
     speed:0,
     dateDay:'',
     consolidated:Locations,
     humidity:0,
     visibility:0,
     loading: false,
     windowHeight: undefined,
     windowWidth: undefined,
     refreshing:false
   }
   this.selectorRef = React.createRef();
 }


  componentDidMount(){
    this.changeLocation(this.state.location)
  }


 changeLocation =  (newLocation ) => {
   if(!newLocation) return;
  
   this.setState({loading:true,refreshing:true}, async () => {
     try{
       const locationId = await fetchLocationId(newLocation);
       const {location,consolidated, climat,dateDay, temperature, humidity, visibility , speed,pressure} = await fetchWeather(locationId);
       this.setState({
          location,
          climat,
          temperature,
          humidity,
          visibility,
          speed,
          pressure,
          consolidated,
          dateDay,
          loading:false,
          refreshing:false
       });
     }catch(e){
         this.setState({loading:false});
     }
   });
 }; 

  weatherIcon = (weatherType) => {
  if (weatherType == 'Clear') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Hail') {
    return <HailIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Heavy Cloud') {
    return <HeavyCloudIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Light Cloud') {
    return <LightCloudIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Heavy Rain') {
    return <HeavyRainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Light Rain') {
    return <LightRainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Showers') {
    return <ShowersIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Sleet') {
    return <SleeTIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Snow') {
    return <SnowIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType == 'Thunder') {
    return <ThunderIcon width={34} height={34} fill="#fff" />;
  }
};

 getBackImage = (wheatheName) => {
  if (wheatheName == 'Clear') {
     return require('./assets/sunny.jpg');
  }
  if (wheatheName == 'Hail') {
      return require('./assets/hail.png');
  }
  if (wheatheName == 'Heavy Cloud') {
      return  require('./assets/cloudy.jpg');
  }  
  if (wheatheName == 'Light Cloud') {
      return require('./assets/light-cloud.png');
  } 
  if (wheatheName == 'Heavy Rain') {
     return require('./assets/heavy-rain.png');
  } 
  if (wheatheName == 'Light Rain') {
     return require('./assets/rain.jpg');
  }
   if (wheatheName == 'Showers') {
     return  require('./assets/showers.png');
  }
   if (wheatheName == 'Snow') {
     return  require('./assets/snow.png');
  }
   if (wheatheName == 'Sleet') {
     return  require('./assets/sleet.png');
  } if (wheatheName == 'Thunder') {
     return  require('./assets/thunder.png');
  }
 }
 

  render(){
    const { location,temperature,dateDay, climat,consolidated, humidity, visibility , speed,pressure, loading} = this.state;
    const scrollX = new Animated.Value(0)
  
          return (
          <>
          <StatusBar barStyle="light-content" />
          <ScrollView
               horizontal={true}
               pagingEnabled
               ref={this.selectorRef}
               refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={getImage(climat)}
                />
              }
               showsHorizontalScrollIndicator={false}
               onScroll={Animated.event(
               
                [
                  {
                    nativeEvent: {
                      contentOffset: {  
                        x: scrollX,
                      },
                    },
                  },
                ],
                {useNativeDriver: false},
              )}
              scrollEventThrottle={1}
          >
           {consolidated.map((item, index) => {
              
          return (
            <View
                style={{width: windowWidth, height: windowHeight}}
                key={index}
              >
              <ImageBackground 
                style={{flex:1}} 
                source={this.getBackImage(item.weather_state_name)}
              >
                    <View 
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          padding: 20,
                        }}
                    >
                   
                    {loading && (
                      <View style={{position:'absolute',left:'50%',top:100}}>
                              <ActivityIndicator animating={loading} color="white" size="large" />
                      </View>
                         
                      )}
                      {!loading && (
                      <>
                      <View style={styles.topInfoWrapper}>{/**Debut topInWrapper */}
                       <View>
                          <Text style={styles.city}>{location}</Text>
                          <Text style={styles.time}> {getFiveDays(item.applicable_date)} {item.applicable_date}</Text>
                      </View>

                      <View>
                          <Text style={styles.temparature}>
                            {Math.round(item.the_temp)} ºc
                          </Text>
                          <View style={{flexDirection:'row'}}>
                              <Text style={{lineHeight: 40,marginLeft:10, fontSize:17,fontWeight:'bold',color:'#fff'}}>
                                Max {Math.round(item.max_temp)}  ºc
                              </Text>
                              <Text style={{lineHeight: 40,marginLeft:10, fontSize:17,fontWeight:'bold',color:'#fff'}}>
                                Min {Math.round(item.min_temp)}  ºc
                              </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            {this.weatherIcon(item.weather_state_name)}
                            <Text style={styles.weatherType}>
                              {item.weather_state_name}
                            </Text>
                           
                          </View>
                       </View> 
                     </View>
                      <View
                      style={{
                        borderBottomColor: 'rgba(255,255,255,0.7)',
                        marginTop: 20,
                        borderBottomWidth: 1,
                      }}
                    />
                      <View style={styles.bottomInfoWrapper}>
                        <View style={{alignItems: 'center'}}>
                              <Text style={styles.infoText}>Vent</Text>
                              <Text style={[styles.infoText, {fontSize: 24}]}>
                                {Math.round(item.wind_speed)}
                              </Text>
                              <Text style={styles.infoText}>km/h</Text>
                              <View style={styles.infoBar}>
                                <View
                                  style={{
                                    width: speed / 2,
                                    height: 5,
                                    backgroundColor: '#69F0AE',
                                  }}
                                />
                              </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                              <Text style={styles.infoText}>Visibilité</Text>
                              <Text style={[styles.infoText, {fontSize: 24}]}>
                                {Math.round(item.visibility)}
                              </Text>
                              <Text style={styles.infoText}>km</Text>
                              <View style={styles.infoBar}>
                                <View
                                  style={{
                                    width: visibility / 2,
                                    height: 5,
                                    backgroundColor: '#F44336',
                                  }}
                                />
                              </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                              <Text style={styles.infoText}>Humidité</Text>
                              <Text style={[styles.infoText, {fontSize: 24}]}>
                                {Math.round(item.humidity)}
                              </Text>
                              <Text style={styles.infoText}>%</Text>
                              <View style={styles.infoBar}>
                                <View
                                  style={{
                                    width: humidity / 2,
                                    height: 5,
                                    backgroundColor: '#F44336',
                                  }}
                                />
                              </View>
                            </View>
                          </View>

                        </>
                    )}
                 
                  </View>  
               </ImageBackground>
            </View> 
             );
            })}
          </ScrollView>
          <View style={styles.appHeader}>
              <View onPress={() => {}}>
                <SearchInput
                    initialValue= "Rechercher"
                    initialColor = "white"
                    onSubmit={this.changeLocation}
                />
              </View>
           
              <TouchableOpacity onPress={() => {}}>
               {/* <MenuIcon width={24} height={24} fill="#fff" />*/}
              </TouchableOpacity>
          </View>
          <View style={styles.indicatorWrapper}>
              {consolidated.map((item, index) => {
                const width = scrollX.interpolate({
                  inputRange: [
                    windowWidth * (index - 1),
                    windowWidth * index,
                    windowWidth * (index + 1),
                  ],
                  outputRange: [5, 12, 5],
                  extrapolate: 'clamp',
                });
                return (
                  <Animated.View key={index} style={[styles.normalDot, {width}]} />
                );
              })}
            </View>
          </>
        );
      }
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appHeader: {
      position: 'absolute',
      top: 20,
      width: '100%',
      height: getStatusBarHeight() + 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 20
    },
    topInfoWrapper: {
      flex: 1,
      marginTop: 160,
      justifyContent: 'space-between',
    },
    city: {
      color: '#fff',
      fontSize: 30,
      //fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
    },
    time: {
      color: '#fff',
     // fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
    },
    temparature: {
      color: '#fff',
     // fontFamily: 'Lato-Light',
      fontSize: 85,
    },
    weatherType: {
      color: '#fff',
     // fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
      fontSize: 25,
      lineHeight: 34,
      marginLeft: 10,
    },
    bottomInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    infoText: {
      color: 'white',
      fontSize: 14,
      //fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
    },
    infoBar: {
      width: 45,
      height: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorWrapper: {
      position: 'absolute',
      top: 140,
      left: 20,
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
    },
    normalDot: {
      height: 5,
      width: 5,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: '#fff',
    },
  });