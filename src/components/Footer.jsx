import { Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetTop = Math.max(0, elementTop - navHeight);

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-[#c6a55c]/10 pt-10 pb-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-serif text-foreground mb-8 italic tracking-tight">Aalayam Events</h3>
            <p className="text-foreground/40 leading-relaxed font-light mb-10 max-w-md">
              A symphony of light and emotion. We don't just capture images; we preserve the soul of your most cherished celebrations through an artistic lens.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/aalayam_studio', label: 'Instagram' },
                { icon: WhatsAppIcon, href: 'https://wa.me/916369150731', label: 'WhatsApp' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#0a0a0a] border border-[#c6a55c]/10 rounded-xl flex items-center justify-center text-[#c6a55c] hover:bg-[#c6a55c] hover:text-[#0f0f0f] transition-all duration-500 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a55c] font-black mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Portfolio', 'Pricing', 'Booking'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="group flex items-center gap-2 text-foreground/50 hover:text-foreground transition-all duration-300 font-light"
                  >
                    <span className="w-6 h-[1px] bg-[#c6a55c]/30 group-hover:w-10 group-hover:bg-[#c6a55c] transition-all duration-500" />
                    {item === 'Booking' ? 'Book a Session' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a55c] font-black mb-8">Contact</h4>
            <ul className="space-y-6">
              {[
                { icon: Mail, value: 'aalayamstudio818@gmail.com', href: 'mailto:aalayamstudio818@gmail.com' },
                { icon: Phone, value: '+91 63691 50731', href: 'tel:+916369150731' },
                { icon: MapPin, value: 'All over India', href: null },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[#0a0a0a] border border-[#c6a55c]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-[#c6a55c]/30 transition-colors">
                    <item.icon className="w-4 h-4 text-[#c6a55c]" />
                  </div>
                  <div className="pt-1">
                    {item.href ? (
                      <a href={item.href} className="text-foreground/50 hover:text-foreground transition-colors font-light text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-foreground/50 font-light text-sm">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c6a55c]/10 to-transparent mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-foreground/30 text-[10px] uppercase tracking-widest font-bold">
            <span>© {currentYear} Aalayam Studio</span>
            <span className="w-1 h-1 bg-[#c6a55c] rounded-full" />
            <span>Master Crafted</span>
          </div>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <button key={link} className="text-foreground/30 hover:text-[#c6a55c] transition-colors text-[10px] uppercase tracking-widest font-bold">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Background flare */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c6a55c]/5 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2 -z-10" />
    </footer>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.61 0 .35 5.25.35 11.7c0 2.06.54 4.08 1.56 5.87L0 24l6.63-1.73a11.65 11.65 0 0 0 5.43 1.38h.01c6.45 0 11.71-5.25 11.71-11.7 0-3.13-1.22-6.08-3.26-8.47ZM12.07 21.67h-.01a9.79 9.79 0 0 1-5-1.37l-.36-.21-3.94 1.03 1.05-3.83-.23-.39a9.74 9.74 0 0 1-1.5-5.2c0-5.39 4.4-9.77 9.8-9.77a9.72 9.72 0 0 1 6.92 2.86 9.66 9.66 0 0 1 2.86 6.9c0 5.4-4.39 9.78-9.59 9.78Zm5.36-7.35c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.3-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.29-1.42-.85-.76-1.43-1.7-1.6-1.98-.17-.3-.02-.45.13-.6.13-.12.29-.32.44-.48.15-.17.2-.3.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.57-.9-2.15-.24-.57-.49-.5-.66-.51h-.56c-.2 0-.52.07-.8.37-.27.3-1.03 1-1.03 2.44 0 1.43 1.05 2.82 1.2 3.02.15.2 2.07 3.16 5.02 4.43.7.3 1.25.49 1.68.62.7.22 1.33.2 1.83.12.56-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.38-.07-.13-.27-.2-.56-.35Z"
        fill="currentColor"
      />
    </svg>
  );
}
