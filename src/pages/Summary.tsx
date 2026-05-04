import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/SectionTitle";
import { useBooking } from "@/context/BookingContext";
import { CreditCard, Download, CheckCircle2, Calendar, User, MessageCircle, Phone, MapPin } from "lucide-react";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";
import { toast } from "sonner";
import jsPDF from "jspdf";
import logo from "@/assets/logooo.jpeg";
import { useState } from "react";

const OWNER_WHATSAPP = "917200101470";

export default function Summary() {
  const { state, total } = useBooking();
  const { loading, go } = useTransitionNav(700);
  const [pdfDownloadTime, setPdfDownloadTime] = useState<string | null>(null);

  const proceed = () => {
    if (!total) {
      toast.error("Please select a plan and services first");
      return;
    }
    go("/payment");
  };

  const lines: { label: string; value: string }[] = [];
  if (state.plan) lines.push({ label: "Plan", value: `${state.plan.name} — ₹${state.plan.price.toLocaleString()}` });
  if (state.photography) lines.push({ label: "Photography", value: `${state.photography.name} — ₹${state.photography.price.toLocaleString()}` });
  if (state.decoration.length) lines.push({ label: "Decoration", value: state.decoration.map(d => `${d.name} (₹${d.price.toLocaleString()})`).join(", ") });
  if (state.morningMenu) lines.push({ label: "Morning Menu", value: state.morningMenu });
  if (state.lunchMenu) lines.push({ label: "Lunch Menu", value: state.lunchMenu });
  if (state.eveningMenu) lines.push({ label: "Evening Menu", value: state.eveningMenu });
  if (state.catering.meal) lines.push({ label: "Catering", value: `${state.catering.meal.name} × ${state.catering.guests} = ₹${(state.catering.meal.price * state.catering.guests).toLocaleString()}` });
  if (state.addons.length) lines.push({ label: "Add-ons", value: state.addons.map(a => `${a.name} (₹${a.price.toLocaleString()})`).join(", ") });
  if (state.extras.length) lines.push({ label: "Extras", value: state.extras.map(a => `${a.name}`).join(", ") });

  const downloadPdf = () => {
    if (!total) {
      toast.error("Please select a plan and services first");
      return;
    }
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 60;

    // Header
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 0, pageW, 90, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("Sathya Mahal", pageW / 2, 45, { align: "center" });
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.text("Where Traditions Meet Elegance", pageW / 2, 65, { align: "center" });

    y = 130;
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Booking Summary", 50, y);

    // Pending status badge (top-right)
    const badgeW = 90;
    const badgeH = 24;
    const badgeX = pageW - 50 - badgeW;
    const badgeY = y - 18;
    doc.setFillColor(255, 243, 205);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.8);
    doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 12, 12, "FD");
    doc.setTextColor(146, 64, 14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("STATUS: PENDING", badgeX + badgeW / 2, badgeY + 16, { align: "center" });

    y += 10;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1.5);
    doc.line(50, y, pageW - 50, y);
    y += 30;

    // Customer details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Customer Details", 50, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const cust = [
      ["Name", state.customerName || "-"],
      ["Phone", state.phone || "-"],
      ["Function", state.functionType || "-"],
      ["Date", state.date ? state.date.toDateString() : "-"],
    ];
    cust.forEach(([k, v]) => {
      doc.setTextColor(120, 120, 120);
      doc.text(`${k}:`, 60, y);
      doc.setTextColor(30, 30, 30);
      doc.text(String(v), 160, y);
      y += 18;
    });

    y += 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text("Selected Services", 50, y);
    y += 8;
    doc.setDrawColor(220, 220, 220);
    doc.line(50, y, pageW - 50, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    if (lines.length === 0) {
      doc.setTextColor(150, 150, 150);
      doc.text("No selections.", 60, y);
      y += 18;
    } else {
      lines.forEach(l => {
        doc.setTextColor(120, 120, 120);
        doc.text(`${l.label}:`, 60, y);
        doc.setTextColor(30, 30, 30);
        const wrapped = doc.splitTextToSize(l.value, pageW - 220);
        doc.text(wrapped, 160, y);
        y += 18 * wrapped.length;
        if (y > 720) {
          doc.addPage();
          y = 60;
        }
      });
    }

    y += 20;
    doc.setFillColor(45, 36, 28);
    doc.roundedRect(50, y, pageW - 100, 60, 8, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("FINAL TOTAL", 70, y + 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`Rs. ${total.toLocaleString()}`, pageW - 70, y + 38, { align: "right" });

    y += 90;
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(
      `Generated on ${new Date().toLocaleString()}  |  Sathya Mahal Marriage Hall`,
      pageW / 2,
      y,
      { align: "center" }
    );

    const safeName = (state.customerName || "guest").replace(/[^a-z0-9]/gi, "_");
    doc.save(`SathyaMahal_Booking_${safeName}.pdf`);
    setPdfDownloadTime(new Date().toLocaleString());
    toast.success("Booking summary downloaded ✓");
  };

  return (
    <>
    <PageLoader show={loading} label="Opening payment…" />
    <section className="container py-16 md:py-24">
      {/* LOGO SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-3 mb-12"
      >
        <img src={logo} alt="Sathya Mahal Logo" className="h-20 w-20 object-contain" />
        <p className="text-muted-foreground italic">Sathya Mahal</p>
      </motion.div>

      <SectionTitle eyebrow="Final Step" title="Booking Summary" subtitle="Review your selections and confirm via WhatsApp." />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* USER DETAILS CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-gold/20">
              <User className="h-6 w-6 gold-text" />
            </div>
            <h3 className="font-serif text-2xl">Your Details</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</p>
              <p className="font-serif text-lg">{state.customerName || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</p>
              <p className="font-serif text-lg">{state.phone || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Event Type</p>
              <p className="font-serif text-lg capitalize">{state.functionType || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Guest Count</p>
              <p className="font-serif text-lg">{state.guests} Guests</p>
            </div>
          </div>
        </motion.div>

        {/* SELECTED DATE HIGHLIGHT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calendar className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Your Selected Date</p>
            </div>
            <div className="space-y-2">
              <p className="font-serif text-4xl text-blue-900">
                {state.date ? state.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No Date Selected"}
              </p>
              {state.date && (
                <p className="text-sm text-blue-700">
                  {Math.ceil((state.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days from now
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between pb-6 border-b border-border/50">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Booking Status</p>
              <p className="font-serif text-2xl mt-1">Ready for Payment & Confirmation</p>
            </div>
            {pdfDownloadTime && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 border border-green-300 text-xs font-semibold uppercase tracking-widest">
                <CheckCircle2 className="h-4 w-4" />
                PDF Downloaded
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 py-6 border-b border-border/50">
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Name</p><p className="font-serif text-xl">{state.customerName || "—"}</p></div>
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p><p className="font-serif text-xl">{state.phone || "—"}</p></div>
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Function</p><p className="font-serif text-xl capitalize">{state.functionType || "—"}</p></div>
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Date</p><p className="font-serif text-xl">{state.date ? state.date.toDateString() : "—"}</p></div>
          </div>

          {/* OVERALL TOTAL HIGHLIGHT */}
          <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Overall Total Amount</p>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            {lines.length ? lines.map(l => (
              <div key={l.label} className="flex justify-between gap-4 pb-3 border-b border-border/30 last:border-0">
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{l.label}</span>
                <span className="text-right font-medium">{l.value}</span>
              </div>
            )) : <p className="text-center text-muted-foreground italic">No selections yet. Please pick a plan and services.</p>}
          </div>

          {pdfDownloadTime && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">PDF Download Info</p>
              <p className="text-sm text-foreground font-medium">✓ Summary downloaded on {pdfDownloadTime}</p>
            </div>
          )}
        </motion.div>

        {/* FINAL TOTAL WITH ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-luxe text-primary-foreground rounded-3xl p-8 shadow-gold"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] opacity-70 mb-2">Final Total</p>
                <p className="font-serif text-5xl">₹{total.toLocaleString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={downloadPdf}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground px-5 py-6 rounded-full flex items-center gap-2 font-medium h-auto backdrop-blur whitespace-nowrap"
                >
                  <Download className="h-5 w-5" /> Download Summary
                </Button>
                <Button
                  onClick={proceed}
                  className="bg-white text-gray-900 hover:bg-white/95 px-6 py-6 rounded-full flex items-center gap-2 font-medium shadow-lg hover:shadow-xl h-auto transition-all whitespace-nowrap"
                >
                  <CreditCard className="h-5 w-5" /> Confirm Booking
                </Button>
              </div>
            </div>

            {/* WHATSAPP CONTACT CARD - INSIDE FINAL AMOUNT */}
            <div className="border-t border-white/20 pt-6">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-white/20">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg">Confirm via WhatsApp</h3>
                      <p className="text-xs opacity-75 mt-0.5">Direct confirmation with Sathya Mahal team</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                      <Phone className="h-4 w-4" />
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-70">WhatsApp</p>
                        <p className="font-mono text-sm">+91 7200 101 470</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                      <MapPin className="h-4 w-4" />
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-70">Venue</p>
                        <p className="font-serif text-sm">Sathya Mahal</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(`https://wa.me/${OWNER_WHATSAPP}?text=Hello%20Sathya%20Mahal%2C%20I%20would%20like%20to%20confirm%20my%20booking%20for%20${state.date?.toLocaleDateString()}%20for%20${state.functionType}%20event.%20Name%3A%20${state.customerName}%2C%20Phone%3A%20${state.phone}`, "_blank")}
                    className="w-full h-12 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp Now
                  </Button>
                  
                  <p className="text-xs text-center opacity-75">
                    Our team responds within minutes (9 AM - 6 PM IST)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
