export default function GlassPanel({ className = '', children }) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/8 border border-white/15 shadow-glass rounded-3xl ${className}`}
    >
      {children}
    </div>
  )
}
