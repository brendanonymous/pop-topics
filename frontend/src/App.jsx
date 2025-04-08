import { useState } from 'react'
import Bubble from './components/Bubble'
import './App.css'

function App() {
  const bubbles = Array.from({length: 10}, (_, i) => (
    <Bubble title={"da g kitty"} size={"85"} />
  ));

  return (
    <>
      <div className='container'>
        <h1>Hello, world</h1>
        <div className='bubbles'>
          {bubbles}
        </div>
      </div>
    </>
  )
}

export default App;
