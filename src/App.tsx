import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Instagram, Facebook, MapPin, Phone, Clock, ChevronRight, Star, Award, Utensils, LogIn, LayoutDashboard, LogOut, CheckCircle, XCircle, Clock4, Mail, User } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { ChatBot } from './components/ChatBot';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Bar 79®', href: '/#bar79' },
    { name: 'Our Story', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.3em] text-amber-500 leading-none">PERRY'S</span>
          <span className="text-[8px] sm:text-[10px] tracking-[0.2em] text-zinc-400 font-sans mt-1 uppercase">Steakhouse & Grille</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-300 hover:text-amber-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {token ? (
            <Link to="/dashboard" className="bg-amber-600 text-white px-6 py-2 rounded-sm text-[11px] uppercase tracking-widest font-bold hover:bg-amber-700 transition-all shadow-lg flex items-center gap-2">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-zinc-800 text-white px-6 py-2 rounded-sm text-[11px] uppercase tracking-widest font-bold hover:bg-zinc-700 transition-all shadow-lg flex items-center gap-2">
              <LogIn size={14} /> Admin
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-amber-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col pt-24 px-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-zinc-100 border-b border-zinc-800 py-6 flex justify-between items-center group"
              >
                {link.name}
                <ChevronRight className="text-amber-500 group-hover:translate-x-2 transition-transform" />
              </a>
            ))}
            <div className="mt-auto pb-12 space-y-4">
              {token ? (
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-amber-600 text-white py-4 rounded-sm text-sm uppercase tracking-widest font-bold flex justify-center items-center gap-2">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-zinc-800 text-white py-4 rounded-sm text-sm uppercase tracking-widest font-bold flex justify-center items-center gap-2">
                  <LogIn size={18} /> Admin Login
                </Link>
              )}
              <div className="flex justify-center space-x-6 pt-6">
                <Instagram className="text-zinc-500" />
                <Facebook className="text-zinc-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000" 
          alt="Prime Steak" 
          className="w-full h-full object-cover brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-4 font-bold text-amber-500 border-b border-amber-500/30 pb-2">
            Rare and Well Done®
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif mb-6 leading-tight tracking-tight">
            Redefining <br /> <span className="italic text-amber-100">Dining</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience the award-winning steakhouse that remains true to its neighborhood butcher shop roots.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#menu" className="bg-amber-600 text-white px-10 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-700 transition-all w-full sm:w-auto shadow-2xl">
            View Menu
          </a>
          <a href="#about" className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
            Our Story
          </a>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white">Discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent"
        />
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = ['Signature Steaks', 'Chops & More', 'Bar 79 Bites', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState('Signature Steaks');

  const menuItems = {
    'Signature Steaks': [
      { name: '16 oz. Caramelized Prime Rib', price: '$59', desc: 'Reinventing what prime rib can be with our signature twist.' },
      { name: 'Filet Mignon', price: '$52', desc: 'Center-cut, perfectly seasoned and broiled to your preference.' },
      { name: 'Prime Ribeye', price: '$64', desc: 'Richly marbled and exceptionally flavorful.' },
      { name: 'Beef Wellington', price: '$48', desc: 'Tender filet wrapped in puff pastry with mushroom duxelles.' },
    ],
    'Chops & More': [
      { name: 'Famous Pork Chop Friday®', price: '$19', desc: 'Our legendary lunch special, slow-smoked and caramelized.' },
      { name: 'Herb-Crusted Lamb Chops', price: '$46', desc: 'Tender lamb with a savory herb crust and mint reduction.' },
      { name: 'Roasted Wild Red Snapper', price: '$42', desc: 'Freshly caught, roasted with seasonal herbs.' },
      { name: 'Turtle Gumbo', price: '$14', desc: 'A Perry\'s classic, rich and full of traditional flavor.' },
    ],
    'Bar 79 Bites': [
      { name: 'Escargot', price: '$16', desc: 'Classic preparation with garlic butter and herbs.' },
      { name: 'Social Hour Slider', price: '$9', desc: 'Available during Social Hour 79, Sun-Fri 4-6:30 PM.' },
      { name: 'Petite Bar Plates', price: '$12', desc: 'A variety of signature tastes in smaller portions.' },
    ],
    'Desserts': [
      { name: 'White Chocolate Cheesecake', price: '$14', desc: 'Creamy cheesecake with a white chocolate ganache.' },
      { name: 'Bananas Foster', price: '$16', desc: 'Flambéed tableside with brown sugar and rum.' },
      { name: 'Chocolate Crunch Tower', price: '$15', desc: 'Layers of chocolate mousse and hazelnut crunch.' },
    ]
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-24 bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Utensils className="mx-auto text-amber-500 mb-4" size={32} />
          <h2 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight">Award-Winning Menu</h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-light">From our butcher shop roots to your table, every cut is selected for quality and prepared with precision.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-8 py-3 rounded-sm text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all border ${activeCategory === cat ? 'bg-amber-600 border-amber-600 text-white' : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-x-16 gap-y-12"
        >
          {menuItems[activeCategory].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-lg sm:text-xl font-serif tracking-wide group-hover:text-amber-500 transition-colors">{item.name}</h3>
                <span className="text-amber-500 font-bold text-sm sm:text-base ml-4">{item.price}</span>
              </div>
              <div className="w-full h-px bg-zinc-800 group-hover:bg-amber-500/30 transition-colors mb-3"></div>
              <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed italic">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const highlights = [
    { icon: <Star />, title: 'Rare and Well Done®', desc: 'A dining experience redefined through quality and service.' },
    { icon: <Award />, title: 'Award-Winning', desc: 'Consistently recognized as one of the country\'s premier steakhouses.' },
    { icon: <Utensils />, title: 'Butcher Shop Roots', desc: 'Remaining true to our origins with top quality selection.' }
  ];

  return (
    <section className="py-20 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {highlights.map((h, i) => (
          <div key={i} className="text-center space-y-4">
            <div className="w-12 h-12 bg-amber-600/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              {React.cloneElement(h.icon as React.ReactElement, { size: 24 })}
            </div>
            <h4 className="text-lg font-serif tracking-widest text-zinc-100 uppercase">{h.title}</h4>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1550966842-2849a220277c?auto=format&fit=crop&q=80&w=1000" 
              alt="Steakhouse Interior" 
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-48 sm:h-48 bg-amber-600 flex items-center justify-center text-white text-center p-4 sm:p-8 shadow-2xl">
            <p className="font-serif italic text-sm sm:text-xl leading-tight">Founded in <br /> Houston, TX</p>
          </div>
        </div>
        
        <div className="lg:pl-12">
          <span className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">The Perry's Story</span>
          <h2 className="text-4xl sm:text-6xl font-serif text-zinc-100 mb-8 leading-tight tracking-tight">From Butcher Shop <br /> to <span className="italic text-amber-500">Fine Dining</span></h2>
          <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
            <p>
              Perry's has redefined dining with an experience that is truly Rare and Well Done®. Now one of the country's premier, award-winning steakhouses, Perry's remains true to its neighborhood butcher shop roots with top quality selection and service.
            </p>
            <p>
              What started as a modest meat market in Houston has evolved into a national destination for steak lovers, famous for our seven-finger-high Pork Chop and our signature Bar 79® experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! A confirmation email has been sent to your inbox.' });
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-serif text-zinc-100 mb-8 tracking-tight">Oak Brook</h2>
          <div className="space-y-10">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mr-4 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-100 mb-2">Location</h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">5 Oakbrook Center<br />Oak Brook, IL 60523</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mr-4 shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-100 mb-2">Contact</h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">630-571-1808<br />oakbrook@perryssteakhouse.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-amber-500 mr-4 shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-100 mb-2">Hours</h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Mon - Thu: 4pm - 10pm<br />
                  Fri: 10:30am - 10pm<br />
                  Sat: 4pm - 10pm<br />
                  Sun: 11am - 9pm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-zinc-950 p-8 sm:p-12 rounded-sm border border-zinc-800 shadow-2xl">
          <h3 className="text-2xl font-serif text-zinc-100 mb-8">Join Our Preferred Guest List</h3>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">First Name</label>
              <input 
                required
                type="text" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-sm p-4 focus:border-amber-500 outline-none transition-colors" 
                placeholder="Enter first name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Last Name</label>
              <input 
                required
                type="text" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-sm p-4 focus:border-amber-500 outline-none transition-colors" 
                placeholder="Enter last name" 
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-sm p-4 focus:border-amber-500 outline-none transition-colors" 
                placeholder="Enter email address" 
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Message / Special Request</label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-sm p-4 focus:border-amber-500 outline-none transition-colors" 
                placeholder="Tell us about your visit..." 
              />
            </div>
            <div className="sm:col-span-2">
              <button 
                disabled={loading}
                className="w-full bg-amber-600 text-white py-4 rounded-sm text-xs uppercase tracking-[0.3em] font-bold hover:bg-amber-700 transition-all shadow-xl mt-4 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit Request'}
              </button>
              {status.type && (
                <div className={`mt-6 p-4 rounded-sm text-sm flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/50' : 'bg-red-900/20 text-red-400 border border-red-900/50'}`}>
                  {status.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900 p-10 rounded-sm border border-zinc-800 shadow-2xl"
      >
        <div className="text-center mb-10">
          <span className="text-2xl font-serif font-bold tracking-[0.3em] text-amber-500 leading-none">PERRY'S</span>
          <h2 className="text-zinc-100 text-lg mt-4 font-light uppercase tracking-widest">Admin Access</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-sm p-4 pl-12 focus:border-amber-500 outline-none" 
                placeholder="admin" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Password</label>
            <div className="relative">
              <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-sm p-4 pl-12 focus:border-amber-500 outline-none" 
                placeholder="••••••••" 
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button 
            disabled={loading}
            className="w-full bg-amber-600 text-white py-4 rounded-sm text-xs uppercase tracking-[0.3em] font-bold hover:bg-amber-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        localStorage.removeItem('adminToken');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchBookings();
  }, [token]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const sendConfirmation = async (id: number) => {
    try {
      const response = await fetch(`/api/bookings/${id}/send-confirmation`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) alert('Confirmation email sent successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50';
      case 'cancelled': return 'text-red-400 bg-red-900/20 border-red-900/50';
      case 'complete': return 'text-amber-400 bg-amber-900/20 border-amber-900/50';
      default: return 'text-zinc-400 bg-zinc-800/50 border-zinc-800';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif text-zinc-100 mb-2">Booking Management</h1>
            <p className="text-zinc-500 text-sm font-light uppercase tracking-widest">Admin Dashboard</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading bookings...</div>
        ) : (
          <div className="grid gap-6">
            {bookings.length === 0 ? (
              <div className="bg-zinc-900 p-12 text-center rounded-sm border border-zinc-800 text-zinc-500 italic">
                No bookings found.
              </div>
            ) : (
              bookings.map((booking) => (
                <motion.div 
                  layout
                  key={booking.id} 
                  className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-8"
                >
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-serif text-zinc-100">{booking.first_name} {booking.last_name}</h3>
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Mail size={14} className="text-amber-500" /> {booking.email}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock4 size={14} className="text-amber-500" /> {new Date(booking.created_at).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-zinc-500 text-sm font-light italic bg-zinc-950/50 p-4 rounded-sm border border-zinc-800/50">
                      "{booking.message}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-48">
                    <button 
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      className="flex-1 bg-emerald-900/20 text-emerald-400 border border-emerald-900/50 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-emerald-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={14} /> Confirm
                    </button>
                    <button 
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      className="flex-1 bg-red-900/20 text-red-400 border border-red-900/50 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-red-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={14} /> Cancel
                    </button>
                    <button 
                      onClick={() => updateStatus(booking.id, 'complete')}
                      className="flex-1 bg-amber-900/20 text-amber-400 border border-amber-900/50 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-amber-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      <Star size={14} /> Complete
                    </button>
                    <button 
                      onClick={() => sendConfirmation(booking.id)}
                      className="flex-1 bg-zinc-800 text-zinc-300 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <Mail size={14} /> Send Email
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <MenuSection />
    <AboutSection />
    <ContactSection />
  </>
);

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-100 py-16 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-6">
              <span className="text-3xl font-serif font-bold tracking-[0.3em] text-amber-500 leading-none">PERRY'S</span>
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-sans mt-1 uppercase">Steakhouse & Grille</span>
            </div>
            <p className="text-zinc-500 text-xs tracking-widest uppercase">Rare and Well Done®</p>
          </div>
          
          <div className="flex space-x-10">
            <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors"><Facebook size={24} /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
          <a href="#" className="hover:text-zinc-300 transition-colors">Locations</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Gift Cards</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Employment</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Use</a>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-widest text-zinc-600">
          <p>&copy; 2024 Perry's Restaurants. All rights reserved.</p>
          <p>Designed for Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
