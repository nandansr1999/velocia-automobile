import ScrollReveal from './ScrollReveal'

function StatsBar({ theme, stats }) {
  return (
    <section className="py-20 px-6 border-y" style={{ backgroundColor: theme.bgAlt, borderColor: `${theme.accent}22` }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="text-center">
              <p
                className="text-4xl md:text-5xl mb-2"
                style={{ color: theme.accent, fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: theme.textMuted }}>
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default StatsBar