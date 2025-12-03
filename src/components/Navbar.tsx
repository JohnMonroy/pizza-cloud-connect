import { useState } from 'react';
import { Menu, X, Phone, Pizza, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#menu', label: 'Menú' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pizza-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Pizza className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black text-primary-foreground uppercase tracking-tight">
                Pizza Hut
              </span>
              <span className="text-xs text-primary-foreground/60 font-medium tracking-widest uppercase">
                Delivery
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm font-semibold text-primary-foreground/80 hover:text-accent uppercase tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="font-display text-sm font-semibold text-primary-foreground/80 hover:text-accent uppercase tracking-wide transition-colors duration-200"
            >
              Admin
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-lg font-bold uppercase text-sm tracking-wide hover:bg-accent/80 transition-all duration-300"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            <a
              href="tel:+34912345678"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wide hover:bg-pizza-red-light transition-all duration-300"
            >
              <Phone size={18} />
              <span>Pedir</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pizza-dark border-t border-primary-foreground/10 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-lg font-semibold text-primary-foreground/80 hover:text-accent py-2 uppercase"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="font-display text-lg font-semibold text-primary-foreground/80 hover:text-accent py-2 uppercase"
            >
              Admin
            </Link>
            <a
              href="tel:+34912345678"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-bold uppercase mt-2"
            >
              <Phone size={18} />
              <span>Pedir Ahora</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;