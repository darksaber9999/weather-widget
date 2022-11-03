import { WEATHER_API, WEATHER_URL_1, WEATHER_URL_2 } from "./constants";

class WeatherService {
  async fetchFiveDayForecast(zipCode) {
    return new Promise(async (success, failure) => {
      try {
        const response = await fetch(`${WEATHER_URL_1}${zipCode}${WEATHER_URL_2}${WEATHER_API}`);
        if (response.ok) {
          const json = await response.json();
          const data = json.list
            .filter(day => day.dt_txt.includes("00:00:00"))
            .map(item => ({
              temp: item.main.temp,
              dt: item.dt,
              date: item.dt_txt,
              imgID: item.weather[0].id,
              desc: item.weather[0].description,
              feelsLike: item.main.feels_like,
              humidity: item.main.humidity,
              windSpeed: item.wind.speed,
            }));
          const city = `${json.city.name}, ${json.city.country}`;
          success({ response, data, city });
        } else {
          failure({ error: "Invalid http request" })
        }
      } catch (error) {
        failure(error);
      }
    })
  }
}

export default WeatherService;