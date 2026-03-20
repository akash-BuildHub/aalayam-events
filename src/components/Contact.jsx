import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="min-h-screen flex items-start px-6 pt-8 md:pt-10 bg-[#0a0a0a]">
      <div className="section-shell max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-[1.25]"
          >
            Let's Start Your Story
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[1px] w-20 bg-[#c6a55c] mx-auto"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="space-y-7"
          >
            <div>
              <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-serif text-foreground mb-4">Inquiries & Consultations</motion.h3>
              <motion.p variants={itemVariants} className="text-foreground/50 leading-relaxed max-w-lg font-light">
                Every masterpiece begins with a conversation. Whether it's a grand celebration or an intimate portrait, we're here to translate your vision into timeless imagery.
              </motion.p>
            </div>

            {/* Contact Details */}
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'aalayamstudio818@gmail.com', href: 'mailto:aalayamstudio818@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 63691 50731', href: 'tel:+916369150731' },
                { icon: MapPin, label: 'Location', value: 'All over India', href: null },
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-[#0f0f0f] border border-[#c6a55c]/10 rounded-2xl flex items-center justify-center group-hover:border-[#c6a55c]/40 transition-all duration-500">
                    <item.icon className="w-4 h-4 text-[#c6a55c]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#c6a55c] font-bold mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-foreground hover:text-[#c6a55c] transition-colors font-light text-sm md:text-base">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-foreground font-light text-sm md:text-base">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Card / Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-auto md:h-[min(56vh,520px)] rounded-[2.5rem] overflow-hidden border border-[#c6a55c]/10 group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/20" />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#0f0f0f]/80 backdrop-blur-xl border border-[#c6a55c]/20 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif text-foreground mb-1">Aalayam Studio</h4>
                    <p className="text-[#c6a55c] text-[10px] uppercase tracking-widest font-bold">All over India</p>
                  </div>
                  <div className="w-12 h-12 bg-[#c6a55c] rounded-2xl flex items-center justify-center text-[#0f0f0f]">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-foreground/50 text-sm font-light mb-4 leading-relaxed">
                  Visit us for a private viewing of our signature collections and discuss your event in detail.
                </p>
                <a
                  href="https://www.instagram.com/aalayam_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c6a55c] text-xs font-bold tracking-widest uppercase group/link"
                >
                  Follow on Instagram <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c6a55c]/5 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#c6a55c]/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
