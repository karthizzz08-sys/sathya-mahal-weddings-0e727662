import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";

const lighting = [
  { id: "outer-lighting", name: "Outer Lighting", price: 10000 },
  { id: "dj-dance", name: "DJ & Dance Floor", price: 35000 },
  { id: "chariot-entry", name: "Chariot Entry", price: 35000 },
];
const floral = [
  { id: "flower-pot", name: "Flower Pot (each)", price: 500 },
  { id: "stage-decor", name: "Stage Decoration", price: 25000 },
];

export default function Decoration() {
  const { state, toggleItem } = useBooking();
  const navigate = useNavigate();
  const isOn = (id: string) => state.decoration.some(d => d.id === id);

  const Card = ({ item, icon: Icon }: any) => {
    const on = isOn(item.id);
    return (
      <motion.button
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => toggleItem("decoration", item)}
        className={`glass-card rounded-2xl p-6 text-left w-full transition-all ${
          on ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/10 to-transparent" : ""
        }`}
      >
        <div className={`inline-flex p-3 rounded-xl mb-4 ${on ? "bg-gradient-gold text-primary-foreground" : "bg-secondary text-primary"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h4 className="font-serif text-xl mb-2">{item.name}</h4>
        <p className="font-serif text-2xl gold-text">₹{item.price.toLocaleString()}</p>
        <p className={`mt-3 text-xs uppercase tracking-widest ${on ? "text-accent" : "text-muted-foreground"}`}>
          {on ? "✓ Selected" : "Tap to select"}
        </p>
      </motion.button>
    );
  };

  return (
    <section className="container py-16 md:py-24">
      <SectionTitle eyebrow="Step 4" title="Decoration" subtitle="Build the ambience — pick from lighting, effects and floral setups." />

      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h3 className="font-serif text-3xl mb-6 flex items-center gap-3"><Sparkles className="text-primary" /> Lighting & Effects</h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {lighting.map((it, i) => (
              <motion.div key={it.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card item={it} icon={Sparkles} />
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-serif text-3xl mb-6 flex items-center gap-3"><Flower2 className="text-primary" /> Floral & Setup</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {floral.map((it, i) => (
              <motion.div key={it.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card item={it} icon={Flower2} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Button onClick={() => navigate("/catering")} className="rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold h-12 px-8">
            Continue to Catering →
          </Button>
        </div>
      </div>
    </section>
  );
}
