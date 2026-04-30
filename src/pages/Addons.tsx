import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";
import b1 from "@/assets/b1.jpeg";
import b2 from "@/assets/b2.jpeg";
import b3 from "@/assets/b3.jpeg";
import b4 from "@/assets/b4.jpeg";
import b5 from "@/assets/b5.jpeg";
import b6 from "@/assets/b6.jpeg";
import b7 from "@/assets/b7.jpeg";
import b8 from "@/assets/b8.jpeg";
import b9 from "@/assets/b9.jpeg";
import b10 from "@/assets/b10.jpeg";
import b11 from "@/assets/b11.jpeg";
import b12 from "@/assets/b12.jpeg";
import b13 from "@/assets/b13.jpeg";
import b14 from "@/assets/b14.jpeg";
import b15 from "@/assets/b15.jpeg";

const groups = [
  { title: "🎉 Welcome Setup", items: [
    { id: "welcome-girls", name: "Welcome Girls", price: 2000, description: "Elegant welcome by girls", image: b1 },
    { id: "welcome-drinks", name: "Welcome Drinks (Coffee/Tea/Juice)", price: 4000, description: "Beverages for 100+ guests", image: b2 },
    { id: "welcome-crackers", name: "Welcome Crackers", price: 1500, description: "Celebratory fireworks", image: b3 },
  ]},
  { title: "🍽 Plates & Entry", items: [
    { id: "valai-maram", name: "Valai Maram", price: 2000, description: "Traditional banana arch", image: b4 },
    { id: "santhanam-paneer", name: "Santhanam, Kumkumam & Paneer", price: 150, description: "Traditional welcome items", image: b5 },
    { id: "gem-plate", name: "Gem Plate", price: 100, description: "Decorative gem plate", image: b6 },
    { id: "vetilai-paakku", name: "Vetilai Paakku Plate", price: 100, description: "Betel leaf plate", image: b7 },
    { id: "flower-pot", name: "Flower Pot (Welcome Table)", price: 500, description: "Decorative flower arrangement", image: b8 },
    { id: "chocolate-plate", name: "Chocolate Plate", price: 800, description: "Delicious chocolate platter", image: b15 },
  ]},
  { title: "✨ Decoration & Efforts", items: [
    { id: "outer-lighting", name: "Outer Lighting", price: 10000, description: "LED & ambient lighting setup", image: b9 },
    { id: "dj-dance", name: "DJ & Dance", price: 35000, description: "Professional DJ with sound system", image: b10 },
    { id: "chariot-entry", name: "Chariot Entry", price: 35000, description: "Grand chariot for bride/groom", image: b11 },
    { id: "pyro-blast", name: "Pyro Blast", price: 1500, description: "Controlled pyrotechnics", image: b12 },
    { id: "bubble-effect", name: "Bubble Effect", price: 1500, description: "Bubble machine effects", image: b13 },
    { id: "ice-smoke", name: "Ice Smoke Entry", price: 5000, description: "Dry ice smoke effects", image: b14 },
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
                    className={`glass-card rounded-2xl overflow-hidden text-left transition-all flex flex-col ${
                      on ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/10 to-transparent" : ""
                    }`}
                  >
                    {it.image && (
                      <div className="relative w-full h-32 overflow-hidden bg-black/20">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-serif text-lg">{it.name}</h4>
                          {it.description && <p className="text-xs text-muted-foreground mt-1">{it.description}</p>}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${on ? "bg-gradient-gold border-transparent" : "border-primary/40"}`}>
                          {on && <span className="text-primary-foreground text-xs">✓</span>}
                        </div>
                      </div>
                      <p className="font-serif text-2xl gold-text mt-auto">₹{it.price.toLocaleString()}</p>
                    </div>
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
