import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";

const groups = [
  { title: "� Welcome Setup", items: [
    { id: "welcome-girls", name: "Welcome Girls", price: 2000, description: "Elegant welcome by girls" },
    { id: "welcome-drinks", name: "Welcome Drinks (Coffee/Tea/Juice)", price: 4000, description: "Beverages for 100+ guests" },
    { id: "welcome-crackers", name: "Welcome Crackers", price: 1500, description: "Celebratory fireworks" },
  ]},
  { title: "🍽 Plates & Entry", items: [
    { id: "valai-maram", name: "Valai Maram", price: 2000, description: "Traditional banana arch" },
    { id: "santhanam-paneer", name: "Santhanam, Kumkumam & Paneer", price: 150, description: "Traditional welcome items" },
    { id: "gem-plate", name: "Gem Plate", price: 100, description: "Decorative gem plate" },
    { id: "vetilai-paakku", name: "Vetilai Paakku Plate", price: 100, description: "Betel leaf plate" },
    { id: "flower-pot", name: "Flower Pot (Welcome Table)", price: 500, description: "Decorative flower arrangement" },
  ]},
  { title: "✨ Decoration & Efforts", items: [
    { id: "outer-lighting", name: "Outer Lighting", price: 10000, description: "LED & ambient lighting setup" },
    { id: "dj-dance", name: "DJ & Dance", price: 35000, description: "Professional DJ with sound system" },
    { id: "chariot-entry", name: "Chariot Entry", price: 35000, description: "Grand chariot for bride/groom" },
    { id: "pyro-blast", name: "Pyro Blast", price: 1500, description: "Controlled pyrotechnics" },
    { id: "bubble-effect", name: "Bubble Effect", price: 1500, description: "Bubble machine effects" },
    { id: "ice-smoke", name: "Ice Smoke Entry", price: 5000, description: "Dry ice smoke effects" },
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
                      <div className="flex-1">
                        <h4 className="font-serif text-lg">{it.name}</h4>
                        {it.description && <p className="text-xs text-muted-foreground mt-1">{it.description}</p>}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${on ? "bg-gradient-gold border-transparent" : "border-primary/40"}`}>
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
