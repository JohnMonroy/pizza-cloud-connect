import { Instagram, Facebook, Twitter, Pizza, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pizza-black text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Pizza className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-black uppercase tracking-tight">
                  Pizza Hut
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Las mejores pizzas desde 1985. Ingredientes frescos y recetas tradicionales para los amantes de la pizza.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg uppercase mb-6">Enlaces</h3>
            <ul className="space-y-3">
              {['Inicio', 'Menú', 'Nosotros', 'Contacto'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg uppercase mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-primary-foreground/60 text-sm">
                  Calle Mayor 123<br />28001 Madrid
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-primary-foreground/60 text-sm">+34 912 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-primary-foreground/60 text-sm">info@pizzahut.es</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-bold text-lg uppercase mb-6">Horario</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-primary-foreground/60">
                <span>Lun - Jue</span>
                <span className="text-primary-foreground">12:00 - 23:00</span>
              </li>
              <li className="flex justify-between text-primary-foreground/60">
                <span>Vie - Sáb</span>
                <span className="text-primary-foreground">12:00 - 00:00</span>
              </li>
              <li className="flex justify-between text-primary-foreground/60">
                <span>Domingo</span>
                <span className="text-primary-foreground">13:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-primary-foreground/40">
              © {new Date().getFullYear()} Pizza Hut. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/40">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacidad</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Términos</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;