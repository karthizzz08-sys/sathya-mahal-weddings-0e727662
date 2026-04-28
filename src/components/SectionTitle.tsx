import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-accent mb-3">{eyebrow}</p>}
      <h2 className="font-serif text-4xl md:text-5xl mb-4">{title}</h2>
      <div className="luxe-divider mb-4">✦</div>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}
