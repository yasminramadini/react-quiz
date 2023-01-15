import { useState, useRef, useEffect } from "react"

const Timer = ({ setRunning }) => {
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const deadline = Date.now() + 60000
  const counter = useRef()
  
  useEffect(() => {
    counter.current = setInterval(() => {
      getTimer()
    })
    
    return () => {
      clearInterval(counter.current)
    }
  }, [])
  
  const getTimer = () => {
    const time = deadline - Date.now()
    setMinute(Math.floor((time / 1000 / 60) % 60));
    setSecond(Math.floor((time / 1000) % 60));
    
    if (Date.now() >= deadline) {
      clearInterval(counter.current)
      setRunning(false)
    }
  }
  
  return (
    <p>{minute < 10 ? `0${minute}` : minute} : {second < 10 ? `0${second}` : second}</p>
  )
}

export default Timer