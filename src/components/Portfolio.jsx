import { useRef, useLayoutEffect, useState, useEffect } from 'react';
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
    id: 'Brand',
    label: 'Brand',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 'TravelStreet',
    label: 'Travel and Street',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop',
    ],
  },
];

const categoryAnimations = {
  Wedding: {
    titleFrom: { x: 140, opacity: 0, skewX: 10 },
    titleTo: { x: 0, opacity: 1, skewX: 0, duration: 1.1, ease: 'power3.out' },
    imageFrom: (i) => ({ x: 280 + i * 30, opacity: 0, scale: 0.88 }),
    imageTo: { x: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out' },
    glowColor: 'rgba(229, 9, 20, 0.18)',
    accentColor: '#c6a55c',
  },
  Portrait: {
    titleFrom: { y: -100, opacity: 0, scale: 0.65 },
    titleTo: { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(2)' },
    imageFrom: (i) => ({ y: -200 - i * 25, opacity: 0, rotation: -5 + i * 2 }),
    imageTo: { y: 0, opacity: 1, rotation: 0, duration: 0.95, ease: 'elastic.out(1, 0.7)' },
    glowColor: 'rgba(139, 92, 246, 0.18)',
    accentColor: '#8b5cf6',
  },
  TravelStreet: {
    titleFrom: { x: -200, opacity: 0, skewX: -12, filter: 'blur(10px)' },
    titleTo: { x: 0, opacity: 1, skewX: 0, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' },
    imageFrom: (i) => ({ y: 250, opacity: 0, rotation: i % 2 === 0 ? 6 : -6, scale: 0.8 }),
    imageTo: { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.75, ease: 'power4.out' },
    glowColor: 'rgba(14, 165, 233, 0.18)',
    accentColor: '#0ea5e9',
  },
  Brand: {
    titleFrom: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    titleTo: { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.3, ease: 'power2.inOut' },
    imageFrom: (i) => ({ scale: 0.2, opacity: 0, rotation: 60 * (i % 2 === 0 ? 1 : -1) }),
    imageTo: { scale: 1, opacity: 1, rotation: 0, duration: 0.85, ease: 'back.out(2.5)' },
    glowColor: 'rgba(245, 158, 11, 0.18)',
    accentColor: '#f59e0b',
  },
};

function GalleryCategory({ category }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const brandSlotRefs = useRef([]);
  const brandLayerRefs = useRef([]);
  const travelImageRef = useRef(null);
  const travelContentRef = useRef(null);
  const travelStackRefs = useRef([]);
  const anim = categoryAnimations[category.id];
  const isPortrait = category.id === 'Portrait';
  const isBrand = category.id === 'Brand';
  const isTravelStreet = category.id === 'TravelStreet';
  const travelImages = category.images.slice(0, 5);
  const [travelOrder, setTravelOrder] = useState(() =>
    isTravelStreet ? travelImages.map((_, i) => i) : []
  );
  const [isCyclingTravel, setIsCyclingTravel] = useState(false);

  useEffect(() => {
    if (!isTravelStreet) return;
    setTravelOrder(travelImages.map((_, i) => i));
  }, [isTravelStreet, category.images]);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter(Boolean);
      const brandSlots = brandSlotRefs.current.filter(Boolean);
      const brandLayersBySlot = brandLayerRefs.current.map((slotLayers = []) => slotLayers.filter(Boolean));
      const travelImage = travelImageRef.current;
      const travelContent = travelContentRef.current;

      if (isBrand) {
        const visibleSlots = Math.min(2, Math.max(1, category.images.length));

        gsap.fromTo(
          title,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        brandLayersBySlot.forEach((slotLayers) => {
          slotLayers.forEach((layer, idx) => {
            gsap.set(layer, {
              rotationX: idx === 0 ? 0 : 86,
              y: idx === 0 ? 0 : 18,
              scale: idx === 0 ? 1 : 0.96,
              opacity: idx === 0 ? 1 : 0,
              zIndex: 30 - idx,
              transformPerspective: 1200,
              transformOrigin: 'top center',
            });
          });
        });

        // Initial placement below final position; first scroll brings cards up into place.
        gsap.set(brandSlots, { y: 64, opacity: 0.88 });

        const transitionCount = Math.max(0, category.images.length - visibleSlots);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(1200, transitionCount * 520)}`,
            scrub: 1.4,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: cards move up and settle into exact position.
        tl.to(brandSlots, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.08,
        }, 0);

        const flipStart = 0.9;

        for (let t = 0; t < transitionCount; t += 1) {
          const imageIdx = t + visibleSlots;
          const slot = imageIdx % visibleSlots;
          const layerLevel = Math.floor(imageIdx / visibleSlots);
          const currentLayer = brandLayersBySlot[slot]?.[layerLevel - 1];
          const nextLayer = brandLayersBySlot[slot]?.[layerLevel];
          const at = flipStart + t * 0.95;

          if (currentLayer && nextLayer) {
            tl.to(currentLayer, {
              rotationX: -92,
              y: -18,
              scale: 0.92,
              opacity: 0,
              duration: 0.55,
              ease: 'power2.inOut',
            }, at)
              .to(nextLayer, {
                rotationX: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
              }, at + 0.14);
          }
        }

        gsap.to(brandSlots, {
          y: -10,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        return;
      }

      if (isTravelStreet) {
        gsap.fromTo(
          travelImage,
          { y: 120, opacity: 0, scale: 0.86, rotate: -2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          travelContent,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(travelImage, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        return;
      }

      const getDefaultScrollDist = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.32;
      const getPortraitScrollDist = () => {
        const viewport = track?.parentElement;
        if (!track || !viewport) return 0;

        const maxDist = Math.max(0, track.scrollWidth - viewport.clientWidth);
        const lastCard = cards[cards.length - 1];
        if (!lastCard) return maxDist;

        const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth * 0.5;
        const desiredDist = lastCardCenter - viewport.clientWidth * 0.5;
        // Stop exactly when the last card reaches viewport center.
        if (!Number.isFinite(desiredDist)) return maxDist;
        return Math.max(0, Math.min(maxDist, desiredDist));
      };
      const getScrollDist = () => (isPortrait ? getPortraitScrollDist() : getDefaultScrollDist());

      if (isPortrait) {
        gsap.fromTo(title, { y: -70, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      } else {
        gsap.fromTo(title, anim.titleFrom, {
          ...anim.titleTo,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      const updatePortraitCards = () => {
        const viewportCenter = window.innerWidth * 0.5;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width * 0.5;
          const delta = cardCenter - viewportCenter;
          const distanceRatio = Math.min(Math.abs(delta) / (window.innerWidth * 0.42), 1);
          const side = delta >= 0 ? 1 : -1;

          gsap.set(card, {
            scale: gsap.utils.interpolate(1.05, 0.74, distanceRatio),
            opacity: gsap.utils.interpolate(1, 0.28, distanceRatio),
            rotationY: side * gsap.utils.interpolate(0, 20, distanceRatio),
            z: gsap.utils.interpolate(0, -220, distanceRatio),
            filter: `brightness(${gsap.utils.interpolate(1, 0.55, distanceRatio)})`,
            transformOrigin: 'center center',
          });
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDist()}`,
          scrub: isPortrait ? true : 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          onUpdate: (self) => {
            if (isPortrait) {
              updatePortraitCards();
              // Hard-clamp: prevent track from drifting past last-card-at-center position
              if (self.progress >= 1) {
                gsap.set(track, { x: -getPortraitScrollDist() });
                updatePortraitCards();
              }
            }
          },
          onRefresh: () => {
            if (isPortrait) updatePortraitCards();
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
      });

      if (isPortrait) {
        gsap.fromTo(
          cards,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            onComplete: updatePortraitCards,
          }
        );

        updatePortraitCards();
      } else {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [anim, isPortrait, isBrand, isTravelStreet, category.images.length]);

  const cycleTravelImage = () => {
    if (!isTravelStreet || isCyclingTravel || travelOrder.length < 2) return;

    const topCard = travelStackRefs.current[0];
    if (!topCard) return;

    setIsCyclingTravel(true);

    gsap.to(topCard, {
      x: -68,
      y: 20,
      scale: 0.9,
      rotation: -15,
      opacity: 0.78,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setTravelOrder((prev) => [...prev.slice(1), prev[0]]);
        gsap.set(topCard, { clearProps: 'all' });
        setIsCyclingTravel(false);

        requestAnimationFrame(() => {
          const newTop = travelStackRefs.current[0];
          if (!newTop) return;

          gsap.fromTo(
            newTop,
            { y: 8, scale: 0.96, opacity: 0.92 },
            { y: 0, scale: 1, opacity: 1, duration: 0.16, ease: 'power2.out' }
          );
        });
      },
    });
  };

  const getTravelStackCardStyle = (stackPos) => {
    const presets = [
      { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
      { x: 48, y: 4, scale: 0.95, rotate: 2.5, opacity: 0.92 },
      { x: -48, y: 7, scale: 0.92, rotate: -2.5, opacity: 0.86 },
      { x: 70, y: 11, scale: 0.88, rotate: 3.5, opacity: 0.8 },
      { x: -70, y: 14, scale: 0.85, rotate: -3.5, opacity: 0.74 },
    ];

    const base = presets[stackPos] || {
      x: stackPos % 2 === 0 ? -80 : 80,
      y: 14 + stackPos * 2,
      scale: Math.max(0.78, 0.86 - stackPos * 0.02),
      rotate: stackPos % 2 === 0 ? -4 : 4,
      opacity: Math.max(0.48, 0.68 - stackPos * 0.08),
    };

    return {
      zIndex: 20 - stackPos,
      transform: `translate(${base.x}px, ${base.y}px) scale(${base.scale}) rotate(${base.rotate}deg)`,
      opacity: base.opacity,
      pointerEvents: stackPos === 0 ? 'auto' : 'none',
    };
  };

  if (isTravelStreet) {
    return (
      <section
        ref={sectionRef}
        className="gallery-category-section travel-street-section"
        style={{
          '--glow-color': anim.glowColor,
          '--accent-color': anim.accentColor,
        }}
      >
        <div className="gallery-bg-glow" />

        <div className="travel-street-layout">
          <div ref={travelContentRef} className="travel-street-content">
            <h2 className="travel-street-title">
              Street <span className="travel-street-amp">&amp;</span> Travel
            </h2>
            <div className="travel-street-title-line" />
            <p className="travel-street-text">
              I capture genuine moments you can feel and hold onto long after they have passed, turning them into lasting memories filled with emotion, meaning, and life, preserving the little details and natural connections that make every moment truly unforgettable.
            </p>
          </div>

          <div className="travel-street-media">
            <div
              ref={travelImageRef}
              className="travel-street-stack"
              onClick={cycleTravelImage}
              role="button"
              aria-label="Cycle street and travel images"
            >
              {travelOrder.map((imgIdx, stackPos) => (
                <img
                  key={`${imgIdx}-${stackPos}`}
                  ref={(el) => (travelStackRefs.current[stackPos] = el)}
                  src={travelImages[imgIdx]}
                  alt={`Street and travel visual ${imgIdx + 1}`}
                  className="travel-street-image travel-street-stack-card"
                  style={getTravelStackCardStyle(stackPos)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isBrand) {
    const visibleSlots = Math.min(2, Math.max(1, category.images.length));
    const brandColumns = Array.from({ length: visibleSlots }, (_, slot) =>
      category.images.filter((_, imgIdx) => imgIdx % visibleSlots === slot)
    );

    return (
      <section
        ref={sectionRef}
        className="gallery-category-section brand-flip-section"
        style={{
          '--glow-color': anim.glowColor,
          '--accent-color': anim.accentColor,
        }}
      >
        <div className="gallery-bg-glow" />

        <div className="brand-flip-layout">
          <div className="brand-flip-cards">
            {brandColumns.map((slotImages, slotIdx) => (
              <div
                key={slotIdx}
                ref={(el) => {
                  brandSlotRefs.current[slotIdx] = el;
                }}
                className="brand-flip-slot"
              >
                {slotImages.map((src, layerIdx) => (
                  <div
                    key={`${slotIdx}-${layerIdx}`}
                    ref={(el) => {
                      if (!brandLayerRefs.current[slotIdx]) brandLayerRefs.current[slotIdx] = [];
                      brandLayerRefs.current[slotIdx][layerIdx] = el;
                    }}
                    className="brand-flip-card-layer"
                  >
                    <img src={src} alt={`Brand ${slotIdx + 1}-${layerIdx + 1}`} loading="lazy" />
                    <div className="gallery-card-overlay" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div ref={titleRef} className="brand-flip-title-wrap">
            <h2 className="gallery-title-text brand-stacked-title" aria-label="Branding">
              {'BRANDING'.split('').map((ch, idx) => (
                <span key={`${ch}-${idx}`}>{ch}</span>
              ))}
            </h2>
            <div className="gallery-title-line" style={{ background: anim.accentColor }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`gallery-category-section ${isPortrait ? 'portrait-mode' : ''}`}
      style={{
        '--glow-color': anim.glowColor,
        '--accent-color': anim.accentColor,
      }}
    >
      <div className="gallery-bg-glow" />

      <div ref={titleRef} className={`gallery-title-block ${isPortrait ? 'portrait-title-top' : ''}`}>
        <h2 className="gallery-title-text">{category.label}</h2>
        <div className="gallery-title-line" style={{ background: anim.accentColor }} />
      </div>

      <div className={`gallery-track-viewport ${isPortrait ? 'portrait-track-viewport' : ''}`}>
        <div ref={trackRef} className={`gallery-image-track ${isPortrait ? 'portrait-image-track' : ''}`}>
          {category.images.map((src, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`gallery-image-card ${isPortrait ? 'portrait-image-card' : ''}`}
            >
              <img src={src} alt={`${category.label} ${i + 1}`} loading="lazy" />
              <div className="gallery-card-overlay" />
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
      gsap.fromTo(
        '.gallery-main-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-main-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.gallery-main-divider',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
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
