import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, UtensilsCrossed } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import { useBooking } from "@/context/BookingContext";
import PageLoader from "@/components/PageLoader";

const menus = [
  {
    id: "menu-1",
    title: "Menu 1",
    subtitle: "Best Choice",
    items: [
      "Assorted Halwa",
      "Idli (Live) – Nos: 280",
      "Chapathi (Paneer Butter Masala)",
      "Cauliflower Manchurian",
      "Onion Veg Oothappam",
      "Chilli Parotta",
      "Thayir Sadam",
      "Mini Poori / Bhatura with Potato Masala",
      "Sambar / Chutney (2 types)",
      "Ice Cream",
      "Water Bottle / Leaf / Paper Roll / Service",
    ],
  },
  {
    id: "menu-2",
    title: "Menu 2",
    subtitle: "Popular",
    items: [
      "Assorted Halwa",
      "Idli (Live) – Nos: 100",
      "Chapathi (Kurma)",
      "Pulao (Cauliflower Manchurian)",
      "Veg Oothappam",
      "Sweet",
      "Sambar / Chutney (2 types)",
      "Water Bottle",
    ],
  },
  {
    id: "menu-3",
    title: "Menu 3",
    subtitle: "Special",
    items: [
      "Gothumai Halwa",
      "Idli (Live) – Nos: 200",
      "Chapathi (Chenna Masala)",
      "Pulao",
      "Cauliflower Manchurian",
      "Veg Oothappam (Live)",
      "Sambar / Chutney (2 types)",
      "Masala Paal",
      "Water Bottle",
    ],
  },
];

const lunchMenus = [
  {
    id: "lunch-1",
    title: "Chicken Biryani",
    subtitle: "Non-Veg Special",
    items: [
      "Chicken Biryani",
      "Dalcha (Gravy)",
      "Onion Raita",
      "Chicken 65",
      "Tomato Jam",
      "Curd Rice / Pickle",
      "Water Bottle",
      "Banana Leaf / Paper Roll",
    ],
  },
  {
    id: "lunch-2",
    title: "Mutton Biryani",
    subtitle: "Premium",
    items: [
      "Mutton Biryani",
      "Dalcha (Gravy)",
      "Onion Raita",
      "Chicken Gravy",
      "Tomato Jam",
      "Curd Rice / Pickle",
      "Water Bottle",
      "Juice / Pita",
      "Banana Leaf / Paper Roll",
    ],
  },
  {
    id: "lunch-3",
    title: "Non-Veg Meals",
    subtitle: "Deluxe",
    items: [
      "Tomato Jam",
      "Mutton Biryani",
      "Dalcha (Gravy)",
      "Onion Raita",
      "Fish 65",
      "Curd Rice / Pickle",
      "Juice / Ice Cream",
      "Water Bottle",
    ],
  },
  {
    id: "lunch-4",
    title: "Veg Meals",
    subtitle: "Vegetarian",
    items: [
      "Veg Biryani",
      "Dalcha (Gravy)",
      "Onion Raita",
      "Paneer Gravy",
      "Tomato Jam",
      "Curd Rice / Pickle",
      "Juice / Ice Cream",
      "Water Bottle",
      "Banana Leaf / Paper Roll",
    ],
  },
];

const eveningMenus = [
  {
    id: "evening-1",
    title: "MENU 1",
    subtitle: "Premium Choice",
    items: [
      "Assorted Halwa (Sweet)",
      "Idli (Live) – Nos: 280",
      "Chapathi (Paneer Butter Masala)",
      "Cauliflower Manchurian",
      "Onion Veg Oothappam",
      "Chilli Parotta",
      "Thayir Sadam (Curd Rice)",
      "Mini Poori / Bhatura with Potato Masala",
      "Sambar / Chutney – 2 types",
      "Ice Cream",
      "Water Bottle / Leaf / Paper Roll / Service",
    ],
  },
  {
    id: "evening-2",
    title: "MENU 2",
    subtitle: "Popular",
    items: [
      "Assorted Halwa (Sweet)",
      "Idli (Live) – Nos: 100",
      "Chapathi (Kurma)",
      "Pulao (Cauliflower Manchurian)",
      "Veg Oothappam",
      "Badhusha / Sweet",
      "Sambar / Chutney – 2 types",
      "Water Bottle",
    ],
  },
  {
    id: "evening-3",
    title: "MENU 3",
    subtitle: "Special",
    items: [
      "Gothumai Halwa (Sweet)",
      "Idli (Live) – Nos: 200",
      "Chapathi (Chenna Masala)",
      "Pulao",
      "Cauliflower Manchurian",
      "Veg Oothappam (Live)",
      "Sambar / Chutney – 2 types",
      "Masala Paal",
      "Water Bottle",
    ],
  },
];

export default function Catering() {
  const [selected, setSelected] = useState<string | null>(null);
  const [lunchSelected, setLunchSelected] = useState<string | null>(null);
  const [eveningSelected, setEveningSelected] = useState<string | null>(null);
  const { loading, go } = useTransitionNav(700);
  const { set } = useBooking();

  return (
    <>
      <PageLoader show={loading} label="Loading Add-ons…" />
      <section className="container py-16 md:py-24">
        <SectionTitle
          eyebrow="Step 5"
          title="Morning Tiffen Menu"
          subtitle="Choose your preferred menu for the celebration."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {menus.map((menu, i) => {
              const isSelected = selected === menu.id;
              return (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/5 to-transparent"
                      : "shadow-soft hover:shadow-gold"
                  }`}
                  onClick={() => {
                    setSelected(menu.id);
                    set("morningMenu", menu.title);
                  }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                          {menu.title}
                        </h3>
                        <p className="text-sm text-primary mt-1 font-medium">
                          {menu.subtitle}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-primary/40 group-hover:border-primary"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Menu Items
                      </p>
                    </div>

                    <div className="space-y-3">
                      {menu.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground/80 leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LUNCH MENU SECTION */}
      <section className="container py-16 md:py-24 bg-white/30">
        <SectionTitle
          eyebrow="Lunch"
          title="Lunch Menu"
          subtitle="Select your preferred lunch menu for the celebration."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {lunchMenus.map((menu, i) => {
              const isSelected = lunchSelected === menu.id;
              return (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/5 to-transparent"
                      : "shadow-soft hover:shadow-gold"
                  }`}
                  onClick={() => {
                    setLunchSelected(menu.id);
                    set("lunchMenu", menu.title);
                  }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl md:text-2xl text-foreground">
                          {menu.title}
                        </h3>
                        <p className="text-sm text-primary mt-1 font-medium">
                          {menu.subtitle}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-primary/40 group-hover:border-primary"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Menu Items
                      </p>
                    </div>

                    <div className="space-y-3">
                      {menu.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground/80 leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENING TIFFEN MENU SECTION */}
      <section className="container py-16 md:py-24">
        <SectionTitle
          eyebrow="Evening"
          title="Evening Tiffen Menu"
          subtitle="Select your preferred evening menu for the celebration."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {eveningMenus.map((menu, i) => {
              const isSelected = eveningSelected === menu.id;
              return (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? "ring-2 ring-primary shadow-gold bg-gradient-to-br from-primary/5 to-transparent"
                      : "shadow-soft hover:shadow-gold"
                  }`}
                  onClick={() => {
                    setEveningSelected(menu.id);
                    set("eveningMenu", menu.title);
                  }}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                          {menu.title}
                        </h3>
                        <p className="text-sm text-primary mt-1 font-medium">
                          {menu.subtitle}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-primary/40 group-hover:border-primary"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Menu Items
                      </p>
                    </div>

                    <div className="space-y-3">
                      {menu.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground/80 leading-relaxed">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => go("/addons")}
              disabled={!eveningSelected}
              className="rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
            >
              {eveningSelected ? "Continue to Add-ons →" : "Select a Menu to Continue"}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
