import React, { ReactElement } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useWeather } from '../../hooks/Weather'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { Sync } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const getCelsius = (kelvin: number) => {
  return parseInt((kelvin - 273).toString()) + '°C'
}

const Weather = () => {
  const { isLoading, status, weather, refresh } = useWeather()

  return (
    <div className="mb-3 rounded-b-lg bg-slate-200 font-thin shadow dark:bg-transparent md:flex  md:font-light  md:dark:bg-slate-800">
      {isLoading && (
        <div className="w-full py-5">
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="info" />
          </Stack>
          <p className="py-5">{status}</p>
        </div>
      )}
      {!isLoading && (
        <>
          <CurrentWC currentW={{ ...weather.location, ...weather.current }}>
            <span  onClick={() => refresh()}  className="text-blue-500 px-2 cursor-pointer opacity-20">
            <Sync />
            </span>
          </CurrentWC>
          <Forcast fc={weather.daily} />
        </>
      )}
    </div>
  )
}

export default Weather

const Forcast = ({ fc }: { fc: ForcastProps[] }) => {
  return (
    <div className="flex w-full justify-between overflow-x-scroll md:overflow-x-hidden bg-slate-600  text-white md:flex-wrap md:dark:bg-slate-800">
      {fc.map(
        (v, key) =>
          key !== 0 && (
            <div key={key} className="rounded p-1  hover:shadow">
              <div className="flex items-center justify-between">
                <img
                  src={`http://openweathermap.org/img/wn/${v.weather[0].icon}.png`}
                  alt={v.weather[0].main}
                />
                <span className="mx-auto">{v.weather[0].main}</span>
              </div>
              <div className="text-sm">
                <p className=" whitespace-pre">
                  <span className="px-2">
                    {new Date(v.sunrise * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="px-2">
                    {new Date(v.sunset * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="px-2">
                    {new Date(v.sunset * 1000).toDateString().split(' ')[0]}
                  </span>
                  <span className="px-2">{getCelsius(v.feels_like.day)}</span>
                  <span className="px-2">{getCelsius(v.feels_like.night)}</span>
                </p>
              </div>
            </div>
          )
      )}
    </div>
  )
}

const CurrentWC = ({ currentW, children }: CurrentWCProps) => {
  return (
    <div className="relative flex w-full justify-between rounded  p-2">
      <div>
        <span>
          <LocationOnIcon color="primary" /> {currentW.stateProv},{' '}
          {currentW.countryCode}
        </span>
        <div className=" ml-6 md:ml-7 flex h-5/6 flex-col justify-between">
          <div>
            <p className="my-1 w-12 bg-slate-400 pt-0.5 dark:bg-slate-600"></p>
            <span className="text-lg md:text-xl">
              {currentW.weather.map((v) => `${v.main} `)}
            </span>
          </div>
          <p className="whitespace-pre text-xs md:text-sm">
            <span>
              {new Date(currentW.sunrise * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <br />
            <span>
              {new Date(currentW.sunset * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
          <table className="w-64 md:w-72">
            <tbody>
              <tr className="text-sm">
                <td>{currentW.wind_speed} MPH</td>
                <td>{currentW.humidity}%</td>
                <td>{(currentW.visibility / 1000).toFixed(2)} km</td>
                <td>{currentW.pressure} hPa</td>
              </tr>
              <tr className="text-xs">
                <td>Wind</td>
                <td>Humidity</td>
                <td>Visibility</td>
                <td>Pressure</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            <span>Last Update: </span>
            <span className="pl-2">
              {new Date(currentW.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {children}
          </p>
        </div>
      </div>
      <div>
        <p className="mt-1 -mb-3 text-center text-2xl">
          {getCelsius(currentW.feels_like)}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${currentW.weather[0].icon}@2x.png`}
          alt={currentW.weather[0].main}
        />
      </div>
    </div>
  )
}

interface ForcastProps {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  clouds: number
  pop: number
  uvi: number
}

interface CurrentWCProps {
  children: ReactElement
  currentW: {
    ipAddress: string
    continentCode: string
    continentName: string
    countryCode: string
    countryName: string
    stateProv: string
    city: string
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
  }
}
