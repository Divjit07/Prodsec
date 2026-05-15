import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="dot-bg flex min-h-[60vh] items-center justify-center bg-brand-dark">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-brand-border border-t-brand-yellow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        aria-label="Loading page"
        role="status"
      />
    </div>
  );
}
