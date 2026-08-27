import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

function Navbar({ brandName, links, theme, ctaLabel = 'Enquire', onCtaClick }) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
            style={{
                backgroundColor: scrolled ? `${theme.bg}E6` : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? `1px solid ${theme.accent}33` : '1px solid transparent',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
                <span
                    className="text-xl tracking-[0.15em]"
                    style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    {brandName}
                </span>

                <div className="hidden md:flex items-center gap-10">
                    {links.map((link) => (

                        <a key={link.label}
                            href={link.href}
                            className="relative group px-3 py-2 text-xs tracking-widest uppercase transition-all duration-300"
                            style={{ color: theme.textMuted }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = theme.accent
                                e.currentTarget.style.textShadow = `0 0 12px ${theme.accent}99, 0 0 24px rgba(255,255,255,0.3)`
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = theme.textMuted
                                e.currentTarget.style.textShadow = 'none'
                            }}
                        >
                            {/* Glow layer behind the text */}
                            <span
                                className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)',
                                    filter: 'blur(10px)',
                                }}
                            />
                            {link.label}
                        </a>
                    ))}
                </div>

                <button
                    onClick={onCtaClick}
                    className="hidden md:inline-block text-xs tracking-widest uppercase px-6 py-2.5 transition-transform duration-300 hover:scale-105"
                    style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                    {ctaLabel}
                </button>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ color: theme.text }}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {
                isOpen && (
                    <div
                        className="md:hidden px-6 py-6 flex flex-col gap-5"
                        style={{ backgroundColor: theme.bg }}
                    >
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm tracking-widest uppercase"
                                style={{ color: theme.text }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )
            }
        </nav >
    )
}

export default Navbar