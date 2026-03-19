import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef   = useRef(null);
  const bgRef        = useRef(null);
  const overlayRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const titleRef     = useRef(null);
  const subtitleRef  = useRef(null);
  const buttonsRef   = useRef(null);
  const scrollIndRef = useRef(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Master entrance timeline ──────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background — fade in from blurred/dark state
      tl.fromTo(bgRef.current,
        { opacity: 0, scale: 1.08, filter: 'blur(12px) brightness(0.4)' },
        { opacity: 1, scale: 1,    filter: 'blur(0px) brightness(1)',
          duration: 2.4, ease: 'power2.inOut' },
        0
      );

      // Overlay — soft cinematic fade
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out' },
        0.2
      );

      // 2. Eyebrow — fade + slide up
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.3
      );

      // 3. Main title — "Aalayam" from left, "Events" from right, meet center
      tl.fromTo('#hero-word-left',
        { x: -180, opacity: 0, filter: 'brightness(0.5)' },
        { x: 0,    opacity: 1, filter: 'brightness(1.18)',
          duration: 1.4, ease: 'power3.out',
          onComplete: () =>
            gsap.to('#hero-word-left', { filter: 'brightness(1)', duration: 1, ease: 'sine.inOut' }),
        },
        0.6
      );
      tl.fromTo('#hero-word-right',
        { x: 180,  opacity: 0, filter: 'brightness(0.5)' },
        { x: 0,    opacity: 1, filter: 'brightness(1.18)',
          duration: 1.4, ease: 'power3.out',
          onComplete: () =>
            gsap.to('#hero-word-right', { filter: 'brightness(1)', duration: 1, ease: 'sine.inOut' }),
        },
        0.6  // same start time — both arrive together
      );

      // 4. Subtitle — fade + blur to clear
      tl.fromTo(subtitleRef.current,
        { opacity: 0, filter: 'blur(8px)', y: 16 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.3 },
        0.9
      );

      // 5. Buttons — slide up + fade
      tl.fromTo(buttonsRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.1 },
        1.2
      );

      // Scroll indicator
      tl.fromTo(scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.8
      );

      // ── Parallax on scroll ────────────────────────────────────────────
      gsap.to(bgRef.current, {
        yPercent: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background image — parallax target */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')",
          transformOrigin: 'center top',
        }}
      />

      {/* Cinematic dark gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 45%, rgba(15,15,15,0.92) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl w-full">

        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="text-[#c6a55c] text-xs md:text-sm uppercase tracking-[0.3em] mb-6 block"
        >
          Premium Photography Services
        </span>

        {/* Main title — split words animate from opposite sides */}
        <h1
          className="font-serif text-5xl md:text-9xl text-[#c6a55c] mb-6 tracking-tighter leading-none italic flex items-baseline justify-center gap-[0.25em] flex-wrap"
        >
          <span id="hero-word-left"  style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}>Aalayam</span>
          <span id="hero-word-right" style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}>Events</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-foreground/80 mb-12 tracking-wide font-light max-w-2xl mx-auto"
          style={{ willChange: 'filter, opacity' }}
        >
          Capturing the soul of your most cherished celebrations with artistic
          precision and heart.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group relative bg-[#c6a55c] text-[#0f0f0f] px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#c6a55c]/30"
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
          >
            {/* Gold light sweep */}
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Explore Portfolio</span>
          </button>

          <button
            onClick={() => scrollToSection('booking')}
            className="group relative border border-[#c6a55c]/40 text-[#c6a55c] px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-black overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#c6a55c] hover:shadow-2xl hover:shadow-[#c6a55c]/15"
          >
            {/* Subtle fill sweep */}
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-[#c6a55c]/12 group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Book a Session</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#c6a55c]/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
