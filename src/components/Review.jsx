import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getApprovedFeedback, onApprovedFeedbackUpdated } from '@/services/feedbackService';

function StarIcon({ className, style, forwardRef, fillRef }) {
  return (
    <svg
      ref={forwardRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="miter"
      />
      <path
        ref={fillRef}
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        fill="currentColor"
        opacity="0"
      />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya & Arjun',
    event: 'Wedding Story, Banglore',
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

const toTestimonialCard = (entry) => ({
  name: entry.name || 'Client Review',
  event: [entry.event, entry.location].filter(Boolean).join(', ') || 'Client Session',
  rating: Number(entry.rating) || 5,
  text: entry.text || '',
  image: entry.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
});

const getCardsPerSlide = (width) => {
  if (width < 768) return 1;
  if (width < 1100) return 2;
  return 3;
};

const splitIntoSlides = (items, size) => {
  if (!items.length) return [];
  const slides = [];
  for (let i = 0; i < items.length; i += size) slides.push(items.slice(i, i + size));
  return slides;
};

function StarRating({ count }) {
  const starRefs = useRef([]);
  const fillRefs = useRef([]);
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const stars = starRefs.current.filter(Boolean);
    const fills = fillRefs.current.filter(Boolean);
    if (!stars.length || !fills.length) return;

    // Initial state: outlined stars, no fill
    gsap.set(stars, { opacity: 0.35, scale: 0.7, filter: 'none' });
    gsap.set(fills, { opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' },
    });

    tl.to({}, { duration: 0.05 });

    stars.forEach((star, i) => {
      const isLast = i === stars.length - 1;

      if (isLast) {
        // 5th star: slightly slower, more dramatic finish
        tl.to(star, {
          opacity: 1,
          scale: 1.3,
          duration: 0.09,
          filter: 'drop-shadow(0 0 6px #c6a55c)',
        })
          .to(fills[i], { opacity: 1, duration: 0.18, ease: 'power2.out' }, '<')
          .to(star, {
            scale: 1.08,
            duration: 0.18,
            ease: 'elastic.out(1.2, 0.5)',
            filter: 'drop-shadow(0 0 10px #c6a55c) drop-shadow(0 0 20px #ffde8a)',
          })
          .to(star, {
            scale: 1,
            duration: 0.1,
            ease: 'sine.out',
            filter: 'drop-shadow(0 0 3px #c6a55c)',
          });
      } else {
        // Stars 1-4: faster sequential fill
        tl.to(star, {
          opacity: 1,
          scale: 1.16,
          duration: 0.06,
        })
          .to(fills[i], { opacity: 1, duration: 0.06, ease: 'power1.out' }, '<')
          .to(star, {
            scale: 1,
            duration: 0.06,
            ease: 'back.out(2)',
          });
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
          fillRef={(el) => (fillRefs.current[i] = el)}
          className="w-5 h-5 text-[#c6a55c]"
          style={{ filter: 'none' }}
        />
      ))}
    </div>
  );
}

export default function Review() {
  const [approvedTestimonials, setApprovedTestimonials] = useState(() =>
    getApprovedFeedback().map(toTestimonialCard)
  );
  const [cardsPerSlide, setCardsPerSlide] = useState(() =>
    typeof window === 'undefined' ? 3 : getCardsPerSlide(window.innerWidth)
  );
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => onApprovedFeedbackUpdated((items) => {
    setApprovedTestimonials(items.map(toTestimonialCard));
  }), []);

  const mergedTestimonials = useMemo(
    () => [...approvedTestimonials, ...testimonials],
    [approvedTestimonials]
  );
  const testimonialSlides = useMemo(
    () => splitIntoSlides(mergedTestimonials, cardsPerSlide),
    [mergedTestimonials, cardsPerSlide]
  );

  useEffect(() => {
    const onResize = () => setCardsPerSlide(getCardsPerSlide(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setActiveSlide((prev) => Math.min(prev, Math.max(0, testimonialSlides.length - 1)));
  }, [testimonialSlides.length]);

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
    <section className="allow-overflow-below review-warm-mode py-10 px-6 bg-[#0a0a0a] overflow-visible">
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

        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${activeSlide * 100}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {testimonialSlides.map((slide, slideIdx) => (
              <div key={slideIdx} className="w-full shrink-0 px-1">
                <div
                  className={`grid gap-10 ${
                    cardsPerSlide === 1
                      ? 'grid-cols-1'
                      : cardsPerSlide === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                  }`}
                >
                  {slide.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${slideIdx}-${index}`}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -5 }}
                      className="relative p-10 bg-[#0f0f0f] border border-[#c6a55c]/5 rounded-3xl transition-all duration-500 hover:border-[#c6a55c]/20 hover:shadow-2xl hover:shadow-[#c6a55c]/5 group"
                    >
                      <div className="absolute top-8 right-8 text-[#c6a55c]/10 group-hover:text-[#c6a55c]/20 transition-colors">
                        <Quote className="w-16 h-16" />
                      </div>

                      <StarRating count={testimonial.rating} />

                      <p className="text-foreground/70 mb-10 leading-relaxed relative z-10 font-light italic">
                        "{testimonial.text}"
                      </p>

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
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {testimonialSlides.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonialSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to reviews slide ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide
                    ? 'bg-[#c6a55c] shadow-[0_0_0_4px_rgba(198,165,92,0.2)]'
                    : 'bg-[#c6a55c]/35 hover:bg-[#c6a55c]/65'
                }`}
              />
            ))}
          </div>
        )}
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
