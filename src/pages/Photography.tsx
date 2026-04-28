import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  Clapperboard,
  Plane,
  Sparkles,
  Play,
  Music,
  Crown,
  Check,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";
import { toast } from "sonner";

type EventType = "single" | "double";

interface PhotographyPackage {
  id: string;
  name: string;
  tier: "silver" | "gold" | "platinum" | "diamond";
  icon: React.ReactNode;
  singlePrice: number;
  doublePrice: number;
  badge?: string;
  featured?: boolean;
  savingsLabel?: string;
  features: string[];
  highlights: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
}

const packages: PhotographyPackage[] = [
  {
    id: "silver",
    name: "Silver",
    tier: "silver",
    icon: <Camera className="h-7 w-7" />,
    singlePrice: 12000,
    doublePrice: 15000,
    savingsLabel: "Save 25%",
    features: [
      "Traditional photography (8K resolution)",
      "Fully digital photos delivered in pendrive",
      "1 Budget album (12x36)",
    ],
    highlights: [
      { icon: <Camera className="h-5 w-5" />, label: "Traditional" },
      { icon: <Play className="h-5 w-5" />, label: "Digital" },
      { icon: <Sparkles className="h-5 w-5" />, label: "1 Album" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    tier: "gold",
    icon: <Clapperboard className="h-7 w-7" />,
    singlePrice: 25000,
    doublePrice: 40000,
    savingsLabel: "Save 38%",
    features: [
      "Traditional photo (1)",
      "Traditional video (1)",
      "Full length HD video output + photos in pendrive",
      "Premium Canva album (1)",
      "1 Photo frame (12x18)",
    ],
    highlights: [
      { icon: <Camera className="h-5 w-5" />, label: "Photo + Video" },
      { icon: <Play className="h-5 w-5" />, label: "HD Output" },
      { icon: <Sparkles className="h-5 w-5" />, label: "Premium" },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    tier: "platinum",
    icon: <Plane className="h-7 w-7" />,
    singlePrice: 50000,
    doublePrice: 65000,
    badge: "Best Value",
    savingsLabel: "Save 30%",
    features: [
      "Traditional photographer (1)",
      "Traditional videographer (1)",
      "Candid photographer (1)",
      "Drone + LED TV (2 Nos)",
      "Full length 4K video + photos",
      "Pendrive",
      "Premium Canva album",
      "2 Photo frames (12x18)",
      "1 Couple pics gift",
    ],
    highlights: [
      { icon: <Plane className="h-5 w-5" />, label: "Drone" },
      { icon: <Film className="h-5 w-5" />, label: "4K Video" },
      { icon: <Sparkles className="h-5 w-5" />, label: "Premium" },
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    tier: "diamond",
    icon: <Crown className="h-7 w-7" />,
    singlePrice: 70000,
    doublePrice: 90000,
    featured: true,
    savingsLabel: "Save 29%",
    features: [
      "Traditional photographer (1)",
      "Traditional videographer (1)",
      "Candid photographer (1)",
      "Candid videographer (1)",
      "Drone + LED TV (2 Nos)",
      "Pre / Post wedding shoot",
      "Full length 4K video + photos",
      "Pendrive",
      "Premium Canva album",
      "Cinematic E-invite video",
      "Cinematic (AI + After Effects) teaser cut",
      "Cinematic one song edit",
      "2 Photo frames (12x18)",
    ],
    highlights: [
      { icon: <Plane className="h-5 w-5" />, label: "Cinematic" },
      { icon: <Film className="h-5 w-5" />, label: "4K + AI" },
      { icon: <Music className="h-5 w-5" />, label: "Premium" },
    ],
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "silver":
      return "from-slate-400 to-slate-500";
    case "gold":
      return "from-amber-500 to-amber-600";
    case "platinum":
      return "from-cyan-400 to-blue-500";
    case "diamond":
      return "from-purple-500 to-pink-500";
    default:
      return "from-amber-500 to-amber-600";
  }
};

const getTierTextColor = (tier: string) => {
  switch (tier) {
    case "silver":
      return "text-slate-700";
    case "gold":
      return "text-amber-700";
    case "platinum":
      return "text-blue-700";
    case "diamond":
      return "text-purple-700";
    default:
      return "text-amber-700";
  }
};

export default function Photography() {
  const { state, set } = useBooking();
  const { loading, go } = useTransitionNav(700);
  const navigate = useNavigate();
  const [eventType, setEventType] = useState<EventType>("single");

  const select = (pkg: PhotographyPackage) => {
    const price = eventType === "single" ? pkg.singlePrice : pkg.doublePrice;
    const eventLabel = eventType === "single" ? "Single Event" : "Two Events";
    toast.success(`${pkg.name} Plan (${eventLabel}) selected`);
    go("/decoration", () =>
      set("photography", {
        id: pkg.id,
        name: `${pkg.name} - ${eventLabel}`,
        price: price,
      })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <PageLoader show={loading} label="Loading Decoration…" />
      <section className="container py-12 md:py-24">
        <SectionTitle
          eyebrow="Step 3"
          title="Photography Packages"
          subtitle="Capture your special moments with our premium photography services"
        />

        {/* Event Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-card/80 backdrop-blur rounded-full p-1.5 shadow-soft border border-primary/15 inline-flex gap-1">
            <button
              onClick={() => setEventType("single")}
              className={`px-8 py-3 rounded-full transition-all font-semibold text-sm ${
                eventType === "single"
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Single Event
            </button>
            <button
              onClick={() => setEventType("double")}
              className={`px-8 py-3 rounded-full transition-all font-semibold text-sm ${
                eventType === "double"
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Two Events
              <span className="text-xs ml-2 bg-accent/30 px-2 py-1 rounded-full">Save More</span>
            </button>
          </div>
        </motion.div>

        {/* Photography Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12"
        >
          {packages.map((pkg, idx) => {
            const price = eventType === "single" ? pkg.singlePrice : pkg.doublePrice;
            const isSelected = state.photography?.id === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className={`relative group`}
              >
                <div
                  className={`glass-card rounded-3xl p-6 md:p-8 h-full transition-all relative overflow-hidden ${
                    pkg.featured
                      ? "ring-2 ring-primary shadow-gold md:col-span-1 lg:scale-105"
                      : "hover:shadow-gold"
                  } ${isSelected ? "ring-2 ring-accent" : ""}`}
                >
                  {/* Background Glow */}
                  <div
                    className={`absolute inset-0 opacity-5 blur-3xl bg-gradient-to-br ${getTierColor(
                      pkg.tier
                    )}`}
                  ></div>

                  {/* Featured Badge */}
                  {pkg.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground text-[11px] px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-gold">
                      <Crown className="h-3.5 w-3.5" /> Most Popular
                    </div>
                  )}

                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-6 right-6 bg-accent/20 text-accent text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Tier Icon and Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTierColor(
                          pkg.tier
                        )} text-white flex items-center justify-center shadow-lg`}
                      >
                        {pkg.icon}
                      </div>
                      <h3 className={`font-serif text-2xl md:text-3xl font-bold ${getTierTextColor(pkg.tier)}`}>
                        {pkg.name}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                        {eventType === "single" ? "Single Event" : "Two Events"}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="font-serif text-4xl md:text-5xl gold-text font-bold">
                          ₹{price.toLocaleString()}
                        </p>
                        {pkg.savingsLabel && eventType === "double" && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            {pkg.savingsLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex gap-2 mb-6">
                      {pkg.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-background/80 rounded-lg p-2 text-center text-xs"
                        >
                          <div className="text-amber-600 flex justify-center mb-1">{h.icon}</div>
                          <p className="text-[10px] text-muted-foreground">{h.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {pkg.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-snug"
                        >
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0 flex-shrink-0" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => select(pkg)}
                      className={`w-full rounded-full h-12 text-base font-semibold transition-all ${
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : `bg-gradient-to-r ${getTierColor(pkg.tier)} text-white hover:opacity-90`
                      }`}
                    >
                      {isSelected ? "Selected ✓" : "Select Package"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison Table - Optional Enhancement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-16 md:mt-24"
        >
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[11px] uppercase tracking-[0.35em] text-accent mb-3">Package Comparison</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-3 leading-tight">
              Choose Your Perfect Package
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Compare all features and select the package that best suits your needs
            </p>
          </div>

          {/* Quick Feature Comparison */}
          <div className="glass-card rounded-3xl p-6 md:p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-serif text-base md:text-lg">Feature</th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`text-center py-4 px-4 font-serif font-bold ${getTierTextColor(pkg.tier)}`}
                    >
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Photographers</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">2</td>
                  <td className="text-center py-4 px-4">3</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Videographers</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">2</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Video Quality</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">HD</td>
                  <td className="text-center py-4 px-4">4K</td>
                  <td className="text-center py-4 px-4">4K + Cinematic</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Drone Coverage</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-foreground">Cinematic Edits</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Continue Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button
            onClick={() => navigate("/decoration")}
            variant="outline"
            className="rounded-full border-primary/40 hover:bg-primary hover:text-primary-foreground"
          >
            Continue to Decoration →
          </Button>
        </div>
      </section>
    </>
  );
}
