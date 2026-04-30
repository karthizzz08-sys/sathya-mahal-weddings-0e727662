import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import featureHall from "@/assets/feature-hall.jpg";
import featureDining from "@/assets/feature-dining.jpg";
import featureAc from "@/assets/feature-ac.jpg";
import featureParking from "@/assets/feature-parking.jpg";
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
  { image: featureHall, title: "Reception Area" },
  { image: featureDining, title: "Decorated Venue" },
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
    </>
  );
}
