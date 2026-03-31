// src/pages/LandingPage.tsx

import {
  Cat,
  ChevronLeft,
  ChevronRight,
  Dog,
  Facebook,
  Heart,
  Home,
  Instagram,
  LogIn,
  Mail,
  Menu,
  Phone,
  Scissors,
  Search,
  Shield,
  Star,
  Stethoscope,
  Twitter,
  UserPlus,
  Users,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

// Interfaces para props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

// Componente Button reutilizable
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  className = '',
  disabled = false 
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105 focus:ring-orange-400 shadow-md",
    secondary: "bg-teal-500 text-white hover:bg-opacity-90 hover:scale-105 focus:ring-teal-400",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-400"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

// Header Component
const Header: React.FC<{ onNavigateToLogin?: () => void; onNavigateToSignup?: () => void; onNavigateToHome?: () => void }> = ({ 
  onNavigateToLogin, 
  onNavigateToSignup,
  onNavigateToHome 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Servicios', 'Cómo Funciona', 'Sobre Nosotros', 'Contacto'];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={onNavigateToHome}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-800">PetCare</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-neutral-700 hover:text-orange-500 font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onNavigateToLogin}
            >
              <LogIn className="w-4 h-4" />
              Ingresar
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={onNavigateToSignup}
            >
              <UserPlus className="w-4 h-4" />
              Crear Cuenta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 py-4 bg-white rounded-2xl shadow-lg border border-neutral-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-4 px-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-neutral-700 hover:text-orange-500 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigateToLogin?.();
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  Ingresar
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigateToSignup?.();
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  Crear Cuenta
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

// Hero Section Component
const HeroSection: React.FC<{ onNavigateToHome?: () => void; onNavigateToSignup?: () => void }> = ({ 
  onNavigateToHome, 
  onNavigateToSignup 
}) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-neutral-800 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              La tranquilidad que mereces,{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                el cuidado que aman
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-neutral-600 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Conecta con cuidadores y paseadores de confianza cerca de ti. 
              Cuidado seguro, flexible y lleno de amor para tu mejor amigo.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={onNavigateToHome}
              >
                <Search className="w-5 h-5" />
                Buscar un Cuidador
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onNavigateToSignup}
              >
                <Heart className="w-5 h-5" />
                Conviértete en Cuidador
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">+4.9★</div>
                <div className="text-sm text-neutral-600">Opiniones felices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">24h</div>
                <div className="text-sm text-neutral-600">Respuesta rápida</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">+1.2k</div>
                <div className="text-sm text-neutral-600">Cuidadores</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative bg-gradient-to-br from-orange-100 to-teal-100 rounded-3xl p-8 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop" 
                alt="Persona feliz con su mascota"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-orange-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Star className="w-8 h-8 text-teal-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Busca",
      description: "Encuentra cuidadores cerca de ti con nuestros filtros avanzados."
    },
    {
      icon: Users,
      title: "Conecta", 
      description: "Revisa perfiles, lee reseñas y contacta de forma segura."
    },
    {
      icon: Shield,
      title: "Relájate",
      description: "Realiza tu reserva y disfruta de tu tiempo con total tranquilidad."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50" id="como-funciona">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            ¿Cómo funciona PetCare?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Tres simples pasos para encontrar el cuidador perfecto para tu mascota
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Carousel Component
const ServicesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      icon: Home,
      title: "Alojamiento de Mascotas",
      description: "Tu mascota se queda en casa del cuidador con todo el amor y atención que merece.",
      badge: null
    },
    {
      icon: Heart,
      title: "Cuidado a Domicilio", 
      description: "El cuidador visita tu casa para atender a tu mascota en su ambiente familiar.",
      badge: null
    },
    {
      icon: Dog,
      title: "Paseo de Perros",
      description: "Paseos personalizados para mantener a tu perro activo y feliz.",
      badge: null
    },
    {
      icon: Scissors,
      title: "Peluquería",
      description: "Servicios de grooming profesionales para que tu mascota luzca hermosa.",
      badge: "En Proceso"
    },
    {
      icon: Stethoscope,
      title: "Veterinario a Domicilio",
      description: "Consultas veterinarias en la comodidad de tu hogar.",
      badge: "En Proceso"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="py-16" id="servicios">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Una gama completa de servicios para el cuidado de tu mascota
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 p-12 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    {service.badge && (
                      <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4">{service.title}</h3>
                  <p className="text-neutral-600 mb-8 max-w-md mx-auto">{service.description}</p>
                  <Button variant="primary">
                    Ver Más Detalles
                  </Button>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-neutral-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Us Section
const AboutUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-teal-50" id="sobre-nosotros">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
              Nuestra Misión es el{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Bienestar Animal
              </span>
            </h2>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              En PetCare, creemos que cada mascota merece amor, cuidado y atención de calidad. 
              Nuestra plataforma nació del deseo de crear una comunidad segura y confiable 
              donde los dueños de mascotas puedan encontrar cuidadores apasionados y responsables.
            </p>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              Trabajamos incansablemente para verificar a cada cuidador, garantizar la seguridad 
              de todas las interacciones y brindar una experiencia excepcional tanto para las 
              mascotas como para sus familias humanas.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-neutral-600">Cuidadores Verificados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">2k+</div>
                <div className="text-sm text-neutral-600">Mascotas Felices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">98%</div>
                <div className="text-sm text-neutral-600">Satisfacción</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Placeholder */}
            <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            >
                <div className="relative bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                    {/* --- CÓDIGO ACTUALIZADO --- */}
                    <img 
                    src="https://i.postimg.cc/W3d0Bv7b/dog-playing-in-park.jpg"
                    alt="Perro feliz jugando con una pelota en el parque"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                    {/* --- FIN DEL CÓDIGO ACTUALIZADO --- */}
                    
                    {/* Floating Icons */}
                    <motion.div
                    className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    >
                    <Cat className="w-8 h-8 text-teal-500" />
                    </motion.div>
                    
                    <motion.div
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    >
                    <Dog className="w-8 h-8 text-orange-500" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-800" id="contacto">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes preguntas?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Visita nuestra sección de contacto o envíanos un mensaje. 
            ¡Estamos aquí para ayudarte!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              <Mail className="w-5 h-5" />
              Contactar
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-neutral-800">
              <Phone className="w-5 h-5" />
              Llamar
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' }
  ];

  const footerLinks = [
    { title: 'Servicios', href: '#servicios' },
    { title: 'Cómo Funciona', href: '#como-funciona' },
    { title: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { title: 'Contacto', href: '#contacto' },
    { title: 'Términos de Servicio', href: '#' },
    { title: 'Privacidad', href: '#' }
  ];

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">PetCare</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              La plataforma más confiable para conectar a las mascotas con 
              cuidadores amorosos y responsables.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <nav className="space-y-2">
              {footerLinks.slice(0, 4).map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="block text-neutral-400 hover:text-white transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <nav className="space-y-2">
              {footerLinks.slice(4).map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="block text-neutral-400 hover:text-white transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} PetCare. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // CAMBIO PRINCIPAL: Ahora navega a /home en lugar de /
  const handleNavigateToHome = () => navigate('/');
  const handleNavigateToLogin = () => navigate('/login');
  const handleNavigateToSignup = () => navigate('/register');

  return (
    <div className="min-h-screen">
      <Header 
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToSignup={handleNavigateToSignup}
        onNavigateToHome={handleNavigateToHome}
      />
      <main>
        <HeroSection 
          onNavigateToHome={handleNavigateToHome}
          onNavigateToSignup={handleNavigateToSignup}
        />
        <HowItWorksSection />
        <ServicesCarousel />
        <AboutUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
