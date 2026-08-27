function Footer({ theme, brandName }) {
  return (
    <footer className="py-10 px-6 text-center border-t" style={{ backgroundColor: theme.bg, borderColor: `${theme.accent}22` }}>
      <p className="text-xs tracking-widest uppercase" style={{ color: theme.textMuted }}>
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer