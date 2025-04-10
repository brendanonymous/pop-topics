import { useState } from 'react'
import Bubble from './components/Bubble'
import './App.css'
import { useWeeklyTrends } from './hooks/useWeeklyTrends';
import { normalizeTrendVolume } from './util/utils';
import BubbleLayout from './components/BubbleLayout';

function App() {
  const { data: trends, error } = useWeeklyTrends();
  if (error) {
    return <div>oh, we got BIG problems: {error.message}</div>;
  }

  return (
    <>
      <div className='container'>
        <div className='bubbles'>
          {trends ? <BubbleLayout data={trends} /> : <p>Loading....</p>}
        </div>
      </div>
    </>
  )
}

export default App;
