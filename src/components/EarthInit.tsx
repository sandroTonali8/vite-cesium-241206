import { Viewer } from "cesium"
import { PropsWithChildren, useEffect, useRef } from "react"

export interface EarthProps {}

export default function Earth({
  children
}: PropsWithChildren<EarthProps>) {
  
  const viewer = useRef<Viewer>()

  useEffect(() => {
    viewer.current = new Viewer('container')

    return () => {
      viewer.current?.destroy()
    }
  }, [])
  
  return (
    <div id="container">
      {children}
    </div>
  )
}