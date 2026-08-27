    import ScrollReveal from './ScrollReveal'

    function Gallery({ theme, title, items }) {
    return (
        <section className="py-28 px-6 md:px-10" style={{ backgroundColor: theme.bg }}>
        <div className="max-w-6xl mx-auto">
            <ScrollReveal>
            <h2
                className="text-4xl md:text-5xl mb-14 text-center"
                style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}
            >
                {title}
            </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.1}>
                <div className="relative group overflow-hidden rounded-xl cursor-pointer">
                    <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                    className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${theme.bg}EE, transparent)` }}
                    >
                    <div>
                        <p className="text-sm tracking-widest uppercase" style={{ color: theme.accent }}>
                        {item.tag}
                        </p>
                        <p className="text-2xl" style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}>
                        {item.name}
                        </p>
                    </div>
                    </div>
                </div>
                </ScrollReveal>
            ))}
            </div>
        </div>
        </section>
    )
    }

    export default Gallery