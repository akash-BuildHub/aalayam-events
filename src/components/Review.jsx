import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

function StarIcon({ className, style, forwardRef }) {
  return (
    <svg
      ref={forwardRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya & Arjun',
    event: 'Wedding Story, Mumbai',
    rating: 5,
    text: 'Aalayam Events captured our special day with such elegance and artistry. Every photo tells our story beautifully. The team was professional, creative, and made us feel comfortable throughout the day.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Rajesh Kumar',
    event: 'Brand Identity',
    rating: 5,
    text: 'Outstanding work on our corporate branding shoot. The attention to detail and creative vision exceeded our expectations. Highly professional and delivered on time.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Ananya Sharma',
    event: 'Portrait Session',
    rating: 5,
    text: 'The portrait session was an amazing experience. The photographer made me feel at ease and captured my personality perfectly. The final images are stunning!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Vikram & Meera',
    event: 'Destination, Goa',
    rating: 5,
    text: 'Our pre-wedding shoot in Goa was magical! The team scouted perfect locations and captured candid moments that we will cherish forever. Absolutely recommend!',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Deepa Patel',
    event: 'Family Portrait',
    rating: 5,
    text: 'Beautiful family portraits that capture the essence of our bond. The photographer was patient with our kids and the results are frame-worthy!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Rohan Verma',
    event: 'Fashion Special',
    rating: 5,
    text: 'Incredible creative direction and execution. The fashion shoot came out phenomenal with perfect lighting and composition. True professionals!',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  },
];

function StarRating({ count }) {
  const starRefs = useRef([]);
  const wrapRef  = useRef(null);

  useLayoutEffect(() => {
    const stars = starRefs.current.filter(Boolean);
    if (!stars.length) return;

    // Reset to dim state initially
    gsap.set(stars, { opacity: 0.15, scale: 0.7 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' },
    });

    stars.forEach((star, i) => {
      const isLast = i === stars.length - 1;

      if (isLast) {
        // 5th star — slow, dramatic build-up then a sustained radiant glow
        tl.to(star, { opacity: 0.6, scale: 1.0, duration: 0.35, ease: 'power1.in',
                       filter: 'drop-shadow(0 0 2px #c6a55c)' }, i * 0.13)
          // Brief dim flicker — feels like it's charging
          .to(star, { opacity: 0.2, scale: 0.9, filter: 'drop-shadow(0 0 0px #c6a55c)', duration: 0.25, ease: 'power2.in' })
          // Slow, weighty rise to full brightness
          .to(star, { opacity: 1, scale: 1.7, duration: 0.55, ease: 'power3.out',
                       filter: 'drop-shadow(0 0 12px #c6a55c) drop-shadow(0 0 28px #ffde8a)' })
          // Settle with a long elastic bounce — draws the eye
          .to(star, { scale: 1.25, duration: 0.65, ease: 'elastic.out(1.5, 0.45)',
                       filter: 'drop-shadow(0 0 8px #c6a55c) drop-shadow(0 0 18px #ffde8a)' })
          // Slow fade of glow — star stays larger than the rest
          .to(star, { scale: 1.15, filter: 'drop-shadow(0 0 5px #c6a55c)', duration: 0.5, ease: 'sine.out' });
      } else {
        // Stars 1-4 — quick sequential blink
        tl.to(star, { opacity: 1, scale: 1.25, duration: 0.18 }, i * 0.13)
          .to(star, { scale: 1,   duration: 0.22, ease: 'back.out(2)' });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 85%',
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="flex gap-1.5 mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon
          key={i}
          forwardRef={(el) => (starRefs.current[i] = el)}
          className="w-3.5 h-3.5 text-[#c6a55c]"
          style={{ filter: 'drop-shadow(0 0 0px #c6a55c)' }}
        />
      ))}
    </div>
  );
}

export default function Review() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="allow-overflow-below py-10 px-6 bg-[#0a0a0a] overflow-visible">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-8 italic"
          >
            Client Perspectives
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[1px] w-20 bg-[#c6a55c] mx-auto"
          />
        </div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative p-10 bg-[#0f0f0f] border border-[#c6a55c]/5 rounded-3xl transition-all duration-500 hover:border-[#c6a55c]/20 hover:shadow-2xl hover:shadow-[#c6a55c]/5 group"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-[#c6a55c]/10 group-hover:text-[#c6a55c]/20 transition-colors">
                <Quote className="w-16 h-16" />
              </div>

              {/* Rating */}
              <StarRating count={testimonial.rating} />

              {/* Testimonial Text */}
              <p className="text-foreground/70 mb-10 leading-relaxed relative z-10 font-light italic">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-5 pt-10 border-t border-[#c6a55c]/5">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#c6a55c]/20 group-hover:border-[#c6a55c]/50 transition-colors duration-500"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#c6a55c] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0f0f0f]" />
                  </div>
                </div>
                <div>
                  <div className="font-serif text-lg text-foreground mb-1 italic">{testimonial.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#c6a55c] font-bold">{testimonial.event}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Minimal missing component fix
function Check({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
