import { motion } from 'framer-motion';

function Bubble({ id, title, size, style = {}, isHovered, setHoveredId, hoverLocked }) {
  const fontSize = size * 0.12;

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        x: '-50%',
        y: '-50%',
        scale: isHovered ? 2 : 1,
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
        background: 'skyblue',
        borderRadius: '100%',
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
  );
}

export default Bubble;
