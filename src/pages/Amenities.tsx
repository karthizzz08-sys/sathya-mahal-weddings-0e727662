import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import featureHall from "@/assets/feature-hall.jpg";
import featureDining from "@/assets/feature-dining.jpg";
import featureAc from "@/assets/feature-ac.jpg";
import featureParking from "@/assets/feature-parking.jpg";

const amenitiesDetails = [
  {
    title: "Prestigious Grand Hall",
    image: featureHall,
    description: "Our magnificent grand hall is the heart of Sathya Mahal. With soaring ceilings and elegant architecture, it can accommodate your entire celebration.",
    features: [
      "Spacious and well-ventilated",
      "Elegant interior design",
      "Customizable lighting setup",
      "Sound system included",
      "Multiple entry/exit points",
      "Supports various event configurations",
    ],
  },
  {
    title: "Large Parking Facilities",
    image: featureParking,
    description: "Ample parking space ensures your guests arrive and depart with ease. Our secure and well-maintained parking area is designed for convenience.",
    features: [
      "Spacious parking area",
      "24/7 security supervision",
      "Easy vehicle access",
      "Well-lit and maintained",
      "Multiple entry/exit roads",
      "Valet parking available",
    ],
  },
  {
    title: "Opulent Air Conditioning",
    image: featureAc,
    description: "Complete climate control throughout the venue ensures your guests remain comfortable regardless of weather conditions.",
    features: [
      "Central air conditioning",
      "Temperature control",
      "Energy-efficient systems",
      "Humidity management",
      "Individual zone controls",
      "Backup cooling systems",
    ],
  },
  {
    title: "Spacious Dining Hall",
    image: featureDining,
    description: "Our dedicated dining hall is equipped to serve culinary excellence. Perfect for elaborate feasts and catered events.",
    features: [
      "Large seating capacity",
      "Modern kitchen facilities",
      "Professional staff area",
      "Multiple serving stations",
      "Customizable menu options",
      "Hygienic food handling protocols",
    ],
  },
];

export default function Amenities() {
  return (
    <>
      {/* HEADER */}
      <section className="relative py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl mb-4">Our Premium Amenities</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover the world-class facilities that make Sathya Mahal the perfect destination for your special celebration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AMENITIES DETAILS */}
      {amenitiesDetails.map((amenity, index) => (
        <section key={amenity.title} className={index % 2 === 0 ? "py-24 bg-white" : "py-24 bg-secondary/20"}>
          <div className="container">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? "md:order-2" : ""}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-gold aspect-square">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? "md:order-1" : ""}
              >
                <h2 className="font-serif text-4xl mb-4">{amenity.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">{amenity.description}</p>

                <div className="space-y-3 mb-8">
                  {amenity.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* LOCATION MAP */}
      <section className="py-24 bg-white">
        <div className="container">
          <SectionTitle
            eyebrow="Find Us"
            title="Our Location"
            subtitle="Visit Sathya Mahal at our premium venue location."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 overflow-hidden rounded-2xl shadow-gold aspect-video"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3887.0127!2d77.65!3d12.966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sathya Mahal Location"
            />
          </motion.div>
          <div className="mt-8 text-center">
            <p className="text-lg text-muted-foreground">
              📍 Sathya Mahal Marriage Hall - Your Premier Wedding Destination
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-luxe text-primary-foreground py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Ready to Experience Sathya Mahal?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Check our availability and book your special day with us today.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14">
              <Link to="/availability">Check Availability</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
