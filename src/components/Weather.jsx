import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import  Search_Icon from'../assets/Search_Icon.png'
import weather from '../assets/Weather.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import clear_sun from '../assets/Clear_sun.png'
import snow from '../assets/snow.png'
import Drizzle from '../assets/Drizzle.png'
import RainIcon from '../assets/Rain.png'
import clouds  from '../assets/clouds.png'
const Weather = () => {
 const inputRef=useRef()
  const [Weatherdata,setWetherdata]=useState(false)
  const AllIcons={
    "01d":clear_sun,
    "01n":clear_sun,
    "02d":clouds,
    "02n":clouds,
    "03d":clouds,
    "03n":clouds,
    "04d":Drizzle,
    "04n":Drizzle,
    "09d":RainIcon,
    "09n":RainIcon,
    "10d":RainIcon,
    "10n":RainIcon,
    "13d":snow,
    "13n":snow,
  }
  const search=async(city)=>{
    if(city===""){
      alert("Enter City Name");
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_URL}`
      const response= await fetch(url);
      const data=await response.json();
      console.log(data);
      if(!response.ok){
        alert(data.message)
      }
      const icon=AllIcons[data.weather[0].icon] || clear_sun;
      setWetherdata({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
        
      })
    }catch(error){
       setWetherdata(false);
       console.error("error in fetching weatherData")
    }
  }
  useEffect(()=>{
    search("karnataka")
  },[])
  return (
    <div className='weather'>
     <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search' />
        <img src={Search_Icon} onClick={()=>search(inputRef.current.value)}/>
     </div>
     {Weatherdata?<>
     
      <img src={Weatherdata.icon} className='weather-icon'/>
     <p className='temp'>{Weatherdata.temperature}°C</p>
     <p className='location'>{Weatherdata.location}</p>
     <div className="weather-data">
      <div className='col'>
        <img src={humidity}/>
        <div>
          <p>{Weatherdata.humidity} %</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className='col'>
        <img src={wind}/>
        <div>
          <p>{Weatherdata.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
     </div>
     </>:<></>}
     
    </div>
  )
}

export default Weather
