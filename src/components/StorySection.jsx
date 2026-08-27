import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'

function StorySection({ theme, eyebrow, title, text, imageUrl, reverse = false }) {
  return (
    <section className="py-28 px-6 md:px-10" style={{ backgroundColor: theme.bg }}>
      <div
        className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center ${
          reverse ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <ScrollReveal direction={reverse ? 'right' : 'left'}>
          <TiltCard className="rounded-2xl overflow-hidden shadow-2xl" intensity={6}>
            <img src={imageUrl} alt={title} className="w-full h-[420px] object-cover" />
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal direction={reverse ? 'left' : 'right'} delay={0.15}>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: theme.accent }}>
            {eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl mb-6 leading-tight"
            style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: theme.textMuted }}>
            {text}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default StorySection