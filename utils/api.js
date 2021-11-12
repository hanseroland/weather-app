export const fetchLocationId = async city => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
  };
  
  export const fetchWeather = async woeid => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/${woeid}/`,
    );
    const {title,consolidated_weather} = await response.json();
    const {weather_state_name, the_temp,applicable_date, humidity, visibility , wind_speed,air_pressure} = consolidated_weather[0];
    //const { weather_state_name, the_temp, humidity, visibility ,applicable_date, wind_speed,air_pressure} = consolidated_weather[0];
    return {
        location: title,
        consolidated:consolidated_weather,
        climat: weather_state_name,
        temperature: the_temp,
        humidity: humidity,
        visibility: visibility,
        speed: wind_speed,
        pressure:air_pressure,
        dateDay: applicable_date,
    };
  };