import { motion } from 'framer-motion';
import { Camera, Users, Award } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="min-h-screen flex items-start px-6 pt-0 bg-[#0f0f0f]">
      <div className="section-shell max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">
          {/* Left: Photographer Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group lg:pr-6 lg:mt-6"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?q=80&w=1000&auto=format&fit=crop"
                alt="Photographer"
                className="w-full h-[min(82vh,800px)] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-80" />
            </div>

            {/* Decorative golden frame effect */}
            <div className="absolute -inset-4 border border-[#c6a55c]/20 rounded-2xl -z-10 transition-transform duration-500 group-hover:scale-105" />

          </motion.div>

          {/* Right: Story & Counters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="space-y-6 lg:-mt-8"
          >
            <div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-foreground mb-4 italic">
                <span>Crafting Timeless</span>
                <span className="block mt-3">Visual Stories</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-foreground/70 text-base md:text-lg leading-relaxed mb-4 font-light">
                At Aalayam Events, we believe every moment is a masterpiece waiting to be framed. With over a decade of devotion to the art of photography, we specialize in capturing the essence of human connection.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/70 text-base md:text-lg leading-relaxed font-light">
                Our aesthetic blends cinematic grandeur with intimate authenticity. We don't just take pictures; we document the emotions that define your most significant milestones.
              </motion.p>
            </div>

            {/* Experience Counters */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#c6a55c]/10">
              {[
                { icon: Camera, label: "Years Experience", value: "10+" },
                { icon: Users, label: "Happy Clients", value: "500+" },
                { icon: Award, label: "Awards Won", value: "15+" },
                { icon: Camera, label: "Events Covered", value: "1000+" }
              ].map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-4">
                  <div className="p-3 bg-[#c6a55c]/5 rounded-xl border border-[#c6a55c]/10 group-hover:bg-[#c6a55c]/10 transition-colors">
                    <stat.icon className="w-5 h-5 text-[#c6a55c]" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-serif text-[#c6a55c] mb-1">{stat.value}</div>
                    <div className="text-xs text-foreground/50 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
