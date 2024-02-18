import React, { useState } from 'react';
import './Weather.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import animate_video from '../Assets/video.mp4';

function WeatherApp() {
  let api_key = "20a4fa3735c9f8ad001db7571d6006d2";
  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    main: {
      humidity: 64,
      temp: 24,
    },
    wind: {
      speed: 18,
    },
    name: "London",
    weather: [{ icon: "01d" }], // Placeholder weather icon
  });

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (!data.main) {
        console.error("Invalid data received from the API");
        return;
      }

      setWeatherData(data);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }

    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  return (
    <>
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{Math.floor(weatherData.main.temp)}°c</div>
      <div className="weather-location">{weatherData.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity_percent">{weatherData.main.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="wind_rate">{Math.floor(weatherData.wind.speed)}km/h</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default WeatherApp;

