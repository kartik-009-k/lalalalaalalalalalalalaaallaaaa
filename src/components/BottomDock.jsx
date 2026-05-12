import { Search, Mic } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassPanel from './GlassPanel'

export default function BottomDock({ searchOpen, onToggleSearch }) {
  return (
    <motion.div animate={{ y: searchOpen ? -8 : 0 }} transition={{ duration: 0.35 }}>
      <GlassPanel className="mx-auto flex items-center gap-4 px-5 py-3 rounded-full">
        <button
          onClick={onToggleSearch}
          className="rounded-full border border-white/20 bg-white/10 p-2 text-white/90 transition hover:scale-105 hover:bg-white/20"
          aria-label="Toggle search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          className="rounded-full border border-white/20 bg-white/10 p-2 text-white/90 transition hover:scale-105 hover:bg-white/20"
          aria-label="Voice"
        >
          <Mic className="h-5 w-5" />
        </button>
      </GlassPanel>
    </motion.div>
  )
}
