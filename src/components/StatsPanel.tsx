import { useEffect, useRef } from "react"
import Stats from 'stats.js'

export default function StatsPanel() {
  const stats = useRef<Stats>()

  useEffect(() => {
    stats.current = new Stats()
    document.body.appendChild(stats.current.dom)

    stats.current.dom.style.position = 'fixed'
    stats.current.dom.style.bottom = '0'
    stats.current.dom.style.right = '0'
    stats.current.dom.style.left = ''
    stats.current.dom.style.top = ''
    stats.current.dom.style.zIndex = '9999' 

    const animate = () => {
      stats.current?.begin()  
      stats.current?.end()    
      requestAnimationFrame(animate)  
    }
    animate()

    return () => {
      if (stats.current) {
        document.body.removeChild(stats.current.dom)
      }
    }
  }, [])

  return null  
}