import { useEffect, useState } from 'react';
import './App.css';
import Loader from './loader';

function App() {
  const [info, setInfo] = useState({});

  // Fetch IP address to get location
  async function getIp() {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    return data;
  }

  // Fetch weather data based on latitude and longitude
  async function getWeather() {
    const location = await getIp();
    const lat = location.lat;
    const lon = location.lon;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=07f1b683f11c0f1b4dcd3aaa4d6c53db&units=metric`);
    return await response.json();
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeather();
        setInfo({
          temp: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          wind: weatherData.wind.speed, 
          pressure: weatherData.main.pressure,
          city: weatherData.name,
          country: weatherData.sys.country,
          desc: weatherData.weather[0].description,
          img: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather(); 
  }, []); 

  return (
    <main className='main'>
      { info.city ? 
      <>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
        </svg>
        <span className='text'>
          {info.country}, {info.city}
        </span>
      </div>
      <section>
        <div className='temp'>
          <span className='text' id='temp'>{`${info.temp} °C`}
            <span id='desc'>{info.desc}</span>
          </span>
          <div id='img'>
            <img src={info.img} alt='picture'/>
          </div>
        </div>
        <div className='sections'>
          <div className='items'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-droplet" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
  <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
</svg>
              <span>Humidity</span>
             {info.humidity}%
             </div>
          <div className='items'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>
            <span>Wind</span>
            {info.wind} m/s</div>
          <div className='items last'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-thermometer-low" viewBox="0 0 16 16">
  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415"/>
  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
</svg>
            <span>Pressure</span>
             {info.pressure} hPa</div>
        </div>
      </section>
      </> : <Loader />
} 
    </main>
  );
}

export default App;