import { motion, AnimatePresence } from 'framer-motion'
import { Brain, LayoutPanelTop, Bot, BookOpenText, Sparkles, LineChart } from 'lucide-react'
import GlassPanel from './GlassPanel'

const engines = [
  { name: 'Memory Engine', icon: Brain },
  { name: 'Visualization Engine', icon: LineChart },
  { name: 'Learning Engine', icon: BookOpenText },
  { name: 'Agent Engine', icon: Bot },
  { name: 'Layout Engine', icon: LayoutPanelTop },
  { name: 'Personality Engine', icon: Sparkles },
]

export default function EngineDirectory({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
          className="absolute left-5 top-20 z-30"
        >
          <GlassPanel className="w-[min(90vw,850px)] p-4 md:p-5">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {engines.map((engine, index) => {
                const Icon = engine.icon
                return (
                  <motion.div
                    key={engine.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.35 }}
                    whileHover={{ y: -5 }}
                    className="glass-surface min-w-48 rounded-2xl p-4"
                  >
                    <Icon className="mb-2 h-5 w-5 text-white/85" />
                    <p className="text-sm tracking-wide text-white/90">{engine.name}</p>
                  </motion.div>
                )
              })}
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
