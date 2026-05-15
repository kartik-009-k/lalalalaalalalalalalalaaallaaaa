import { motion, AnimatePresence } from 'framer-motion'
import GlassPanel from './GlassPanel'

const engines = [
  'Memory Engine',
  'Visualization Engine',
  'Learning Engine',
  'Agent Engine',
  'Layout Engine',
  'Personality Engine',
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
              {engines.map((name, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35 }}
                  whileHover={{ y: -5 }}
                  className="glass-surface min-w-48 rounded-2xl p-4"
                >
                  <div className="mb-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/35 text-[10px] text-white/85">
                    ●
                  </div>
                  <p className="text-sm tracking-wide text-white/90">{name}</p>
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
