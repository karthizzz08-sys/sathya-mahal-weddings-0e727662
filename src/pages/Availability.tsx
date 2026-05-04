import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";
import { toast } from "sonner";
export default function Availability() {
  const { state, set } = useBooking();
  const { loading, go } = useTransitionNav(700);

  const isBooked = (d: Date) => false; // No blocked dates

  const submit = () => {
    if (!state.customerName || !state.phone || !state.functionType || !state.date) {
      toast.error("Please fill all fields and pick a date.");
      return;
    }
    if (isBooked(state.date)) {
      toast.error("This date is already booked. Please choose another.");
      return;
    }
    toast.success("Date available! Continue to plans.");
    go("/plans");
  };

  return (
    <>
      <PageLoader show={loading} label="Loading Plans…" />
      <section className="container py-16 md:py-24">
      <SectionTitle eyebrow="Step 1" title="Check Availability" subtitle="Pick your auspicious date and share your details." />
      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-3xl p-6 md:p-8">
          <Calendar
            mode="single"
            selected={state.date ?? undefined}
            onSelect={(d) => d && set("date", d)}
            disabled={(d) => d < new Date(new Date().toDateString())}
            className="p-3 pointer-events-auto mx-auto"
            classNames={{
              day_selected: "bg-gradient-gold text-primary-foreground hover:opacity-90",
              day_today: "ring-2 ring-primary",
            }}
          />
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-success" />Available</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gradient-gold" />Selected</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-3xl p-8 space-y-5">
          <div>
            <Label>Full Name</Label>
            <Input value={state.customerName} onChange={e => set("customerName", e.target.value)} placeholder="Your name" className="mt-2 h-12" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input value={state.phone} onChange={e => set("phone", e.target.value)} placeholder="+91" className="mt-2 h-12" />
          </div>
          <div>
            <Label>Function Type</Label>
            <Select value={state.functionType} onValueChange={v => set("functionType", v)}>
              <SelectTrigger className="mt-2 h-12"><SelectValue placeholder="Select function" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="reception">Reception</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Selected Date</Label>
            <div className="mt-2 h-12 flex items-center px-4 rounded-md border bg-secondary/50">
              {state.date ? state.date.toDateString() : "No date selected"}
            </div>
          </div>
          <Button onClick={submit} size="lg" className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold rounded-full h-14">
            Check & Continue →
          </Button>
        </motion.div>
      </div>
      </section>
    </>
  );
}
