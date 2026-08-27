import ScrollReveal from './ScrollReveal'

function CTASection({ theme, title, subtitle, buttonLabel, onButtonClick }) {
  return (
    <section
      id="cta"
      className="py-32 px-6 text-center"
      style={{ backgroundColor: theme.bgAlt }}
    >
      <ScrollReveal>
        <h2
          className="text-4xl md:text-6xl mb-6"
          style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h2>
        <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: theme.textMuted }}>
          {subtitle}
        </p>
        <button 
        onClick={onButtonClick}
          className="px-10 py-4 text-sm tracking-widest uppercase transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: theme.accent, color: theme.bg }}
        >
          {buttonLabel}
        </button>
      </ScrollReveal>
    </section>
  )
}

export default CTASection