import { useEffect, useState } from 'react';
import { forceSimulation, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import Bubble from './Bubble';
import { normalizeTrendVolume } from '../util/utils';

const BubbleLayout = ({ data: trends }) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const initialNodes = trends.map((trend, idx) => ({
      id: idx,
      title: trend.terms,
      size: normalizeTrendVolume(trend.volume) * 5,
      x: Math.random() * 400,
      y: Math.random() * 400,
    }));

    // DEBUG: 
    initialNodes.forEach((node) => console.log("node size: " + node.size));

    const simulation = forceSimulation(initialNodes)
      .force('charge', forceManyBody().strength(5))
      .force('center', forceCenter(400 / 2, 400 / 2)) // adjust size to your container
      .force('collision', forceCollide().radius(d => d.size / 2))
      .on('tick', () => {
        setNodes([...initialNodes]);
      });

    return () => simulation.stop();
  }, [trends]);

  return (
    <div style={{ position: 'relative', width: 400, height: 400 }}>
      {nodes.map((node, idx) => (
        <div key={idx} style={{
          position: 'absolute',
          left: node.x,
          top: node.y,
          transform: `translate(-50%, -50%)`,
        }}>
          <Bubble className="bubble" title={node.title} size={node.size} />
        </div>
      ))}
    </div>
  );
};

export default BubbleLayout;
