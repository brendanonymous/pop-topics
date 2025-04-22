import { motion } from 'framer-motion';
import { normalizeScaleSize, formatSearchQuery } from '../util/utils';

function Bubble({ id, title, size, style = {}, isHovered, setHoveredId, hoverLocked }) {
  // font size is scaled in correlation to the bubble size
  const fontSize = size * 0.06;

  return (
    <a href={formatSearchQuery(title)} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ scale: 1 }}
        animate={{
          x: '-50%',
          y: '-50%',
          scale: isHovered ? normalizeScaleSize(size) : 1, // bubble magnification size on hover is variable
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        onHoverStart={() => {
          if (!hoverLocked) setHoveredId(id);
        }}
        onHoverEnd={() => {
          if (isHovered) {
            // delay un-hover so zIndex doesn't jump too early
            setTimeout(() => setHoveredId(null), 350);
          }
        }}
        style={{
          position: 'absolute',
          left: style.left,
          top: style.top,
          transformOrigin: 'center center',
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${fontSize}px`,
          wordWrap: 'break-word',
          background: 'skyblue',
          borderRadius: '100%',
          boxShadow: isHovered ? '1px 1px 10px 1px grey' : 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          zIndex: isHovered ? 100 : 1,
          pointerEvents: hoverLocked && !isHovered ? 'none' : 'auto',
          ...style,
        }}
      >
        {title}
      </motion.div>
    </a>
  );
}

export default Bubble;
