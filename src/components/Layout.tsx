import { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logooo.jpeg";
import ContactModal from "./ContactModal";

const links = [
  { to: "/", label: "Home" },
  { to: "/availability", label: "Availability" },
  { to: "/plans", label: "Hall Plans" },
  { to: "/photography", label: "Photography" },
  { to: "/decoration", label: "Decoration" },
  { to: "/catering", label: "Catering" },
  { to: "/addons", label: "Add-ons" },
  { to: "/summary", label: "Summary" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-cream">
      <header className="sticky top-0 z-40 glass-card border-b-0">
        <div className="container flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Sathya Mahal Logo" className="h-20 w-20 object-contain" />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => {
                  const isAvailability = l.to === "/availability";
                  return `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isAvailability || isActive
                      ? "bg-gradient-gold text-primary-foreground shadow-soft font-bold"
                      : "text-foreground/70 hover:text-primary hover:bg-secondary/60"
                  }`;
                }}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-primary">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur">
            <div className="container py-4 flex flex-col gap-1">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => {
                    const isAvailability = l.to === "/availability";
                    return `px-4 py-3 rounded-lg font-medium transition-all ${
                      isAvailability || isActive
                        ? "bg-gradient-gold text-primary-foreground font-bold"
                        : "text-foreground/70 hover:bg-secondary"
                    }`;
                  }}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="bg-gradient-luxe text-primary-foreground mt-20 py-12">
        <div className="container text-center space-y-3">
          <h3 className="font-serif text-3xl">Sathya Mahal</h3>
          <p className="opacity-80 italic">Where Traditions Meet Elegance</p>
          <p className="text-sm opacity-60">© {new Date().getFullYear()} Sathya Mahal. All rights reserved.</p>
        </div>
      </footer>

      <ContactModal />

      <a
        href="https://wa.me/917502215551?text=Hello%2C%20I%20want%20to%20book%20Sathya%20Mahal"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-gold hover:scale-110 transition-transform animate-float"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
