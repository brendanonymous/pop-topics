import { useRef, useEffect, useState } from 'react';
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceX, forceY } from 'd3-force';
import Bubble from './Bubble';
import { normalizeTrendVolume } from '../util/utils';

const BubbleLayout = ({ data: trends }) => {
  const [nodes, setNodes] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const containerRef = useRef();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(450);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
      setHeight(containerRef.current.offsetHeight);
    }
  }, []);


  useEffect(() => {
    const initialNodes = trends.map((trend, idx) => ({
      id: idx,
      title: trend.terms,
      size: normalizeTrendVolume(trend.volume),
      x: Math.random() * width,
      y: Math.random() * height,
    }));

    // DEBUG: 
    // initialNodes.forEach((node) => console.log("node size: " + node.size));

    const simulation = forceSimulation(initialNodes)
      .force('charge', forceManyBody().strength(5))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collision', forceCollide().radius(d => d.size / 2))
      .force('x', forceX(width / 2).strength(0.01))
      .force('y', forceY(height / 2).strength(0.01))
      .on('tick', () => {
        setNodes([...initialNodes]);
      });

    return () => simulation.stop();
  }, [trends]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
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
