const images = {

    Clear: require('../assets/sunny.jpg'),
    Hail: require('../assets/hail.png'),
    'Heavy Cloud': require('../assets/cloudy.jpg'),
    'Light Cloud': require('../assets/light-cloud.png'),
    'Heavy Rain': require('../assets/heavy-rain.png'),
    'Light Rain': require('../assets/rain.jpg'),
    Showers: require('../assets/showers.png'),
    Sleet: require('../assets/sleet.png'),
    Snow: require('../assets/snow.png'),
    Thunder: require('../assets/thunder.png')
  };
  
  const getImage = weather => images[weather];
  
  
  export default getImage;
