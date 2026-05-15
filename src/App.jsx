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
    <div className="relative min-h-screen overflow-hidden bg-[#070a11] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(147,170,255,0.2),transparent_35%),radial-gradient(circle_at_83%_18%,rgba(126,220,255,0.13),transparent_32%),radial-gradient(circle_at_50%_82%,rgba(157,124,255,0.14),transparent_40%)]" />

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ y: -1 }}
        onClick={() => setEngineOpen((v) => !v)}
        className="glass-surface absolute left-5 top-5 z-40 rounded-full p-2"
        aria-label="Toggle engines"
      >
        <MoreHorizontal className="h-4 w-4 text-white/90" />
      </motion.button>

      <EngineDirectory open={engineOpen} />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-36 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-5xl"
        >
          <GlassPanel className="mx-auto flex h-[56vh] min-h-[360px] w-full items-center justify-center bg-white/[0.04] px-6">
            <p className="text-center text-sm tracking-[0.18em] text-white/50">AI-NATIVE WORKSPACE SHELL • MODULES LOAD LATER</p>
          </GlassPanel>
        </motion.div>

        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="mb-4"
              >
                <GlassPanel className="w-[min(88vw,660px)] rounded-2xl px-4 py-3">
                  <input
                    autoFocus
                    placeholder="Search your workspace..."
                    className="w-full bg-transparent text-sm text-white/85 outline-none placeholder:text-white/45 focus:text-white"
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
