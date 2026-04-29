import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/amenities.css";
import featureHall from "@/assets/feature-hall.jpg";
import featureDining from "@/assets/feature-dining.jpg";
import featureAc from "@/assets/feature-ac.jpg";
import featureParking from "@/assets/feature-parking.jpg";
import logo from "@/assets/logooo.jpeg";

interface AmenityItem {
  id: string;
  title: string;
  image: string;
}

const amenities: AmenityItem[] = [
  {
    id: "grand-hall",
    title: "Prestigious Grand Hall",
    image: featureHall,
  },
  {
    id: "parking",
    title: "Large Parking Facilities",
    image: featureParking,
  },
  {
    id: "ac",
    title: "Opulent Air Conditioning",
    image: featureAc,
  },
  {
    id: "dining",
    title: "Spacious Dining Hall",
    image: featureDining,
  },
];

export default function AmenitiesShowcase() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="amenities-section" style={{ position: 'relative' }}>
      {/* Logo Watermark Background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          backgroundImage: `url(${logo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="amenities-container">
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className="amenity-card"
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => navigate("/amenities")}
              style={{ cursor: "pointer" }}
            >
              <div className="amenity-image-wrapper">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="amenity-image"
                  loading="lazy"
                />
              </div>

              <div className="amenity-overlay" />

              <div className="amenity-content">
                <div className="amenity-text-wrapper">
                  <h3 className="amenity-title-text">{amenity.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
