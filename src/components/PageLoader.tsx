import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-ink-950">
      <motion.div
        className="h-6 w-6 rounded-full border border-white/15 border-t-white"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
