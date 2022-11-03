import React from "react";

const DegreeToggle = ({ updateForecastDegree, updateWindSpeed, degreeType }) => {


  return (
    <>
      <div className="form-check form-check-inline">
        <label htmlFor="celsius">
          <input
            type="radio"
            className="form-check-input"
            name="degree-type"
            id="celsius"
            value="celsius"
            onChange={updateForecastDegree}
            checked={degreeType === "celsius"}
          />
          Celsius
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label htmlFor="fahrenheit">
          <input
            type="radio"
            className="form-check-input"
            name="degree-type"
            value="fahrenheit"
            onChange={updateForecastDegree}
            checked={degreeType === "fahrenheit"}
          />
          Fahrenheit
        </label>
      </div>
      <div className="mb-4">
        <select
          name="windSpeedType"
          id="windSpeedType"
          onChange={updateWindSpeed}
        >
          <option value="mph">Miles per Hour (MPH)</option>
          <option value="kph">Kilometers per Hour (KPH)</option>
        </select>
      </div>
    </>
  )
}

export default DegreeToggle;