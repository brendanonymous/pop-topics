import { useState } from 'react'
import Bubble from './components/Bubble'
import './App.css'
import { useWeeklyTrends } from './hooks/useWeeklyTrends';

function App() {
  const { data, error } = useWeeklyTrends();
  if (error) {
    return <div>oh, we got BIG problems: {error.message}</div>;
  }


  const bubbles = data ? (data.map((trend, idx) => (
    <Bubble key={idx} title={trend.terms} size={"85"} />
  ))) : <p>Loading...........</p>;

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
