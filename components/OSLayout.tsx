import React, { ReactElement, useEffect, useState } from 'react'
import { WebStateProvider } from '../service/Store'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import { IconButton } from '@mui/material'
interface props {
  children: ReactElement | ReactElement[]
}
const OSLayout = ({ children }: props) => {
  const [validSize, setValidSize] = useState(false)
  useEffect(() => {
    if (screen.availWidth > 520 && screen.availHeight > 760) setValidSize(true)
  }, [])
  if (validSize)
    return (
      <WebStateProvider>
        <main className="fixed h-screen w-screen">
          {children}
          <DoFullScreenButton />
        </main>
      </WebStateProvider>
    )
  else
    return (
      <main className="fixed flex h-screen w-screen items-center justify-center">
        The Screen size is not compartible to run the app. <br />
        Please use: <br />
        Width &gt; 1024px <br />
        Height &gt; 768px
      </main>
    )
}

export default OSLayout

const DoFullScreenButton = () => {
  const [isFullScreen, setSF] = useState(false)

  const letFullScreen = () => {
    document.documentElement.requestFullscreen()
  }
  useEffect(() => {
    document.documentElement.addEventListener('fullscreenchange', () => {
      setSF((pv) => !pv)
     
    })
  }, [])
  return (
    <>
      {!isFullScreen && (
        <span className=" absolute top-16 right-10">
          <IconButton onClick={letFullScreen} style={{ background: 'white' }}>
            <FullscreenIcon fontSize="large" />
          </IconButton>
        </span>
      )}
    </>
  )
}
