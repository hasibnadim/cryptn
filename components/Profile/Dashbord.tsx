import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloudIcon from '@mui/icons-material/Cloud'

const Dashbord = ({ weather }: any) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const getCelsius = (kelvin: number) => {
    return parseInt((kelvin - 273).toString()) + '°C'
  }
  useEffect(() => {
    let timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    )
    return () => clearInterval(timer)
  }, [])
  return (
    <div>
      <p className="flex items-center justify-between p-2 text-xl">
        <span className="flex items-center ">
          <LocationOnIcon color="error" />
          {weather.name + ', ' + weather.sys?.country}
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </p>
      <p className="flex justify-between p-2 text-2xl">
        <span>{time}</span>
      </p>

      <div className="p-2 capitalize">
        <p className="flex  items-center  text-sm">
          <CloudIcon color="primary" />
          <span className="px-1">Weather</span>
        </p>
        {weather.weather?.map((w: any, key: number) => (
          <p key={key}>{w.description}</p>
        ))}
        <p className="flex justify-between">
          <span>Temp: {getCelsius(weather.main?.temp)}</span>
          <span>Feel: {getCelsius(weather.main?.feels_like)}</span>
          <span>Min: {getCelsius(weather.main?.temp_min)}</span>
          <span>Max: {getCelsius(weather.main?.temp_max)}</span>
        </p>
        <p>
          <span className="mr-3">Humidity: {weather.main?.humidity}</span>
          <span>Wind Speed: {weather.wind?.speed}</span>
        </p>
        <p>
          <span className="mr-3">
            Sunrise: {new Date(weather.sys?.sunrise).toLocaleTimeString()}
          </span>
          <span>
            Sunset: {new Date(weather.sys?.sunset).toLocaleTimeString()}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Dashbord
