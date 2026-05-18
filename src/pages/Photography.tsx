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
  MessageCircle,
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12"
        >
          {packages.map((pkg, idx) => {
            const price = eventType === "single" ? pkg.singlePrice : pkg.doublePrice;
            const isSelected = state.photography?.id === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className={`group`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl h-full transition-all border-2 ${
                    isSelected 
                      ? "border-accent shadow-gold bg-gradient-to-br from-primary/5 to-transparent" 
                      : "border-primary/20 hover:border-primary/40 bg-white/50 backdrop-blur"
                  }`}
                >
                  {/* Icon & Name Header */}
                  <div className="p-6 pb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      `bg-gradient-to-r ${getTierColor(pkg.tier)} text-white`
                    }`}>
                      {pkg.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{pkg.name}</h3>
                    {pkg.featured && (
                      <span className="text-xs font-semibold text-accent">★ Most Popular</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Price Card */}
                  <div className={`mx-6 mb-4 p-4 rounded-xl bg-gradient-to-r ${getTierColor(pkg.tier)} text-white`}>
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">
                      {eventType === "single" ? "Single Event" : "Two Events"}
                    </p>
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-3xl font-bold">₹{price.toLocaleString()}</span>
                      {pkg.savingsLabel && eventType === "double" && (
                        <span className="text-xs font-semibold opacity-90">{pkg.savingsLabel}</span>
                      )}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="px-6 pb-4">
                    <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-1">Includes</p>
                    <p className="text-sm font-medium text-foreground">{pkg.deliverables}</p>
                  </div>

                  {/* Quick Features */}
                  <div className="px-6 pb-4">
                    <div className="space-y-2">
                      {pkg.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-xs text-muted-foreground leading-tight">{f}</span>
                        </div>
                      ))}
                      {pkg.features.length > 3 && (
                        <p className="text-xs text-primary font-semibold pt-1">
                          + {pkg.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => select(pkg)}
                      className={`w-full rounded-full h-10 text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : `bg-gradient-to-r ${getTierColor(pkg.tier)} text-white hover:opacity-90`
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* WhatsApp Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <h3 className="font-serif text-2xl font-bold text-foreground">Have Questions?</h3>
          </div>
          <p className="text-muted-foreground mb-6">Contact us on WhatsApp for package details and custom quotes</p>
          <a
            href="https://wa.me/917502215551"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp: +91 7502215551
          </a>
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
