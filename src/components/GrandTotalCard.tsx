import { useBooking } from "@/context/BookingContext";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function GrandTotalCard() {
  const { state, total } = useBooking();

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
      <div className="glass-card rounded-2xl p-5 md:p-6 shadow-2xl border-2 border-primary/20 bg-white/95 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
          <div className="p-2 rounded-lg bg-gradient-gold/10">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground">Booking Summary</h3>
        </div>

        {/* Selected Items */}
        <div className="space-y-2.5 mb-4 max-h-40 overflow-y-auto">
          {selectedItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-foreground/70 line-clamp-1">{item.name}</span>
              <span className="font-semibold text-primary whitespace-nowrap ml-2">
                ₹{item.price.toLocaleString()}
              </span>
            </div>
          ))}

          {/* Extra Charges */}
          {state.ebUnits > 0 && (
            <div className="flex items-center justify-between text-sm border-t border-border/30 pt-2">
              <span className="text-foreground/70">Electricity ({state.ebUnits} units)</span>
              <span className="font-semibold text-primary">₹{(state.ebUnits * 30).toLocaleString()}</span>
            </div>
          )}
          {state.gasKg > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">Gas ({state.gasKg} kg)</span>
              <span className="font-semibold text-primary">₹{(state.gasKg * 220).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-primary/20 pt-4 mb-3" />

        {/* Grand Total */}
        <div className="bg-gradient-gold/5 rounded-lg p-4 border border-primary/20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">
            Grand Total
          </p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-primary">
            ₹{total.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedItems.length} service{selectedItems.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      </div>
    </motion.div>
  );
}
