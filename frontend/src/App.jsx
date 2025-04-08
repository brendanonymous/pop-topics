import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Bubble from './components/Bubble'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <h1>Hello, world</h1>
        <div className='bubbles'>
          <Bubble title={"da g kitty"} size={"85"}></Bubble>
        </div>
      </div>
    </>
  )
}

export default App
