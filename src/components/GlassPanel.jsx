export default function GlassPanel({ className = '', children }) {
  return <div className={`glass-surface rounded-3xl ${className}`}>{children}</div>
}
