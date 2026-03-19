import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Basic',
    price: '₹25,000',
    description: 'Ideal for capturing intimate moments and small family gatherings.',
    features: [
      '4 hours coverage',
      '200 edited photos',
      'Online gallery',
      '7-day delivery',
      'One photographer',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    price: '₹50,000',
    description: 'The perfect balance for weddings and comprehensive event coverage.',
    features: [
      '8 hours coverage',
      '400 edited photos',
      'Online gallery',
      'Photo album (30 pages)',
      '5-day delivery',
      'Two photographers',
      'Drone shots',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹90,000',
    description: 'The ultimate luxury experience for grand-scale celebrations.',
    features: [
      'Full day coverage',
      '600+ edited photos',
      'Online gallery',
      'Premium album (50 pages)',
      '3-day delivery',
      'Three photographers',
      'Drone shots',
      'Cinematic video',
      'Same-day highlights',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="pricing" className="min-h-screen flex items-start px-6 pt-8 md:pt-10 bg-[#0f0f0f]">
      <div className="section-shell max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-foreground mb-6 italic leading-[1.25]"
          >
            Pricing Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 text-sm md:text-base font-light mb-6 leading-[1.6]"
          >
            Choose the package that best suits your needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[1px] w-20 bg-[#c6a55c] mx-auto"
          />
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid lg:grid-cols-3 gap-4"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className={`relative group rounded-3xl p-6 transition-all duration-700 ${pkg.popular
                  ? 'bg-gradient-to-b from-[#c6a55c]/10 to-[#0a0a0a] border border-[#c6a55c]/40 shadow-2xl shadow-[#c6a55c]/5'
                  : 'bg-[#0a0a0a]/50 backdrop-blur-sm border border-[#c6a55c]/10 hover:border-[#c6a55c]/30'
                }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-6 bg-[#c6a55c] text-[#0f0f0f] px-4 py-1.5 rounded-b-xl text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">
                  Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2 italic">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-serif text-[#c6a55c]">{pkg.price}</span>
                </div>
                <p className="text-foreground/40 text-sm leading-relaxed font-light italic">{pkg.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-center gap-3 group/item"
                  >
                    <div className="p-1 bg-[#c6a55c]/10 rounded-full border border-[#c6a55c]/20 group-hover/item:bg-[#c6a55c] transition-colors duration-300">
                      <Check className="w-3 h-3 text-[#c6a55c] group-hover/item:text-[#0f0f0f]" />
                    </div>
                    <span className="text-foreground/70 text-xs font-light tracking-wide">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('booking')}
                className={`w-full py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.28em] font-black transition-all duration-500 overflow-hidden relative group/btn ${pkg.popular
                    ? 'bg-[#c6a55c] text-[#0f0f0f] shadow-xl shadow-[#c6a55c]/20 hover:shadow-[#c6a55c]/40'
                    : 'bg-transparent border-2 border-[#c6a55c]/30 text-[#c6a55c] hover:border-[#c6a55c] hover:bg-[#c6a55c] hover:text-[#0f0f0f]'
                  }`}
              >
                <span className="relative z-10 transition-colors duration-300">Book Now</span>
                {pkg.popular && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                )}
              </button>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-7 right-7 h-[1px] bg-gradient-to-r from-transparent via-[#c6a55c]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
