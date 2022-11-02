import React from "react";
import moment from "moment/moment";

const DayCard = ({ data, degreeType, windSpeedType }) => {
  const { temp, dt, imgID, desc, feelsLike, humidity, windSpeed } = data;

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-${imgID} owf-5x`;

  const convertToCelsius = (temp) => ((temp - 32) * (5 / 9));

  const fahrenheit = Math.round(temp);
  const celsius = Math.round(convertToCelsius(fahrenheit));

  const feelsLikeFahrenheit = Math.round(feelsLike);
  const feelsLikeCelsius = Math.round(convertToCelsius(feelsLikeFahrenheit));

  const convertToKPH = (speed) => speed * 1.60934;

  const milesPerHour = Math.round(windSpeed);
  const kilometersPerHour = Math.round(convertToKPH(windSpeed));

  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={icon} />
        <h2>{degreeType === 'celsius' ? `${celsius} °C` : `${fahrenheit} °F`}</h2>
        <div className="card-body">
          <p className="card-text">{desc}</p>
          <p className="card-feels-like">Feels like: <br />{degreeType === 'celsius' ? `${feelsLikeCelsius} °C` : `${feelsLikeFahrenheit} °F`}</p>
          <p className="card-humidity">Humidity: <br />{humidity}%</p>
          <p className="card-wind-speed">Wind speed: <br />{windSpeedType === 'mph' ? `${milesPerHour} mph` : `${kilometersPerHour} kph`}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;