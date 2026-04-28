import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SectionTitle from "@/components/SectionTitle";
import { useTransitionNav } from "@/hooks/useTransitionNav";
import PageLoader from "@/components/PageLoader";

type Language = "en" | "ta";

const termsData = [
  {
    title: "Advance Booking Payment",
    titleTa: "முன்பணம்",
    points: [
      "Advance booking is required to confirm the date",
      "Booking will be confirmed only after advance payment",
      "Advance amount is non-refundable",
      "Payment must be made to secure your preferred date",
    ],
    pointsTa: [
      "முன்பணம் கட்டிய பிறகே தேதி உறுதி செய்யப்படும்",
      "முன்பணம் திருப்பி வழங்கப்படாது",
      "நீங்கள் விரும்பிய தேதி பாதுகாக்க பணம் செலுத்த வேண்டும்",
    ],
  },
  {
    title: "Cancellation Policy",
    titleTa: "ரத்து செய்ய கொள்கை",
    points: [
      "Advance payment will not be refunded on cancellation",
      "Any cancellation must be informed in advance",
      "Cancellation charges may apply based on timing",
    ],
    pointsTa: [
      "முன்பணம் ரத்து செய்தால் திருப்பி வழங்கப்படாது",
      "தேதி மாற்றம் முன்கூட்டியே தெரிவிக்க வேண்டும்",
      "ரத்து செய்ய நேரத்தை பொறுத்து கட்டணம் செலுத்த வேண்டும்",
    ],
  },
  {
    title: "Booking Requirements",
    titleTa: "முன்பதிவு தேவைகள்",
    points: [
      "Valid ID proof must be provided at the time of booking",
      "Full name and contact details are mandatory",
      "At least one representative must be present on event day",
    ],
    pointsTa: [
      "முன்பதிவு செய்யும் போது அடையாள ஆவணம் வழங்க வேண்டும்",
      "முழு பெயர் மற்றும் தொடர்பு விவரங்கள் கட்டாயமாகும்",
      "நிகழ்ச்சி நாளில் குறைந்தபட்சம் ஒரு பிரதிநிधி இருக்க வேண்டும்",
    ],
  },
  {
    title: "Usage Time Policy",
    titleTa: "பயன்பாடு நேர கொள்கை",
    points: [
      "Hall usage is limited to the allotted time",
      "Event must be completed within 24 hours",
      "Extra time charges will be applicable beyond the scheduled slot",
      "Setup and teardown time is included in the booked slot",
    ],
    pointsTa: [
      "மண்டபம் குறிப்பிட்ட நேரத்தில் பயன்படுத்த வேண்டும்",
      "நிகழ்ச்சி 24 மணி நேரத்தில் முடிக்க வேண்டும்",
      "குறிப்பிட்ட நேரத்திற்கு அதிகமாக கட்டணம் வசூலிக்கப்படும்",
      "அமைப்பு மற்றும் இடிப்பு நேரம் பொதுத்த நேரத்தில் அடங்கும்",
    ],
  },
  {
    title: "Decorations & Setup",
    titleTa: "அலங்காரம் மற்றும் அமைப்பு",
    points: [
      "Stage and decoration must be arranged separately",
      "We provide basic stage infrastructure only",
      "All decoration materials must be removed after the event",
      "Ensure all decorations comply with fire safety norms",
    ],
    pointsTa: [
      "மேடை மற்றும் அலங்காரம் தனியாக ஏற்பாடு செய்ய வேண்டும்",
      "நாங்கள் அடிப்படை மேடை உள்கட்டமைப்பை மட்டுமே வழங்குகிறோம்",
      "நிகழ்ச்சிக்குப் பிறகு அனைத்து அலங்கார பொருட்களை அகற்ற வேண்டும்",
      "அனைத்து அலங்காரங்கள் தீ பாதுகாப்பு விதிகளை பின்பற்ற வேண்டும்",
    ],
  },
  {
    title: "Cleanliness & Maintenance",
    titleTa: "சுத்தம் மற்றும் பராமரிப்பு",
    points: [
      "Premises must be kept clean throughout the event",
      "Any damages will be charged to the customer",
      "Professional cleaning is mandatory after the event",
      "Waste management is the responsibility of the organizer",
    ],
    pointsTa: [
      "மண்டபம் சுத்தமாக வைத்திருக்க வேண்டும்",
      "சேதம் ஏற்பட்டால் கட்டணம் வசூலிக்கப்படும்",
      "நிகழ்ச்சிக்குப் பிறகு தொழிலாளர் சுத்தம் செய்ய வேண்டும்",
      "கழிவு ব்যবस्थापन ஆயोजক பொறுப்பு ஆகும்",
    ],
  },
  {
    title: "Property Rules",
    titleTa: "சম்பத்தி விதிகள்",
    points: [
      "No damage to walls or property is permitted",
      "Nails or drilling on walls are strictly prohibited",
      "Any structural damage will incur heavy charges",
      "The management reserves the right to charge for repairs",
    ],
    pointsTa: [
      "சுவர் மற்றும் கட்டிடத்திற்கு சேதம் செய்யக்கூடாது",
      "சுவரில் ஆணி அல்லது துளை செய்க தடை",
      "கட்டமைப்பு சேதம் ஏற்பட்டால் பெரிய கட்டணம் வசூலிக்கப்படும்",
      "মেরამத் கட்டணம் நிர்வாகத்திற்கு உரிய",
    ],
  },
  {
    title: "Electricity Usage",
    titleTa: "மின்சாரம் பயன்பாடு",
    points: [
      "Electricity usage must be within allocated limits",
      "Extra usage will be charged at prevailing rates",
      "We do not provide 3-phase power connection",
      "LED screens and heavy equipment usage incurs extra charges",
    ],
    pointsTa: [
      "மின் பயன்பாடு வரம்புக்குள் இருக்க வேண்டும்",
      "அதிக பயன்பாடு தற்போதைய விலையில் கட்டணம் வசூலிக்கப்படும்",
      "நாங்கள் 3-கட்ட மின் இணைப்பு வழங்கவில்லை",
      "LED திரை மற்றும் கனமான உபகரணங்கள் கூடுதல் கட்டணம் உள்ளது",
    ],
  },
  {
    title: "Sound & Lighting",
    titleTa: "ஒலி மற்றும் ஒளி வசதிகள்",
    points: [
      "Sound and lighting must be arranged separately",
      "Amplifiers must comply with noise pollution limits",
      "Sound should not exceed 90 decibels after 10 PM",
      "DJ services are not included in the hall rental",
    ],
    pointsTa: [
      "ஒலி மற்றும் ஒளி வசதிகள் தனியாக ஏற்பாடு செய்ய வேண்டும்",
      "ஆம்ப்லிஃபையர்கள் சத்தம் மாசு வரம்பு பின்பற்ற வேண்டும்",
      "இரவு 10 மணிக்குப் பிறகு சத்தம் 90 டெசிபெல் தாண்டக் கூடாது",
      "DJ சேவைகள் மண்டபம் வாடகையில் அடங்கவில்லை",
    ],
  },
  {
    title: "Catering Responsibility",
    titleTa: "உணவு மற்றும் சமையல் பொறுப்பு",
    points: [
      "Food and catering are customer responsibility",
      "Use of our kitchen facilities requires prior permission",
      "FSSAI license holder must prepare and serve food",
      "Food poisoning claims are not our responsibility",
    ],
    pointsTa: [
      "உணவு மற்றும் சமையல் வாடிக்கையாளர் பொறுப்பு",
      "எங்கள் சமையல் அறை வசதிகளை பயன்படுத்த முன்பு அனுமதி வேண்டும்",
      "FSSAI உரிம தாரி உணவை தயாரிக்க வேண்டும்",
      "உணவு விஷமாக்கல் கூற நாங்கள் பொறுப்பல்ல",
    ],
  },
  {
    title: "Restrictions",
    titleTa: "தடைகள்",
    points: [
      "Alcohol and illegal activities are strictly prohibited",
      "Smoking is not allowed inside the premises",
      "No offensive behavior or activities will be tolerated",
      "Management reserves the right to stop the event if rules are violated",
    ],
    pointsTa: [
      "மதுபானம் மற்றும் சட்டவிரோத செயல்கள் தடை",
      "வளாகத்திற்குள் புகைபிடிப்பு அனுமதியில்லை",
      "புண்ணாக்கும் நடத்தை சகிக்கப்படாது",
      "விதி மீறினால் நிர்வாகம் நிகழ்ச்சியை நிறுத்த உரிய",
    ],
  },
  {
    title: "Parking",
    titleTa: "வாகன நிறுத்தம்",
    points: [
      "Parking is limited and based on availability",
      "Vehicles parked outside the premises are at owner's risk",
      "We are not responsible for vehicle theft or damage",
      "Maximum 25-30 vehicles can be accommodated",
    ],
    pointsTa: [
      "வாகன நிறுத்தம் வரம்புடன் வழங்கப்படும்",
      "வளாகத்திற்கு வெளியே நிறுத்தப்பட்ட வாகனங்கள் உரிமையாளரின் ஆபத்து",
      "வாகன திருட்டு அல்லது சேதம் நாங்கள் பொறுப்பல்ல",
      "அதிகபட்சம் 25-30 வாகனங்களை வைக்க முடியும்",
    ],
  },
  {
    title: "Final Authority",
    titleTa: "চূড়ান্ত प्राधिकार",
    points: [
      "Management decision will be final",
      "Any disputes will be resolved as per management's discretion",
      "The terms and conditions may be updated at any time",
      "By booking, you agree to abide by all rules and regulations",
    ],
    pointsTa: [
      "நிர்வாகத்தின் முடிவு இறுதியானது",
      "যেকোনো বিরোধ নிர্வாগত বিবেচনা অনুযায়ী সমাধান হবে",
      "விதிমுறைகள் যেকোনো সময় பরিবর্তন করা যেতে পারে",
      "முன்பதிவு করে সমস্ত নিয়ম মেনে চলতে আপনি সম্মতি জানান",
    ],
  },
];

export default function TermsAndConditions() {
  const [language, setLanguage] = useState<Language>("en");
  const [agreed, setAgreed] = useState(false);
  const { loading, go } = useTransitionNav(900);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!agreed) return;
    go("/payment");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header with Back Button and Language Toggle */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-sm border-b border-amber-100">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Language Toggle */}
          <div className="flex gap-2 bg-amber-100 rounded-full p-1">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-full transition-all font-medium ${
                language === "en"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-amber-700 hover:text-amber-800"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`px-4 py-2 rounded-full transition-all font-medium ${
                language === "ta"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-amber-700 hover:text-amber-800"
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-500">
            {language === "en" ? "Terms & Conditions" : "விதிமுறைகள்"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "Please read our terms and conditions carefully before booking your event at Sathya Mahal"
              : "சத்ய மகாலில் உங்கள் நிகழ்ச்சி முன்பதிவு செய்வதற்கு முன்பு எங்கள் விதிமுறைகளை கவனமாக படிக்கவும்"}
          </p>
        </motion.div>

        {/* Terms Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:gap-8 mb-12"
        >
          {termsData.map((term, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-amber-100/50 hover:border-amber-200">
                <div className="flex gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-serif text-xl font-bold shadow-lg">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                      {language === "en" ? term.title : term.titleTa}
                    </h2>
                    <ul className="space-y-3">
                      {(language === "en" ? term.points : term.pointsTa).map(
                        (point, pointIdx) => (
                          <li
                            key={pointIdx}
                            className="flex gap-3 text-gray-700 leading-relaxed"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            </span>
                            <span>{point}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-amber-100/50 p-8 mb-8"
        >
          <div className="flex gap-4 mb-6">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={() => setAgreed(!agreed)}
              className="w-6 h-6 mt-1 border-2 border-amber-300 rounded accent-amber-600"
            />
            <label htmlFor="terms" className="flex-1 cursor-pointer">
              <span className="text-lg font-medium text-gray-800">
                {language === "en"
                  ? "I agree to the Terms & Conditions"
                  : "நான் விதிமுறைகளை ஏற்கிறேன்"}
              </span>
              <p className="text-gray-600 mt-1">
                {language === "en"
                  ? "By checking this box, you acknowledge that you have read and agree to all the terms and conditions listed above."
                  : "இந்த பெட்டியை சரிபார்க்கி, மேலே பட்டியலிடப்பட்ட அனைத்து விதிமுறைகளை நீங்கள் படித்து ஏற்றுக்கொண்டீர்கள்."}
              </p>
            </label>
          </div>
        </motion.div>

        {/* Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="px-8 py-6 text-lg rounded-xl border-2 border-gray-300 hover:border-gray-400"
          >
            Go Back
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!agreed}
            className={`px-8 py-6 text-lg rounded-xl font-semibold transition-all ${
              agreed
                ? "bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Check className="w-5 h-5 mr-2" />
            {language === "en" ? "Proceed to Booking" : "முன்பதிவுக்கு தொடரவும்"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
