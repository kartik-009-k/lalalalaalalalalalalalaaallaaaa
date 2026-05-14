import { Search, Mic } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'

export default function BottomDock({ searchOpen, onToggleSearch }) {
  return (
    <motion.div animate={{ y: searchOpen ? -10 : 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
      <GlassPanel className="mx-auto flex items-center gap-3 rounded-full px-4 py-3">
        <button onClick={onToggleSearch} className="glass-button p-2.5" aria-label="Toggle search">
          <Search className="h-5 w-5" />
        </button>
        <button className="glass-button p-2.5" aria-label="Voice">
          <Mic className="h-5 w-5" />
        </button>
      </GlassPanel>
    </motion.div>
  )
}
