import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import featureHall from "@/assets/feature-hall.jpg";
import featureDining from "@/assets/feature-dining.jpg";
import featureAc from "@/assets/feature-ac.jpg";
import featureParking from "@/assets/feature-parking.jpg";
import galleryBallroom from "@/assets/ChatGPT Image May 18, 2026, 06_56_48 PM.png";
import galleryDiningHall from "@/assets/ChatGPT Image May 18, 2026, 07_18_48 PM.png";
import SectionTitle from "@/components/SectionTitle";
import AmenitiesShowcase from "@/components/AmenitiesShowcase";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Full Day", time: "4 PM – Next Day 2 PM", price: "₹55,000+" },
  { name: "Evening", time: "4 PM – 10 PM", price: "₹30,000+" },
  { name: "Morning", time: "5 AM – 2 PM", price: "₹30,000+" },
];

const gallery = [
  { image: featureHall, title: "Grand Hall Setup" },
  { image: featureDining, title: "Dining Hall" },
  { image: featureAc, title: "Hall Ambiance" },
  { image: featureParking, title: "Decorated Entry" },
  { image: galleryBallroom, title: "Elegant Venue Ballroom" },
  { image: galleryDiningHall, title: "Spacious Dining Area" },
];

const djVideos = [
  { title: "DJ & Dance Performance 1", videoSrc: "/videos/d1.mp4" },
  { title: "DJ & Dance Performance 2", videoSrc: "/videos/d2.mp4" },
  { title: "Live DJ Performance", videoSrc: "/videos/d3.mp4" },
  { title: "Wedding DJ Mix", videoSrc: "/videos/d4.mp4" },
  { title: "Dance Floor Energy", videoSrc: "/videos/v2.mp4" },
  { title: "Professional DJ Setup", videoSrc: "/videos/v3.mp4" },
];

export default function Home() {
  return (
    <>
      {/* PREMIUM AMENITIES SHOWCASE */}
      <AmenitiesShowcase />

      {/* AVAILABILITY CTA SECTION - CENTERED EMPTY SPACE */}
      <section className="w-full py-16 md:py-20 flex justify-center items-center bg-white/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8 w-full"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm uppercase tracking-widest text-accent font-semibold">Ready to Celebrate?</p>
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full px-12 h-14 shadow-gold transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Link to="/availability">Check Availability</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Reserve your perfect date today</p>
          </div>

          {/* AMENITIES HIGHLIGHTS - 4 ITEMS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl px-4">
            {[
              "Prestigious Grand Hall",
              "Large Parking Facilities",
              "Opulent Air Conditioning",
              "Spacious Dining Hall"
            ].map((amenity, i) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-sm font-serif">
                  ✨
                </div>
                <p className="text-xs md:text-sm font-semibold text-foreground text-center leading-tight">{amenity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PLANS PREVIEW */}
      <section className="container py-24">
        <SectionTitle eyebrow="Our Packages" title="Curated Hall Plans" subtitle="Choose the perfect timing for your sacred celebration." />
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-8 text-center group"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Plan</p>
              <h3 className="font-serif text-3xl mb-2">{p.name}</h3>
              <p className="text-muted-foreground mb-6">{p.time}</p>
              <p className="font-serif text-4xl gold-text mb-6">{p.price}</p>
              <Button asChild variant="outline" className="rounded-full border-primary/40 hover:bg-primary hover:text-primary-foreground">
                <Link to="/plans">Explore</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="container py-24">
        <SectionTitle eyebrow="Memorable Moments" title="Event Gallery" subtitle="Glimpses of celebrations held at Sathya Mahal." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-gold transition-all duration-300 aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-serif text-lg">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DJ & DANCE VIDEO SECTION */}
      <section className="bg-secondary/40 py-24">
        <div className="container">
          <SectionTitle eyebrow="Entertainment" title="DJ & Dance Performances" subtitle="Experience high-energy entertainment for your celebration." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {djVideos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-gold transition-all duration-300 aspect-video bg-black">
                  <video
                    width="100%"
                    height="100%"
                    controls
                    className="w-full h-full object-cover rounded-2xl"
                  >
                    <source src={video.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h3 className="font-serif text-lg mt-4 group-hover:text-primary transition-colors">{video.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-luxe text-primary-foreground rounded-3xl p-12 md:p-16 text-center shadow-gold relative overflow-hidden"
        >
          <Sparkles className="absolute top-6 left-6 h-6 w-6 opacity-40" />
          <Sparkles className="absolute bottom-6 right-6 h-6 w-6 opacity-40" />
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Begin Your Journey With Us</h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">Reserve Sathya Mahal for an unforgettable celebration of love and tradition.</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14">
            <Link to="/availability">Book Your Date</Link>
          </Button>
        </motion.div>
      </section>

      {/* LOCATION FOOTER SECTION WITH GOOGLE MAP */}
      <section className="w-full bg-secondary/30 py-16">
        <div className="container">
          <SectionTitle eyebrow="Find Us" title="Our Location" subtitle="Visit Sathya Mahal for your special celebration" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-96 md:h-full min-h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d78.0!3d17.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e0!3d0!8m2!3d17.360589!4d78.474434!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-2">Sathya Mahal Wedding Hall</h3>
                <p className="text-muted-foreground mb-4">Conveniently located with easy access to highways and proximity to the city center.</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-primary text-2xl">📍</div>
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">Sathya Mahal, Wedding Hall, City Name</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">📞</div>
                  <div>
                    <p className="font-semibold text-foreground">Contact</p>
                    <a href="tel:+917200101470" className="text-primary hover:underline font-semibold">
                      +91 7200101470
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">💬</div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <a href="https://wa.me/917502215551" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-primary text-2xl">🕐</div>
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">Monday - Sunday: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full w-full h-12">
                <a href="https://www.google.com/maps/search/Sathya+Mahal" target="_blank" rel="noopener noreferrer">
                  View on Google Maps →
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
