import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ isOpen, title, sections = [], onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#c6a55c]/25 bg-[#13100d] shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-[#c6a55c]/15 px-5 py-4 sm:px-6">
          <h3 className="font-serif text-2xl italic text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#c6a55c]/25 p-2 text-[#c6a55c] transition-colors hover:bg-[#c6a55c]/10"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(85vh-76px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {sections.map((section, index) => (
            <section key={`${section.heading}-${index}`} className="mb-6 last:mb-0">
              <h4 className="mb-3 text-sm uppercase tracking-[0.22em] text-[#c6a55c]">{section.heading}</h4>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${index}-${paragraphIndex}`} className="mb-3 text-justify text-sm leading-5 text-foreground/80 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
