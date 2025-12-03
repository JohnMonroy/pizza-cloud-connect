import { MapPin, Phone, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
            Encuéntranos
          </span>
          <h2 className="section-title text-pizza-black">¿Dónde Estamos?</h2>
          <p className="section-subtitle">
            Visítanos o haz tu pedido por teléfono
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1 uppercase">Ubicación</h3>
                <p className="text-muted-foreground">
                  Calle Mayor 123, 28001 Madrid<br />
                  Junto a la Plaza Mayor
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1 uppercase">Teléfono</h3>
                <p className="text-muted-foreground mb-2">
                  Para pedidos y reservas
                </p>
                <a href="tel:+34912345678" className="text-primary font-bold text-xl hover:text-pizza-red-dark transition-colors">
                  +34 912 345 678
                </a>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-2 uppercase">Horario</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><span className="text-foreground font-medium">Lun - Jue:</span> 12:00 - 23:00</p>
                  <p><span className="text-foreground font-medium">Vie - Sáb:</span> 12:00 - 00:00</p>
                  <p><span className="text-foreground font-medium">Domingo:</span> 13:00 - 23:00</p>
                </div>
              </div>
            </div>

            <a 
              href="tel:+34912345678" 
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Hacer Pedido
            </a>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden h-[500px] border border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.4673842795396!2d-3.707398!3d40.415363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d40b0ed2f%3A0x4c27e0f7c6e0d0!2sPlaza%20Mayor%2C%20Madrid!5e0!3m2!1sen!2ses!4v1650000000000!5m2!1sen!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Pizza Hut"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;