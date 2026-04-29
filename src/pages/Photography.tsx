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
  description: string;
  deliverables: string;
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
    description: "Perfect for intimate celebrations and pre-event moments",
    deliverables: "Photos & Digital Album",
    features: [
      "Traditional photography (8K resolution)",
      "Fully digital photos delivered in pendrive",
      "1 Budget album (12x36)",
      "300+ edited photos",
      "Quick turnaround - 7 days",
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
    description: "Ideal for complete wedding coverage with video",
    deliverables: "Photos, Video & Premium Album",
    features: [
      "Traditional photo (1)",
      "Traditional video (1)",
      "Full length HD video output + photos in pendrive",
      "Premium Canva album (1)",
      "1 Photo frame (12x18)",
      "500+ edited photos",
      "Wedding day highlights reel",
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
    description: "Premium photography with multiple professionals and drone",
    deliverables: "Photos, 4K Video, Drone Shots & Album",
    features: [
      "Traditional photographer (1)",
      "Traditional videographer (1)",
      "Candid photographer (1)",
      "Drone + LED TV (2 Nos)",
      "Full length 4K video + photos",
      "Pendrive + backup storage",
      "Premium Canva album",
      "2 Photo frames (12x18)",
      "1 Couple pics gift",
      "800+ edited photos",
      "Cinematic highlights (3-5 min)",
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
    description: "Ultimate luxury package with cinematic production and AI enhancement",
    deliverables: "Complete Coverage, 4K Video, AI Editing & Everything",
    features: [
      "Traditional photographer (1)",
      "Traditional videographer (1)",
      "Candid photographer (1)",
      "Candid videographer (1)",
      "Drone + LED TV (2 Nos)",
      "Pre / Post wedding shoot",
      "Full length 4K video + photos",
      "Pendrive + backup storage",
      "Premium Canva album",
      "Cinematic E-invite video",
      "Cinematic (AI + After Effects) teaser cut",
      "Cinematic one song edit",
      "2 Photo frames (12x18)",
      "1200+ edited photos",
      "Unlimited revisions",
      "Same-day highlights video",
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

        {/* Photography Cards Grid - New Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12"
        >
          {packages.map((pkg, idx) => {
            const price = eventType === "single" ? pkg.singlePrice : pkg.doublePrice;
            const isSelected = state.photography?.id === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className={`group`}
              >
                <div
                  className={`relative overflow-hidden rounded-3xl transition-all h-full ${
                    pkg.featured
                      ? "ring-3 ring-primary shadow-lg md:col-span-2"
                      : "bg-card/60 backdrop-blur"
                  } ${isSelected ? "ring-3 ring-accent shadow-gold" : ""}`}
                  style={{
                    background: pkg.featured 
                      ? "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)"
                      : undefined
                  }}
                >
                  {/* Top Banner with Gradient */}
                  <div className={`h-20 bg-gradient-to-r ${getTierColor(pkg.tier)} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
                    </div>
                    <div className="relative h-full flex items-center justify-between px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                          {pkg.icon}
                        </div>
                        <h3 className="font-serif text-2xl text-white font-bold">{pkg.name}</h3>
                      </div>
                      {pkg.featured && (
                        <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-semibold">
                          ★ Most Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground italic mb-4">{pkg.description}</p>

                    {/* Deliverables Badge */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-6">
                      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-1">What You Get</p>
                      <p className="text-sm font-semibold text-foreground">{pkg.deliverables}</p>
                    </div>

                    {/* Price Section */}
                    <div className="mb-8 pb-8 border-b border-border/30">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        {eventType === "single" ? "Single Event" : "Two Events"}
                      </p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-serif text-5xl font-bold gold-text">
                          ₹{price.toLocaleString()}
                        </span>
                        {pkg.savingsLabel && eventType === "double" && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            {pkg.savingsLabel}
                          </span>
                        )}
                      </div>
                      {pkg.badge && (
                        <div className="text-xs font-semibold text-accent uppercase tracking-widest">
                          ⭐ {pkg.badge}
                        </div>
                      )}
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="text-center">
                          <div className="text-primary flex justify-center mb-2 text-2xl">{h.icon}</div>
                          <p className="text-xs font-semibold text-muted-foreground">{h.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Included Features:</h4>
                      <ul className="space-y-2">
                        {pkg.features.slice(0, 6).map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                        {pkg.features.length > 6 && (
                          <li className="text-sm text-primary font-semibold pt-2">
                            + {pkg.features.length - 6} more premium features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => select(pkg)}
                      className={`w-full rounded-full h-12 text-base font-semibold transition-all ${
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : `bg-gradient-to-r ${getTierColor(pkg.tier)} text-white hover:opacity-90`
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select Package"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison Table - Optional Enhancement */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-sm text-muted-foreground mb-6">
            {state.photography ? "Ready to move forward?" : "Select a photography package to continue"}
          </p>
          <Button
            onClick={() => state.photography && navigate("/decoration")}
            disabled={!state.photography}
            className="rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold h-12 px-8"
          >
            Continue to Decoration →
          </Button>
        </div>
      </section>
    </>
  );
}
