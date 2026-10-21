import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Bed, Utensils, Sparkles, MapPin, Phone, Mail, Calendar, Users, ChevronLeft, 
  ChevronRight, X, Check, Star, Menu, ArrowRight, Wifi, Clock, Coffee, 
  Waves, Dumbbell, Shield, Car, Compass, Shirt, ParkingSquare, Award,
  Quote, Send, Play, Volume2, VolumeX, Eye, Info, CheckCircle2, AlertCircle,
  Instagram, Facebook, Twitter, Globe, Search, Filter, SlidersHorizontal,
  ChevronDown, ExternalLink, Heart, Bookmark
} from 'lucide-react';

/* ==========================================
   CENTRAL HOTEL DATA CONFIGURATION
   ========================================== */
const HOTEL_DATA = {
  name: "AURELIA GRAND HOTEL",
  tagline: "Stay beautifully. Experience everything.",
  description: "An elegant escape designed around comfort, exceptional hospitality and unforgettable experiences.",
  contact: {
    phone: "+1 (800) 555-0199",
    email: "concierge@aureliagrand.com",
    address: "742 Grand Avenue, Pentacle District, Metropolis",
    coordinates: "40.7128° N, 74.0060° W"
  },
  stats: [
    { label: "5-Star Experience", value: 5, suffix: " ★" },
    { label: "Luxury Rooms & Suites", value: 48, suffix: "" },
    { label: "Guest Services", value: 24, suffix: "/7" },
    { label: "Destination", value: 1, suffix: "" }
  ],
  rooms: [
    {
      id: "deluxe-king",
      title: "DELUXE KING ROOM",
      category: "Room",
      price: 380,
      size: "32 m²",
      guests: "2 Guests",
      bed: "King Bed",
      view: "City View",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      description: "Designed for effortless relaxation, our Deluxe King Room features bespoke furnishings, curated artwork, and floor-to-ceiling windows overlooking the vibrant city.",
      amenities: ["Complimentary Wi-Fi", "Marble Rain Shower", "Nespresso Machine", "55-inch 4K OLED TV", "Pratesi Linens", "Molton Brown Amenities"],
      policies: "Check-in from 3:00 PM. Check-out by 12:00 PM. Free cancellation up to 48 hours prior to arrival."
    },
    {
      id: "executive-suite",
      title: "EXECUTIVE SUITE",
      category: "Suite",
      price: 650,
      size: "52 m²",
      guests: "3 Guests",
      bed: "King Bed",
      view: "Garden & Skyline",
      rating: 4.95,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      description: "An elevated sanctuary offering a separate living lounge, handcrafted cocktail bar, and expansive spa-inspired bathroom with a deep soaking tub.",
      amenities: ["Separate Living Area", "Complimentary Airport Transfer", "Evening Turndown", "Dedicated Butler Service", "Private Bar", "High-speed Wi-Fi"],
      policies: "Check-in from 3:00 PM. Check-out by 12:00 PM. Complimentary breakfast included."
    },
    {
      id: "presidential-suite",
      title: "AURELIA PRESIDENTIAL SUITE",
      category: "Penthouse",
      price: 1450,
      size: "85 m²",
      guests: "4 Guests",
      bed: "Super King Bed",
      view: "Panoramic View",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      description: "The pinnacle of luxury living. Features a grand private lounge, dining parlor for six, panoramic wraparound terrace, and private elevator access.",
      amenities: ["Panoramic Terrace", "Private Lounge & Dining", "24/7 Dedicated Butler", "Bespoke Bar Setup", "Whirlpool Jacuzzi", "Priority Spa Access"],
      policies: "Flexible cancellation. Includes VIP airport pickup in Rolls-Royce Ghost."
    },
    {
      id: "garden-villa-suite",
      title: "GARDEN VILLA SUITE",
      category: "Suite",
      price: 890,
      size: "68 m²",
      guests: "3 Guests",
      bed: "California King",
      view: "Courtyard Garden",
      rating: 4.88,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      description: "Nestled adjacent to our private courtyard sanctuary, this suite offers seamless indoor-outdoor living with a private teak deck and outdoor rain shower.",
      amenities: ["Private Teak Deck", "Outdoor Rain Shower", "Fire Pit", "Complimentary Mini-Bar", "Yoga Mats & Wellness Kit"],
      policies: "Check-in from 3:00 PM. Check-out by 12:00 PM. Pet-friendly options available."
    }
  ],
  experiences: [
    {
      id: "spa",
      title: "THE SPA",
      subtitle: "Restore your body and mind with treatments designed around complete relaxation.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "pool",
      title: "THE POOL",
      subtitle: "A peaceful infinity space to unwind from morning to evening with bespoke refreshments.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "fitness",
      title: "FITNESS",
      subtitle: "Stay active with state-of-the-art Technogym equipment and personal wellness guides.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "rooftop",
      title: "ROOFTOP",
      subtitle: "Unwind above the city with unforgettable sunset views and artisanal cocktails.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  diningMenu: {
    breakfast: [
      { name: "Aurelia Truffle Avocado Toast", desc: "Poached organic farm eggs, shaved black truffle, sourdough brioche.", price: "$28" },
      { name: "Golden Omelette", desc: "Wild chanterelles, Gruyère cheese, fresh herbs, crispy fingerling potatoes.", price: "$32" },
      { name: "Artisanal Viennoiserie Basket", desc: "Croissants, pain au chocolat, seasonal berry jam, house-churned cultured butter.", price: "$24" }
    ],
    lunch: [
      { name: "Pan-Seared Halibut", desc: "Saffron fennel purée, baby artichokes, crisp capers, Meyer lemon emulsion.", price: "$48" },
      { name: "Wagyu Tenderloin Carpaccio", desc: "Aged parmesan, micro arugula, pickled shallots, white truffle oil.", price: "$36" },
      { name: "Heirloom Tomato & Burrata", desc: "Basil compressed watermelon, aged balsamic pearls, toasted pistachios.", price: "$29" }
    ],
    dinner: [
      { name: "Prime Dry-Aged Ribeye", desc: "Bone marrow jus, roasted bone marrow, pomme purée, charred broccolini.", price: "$78" },
      { name: "Wild Dover Sole Meunière", desc: "Brown butter, capers, charred lemon, parsley potatoes tableside filleted.", price: "$85" },
      { name: "Aurelia Signature Chocolate Sphere", desc: "Valrhona dark chocolate, warm caramel hazelnut ganache, edible gold leaf.", price: "$26" }
    ],
    drinks: [
      { name: "The Aurelia Gold Rush", desc: "Bourbon, artisanal honey reduction, fresh Meyer lemon, 24k edible gold dust.", price: "$25" },
      { name: "Botanical Garden Fizz", desc: "Hendrick's gin, St. Germain, cucumber ribbon, elderflower tonic.", price: "$22" },
      { name: "Vintage Dom Pérignon (Glass)", desc: "Crisp effervescence with notes of brioche, white peach, and toasted almond.", price: "$65" }
    ]
  },
  amenitiesList: [
    { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Complimentary secure fiber network throughout the property." },
    { icon: Clock, title: "24/7 Reception", desc: "Multilingual concierge and front desk at your service anytime." },
    { icon: Coffee, title: "Room Service", desc: "In-suite dining curated by our executive culinary team around the clock." },
    { icon: Waves, title: "Swimming Pool", desc: "Heated indoor and rooftop infinity pools with panoramic vistas." },
    { icon: Dumbbell, title: "Fitness Centre", desc: "State-of-the-art equipment with private training sessions available." },
    { icon: Sparkles, title: "Luxury Spa", desc: "Holistic wellness treatments, steam rooms, and mineral baths." },
    { icon: Utensils, title: "Fine Dining", desc: "Award-winning restaurant featuring farm-to-table seasonal gastronomy." },
    { icon: Sparkles, title: "Sky Bar", desc: "Handcrafted mixology and rare vintage wine cellar." },
    { icon: Car, title: "Airport Transfer", desc: "Private chauffeur service in luxury Mercedes or Rolls-Royce." },
    { icon: Shield, title: "Concierge", desc: "Tailored itinerary planning, ticket acquisition, and bespoke tours." },
    { icon: Shirt, title: "Valet & Laundry", desc: "Same-day dry cleaning, pressing, and shoe shine service." },
    { icon: ParkingSquare, title: "Secure Parking", desc: "Valet parking with EV charging stations available." }
  ],
  reviews: [
    {
      id: 1,
      quote: "From the room to the service, everything felt carefully considered. It was exactly the kind of escape we needed.",
      author: "Eleanor Vance",
      role: "Architectural Digest",
      rating: 5
    },
    {
      id: 2,
      quote: "Aurelia redefines luxury. The attention to detail, warmth of the staff, and breathtaking suite views are unmatched.",
      author: "Julian Sterling",
      role: "Global Traveler Magazine",
      rating: 5
    },
    {
      id: 3,
      quote: "An absolute masterpiece of hospitality. The spa treatments and dining at Aurelia Kitchen were unforgettable highlights.",
      author: "Sophia Laurent",
      role: "Vogue Living",
      rating: 5
    }
  ],
  gallery: [
    { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", title: "Hotel Exterior", span: "col-span-1 md:col-span-2 row-span-2" },
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80", title: "Executive Suite", span: "col-span-1 row-span-1" },
    { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80", title: "Grand Lobby", span: "col-span-1 row-span-1" },
    { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80", title: "Fine Dining", span: "col-span-1 md:col-span-2 row-span-1" },
    { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80", title: "The Spa Sanctuary", span: "col-span-1 row-span-1" },
    { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80", title: "Infinity Pool", span: "col-span-1 row-span-2" },
    { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80", title: "Rooftop Terrace", span: "col-span-1 row-span-1" }
  ],
  attractions: [
    { name: "International Airport", time: "25 min" },
    { name: "Metropolis City Centre", time: "05 min" },
    { name: "Luxury Fashion District", time: "10 min" },
    { name: "Golden Sand Beach", time: "15 min" },
    { name: "Financial Business Hub", time: "08 min" }
  ],
  offers: [
    {
      id: "weekend",
      title: "WEEKEND ESCAPE",
      desc: "Enjoy a relaxing weekend away with complimentary daily champagne breakfast and late checkout.",
      price: "From $350 / night",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "romantic",
      title: "ROMANTIC GETAWAY",
      desc: "A private escape designed for two, featuring rose petal turndown, couples spa session, and candlelight dinner.",
      price: "From $520 / night",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "longstay",
      title: "LONG STAY PRIVILEGE",
      desc: "Settle in and enjoy more time at Aurelia with 25% savings on suites for stays of 5 nights or longer.",
      price: "From $490 / night",
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeMenuTab, setActiveMenuTab] = useState('breakfast');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Custom Cursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Scroll listener for Navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move listener for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % HOTEL_DATA.reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#111111] text-[#F5F0E8] font-sans selection:bg-[#B99A5B] selection:text-white relative overflow-x-hidden">
      
      {}
      <div 
        className="hidden lg:block fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-[#B99A5B] transition-all duration-300 flex items-center justify-center ${cursorHovered ? 'scale-150 bg-[#B99A5B]/20 backdrop-blur-xs' : 'scale-100'}`}>
          <div className="w-1.5 h-1.5 bg-[#B99A5B] rounded-full" />
        </div>
      </div>

      {}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#B99A5B] text-[#F5F0E8] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[#B99A5B]" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-md py-4 border-b border-[#B99A5B]/20 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div 
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex flex-col"
          >
            <span className="text-xl md:text-2xl font-serif tracking-[0.25em] text-[#F5F0E8] font-light">AURELIA</span>
            <span className="text-[9px] tracking-[0.4em] text-[#B99A5B] uppercase">Grand Hotel</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium text-[#D8CBB8]">
            {['Rooms & Suites', 'Dining', 'Experiences', 'Gallery', 'About', 'Location'].map((item) => {
              const idMap = {
                'Rooms & Suites': 'rooms',
                'Dining': 'dining',
                'Experiences': 'experiences',
                'Gallery': 'gallery',
                'About': 'about',
                'Location': 'location'
              };
              return (
                <button
                  key={item}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  onClick={() => scrollToSection(idMap[item])}
                  className="hover:text-[#F5F0E8] transition-colors relative group py-1"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B99A5B] transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => setIsBookingOpen(true)}
              className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-6 py-3 rounded-none text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-lg hover:shadow-[#B99A5B]/20"
            >
              Book Your Stay
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#F5F0E8] p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#111111] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {['Rooms & Suites', 'Dining', 'Experiences', 'Gallery', 'About', 'Location'].map((item) => {
                const idMap = {
                  'Rooms & Suites': 'rooms',
                  'Dining': 'dining',
                  'Experiences': 'experiences',
                  'Gallery': 'gallery',
                  'About': 'about',
                  'Location': 'location'
                };
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(idMap[item])}
                    className="text-lg font-serif tracking-[0.2em] text-[#D8CBB8] hover:text-[#B99A5B] transition-colors py-2"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => { setMobileMenuOpen(false); setIsBookingOpen(true); }}
                className="w-full bg-[#B99A5B] text-[#111111] py-4 text-xs tracking-[0.25em] uppercase font-bold"
              >
                Book Your Stay
              </button>
              <div className="text-center text-xs text-[#D8CBB8] tracking-widest">
                {HOTEL_DATA.contact.phone}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90" 
            alt="Aurelia Grand Hotel Exterior" 
            className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-[#B99A5B] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block font-medium">
              {HOTEL_DATA.tagline}
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-light tracking-[0.1em] text-[#F5F0E8] mb-6 uppercase">
              Aurelia Grand Hotel
            </h1>
            <p className="text-[#D8CBB8] text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
              {HOTEL_DATA.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-xl"
              >
                Book Your Stay
              </button>
              <button
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                onClick={() => scrollToSection('rooms')}
                className="w-full sm:w-auto border border-[#D8CBB8]/40 hover:border-[#B99A5B] text-[#F5F0E8] px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 backdrop-blur-xs"
              >
                Explore The Hotel
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Booking Widget */}
        <div className="absolute bottom-8 left-6 right-6 max-w-5xl mx-auto hidden md:block z-20">
          <div className="bg-[#111111]/90 backdrop-blur-md border border-[#B99A5B]/30 p-6 shadow-2xl grid grid-cols-4 gap-6 items-center">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B99A5B] block mb-1">Check-In</span>
              <input 
                type="date" 
                defaultValue="2026-10-15"
                className="w-full bg-transparent text-[#F5F0E8] text-sm focus:outline-none border-b border-[#D8CBB8]/30 pb-1 cursor-pointer"
              />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B99A5B] block mb-1">Check-Out</span>
              <input 
                type="date" 
                defaultValue="2026-10-18"
                className="w-full bg-transparent text-[#F5F0E8] text-sm focus:outline-none border-b border-[#D8CBB8]/30 pb-1 cursor-pointer"
              />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B99A5B] block mb-1">Guests & Rooms</span>
              <div className="text-sm text-[#F5F0E8] border-b border-[#D8CBB8]/30 pb-1 flex justify-between items-center">
                <span>2 Adults, 1 Room</span>
                <Users className="w-4 h-4 text-[#B99A5B]" />
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </header>

      {}
      <section className="bg-[#181818] border-y border-[#B99A5B]/20 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {HOTEL_DATA.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-4xl font-serif text-[#B99A5B] mb-2 font-light">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#D8CBB8]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section id="about" className="py-24 md:py-36 bg-[#111111] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-[140px] font-serif text-[#B99A5B]/10 select-none pointer-events-none">
              01
            </div>
            <div className="relative z-10 overflow-hidden rounded-none shadow-2xl border border-[#B99A5B]/20">
              <img 
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80" 
                alt="Aurelia Grand Lobby Interior" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] leading-tight mb-8">
              A PLACE TO SLOW DOWN
            </h2>
            <blockquote className="text-lg md:text-xl font-serif italic text-[#D8CBB8] border-l-2 border-[#B99A5B] pl-6 mb-8 leading-relaxed">
              “Aurelia Grand Hotel brings together thoughtful design, exceptional comfort and genuine hospitality in one unforgettable destination.”
            </blockquote>
            <p className="text-[#D8CBB8]/80 text-sm md:text-base leading-relaxed mb-10 font-light">
              Nestled in the prestigious heart of the city, Aurelia is curated for those who appreciate unhurried elegance. Every architectural curve, bespoke scent, and tailored interaction is thoughtfully orchestrated to provide a true sanctuary from the demands of modern life.
            </p>
            <button
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => scrollToSection('rooms')}
              className="group flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#B99A5B] hover:text-[#F5F0E8] transition-colors font-semibold"
            >
              <span>Discover Aurelia</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </section>

      {}
      <section id="rooms" className="py-24 bg-[#151515] border-t border-[#B99A5B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Accommodations</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] tracking-wide">
                ROOMS MADE FOR STAYING IN
              </h2>
            </div>
            <p className="text-[#D8CBB8] text-sm mt-4 md:mt-0 font-light max-w-md">
              “Every room is designed to make your stay feel effortless.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTEL_DATA.rooms.map((room) => (
              <div 
                key={room.id}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                onClick={() => setSelectedRoom(room)}
                className="group bg-[#111111] border border-[#B99A5B]/20 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:border-[#B99A5B]"
              >
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#111111]/80 backdrop-blur-md px-3 py-1 text-xs text-[#B99A5B] tracking-widest font-serif">
                    From ${room.price} / night
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#B99A5B] tracking-[0.2em] uppercase mb-2">
                      <span>{room.category}</span>
                      <span>{room.size}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#F5F0E8] mb-3 tracking-wide">{room.title}</h3>
                    <p className="text-[#D8CBB8]/70 text-xs line-clamp-2 leading-relaxed mb-6 font-light">
                      {room.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#B99A5B]/10 flex items-center justify-between">
                    <span className="text-xs tracking-widest text-[#D8CBB8] uppercase">{room.bed} • {room.guests}</span>
                    <span className="text-xs tracking-[0.2em] text-[#B99A5B] uppercase font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Room →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111111] border border-[#B99A5B] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-none shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-6 right-6 z-10 bg-[#111111]/80 text-[#F5F0E8] p-2 hover:bg-[#B99A5B] hover:text-[#111111] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-80 md:h-96">
                <img src={selectedRoom.image} alt={selectedRoom.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[#B99A5B] text-xs uppercase tracking-[0.3em] block mb-1">{selectedRoom.category}</span>
                  <h2 className="text-2xl md:text-4xl font-serif text-[#F5F0E8]">{selectedRoom.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-[#B99A5B]/20 text-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Room Size</span>
                    <span className="text-sm font-serif text-[#F5F0E8]">{selectedRoom.size}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Occupancy</span>
                    <span className="text-sm font-serif text-[#F5F0E8]">{selectedRoom.guests}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Bed Type</span>
                    <span className="text-sm font-serif text-[#F5F0E8]">{selectedRoom.bed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">View</span>
                    <span className="text-sm font-serif text-[#F5F0E8]">{selectedRoom.view}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-3">About The Room</h4>
                  <p className="text-[#D8CBB8] text-sm md:text-base leading-relaxed font-light">
                    {selectedRoom.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-4">Included Amenities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedRoom.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-[#D8CBB8]">
                        <Check className="w-4 h-4 text-[#B99A5B]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-2">Policies</h4>
                  <p className="text-xs text-[#D8CBB8]/80 leading-relaxed font-light">{selectedRoom.policies}</p>
                </div>

                <div className="pt-6 border-t border-[#B99A5B]/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D8CBB8] block">Tariff</span>
                    <span className="text-2xl font-serif text-[#B99A5B]">${selectedRoom.price} <span className="text-xs text-[#D8CBB8]">/ night</span></span>
                  </div>
                  <button
                    onClick={() => { setSelectedRoom(null); setIsBookingOpen(true); }}
                    className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold transition-all"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex items-center justify-between">
          <div>
            <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-2 block">Visual Tour</span>
            <h2 className="text-3xl font-serif font-light text-[#F5F0E8]">IMMERSE IN ELEGANCE</h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#D8CBB8]">Click any image to expand</span>
        </div>

        <div className="flex overflow-x-auto space-x-6 px-6 md:px-12 pb-8 scrollbar-none">
          {[
            { title: "Bedroom Sanctuary", url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80" },
            { title: "Spa Bathroom", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80" },
            { title: "Living Lounge", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80" },
            { title: "Private Balcony", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80" },
            { title: "Panoramic View", url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80" }
          ].map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxImage(img)}
              className="flex-shrink-0 w-80 md:w-96 h-64 relative overflow-hidden group cursor-pointer border border-[#B99A5B]/20"
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.25em] text-[#F5F0E8] border border-[#B99A5B] px-4 py-2 bg-[#111111]/80">View Image</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-[#F5F0E8] p-3 hover:bg-[#B99A5B] hover:text-[#111111] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-5xl w-full text-center">
              <img src={lightboxImage.url} alt={lightboxImage.title} className="max-h-[80vh] mx-auto object-contain mb-4 border border-[#B99A5B]/30" />
              <h3 className="text-lg font-serif text-[#F5F0E8] tracking-widest">{lightboxImage.title}</h3>
            </div>
          </div>
        )}
      </AnimatePresence>

      {}
      <section id="experiences" className="py-24 bg-[#151515] border-t border-[#B99A5B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Bespoke Offerings</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] tracking-wide">
              MORE THAN A ROOM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {HOTEL_DATA.experiences.map((exp) => (
              <div key={exp.id} className="group relative overflow-hidden h-[400px] border border-[#B99A5B]/20">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-[#F5F0E8] mb-2 tracking-wide">{exp.title}</h3>
                  <p className="text-[#D8CBB8] text-xs md:text-sm font-light leading-relaxed mb-4">{exp.subtitle}</p>
                  <button 
                    onClick={() => showToast(`Inquiring about ${exp.title}. Our concierge will contact you.`)}
                    className="self-start text-xs uppercase tracking-[0.2em] text-[#B99A5B] hover:text-[#F5F0E8] font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>Reserve Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="dining" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Gastronomy</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] mb-6">
                TASTE THE MOMENT
              </h2>
              <p className="text-[#D8CBB8] text-sm md:text-base font-light leading-relaxed mb-8">
                Aurelia Kitchen presents seasonal ingredients, thoughtful presentation and memorable dining from breakfast through late-night cocktails.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => showToast("Table reservation request received. Confirmation sent via email.")}
                  className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all"
                >
                  Reserve A Table
                </button>
                <button
                  onClick={() => scrollToSection('dining-menu')}
                  className="border border-[#D8CBB8]/40 hover:border-[#B99A5B] text-[#F5F0E8] px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all"
                >
                  View Menu
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden border border-[#B99A5B]/20 h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80" 
                alt="Aurelia Kitchen Fine Dining" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Interactive Menu Preview */}
          <div id="dining-menu" className="bg-[#181818] border border-[#B99A5B]/20 p-8 md:p-12">
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-[#B99A5B]/20 pb-6">
              {['breakfast', 'lunch', 'dinner', 'drinks'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMenuTab(tab)}
                  className={`text-xs tracking-[0.3em] uppercase pb-2 transition-colors relative ${activeMenuTab === tab ? 'text-[#B99A5B] font-bold' : 'text-[#D8CBB8] hover:text-[#F5F0E8]'}`}
                >
                  {tab}
                  {activeMenuTab === tab && <span className="absolute bottom-[-24px] left-0 right-0 h-[2px] bg-[#B99A5B]" />}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HOTEL_DATA.diningMenu[activeMenuTab].map((item, idx) => (
                <div key={idx} className="bg-[#111111] p-6 border border-[#B99A5B]/10 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-lg text-[#F5F0E8]">{item.name}</h4>
                      <span className="text-[#B99A5B] font-serif font-medium">{item.price}</span>
                    </div>
                    <p className="text-xs text-[#D8CBB8]/70 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="relative py-36 bg-fixed bg-center bg-cover flex items-center justify-center text-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90')` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-[#B99A5B] text-xs tracking-[0.4em] uppercase mb-4 block font-medium">Signature Memory</span>
          <h2 className="text-3xl md:text-6xl font-serif font-light text-[#F5F0E8] mb-6 tracking-wide uppercase">
            Your next memory starts here.
          </h2>
          <p className="text-[#D8CBB8] text-sm md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            “From quiet mornings to unforgettable evenings, every part of Aurelia is designed around the way you want to experience your stay.”
          </p>
          <button
            onClick={() => scrollToSection('experiences')}
            className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all"
          >
            Explore Experiences
          </button>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#151515] border-t border-[#B99A5B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Hotel Facilities</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8]">EXCEPTIONAL AMENITIES</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {HOTEL_DATA.amenitiesList.map((amenity, idx) => {
              const IconComponent = amenity.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#111111] border border-[#B99A5B]/20 p-8 flex flex-col items-center text-center group hover:border-[#B99A5B] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-none bg-[#B99A5B]/10 flex items-center justify-center text-[#B99A5B] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-sm text-[#F5F0E8] mb-2 tracking-wide">{amenity.title}</h4>
                  <p className="text-[11px] text-[#D8CBB8]/70 leading-relaxed font-light">{amenity.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] mb-16">WORDS FROM OUR GUESTS</h2>

          <div className="min-h-[220px] flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex justify-center gap-1 text-[#B99A5B]">
                  {[...Array(HOTEL_DATA.reviews[reviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg md:text-2xl font-serif italic text-[#F5F0E8] leading-relaxed max-w-2xl mx-auto">
                  “{HOTEL_DATA.reviews[reviewIndex].quote}”
                </p>
                <div>
                  <h5 className="font-serif text-sm text-[#B99A5B] tracking-wider uppercase">{HOTEL_DATA.reviews[reviewIndex].author}</h5>
                  <span className="text-xs text-[#D8CBB8]/60 tracking-widest">{HOTEL_DATA.reviews[reviewIndex].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button 
              onClick={() => setReviewIndex((prev) => (prev === 0 ? HOTEL_DATA.reviews.length - 1 : prev - 1))}
              className="p-3 border border-[#B99A5B]/30 hover:border-[#B99A5B] text-[#F5F0E8] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {HOTEL_DATA.reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${reviewIndex === idx ? 'bg-[#B99A5B]' : 'bg-[#D8CBB8]/30'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setReviewIndex((prev) => (prev + 1) % HOTEL_DATA.reviews.length)}
              className="p-3 border border-[#B99A5B]/30 hover:border-[#B99A5B] text-[#F5F0E8] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {}
      <section id="gallery" className="py-24 bg-[#151515] border-t border-[#B99A5B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Editorial Gallery</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8]">AURELIA IN FRAMES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {HOTEL_DATA.gallery.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(item)}
                className={`relative overflow-hidden group cursor-pointer border border-[#B99A5B]/20 ${item.span}`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#B99A5B] mb-1">View Image</span>
                  <span className="font-serif text-lg text-[#F5F0E8]">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Exclusive Packages</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8]">STAY A LITTLE LONGER</h2>
            </div>
            <p className="text-[#D8CBB8] text-sm mt-4 md:mt-0 font-light max-w-md">
              Elevate your getaway with curated seasonal privileges and tailored experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOTEL_DATA.offers.map((offer) => (
              <div key={offer.id} className="bg-[#151515] border border-[#B99A5B]/20 flex flex-col justify-between group">
                <div className="h-64 overflow-hidden relative">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-[#111111]/80 backdrop-blur-md px-3 py-1 text-xs text-[#B99A5B] tracking-widest font-serif">
                    {offer.price}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-[#F5F0E8] mb-3">{offer.title}</h3>
                    <p className="text-xs text-[#D8CBB8]/70 leading-relaxed font-light mb-6">{offer.desc}</p>
                  </div>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full bg-[#111111] border border-[#B99A5B]/50 hover:bg-[#B99A5B] hover:text-[#111111] text-[#F5F0E8] py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all"
                  >
                    Explore Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="location" className="py-24 bg-[#151515] border-t border-[#B99A5B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Prime Address</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] mb-6">
                RIGHT WHERE YOU WANT TO BE
              </h2>
              <p className="text-[#D8CBB8] text-sm md:text-base font-light leading-relaxed mb-8">
                Situated in the cultural and financial epicentre of Metropolis, Aurelia provides effortless access to premier boutiques, galleries, and scenic coastal promenades.
              </p>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-center gap-3 text-[#D8CBB8]">
                  <MapPin className="w-5 h-5 text-[#B99A5B]" />
                  <span>{HOTEL_DATA.contact.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[#D8CBB8]">
                  <Phone className="w-5 h-5 text-[#B99A5B]" />
                  <span>{HOTEL_DATA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[#D8CBB8]">
                  <Mail className="w-5 h-5 text-[#B99A5B]" />
                  <span>{HOTEL_DATA.contact.email}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => showToast("Opening directions in maps...")}
                  className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all"
                >
                  Get Directions
                </button>
                <button 
                  onClick={() => showToast("Contact request initiated. Our concierge will be in touch.")}
                  className="border border-[#D8CBB8]/40 hover:border-[#B99A5B] text-[#F5F0E8] px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all"
                >
                  Contact Hotel
                </button>
              </div>
            </div>

            {/* Interactive Map Simulation */}
            <div className="bg-[#111111] border border-[#B99A5B]/20 p-4 h-[400px] relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#B99A5B_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
              <div className="relative z-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#B99A5B]/20 border border-[#B99A5B] mx-auto flex items-center justify-center animate-pulse">
                  <MapPin className="w-8 h-8 text-[#B99A5B]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#F5F0E8]">Aurelia Grand Hotel</h4>
                  <span className="text-xs text-[#B99A5B] tracking-widest">{HOTEL_DATA.contact.coordinates}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Distances */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOTEL_DATA.attractions.map((attr, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#B99A5B]/20 p-6 text-center">
                <span className="text-xs text-[#D8CBB8]/70 block mb-2">{attr.name}</span>
                <span className="font-serif text-xl text-[#B99A5B]">{attr.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111111] border border-[#B99A5B] max-w-2xl w-full p-8 md:p-12 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 text-[#F5F0E8] p-2 hover:bg-[#B99A5B] hover:text-[#111111] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <span className="text-[#B99A5B] text-xs uppercase tracking-[0.3em] block mb-2">Reservation Portal</span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#F5F0E8]">BOOK YOUR STAY AT AURELIA</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Check-In Date</label>
                    <input type="date" defaultValue="2026-10-15" className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Check-Out Date</label>
                    <input type="date" defaultValue="2026-10-18" className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Select Room Type</label>
                    <select className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none">
                      {HOTEL_DATA.rooms.map((r) => (
                        <option key={r.id} value={r.id}>{r.title} (${r.price}/night)</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Guests</label>
                    <select className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none">
                      <option>1 Adult</option>
                      <option selected>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">First Name</label>
                    <input type="text" placeholder="Eleanor" className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Last Name</label>
                    <input type="text" placeholder="Vance" className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#B99A5B] block mb-1">Email Address</label>
                  <input type="email" placeholder="eleanor@example.com" className="w-full bg-[#181818] border border-[#B99A5B]/30 p-3 text-sm text-[#F5F0E8] focus:outline-none" />
                </div>

                <div className="bg-[#181818] p-4 border border-[#B99A5B]/20 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#D8CBB8]">3 Nights × Deluxe King</span>
                    <span className="text-[#F5F0E8]">$1,140</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#D8CBB8]">Taxes & Resort Fee (12%)</span>
                    <span className="text-[#F5F0E8]">$136.80</span>
                  </div>
                  <div className="border-t border-[#B99A5B]/20 pt-2 flex justify-between font-serif text-sm font-bold text-[#B99A5B]">
                    <span>Total Estimate</span>
                    <span>$1,276.80</span>
                  </div>
                </div>

                <button
                  onClick={() => { setIsBookingOpen(false); showToast("Reservation request confirmed! Confirmation sent to email."); }}
                  className="w-full bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] py-4 text-xs tracking-[0.25em] uppercase font-bold transition-all"
                >
                  Confirm Reservation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {}
      <section className="py-24 bg-[#111111] border-t border-[#B99A5B]/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[#B99A5B] text-xs tracking-[0.3em] uppercase mb-3 block">Stay Connected</span>
          <h2 className="text-3xl font-serif font-light text-[#F5F0E8] mb-4">STAY IN THE KNOW</h2>
          <p className="text-[#D8CBB8] text-xs md:text-sm font-light mb-8">
            Be the first to hear about new experiences, seasonal offers and special events at Aurelia.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); showToast("Successfully subscribed to Aurelia Journal."); }} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-grow bg-[#181818] border border-[#B99A5B]/30 p-4 text-sm text-[#F5F0E8] focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {}
      <section className="relative py-32 bg-fixed bg-center bg-cover flex items-center justify-center text-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90')` }}>
        <div className="absolute inset-0 bg-[#111111]/85 backdrop-blur-xs" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F0E8] mb-8 uppercase tracking-wide">
            MAKE YOUR STAY SOMETHING TO REMEMBER.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto bg-[#B99A5B] hover:bg-[#a6864d] text-[#111111] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => scrollToSection('rooms')}
              className="w-full sm:w-auto border border-[#D8CBB8]/40 hover:border-[#B99A5B] text-[#F5F0E8] px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all"
            >
              Explore Rooms
            </button>
          </div>
        </div>
      </section>

      {}
      <footer className="bg-[#0c0c0c] border-t border-[#B99A5B]/20 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-serif tracking-[0.25em] text-[#F5F0E8] font-light">AURELIA</span>
            <span className="text-[9px] tracking-[0.4em] text-[#B99A5B] uppercase block">Grand Hotel</span>
            <p className="text-xs text-[#D8CBB8]/70 font-light leading-relaxed max-w-sm">
              “Stay beautifully. Experience everything.” An architectural masterpiece offering uncompromising luxury, warm hospitality, and timeless elegance.
            </p>
            <div className="flex space-x-4 pt-2 text-[#B99A5B]">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-[#F5F0E8] transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-[#F5F0E8] transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-[#F5F0E8] transition-colors" />
            </div>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-4 font-semibold">Hotel</h5>
            <ul className="space-y-2 text-xs text-[#D8CBB8] font-light">
              <li><button onClick={() => scrollToSection('rooms')} className="hover:text-[#B99A5B] transition-colors">Rooms</button></li>
              <li><button onClick={() => scrollToSection('rooms')} className="hover:text-[#B99A5B] transition-colors">Suites</button></li>
              <li><button onClick={() => scrollToSection('dining')} className="hover:text-[#B99A5B] transition-colors">Dining</button></li>
              <li><button onClick={() => scrollToSection('experiences')} className="hover:text-[#B99A5B] transition-colors">Spa & Wellness</button></li>
              <li><button onClick={() => scrollToSection('experiences')} className="hover:text-[#B99A5B] transition-colors">Experiences</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-4 font-semibold">About</h5>
            <ul className="space-y-2 text-xs text-[#D8CBB8] font-light">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-[#B99A5B] transition-colors">Our Story</button></li>
              <li><button onClick={() => scrollToSection('gallery')} className="hover:text-[#B99A5B] transition-colors">Gallery</button></li>
              <li><button onClick={() => showToast("Careers page opening...")} className="hover:text-[#B99A5B] transition-colors">Careers</button></li>
              <li><button onClick={() => scrollToSection('location')} className="hover:text-[#B99A5B] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#B99A5B] mb-4 font-semibold">Contact</h5>
            <ul className="space-y-2 text-xs text-[#D8CBB8] font-light">
              <li>{HOTEL_DATA.contact.phone}</li>
              <li>{HOTEL_DATA.contact.email}</li>
              <li className="leading-relaxed">{HOTEL_DATA.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#B99A5B]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#D8CBB8]/60 font-light">
          <p>© 2026 Aurelia Grand Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-[#B99A5B]">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#B99A5B]">Terms of Service</span>
            <span className="cursor-pointer hover:text-[#B99A5B]">Accessibility</span>
          </div>
        </div>
      </footer>

      {}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#111111]/95 backdrop-blur-md border-t border-[#B99A5B]/20 py-3 px-6 flex items-center justify-between lg:hidden">
        <a 
          href={`tel:${HOTEL_DATA.contact.phone}`}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B99A5B] font-semibold"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>
        <button 
          onClick={() => scrollToSection('location')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B99A5B] font-semibold"
        >
          <MapPin className="w-4 h-4" />
          <span>Directions</span>
        </button>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#B99A5B] text-[#111111] px-6 py-2.5 text-xs tracking-widest uppercase font-bold shadow-lg"
        >
          Book Now
        </button>
      </div>

    </div>
  );
}