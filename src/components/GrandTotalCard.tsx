import { useBooking } from "@/context/BookingContext";
import { motion } from "framer-motion";
import { Gift, TrendingUp, CheckCircle2, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GrandTotalCard() {
  const { state, total } = useBooking();
  const { go } = useTransitionNav(300);
  const [isExpanded, setIsExpanded] = useState(false);

  // Collect selected items for display
  const selectedItems = [
    state.plan && { name: state.plan.name, price: state.plan.price },
    state.photography && { name: state.photography.name, price: state.photography.price },
    ...state.decoration.map(d => ({ name: d.name, price: d.price })),
    state.catering.meal && { 
      name: `${state.catering.meal.name} × ${state.catering.guests} guests`, 
      price: state.catering.meal.price * state.catering.guests 
    },
    ...state.addons.map(a => ({ name: a.name, price: a.price })),
  ].filter(Boolean);

  // Calculate extra charges
  const extraCharges =
    (state.ebUnits > 0 ? state.ebUnits * 30 : 0) +
    (state.gasKg > 0 ? state.gasKg * 220 : 0);

  if (selectedItems.length === 0 && extraCharges === 0) {
    return null;
  }

  // MOBILE: Floating Ball Version
  return (
    <>
      {/* Mobile WhatsApp Floating Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/917200101470?text=Hello%20Sathya%20Mahal%2C%20I%20would%20like%20to%20inquire%20about%20booking.`}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-24 right-4 z-40 h-16 w-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center text-white hover:shadow-xl transition-all hover:bg-[#20bd5a]"
      >
        <MessageCircle className="h-8 w-8" />
      </motion.a>

      {/* Mobile Booking Floating Ball */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden fixed bottom-6 right-4 z-40 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-yellow-500 shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:shadow-xl transition-all"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Gift className="h-8 w-8" />
        </motion.div>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
          >
            {selectedItems.length}
          </motion.div>
        )}
      </motion.button>

      {/* Mobile Expanded Summary (only on mobile when expanded) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="md:hidden fixed inset-0 z-50 flex items-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Expanded Card */}
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto z-50"
          >
            {/* Header with Close Button */}
            <div className="sticky top-0 bg-gradient-to-r from-primary via-yellow-400 to-primary p-4 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-white/20">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Booking Summary</h3>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Selected Items */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between text-sm bg-gradient-to-r from-primary/5 to-yellow-100 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground/70 truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-primary whitespace-nowrap ml-2">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </motion.div>
                ))}

                {/* Extra Charges */}
                {state.ebUnits > 0 && (
                  <div className="flex items-center justify-between text-sm bg-orange-50 rounded-lg px-3 py-2 border border-orange-200">
                    <span className="text-foreground/70">⚡ Electricity ({state.ebUnits} units)</span>
                    <span className="font-semibold text-primary">₹{(state.ebUnits * 30).toLocaleString()}</span>
                  </div>
                )}
                {state.gasKg > 0 && (
                  <div className="flex items-center justify-between text-sm bg-red-50 rounded-lg px-3 py-2 border border-red-200">
                    <span className="text-foreground/70">🔥 Gas ({state.gasKg} kg)</span>
                    <span className="font-semibold text-primary">₹{(state.gasKg * 220).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="bg-gradient-to-br from-primary/10 to-yellow-400/10 rounded-2xl p-4 border border-primary/20">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1 mb-2">
                  <TrendingUp className="h-3 w-3" /> Grand Total
                </p>
                <p className="font-serif text-4xl font-bold bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
                  ₹{total.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              {selectedItems.length > 0 && (
                <>
                  <Link
                    to="/summary"
                    onClick={() => setIsExpanded(false)}
                    className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-600 text-primary-foreground font-bold py-3 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>View Full Summary</span>
                    <span>→</span>
                  </Link>

                  {/* Quick Navigation */}
                  <div className="grid grid-cols-4 gap-2">
                    <Button 
                      onClick={() => {
                        go("/plans");
                        setIsExpanded(false);
                      }} 
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                    >
                      🎥 Photo
                    </Button>
                    <Button 
                      onClick={() => {
                        go("/decoration");
                        setIsExpanded(false);
                      }} 
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                    >
                      🎨 Decor
                    </Button>
                    <Button 
                      onClick={() => {
                        go("/catering");
                        setIsExpanded(false);
                      }} 
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                    >
                      🍽️ Food
                    </Button>
                    <Button 
                      onClick={() => {
                        go("/addons");
                        setIsExpanded(false);
                      }} 
                      size="sm"
                      variant="outline"
                      className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                    >
                      ✨ Add-ons
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Desktop: Always Visible Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block fixed bottom-24 right-8 z-30 w-96"
      >
      <div className="rounded-3xl shadow-2xl border border-primary/20 bg-gradient-to-br from-white via-white to-primary/5 backdrop-blur-xl overflow-hidden">
        {/* Header with Gradient Top */}
        <div className="bg-gradient-to-r from-primary via-yellow-400 to-primary h-1.5" />
        
        <div className="p-4 sm:p-5 md:p-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-primary/20 to-yellow-400/20">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-foreground">Booking Summary</h3>
                <p className="text-xs text-muted-foreground">Your selections so far</p>
              </div>
            </div>
          </div>

          {/* Selected Items with Icons */}
          <div className="space-y-2 mb-4 sm:mb-5 max-h-32 sm:max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
            {selectedItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between text-sm bg-white/50 hover:bg-white/80 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground/70 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-primary whitespace-nowrap ml-2">
                  ₹{item.price.toLocaleString()}
                </span>
              </motion.div>
            ))}

            {/* Extra Charges */}
            {state.ebUnits > 0 && (
              <div className="flex items-center justify-between text-sm bg-white/50 rounded-lg px-3 py-2 border border-orange-200/50">
                <span className="text-foreground/70">⚡ Electricity ({state.ebUnits} units)</span>
                <span className="font-semibold text-primary">₹{(state.ebUnits * 30).toLocaleString()}</span>
              </div>
            )}
            {state.gasKg > 0 && (
              <div className="flex items-center justify-between text-sm bg-white/50 rounded-lg px-3 py-2 border border-red-200/50">
                <span className="text-foreground/70">🔥 Gas ({state.gasKg} kg)</span>
                <span className="font-semibold text-primary">₹{(state.gasKg * 220).toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t-2 border-primary/10 my-3 sm:my-4" />

          {/* Grand Total Section */}
          <div className="bg-gradient-to-br from-primary/10 to-yellow-400/10 rounded-2xl p-3 sm:p-4 border border-primary/20 mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1">
                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Grand Total
              </p>
              <span className="text-xs bg-gradient-gold text-primary-foreground px-2 py-1 rounded-full font-semibold">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
              ₹{total.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
              {total > 0 ? "Ready to proceed? Review your booking summary." : "Select services to see your total"}
            </p>
          </div>

          {/* Action Button */}
          {selectedItems.length > 0 && (
            <>
              <Link
                to="/summary"
                className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-600 text-primary-foreground font-bold py-2.5 sm:py-3 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>View Full Summary</span>
                <span className="text-lg">→</span>
              </Link>

              {/* Quick Navigation Buttons */}
              <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button 
                  onClick={() => go("/plans")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                >
                  🎥 Photo
                </Button>
                <Button 
                  onClick={() => go("/decoration")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                >
                  🎨 Decor
                </Button>
                <Button 
                  onClick={() => go("/catering")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                >
                  🍽️ Food
                </Button>
                <Button 
                  onClick={() => go("/addons")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-10 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 truncate"
                >
                  ✨ Add-ons
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
}
