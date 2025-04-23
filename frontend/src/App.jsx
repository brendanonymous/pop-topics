import { useState } from 'react'
import Bubble from './components/Bubble'
import './App.css'
import { useWeeklyTrends } from './hooks/useWeeklyTrends';
import { normalizeTrendVolume } from './util/utils';
import BubbleLayout from './components/BubbleLayout';

function App() {
  const { data: trends, error, loading } = useWeeklyTrends();
  if (error) {
    return <div>oh, we got BIG problems: {error.message}</div>;
  }

  return (
    <>
      <div className='container'>
        <div className='bubbles'>
          {loading ? <p>Loading....</p> : <BubbleLayout data={trends} /> }
        </div>
      </div>
    </>
  )
}

export default App;
