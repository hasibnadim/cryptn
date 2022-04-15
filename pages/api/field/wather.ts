import type { NextApiRequest, NextApiResponse } from 'next'

interface extendNextApiRequest extends NextApiRequest {
  headers: { lon?: string; lat?: string; ip: string }
}
type Data = {
  name: string
}

async function getWather(coords: { lon: string; lat: string; ip: string }) {
  let weather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&unit=standard&appid=${process.env.WEATHERAPIKEY}`
  )
  let loc = await fetch(`https://api.db-ip.com/v2/free/${coords.ip}`)

  return { ...(await weather.json()), location: { ...(await loc.json()) } }
}

async function getCoordinate(
  req: extendNextApiRequest
): Promise<{ lon: string; lat: string; ip: string }> {
  if (req.headers.lon && req.headers.lat) {
    return { lon: req.headers.lon, lat: req.headers.lat, ip: req.headers.ip }
  } else {
    var coords: any = await fetch(
      `http://ip-api.com/json/${req.headers.ip}?fields=lat,lon`
    )
    coords = await coords.json()
    return { lon: coords.lon, lat: coords.lat, ip: req.headers.ip }
  }
}

export default async function handler(
  req: extendNextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    if (req.method === 'GET') {
      let coords = await getCoordinate(req)
      let resp = await getWather(coords)
      res.status(200).json({ result: resp })
    } else {
      res.status(403).json({ err: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' })
  }
}
