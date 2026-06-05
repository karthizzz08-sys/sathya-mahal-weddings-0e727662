import { useBooking } from "@/context/BookingContext";
import { motion } from "framer-motion";
import { Gift, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import { Button } from "@/components/ui/button";

export default function GrandTotalCard() {
  const { state, total } = useBooking();
  const { go } = useTransitionNav(300);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 right-4 md:right-8 z-30 w-80 md:w-96"
    >
      <div className="rounded-3xl shadow-2xl border border-primary/20 bg-gradient-to-br from-white via-white to-primary/5 backdrop-blur-xl overflow-hidden">
        {/* Header with Gradient Top */}
        <div className="bg-gradient-to-r from-primary via-yellow-400 to-primary h-1.5" />
        
        <div className="p-5 md:p-6">
          {/* Title Section */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-primary/20 to-yellow-400/20">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Booking Summary</h3>
                <p className="text-xs text-muted-foreground">Your selections so far</p>
              </div>
            </div>
          </div>

          {/* Selected Items with Icons */}
          <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
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
          <div className="border-t-2 border-primary/10 my-4" />

          {/* Grand Total Section */}
          <div className="bg-gradient-to-br from-primary/10 to-yellow-400/10 rounded-2xl p-4 border border-primary/20 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Grand Total
              </p>
              <span className="text-xs bg-gradient-gold text-primary-foreground px-2 py-1 rounded-full font-semibold">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
              ₹{total.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {total > 0 ? "Ready to proceed? Review your booking summary." : "Select services to see your total"}
            </p>
          </div>

          {/* Action Button */}
          {selectedItems.length > 0 && (
            <>
              <Link
                to="/summary"
                className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-600 text-primary-foreground font-bold py-3 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>View Full Summary</span>
                <span className="text-lg">→</span>
              </Link>

              {/* Quick Navigation Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => go("/plans")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-9 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5"
                >
                  🎥 Photography
                </Button>
                <Button 
                  onClick={() => go("/decoration")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-9 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5"
                >
                  🎨 Decoration
                </Button>
                <Button 
                  onClick={() => go("/catering")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-9 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5"
                >
                  🍽️ Catering
                </Button>
                <Button 
                  onClick={() => go("/addons")} 
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-9 text-xs font-medium border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5"
                >
                  ✨ Add-ons
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
