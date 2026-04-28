import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";

const groups = [
  { title: "🍫 Basic", items: [
    { id: "chocolate-plate", name: "Chocolate Plate", price: 150 },
    { id: "vetrilai", name: "Vetrilai Paakku Plate", price: 100 },
  ]},
  { title: "🎉 Welcome Setup", items: [
    { id: "welcome-girls", name: "Welcome Girls", price: 2000 },
    { id: "welcome-drinks", name: "Welcome Drinks", price: 4000 },
    { id: "welcome-crackers", name: "Welcome Crackers", price: 1500 },
  ]},
  { title: "🍽 Plates & Rituals", items: [
    { id: "valai-maram", name: "Valai Maram", price: 2000 },
    { id: "santhanam", name: "Santhanam & Kumkumam", price: 150 },
    { id: "gem-plate", name: "Gem Plate", price: 100 },
  ]},
];

export default function Addons() {
  const { state, toggleItem } = useBooking();
  const navigate = useNavigate();
  const isOn = (id: string) => state.addons.some(a => a.id === id);

  return (
    <section className="container py-16 md:py-24">
      <SectionTitle eyebrow="Step 6" title="Add-Ons" subtitle="Sprinkle your celebration with delightful traditions." />

      <div className="max-w-5xl mx-auto space-y-12">
        {groups.map(g => (
          <div key={g.title}>
            <h3 className="font-serif text-3xl mb-6">{g.title}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.items.map((it, i) => {
                const on = isOn(it.id);
                return (
                  <motion.button
                    key={it.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleItem("addons", it)}
                    className={`glass-card rounded-2xl p-5 text-left transition-all ${
                      on ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/10 to-transparent" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-serif text-lg">{it.name}</h4>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${on ? "bg-gradient-gold border-transparent" : "border-primary/40"}`}>
                        {on && <span className="text-primary-foreground text-xs">✓</span>}
                      </div>
                    </div>
                    <p className="font-serif text-2xl gold-text">₹{it.price.toLocaleString()}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
        <div className="text-center">
          <Button onClick={() => navigate("/summary")} className="rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold h-12 px-8">
            View Booking Summary →
          </Button>
        </div>
      </div>
    </section>
  );
}
