import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import EngineDirectory from './components/EngineDirectory'
import BottomDock from './components/BottomDock'
import GlassPanel from './components/GlassPanel'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [engineOpen, setEngineOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(110,140,255,0.18),transparent_35%),radial-gradient(circle_at_83%_15%,rgba(126,245,255,0.12),transparent_32%),radial-gradient(circle_at_45%_82%,rgba(196,160,255,0.12),transparent_40%)]" />

      <motion.button
        whileTap={{ scale: 0.94 }}
        whileHover={{ y: -1 }}
        onClick={() => setEngineOpen((v) => !v)}
        className="absolute left-6 top-6 z-30 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-lg"
        aria-label="Toggle engines"
      >
        <MoreHorizontal className="h-4 w-4 text-white/90" />
      </motion.button>

      <EngineDirectory open={engineOpen} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-36 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="w-full max-w-5xl"
        >
          <GlassPanel className="mx-auto h-[54vh] max-h-[560px] min-h-[360px] w-full bg-white/[0.04]" />
        </motion.div>

        <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mb-4"
              >
                <GlassPanel className="w-[min(86vw,640px)] px-4 py-3">
                  <input
                    autoFocus
                    placeholder="Search your workspace intelligence..."
                    className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/50 focus:text-white"
                  />
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>

          <BottomDock searchOpen={searchOpen} onToggleSearch={() => setSearchOpen((v) => !v)} />
        </div>
      </main>
    </div>
  )
}
