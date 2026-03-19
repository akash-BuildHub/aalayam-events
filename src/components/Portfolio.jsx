import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'Wedding', label: 'Wedding' },
  { id: 'Portrait', label: 'Portrait' },
  { id: 'Street', label: 'Street' },
  { id: 'Branding', label: 'Brand' },
  { id: 'Travel', label: 'Travel' },
];

const portfolioData = {
  Wedding: [
    { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1525258974630-42ebee1c2e4b?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop' },
  ],
  Portrait: [
    { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
  ],
  Street: [
    { image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=800&auto=format&fit=crop' },
  ],
  Branding: [
    { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop' },
  ],
  Travel: [
    { image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop' },
    { image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop' },
  ],
};



export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Wedding');
  const [activeIndex, setActiveIndex] = useState(2);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const items = portfolioData[activeCategory];

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    setIsChangingCategory(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setActiveIndex(2);
      setIsChangingCategory(false);
    }, 350);
  };

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    setActiveIndex(clamped);
    scrollToCard(clamped);
  };

  const scrollToCard = (index) => {
    if (containerRef.current && cardRefs.current[index]) {
      const container = containerRef.current;
      const card = cardRefs.current[index];
      const containerCenter = container.offsetWidth / 2;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      container.scrollTo({ left: cardCenter - containerCenter, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeCategory]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !cardRefs.current.length) return;
    const container = containerRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  }, []);

  return (
    <section id="portfolio" className="portfolio-cinema-section scroll-mt-8">
      {/* Background glow that follows active card */}
      <div className="portfolio-bg-glow" />

      <div className="portfolio-cinema-inner">
        {/* Header */}
        <motion.div
          className="portfolio-cinema-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="portfolio-cinema-title">Our Gallery</h2>
          <div className="portfolio-cinema-divider" />

          {/* Category Tabs */}
          <div className="portfolio-cinema-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`portfolio-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cinematic Slider */}
      <AnimatePresence mode="wait">
        {!isChangingCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="portfolio-slider-wrapper"
          >
            <div
              ref={containerRef}
              onScroll={handleScroll}
              className="portfolio-slider-track no-scrollbar"
            >
              {/* Spacer */}
              <div className="slider-spacer" />

              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const distance = Math.abs(index - activeIndex);
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.25;
                const scale = isActive ? 1 : distance === 1 ? 0.85 : 0.75;

                return (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => goTo(index)}
                    animate={{ scale, opacity }}
                    transition={{ type: "spring", stiffness: 180, damping: 22, mass: 1 }}
                    className={`cinema-card ${isActive ? 'active' : ''}`}
                  >
                    {/* Red glow behind active card */}
                    {isActive && <div className="card-glow-ring" />}

                    {/* Card Image */}
                    <div className="card-image-wrap">
                      <motion.img
                        src={item.image}
                        alt="Portfolio photograph"
                        className="card-image"
                        animate={{ scale: isActive ? 1.05 : 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 22 }}
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="card-gradient" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Spacer */}
              <div className="slider-spacer" />
            </div>

            {/* Arrow Controls */}
            <div className="portfolio-arrows">
              <button
                className="arrow-btn"
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="portfolio-dots">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`portfolio-dot ${i === activeIndex ? 'active' : ''}`}
                  />
                ))}
              </div>

              <button
                className="arrow-btn"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
