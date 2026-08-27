import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import TiltCard from './TiltCard'

const PAINT_COLORS = [
  { name: 'Electric Blue', hex: '#3B82F6' },
  { name: 'Racing Red', hex: '#DC2626' },
  { name: 'Titanium Grey', hex: '#71717A' },
  { name: 'Pearl White', hex: '#F4F6FB' },
]

function Hero({ theme, eyebrow, title, subtitle, imageUrl, videoUrl, onReady }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const [selectedColor, setSelectedColor] = useState(PAINT_COLORS[0])

  useEffect(()=>{
    if (!videoUrl)onReady?.()
  },[videoUrl, onReady])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Background: video if provided, otherwise image */}
      {videoUrl ? (
        <motion.video
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover scale-110"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={onReady}
        />
      ) : (
        <motion.div
          style={{ y, backgroundImage: `url(${imageUrl})` }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${theme.bg}99, ${theme.bg}, ${theme.bg})` }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: theme.accent }}>
          {eyebrow}
        </p>
        <h1
          className="text-6xl md:text-8xl mb-6 leading-none"
          style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-8" style={{ color: theme.textMuted }}>
          {subtitle}
        </p>

        {/* Signature interactive moment: live paint configurator */}
        <TiltCard className="w-40 h-24 md:w-56 md:h-32 rounded-lg overflow-hidden shadow-2xl mb-6">
          <motion.div
            key={selectedColor.hex}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${selectedColor.hex}, ${theme.bg})`,
            }}
          />
        </TiltCard>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase mr-1" style={{ color: theme.textMuted }}>
            {selectedColor.name}
          </span>
          {PAINT_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color)}
              aria-label={color.name}
              className="w-6 h-6 rounded-full transition-transform duration-200 hover:scale-125"
              style={{
                backgroundColor: color.hex,
                border: selectedColor.hex === color.hex ? `2px solid ${theme.text}` : '2px solid transparent',
                boxShadow: selectedColor.hex === color.hex ? `0 0 0 2px ${theme.bg}` : 'none',
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={24} style={{ color: theme.textMuted }} className="animate-bounce" />
      </motion.div>
    </section>
  )
}

export default Hero