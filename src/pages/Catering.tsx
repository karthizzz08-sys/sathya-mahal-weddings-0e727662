import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, CheckCircle2, Radio, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";

const menus = [
  {
    id: "menu-1",
    name: "Menu 1",
    price: 300,
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
    name: "Menu 2",
    price: 250,
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
    name: "Menu 3",
    price: 280,
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
    name: "Chicken Biryani",
    price: 320,
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
    name: "Mutton Biryani",
    price: 350,
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
    name: "Non-Veg Meals",
    price: 330,
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
    name: "Veg Meals",
    price: 280,
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
    name: "Menu 1",
    price: 300,
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
    id: "evening-2",
    name: "Menu 2",
    price: 250,
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
    id: "evening-3",
    name: "Menu 3",
    price: 280,
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

export default function Catering() {
  const [selectedMenu, setSelectedMenu] = useState("menu-1");
  const [selectedLunchMenu, setSelectedLunchMenu] = useState("lunch-1");
  const [selectedEveningMenu, setSelectedEveningMenu] = useState("evening-1");
  const [guestQuantity, setGuestQuantity] = useState(250);
  const { set, total } = useBooking();
  const { loading, go } = useTransitionNav(700);

  // Calculate total price based on selected menus and guest quantity
  const selectedMenuData = menus.find((m) => m.id === selectedMenu);
  const selectedLunchData = lunchMenus.find((m) => m.id === selectedLunchMenu);
  const selectedEveningData = eveningMenus.find((m) => m.id === selectedEveningMenu);

  const morningTotal = selectedMenuData ? selectedMenuData.price * guestQuantity : 0;
  const lunchTotal = selectedLunchData ? selectedLunchData.price * guestQuantity : 0;
  const eveningTotal = selectedEveningData ? selectedEveningData.price * guestQuantity : 0;
  const cateringSubtotal = morningTotal + lunchTotal + eveningTotal;

  const handleContinue = () => {
    const tiffen = menus.find((m) => m.id === selectedMenu);
    const lunch = lunchMenus.find((m) => m.id === selectedLunchMenu);
    const evening = eveningMenus.find((m) => m.id === selectedEveningMenu);
    if (tiffen && lunch && evening) {
      set("tiffen", { id: tiffen.id, name: tiffen.name, price: tiffen.price });
      set("lunch", { id: lunch.id, name: lunch.name, price: lunch.price });
      set("evening", { id: evening.id, name: evening.name, price: evening.price });
      set("guests", guestQuantity);
      go("/addons");
    }
  };

  return (
    <>
      <PageLoader show={loading} label="Loading Add-ons…" />
      {/* CATERING HERO IMAGES */}
      <section className="container py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden h-60 md:h-72 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src="/src/assets/catering.jpg"
                alt="Catering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="rounded-2xl overflow-hidden h-60 md:h-72 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src="/src/assets/feature-dining.jpg"
                alt="Dining"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="rounded-2xl overflow-hidden h-60 md:h-72 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src="/src/assets/photography.jpg"
                alt="Food"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-28">
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-16"
        >
          <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
          <h2 className="font-serif text-3xl md:text-4xl text-center">Morning Tiffen</h2>
          <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
        </motion.div>

        {/* MENU CARDS */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {menus.map((menu, idx) => {
              const isSelected = selectedMenu === menu.id;
              return (
                <motion.button
                  key={menu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" }}
                  onClick={() => {
                    setSelectedMenu(menu.id);
                    set("tiffen", { id: menu.id, name: menu.name });
                  }}
                  className={`relative group rounded-2xl overflow-hidden text-left transition-all duration-300 p-8 ${
                    isSelected
                      ? "bg-white border-2 border-purple-600 shadow-xl"
                      : "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50/30 border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {/* RADIO BUTTON */}
                  <div className="absolute top-6 right-6">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-400 group-hover:border-purple-300"
                      }`}
                    >
                      {isSelected && <Radio className="h-3 w-3 text-white fill-white" />}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="font-serif text-2xl md:text-3xl mb-2 pr-10 text-gray-800">{menu.name}</h3>
                  <p className="text-lg font-bold text-purple-600 mb-2">₹{menu.price}/head</p>

                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center justify-between gap-3 mb-6 bg-purple-50 rounded-lg p-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGuestQuantity(Math.max(250, guestQuantity - 50));
                      }}
                      className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                    >
                      <Minus className="h-4 w-4 text-white" strokeWidth={3} />
                    </motion.button>
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold text-purple-600">{guestQuantity}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGuestQuantity(guestQuantity + 50);
                      }}
                      className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                    >
                      <Plus className="h-4 w-4 text-white" strokeWidth={3} />
                    </motion.button>
                  </div>

                  {/* MENU ITEMS */}
                  <div className="space-y-3">
                    {menu.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-purple-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* LUNCH MENU SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-12 border-t border-gray-200"
        >
          {/* SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 md:gap-4 mb-16"
          >
            <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            <h2 className="font-serif text-3xl md:text-4xl text-center">Lunch Menu</h2>
            <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
          </motion.div>

          {/* LUNCH MENU CARDS */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              {lunchMenus.map((lunch, idx) => {
                const isSelected = selectedLunchMenu === lunch.id;
                return (
                  <motion.button
                    key={lunch.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" }}
                    onClick={() => {
                      setSelectedLunchMenu(lunch.id);
                      set("lunch", { id: lunch.id, name: lunch.name });
                    }}
                    className={`relative group rounded-2xl overflow-hidden text-left transition-all duration-300 p-6 md:p-8 ${
                      isSelected
                        ? "bg-white border-2 border-purple-600 shadow-xl"
                        : "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50/30 border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {/* RADIO BUTTON */}
                    <div className="absolute top-6 right-6">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-400 group-hover:border-purple-300"
                        }`}
                      >
                        {isSelected && <Radio className="h-3 w-3 text-white fill-white" />}
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-serif text-xl md:text-2xl mb-2 pr-10 text-gray-800">{lunch.name}</h3>
                    <p className="text-lg font-bold text-purple-600 mb-2">₹{lunch.price}/head</p>

                    {/* QUANTITY SELECTOR */}
                    <div className="flex items-center justify-between gap-3 mb-6 bg-purple-50 rounded-lg p-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuestQuantity(Math.max(250, guestQuantity - 50));
                        }}
                        className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                      >
                        <Minus className="h-4 w-4 text-white" strokeWidth={3} />
                      </motion.button>
                      <div className="text-center flex-1">
                        <p className="text-sm font-bold text-purple-600">{guestQuantity}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuestQuantity(guestQuantity + 50);
                        }}
                        className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                      >
                        <Plus className="h-4 w-4 text-white" strokeWidth={3} />
                      </motion.button>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="space-y-3">
                      {lunch.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-4 w-4 mt-1 shrink-0 text-purple-600" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* EVENING TIFFEN MENU SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-12 border-t border-gray-200"
        >
          {/* SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 md:gap-4 mb-16"
          >
            <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            <h2 className="font-serif text-3xl md:text-4xl text-center">Evening Tiffen</h2>
            <ChefHat className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
          </motion.div>

          {/* EVENING MENU CARDS */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {eveningMenus.map((evening, idx) => {
                const isSelected = selectedEveningMenu === evening.id;
                return (
                  <motion.button
                    key={evening.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" }}
                    onClick={() => {
                      setSelectedEveningMenu(evening.id);
                      set("evening", { id: evening.id, name: evening.name });
                    }}
                    className={`relative group rounded-2xl overflow-hidden text-left transition-all duration-300 p-8 ${
                      isSelected
                        ? "bg-white border-2 border-purple-600 shadow-xl"
                        : "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50/30 border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {/* RADIO BUTTON */}
                    <div className="absolute top-6 right-6">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-400 group-hover:border-purple-300"
                        }`}
                      >
                        {isSelected && <Radio className="h-3 w-3 text-white fill-white" />}
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-serif text-2xl md:text-3xl mb-2 pr-10 text-gray-800">{evening.name}</h3>
                    <p className="text-lg font-bold text-purple-600 mb-2">₹{evening.price}/head</p>

                    {/* QUANTITY SELECTOR */}
                    <div className="flex items-center justify-between gap-3 mb-6 bg-purple-50 rounded-lg p-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuestQuantity(Math.max(250, guestQuantity - 50));
                        }}
                        className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                      >
                        <Minus className="h-4 w-4 text-white" strokeWidth={3} />
                      </motion.button>
                      <div className="text-center flex-1">
                        <p className="text-sm font-bold text-purple-600">{guestQuantity}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGuestQuantity(guestQuantity + 50);
                        }}
                        className="h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all"
                      >
                        <Plus className="h-4 w-4 text-white" strokeWidth={3} />
                      </motion.button>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="space-y-3">
                      {evening.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-purple-600" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

      </section>

      {/* STICKY BOTTOM BAR */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-2xl z-40"
      >
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Event Cost</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  ₹{total.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">for {guestQuantity} guests</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Catering: ₹{cateringSubtotal.toLocaleString()} (Morning: ₹{morningTotal.toLocaleString()} • Lunch: ₹{lunchTotal.toLocaleString()} • Evening: ₹{eveningTotal.toLocaleString()})
              </p>
            </div>

            <Button
              onClick={handleContinue}
              className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:opacity-90 px-8 py-4 font-bold uppercase tracking-wider h-auto shadow-lg whitespace-nowrap"
            >
              Add-ons →
            </Button>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM PADDING */}
      <div className="h-32" />
    </>
  );
}
