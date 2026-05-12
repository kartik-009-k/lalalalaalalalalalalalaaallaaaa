import { motion, AnimatePresence } from 'framer-motion'
import { Brain, LayoutPanelTop, Bot, BookOpenText, Sparkles, ChartSpline } from 'lucide-react'
import GlassPanel from './GlassPanel'

const engines = [
  { name: 'Memory Engine', icon: Brain },
  { name: 'Visualization Engine', icon: ChartSpline },
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
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute top-20 left-6 z-20"
        >
          <GlassPanel className="w-[min(88vw,820px)] p-4 md:p-5">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {engines.map((engine, index) => {
                const Icon = engine.icon
                return (
                  <motion.div
                    key={engine.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="min-w-48 rounded-2xl border border-white/15 bg-white/10 p-4"
                  >
                    <Icon className="mb-3 h-5 w-5 text-white/90" />
                    <p className="text-sm text-white/90">{engine.name}</p>
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
