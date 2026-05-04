import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";
import featureHall from "@/assets/feature-hall.jpg";
import featureDining from "@/assets/feature-dining.jpg";
import featureAc from "@/assets/feature-ac.jpg";
import featureParking from "@/assets/feature-parking.jpg";

const decorationStyles = [
  { id: "style-1", name: "Royal Golden Setup", image: featureHall, price: 5000 },
  { id: "style-2", name: "Classic Floral Arch", image: featureDining, price: 5000 },
  { id: "style-3", name: "Modern Minimalist", image: featureAc, price: 5000 },
  { id: "style-4", name: "Traditional Mandap", image: featureParking, price: 5000 },
  { id: "style-5", name: "Garden Theme", image: featureHall, price: 5000 },
  { id: "style-6", name: "Crystal & Lights", image: featureDining, price: 5000 },
  { id: "style-7", name: "Rose Petals Design", image: featureAc, price: 5000 },
  { id: "style-8", name: "Grand Entrance", image: featureParking, price: 5000 },
  { id: "style-9", name: "Marigold Elegance", image: featureHall, price: 5000 },
  { id: "style-10", name: "Pearl & Diamond", image: featureDining, price: 5000 },
  { id: "style-11", name: "Tropical Paradise", image: featureAc, price: 5000 },
  { id: "style-12", name: "Gold & Maroon", image: featureParking, price: 5000 },
  { id: "style-13", name: "Floral Cascade", image: featureHall, price: 5000 },
  { id: "style-14", name: "Baroque Luxury", image: featureDining, price: 5000 },
  { id: "style-15", name: "Nature Inspired", image: featureAc, price: 5000 },
  { id: "style-16", name: "Silver Elegance", image: featureParking, price: 5000 },
];

export default function Decoration() {
  const { state, toggleItem } = useBooking();
  const { loading, go } = useTransitionNav(700);
  const isOn = (id: string) => state.decoration.some(d => d.id === id);

  const selectStyle = (style: typeof decorationStyles[0]) => {
    toggleItem("decoration", { id: style.id, name: style.name, price: 5000 });
  };

  return (
    <>
      <PageLoader show={loading} label="Loading Catering…" />
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Step 4" title="Decoration Styles" subtitle="Select your preferred decoration theme for the event." />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {decorationStyles.map((style, i) => {
            const selected = isOn(style.id);
            return (
              <motion.button
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => selectStyle(style)}
                className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-gold transition-all aspect-square cursor-pointer ${
                  selected ? "ring-4 ring-primary shadow-gold" : ""
                }`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all" style={{
                    backgroundColor: selected ? "rgb(212, 175, 55)" : "transparent",
                    borderColor: selected ? "rgb(212, 175, 55)" : "white/50"
                  }}>
                    {selected && <span className="text-primary-foreground text-xs">✓</span>}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-serif text-lg leading-snug">{style.name}</p>
                  <p className="text-sm mt-2 font-semibold">₹{style.price.toLocaleString()}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {state.decoration.length === 0 ? "Select one or more decoration styles" : `${state.decoration.length} style(s) selected`}
          </p>
          <Button onClick={() => go("/catering")} className="rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold h-12 px-8">
            Continue to Catering →
          </Button>
        </div>
      </div>
      </section>
    </>
  );
}
