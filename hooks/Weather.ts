import { useEffect, useState } from 'react'
import { getMYIp } from '../service/functions'

export const useWeather = () => {
  const [weather, setweather] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState('Weather loading...')

  async function getWather(value?: { lat: number; lon: number }) {
    setLoading(true)
    setStatus('Upadate weather fetching...')
    getMYIp(async (data: { ip: string }) => {
      if (data.ip) {
        let resp: any = await fetch('api/field/wather', {
          headers: {
            ip: data.ip,
            lat: value?.lat.toString() || '',
            lon: value?.lon.toString() || '',
          },
        })
        resp = await resp.json()
        if (resp.result) {
          localStorage.setItem(
            '_weather_cryptn',
            JSON.stringify({
              validTo: Date.now() + 22968000, // 6hours
              data: resp.result,
            })
          )
          setweather(resp.result)
          setLoading(false)
          setStatus('')
        } else {
          setStatus('Upadate weather fatching failed!')
          setTimeout(() => setStatus(''), 1000)
          setLoading(false)
        }
      } else {
        setStatus('Upadate weather fatching failed!')
        setTimeout(() => setStatus(''), 1000)
        setLoading(false)
      }
    })
  }

  function refreshWather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getWather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        function () {
          getWather()
        }
      )
    } else {
      getWather()
    }
  }

  function validateStoreageWather(value: string): null | any {
    var WObj = JSON.parse(value)
    return WObj.validTo >= Date.now() ? WObj.data : null
  }
  useEffect(() => {
    var localWather = localStorage.getItem('_weather_cryptn')
    if (localWather) {
      localWather = validateStoreageWather(localWather)
      if (localWather) {
        setweather(localWather)
        setLoading(false)
        setStatus('')
        return
      }
      return refreshWather()
    }
    refreshWather()
  }, [])

  return { weather, status, isLoading, refresh: refreshWather }
}
