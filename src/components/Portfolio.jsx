import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = [
  {
    id: 'Wedding',
    label: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525258974630-42ebee1c2e4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'Portrait',
    label: 'Portrait',
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'Street',
    label: 'Street',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'Brand',
    label: 'Brand',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'Travel',
    label: 'Travel',
    images: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop',
    ],
  },
];

// Per-category animation styles
const categoryAnimations = {
  Wedding: {
    // Title: slides in from the right
    titleFrom: { x: 140, opacity: 0, skewX: 10 },
    titleTo:   { x: 0,   opacity: 1, skewX: 0,  duration: 1.1, ease: 'power3.out' },
    // Images: flow in from the right, staggered
    imageFrom: (i) => ({ x: 280 + i * 30, opacity: 0, scale: 0.88 }),
    imageTo:   { x: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' },
    glowColor: 'rgba(229, 9, 20, 0.18)',
    accentColor: '#c6a55c',
  },
  Portrait: {
    // Title: drops from above with bounce
    titleFrom: { y: -100, opacity: 0, scale: 0.65 },
    titleTo:   { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(2)' },
    // Images: fall from above with slight rotation
    imageFrom: (i) => ({ y: -200 - i * 25, opacity: 0, rotation: -5 + i * 2 }),
    imageTo:   { y: 0, opacity: 1, rotation: 0, duration: 0.95, ease: 'elastic.out(1, 0.7)' },
    glowColor: 'rgba(139, 92, 246, 0.18)',
    accentColor: '#8b5cf6',
  },
  Street: {
    // Title: blasts in from the left with blur
    titleFrom: { x: -200, opacity: 0, skewX: -12, filter: 'blur(10px)' },
    titleTo:   { x: 0,   opacity: 1, skewX: 0,   filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' },
    // Images: burst up from below with alternating tilt
    imageFrom: (i) => ({ y: 250, opacity: 0, rotation: i % 2 === 0 ? 6 : -6, scale: 0.8 }),
    imageTo:   { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.75, ease: 'power4.out' },
    glowColor: 'rgba(34, 197, 94, 0.15)',
    accentColor: '#22c55e',
  },
  Brand: {
    // Title: clip-path reveal (curtain wipe)
    titleFrom: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    titleTo:   { clipPath: 'inset(0 0% 0 0)',   opacity: 1, duration: 1.3, ease: 'power2.inOut' },
    // Images: spin + zoom in
    imageFrom: (i) => ({ scale: 0.2, opacity: 0, rotation: 60 * (i % 2 === 0 ? 1 : -1) }),
    imageTo:   { scale: 1, opacity: 1, rotation: 0, duration: 0.85, ease: 'back.out(2.5)' },
    glowColor: 'rgba(245, 158, 11, 0.18)',
    accentColor: '#f59e0b',
  },
  Travel: {
    // Title: drifts up, letter-spacing collapses
    titleFrom: { y: 70, opacity: 0, letterSpacing: '0.6em' },
    titleTo:   { y: 0,  opacity: 1, letterSpacing: '0.05em', duration: 1.2, ease: 'power3.out' },
    // Images: alternating left/right parallax slide
    imageFrom: (i) => ({ x: i % 2 === 0 ? -260 : 260, opacity: 0, scale: 1.12 }),
    imageTo:   { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
    glowColor: 'rgba(14, 165, 233, 0.18)',
    accentColor: '#0ea5e9',
  },
};

function GalleryCategory({ category }) {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const trackRef   = useRef(null);
  const cardRefs   = useRef([]);
  const anim = categoryAnimations[category.id];

  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // let CSS handle mobile scrolling

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title   = titleRef.current;
      const track   = trackRef.current;
      const cards   = cardRefs.current.filter(Boolean);

      // How far the track needs to travel
      const getScrollDist = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.32;

      // 1 — Title entrance animation (plays as section enters viewport)
      gsap.fromTo(title, anim.titleFrom, {
        ...anim.titleTo,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2 — Pin the section + scrub the image track horizontally
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: () => -(getScrollDist()),
        ease: 'none',
      });

      // 3 — Card entrance animations staggered at section entry
      cards.forEach((card, i) => {
        gsap.fromTo(card, anim.imageFrom(i), {
          ...anim.imageTo,
          delay: i * 0.07,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="gallery-category-section"
      style={{
        '--glow-color':   anim.glowColor,
        '--accent-color': anim.accentColor,
      }}
    >
      <div className="gallery-bg-glow" />

      {/* Category title — animates in, then stays pinned to left while images scroll */}
      <div ref={titleRef} className="gallery-title-block">
        <h2 className="gallery-title-text">{category.label}</h2>
        <div className="gallery-title-line" style={{ background: anim.accentColor }} />
      </div>

      {/* Horizontal image strip */}
      <div className="gallery-track-viewport">
        <div ref={trackRef} className="gallery-image-track">
          {category.images.map((src, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="gallery-image-card"
            >
              <img src={src} alt={`${category.label} ${i + 1}`} loading="lazy" />
              <div className="gallery-card-overlay" />
              <span className="gallery-card-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // "Our Gallery" title entrance
      gsap.fromTo('.gallery-main-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-main-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      // Gold divider wipe
      gsap.fromTo('.gallery-main-divider',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-main-title',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="gallery-root" ref={rootRef}>
      <div className="gallery-header">
        <h2 className="gallery-main-title">Our Gallery</h2>
        <div className="gallery-main-divider" />
      </div>

      {portfolioData.map((cat, i) => (
        <GalleryCategory key={cat.id} category={cat} index={i} />
      ))}
    </section>
  );
}
