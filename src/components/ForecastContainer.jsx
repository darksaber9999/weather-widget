import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import WeatherService from "../services";

const weather = new WeatherService();
class ForecastContainer extends React.Component {
  state = {
    data: [],
    city: '',
    zipCode: '80525',
    loading: false,
    error: false,
    degreeType: "fahrenheit",
    windSpeedType: "mph",
  }

  setCityData = () => {
    const { zipCode } = this.state;
    if (zipCode.length === 5) {
      this.setState({
        loading: true,
        error: false,
      });
      weather.fetchFiveDayForecast(zipCode)
        .then((res) => {
          if (res && res.response.ok) {
            this.setState({
              data: res.data,
              city: res.city,
              loading: false,
            });
          } else {
            this.setState({ loading: false });
          }
        }, (error) => {
          console.log(error);
          this.setState({
            loading: false,
            error: true,
            data: [],
            city: 'Invalid City',
          });
        });
    }
  }

  componentDidMount() {
    this.setCityData();
  }

  updateForecastDegree = ({ target: { value } }) => this.setState({ degreeType: value });

  updateWindSpeed = ({ target: { name, value } }) => this.setState({ [name]: value });

  updateZipCode = ({ target: { value } }) => this.setState({ zipCode: value });


  render() {
    const { loading, error, data, degreeType, windSpeedType, city, zipCode } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="display-1 jumbotron bg-light py-5 mb-5">5 Day Forecast</h1>
        <h5 className="text-muted">{city}</h5>
        <div className="zip-input-wrapper">
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            maxLength="5"
            onChange={this.updateZipCode}
            value={zipCode}
            onBlur={this.setCityData}
          />
        </div>
        <DegreeToggle
          updateForecastDegree={this.updateForecastDegree}
          updateWindSpeed={this.updateWindSpeed}
          degreeType={degreeType}
        />
        <div className="row justify-content-center">
          {!loading ? data.map((item) => (
            <DayCard
              data={item}
              key={item.dt}
              degreeType={degreeType}
              windSpeedType={windSpeedType}
            />
          )) : <div>Loading...</div>}
        </div>
        {error && <h3 className="text-danger">Error loading data 😔</h3>}
      </div>
    )
  }
}

export default ForecastContainer;