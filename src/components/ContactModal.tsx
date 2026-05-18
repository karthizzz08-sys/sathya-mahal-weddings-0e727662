import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  functionType: string;
  eventDate: string;
}

const WHATSAPP_NUMBER = "7502215551";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    functionType: "",
    eventDate: "",
  });

  // Auto-open modal on component mount
  useEffect(() => {
    // Check if user has already seen the modal (optional)
    const hasSeenModal = localStorage.getItem("contactModalShown");
    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem("contactModalShown", "true");
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsAppClick = () => {
    // Create pre-filled message
    const message = `Hello! I'm interested in booking Sathya Mahal for an event.
Name: ${formData.name}
Phone: ${formData.phone}
Function Type: ${formData.functionType}
Event Date: ${formData.eventDate}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Close modal
    setIsOpen(false);
  };

  const isFormValid =
    formData.name && formData.phone && formData.functionType && formData.eventDate;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-6 border-b border-amber-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Get In Touch
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Plan your perfect event with us
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Function Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-2">
                    Function Type
                  </label>
                  <select
                    name="functionType"
                    value={formData.functionType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-white cursor-pointer"
                  >
                    <option value="">Select function type</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* Footer with Button */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={handleWhatsAppClick}
                  disabled={!isFormValid}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.95 1.494c-1.533.913-2.755 2.306-3.522 3.84A9.868 9.868 0 00.618 12.5c0 2.7.695 5.313 2.016 7.574 1.32 2.26 3.19 4.157 5.47 5.404 2.279 1.247 4.862 1.906 7.544 1.906 2.683 0 5.267-.659 7.547-1.906 2.278-1.247 4.148-3.144 5.47-5.404 1.32-2.261 2.016-4.874 2.016-7.574 0-2.7-.695-5.313-2.016-7.574-1.32-2.26-3.19-4.157-5.47-5.404-2.279-1.247-4.862-1.906-7.544-1.906v.002z" />
                  </svg>
                  Contact on WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  We'll get back to you soon!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
