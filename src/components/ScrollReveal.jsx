import { motion } from 'framer-motion'

function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }) {
  const directions = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  }
  const offset = directions[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal