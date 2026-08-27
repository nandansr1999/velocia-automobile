import { motion, AnimatePresence } from 'framer-motion'

function PageLoader({ theme, brandName, isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.bg,
          }}
        >
          <motion.p
            initial={{ letterSpacing: '0.1em', opacity: 0.5 }}
            animate={{ letterSpacing: '0.4em', opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              color: theme.text,
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {brandName}
          </motion.p>

          <div
            style={{
              width: '160px',
              height: '2px',
              borderRadius: '9999px',
              overflow: 'hidden',
              backgroundColor: `${theme.accent}22`,
            }}
          >
            <motion.div
              style={{
                height: '100%',
                width: '33%',
                borderRadius: '9999px',
                backgroundColor: theme.accent,
              }}
              initial={{ x: '-120%' }}
              animate={{ x: '320%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader