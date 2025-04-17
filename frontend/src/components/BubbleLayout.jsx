import { useEffect, useState } from 'react';
import { forceSimulation, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import Bubble from './Bubble';
import { normalizeTrendVolume } from '../util/utils';

const BubbleLayout = ({ data: trends }) => {
  const [nodes, setNodes] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);


  useEffect(() => {
    const initialNodes = trends.map((trend, idx) => ({
      id: idx,
      title: trend.terms,
      size: normalizeTrendVolume(trend.volume) * 6,
      x: Math.random() * 400,
      y: Math.random() * 400,
    }));

    // DEBUG: 
    initialNodes.forEach((node) => console.log("node size: " + node.size));

    const simulation = forceSimulation(initialNodes)
      .force('charge', forceManyBody().strength(5))
      .force('center', forceCenter(400 / 2, 400 / 2))
      .force('collision', forceCollide().radius(d => d.size / 2))
      .on('tick', () => {
        setNodes([...initialNodes]);
      });

    return () => simulation.stop();
  }, [trends]);

  return (
    <div style={{ position: 'relative', width: 400, height: 400 }}>
      {nodes.map((node, idx) => (
        <Bubble
          key={idx}
          title={node.title}
          size={node.size}
          style={{ left: node.x, top: node.y }}
          id={idx}
          isHovered={hoveredId === idx}
          setHoveredId={setHoveredId}
          hoverLocked={hoveredId !== null && hoveredId !== idx}
        />
      ))}
    </div>
  );
};

export default BubbleLayout;
