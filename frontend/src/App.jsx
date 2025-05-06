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
      <div style={{display: 'flex', flexDirection: 'column', height: '80vh'}}>
        <header style={{padding: '1rem', textAlign: 'center'}}>
          <p>
            <strong>Pop Topics</strong> shows you what the internet’s buzzing about right now.<br />
            Every bubble is a blazing search trend from the past week — the bigger it is, the more people are googling it.<br /><br />

            Whether you're chasing content ideas, trying to impress at your next dinner party, or just really good at procrastinating... tap a bubble. Go down the rabbit hole.<br /><br />

            <strong>Stay curious. Stay hot. 🔥</strong>
          </p>
        </header>

        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='container'>
            <div className='bubbles' style={{position: 'relative', width: '100%', height: '100%', border:'2px dashed red', overflow: 'visible' }}>
              {loading ? <p>Loading....</p> : <BubbleLayout data={trends} /> }
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
