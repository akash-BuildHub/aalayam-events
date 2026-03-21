import { useEffect, useState } from 'react';
import { CheckCircle2, Star, X } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isSubmitted) return;

    const timer = window.setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [isSubmitted, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Send Your Feedback">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 mt-4 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#c6a55c]/25 bg-[#13100d] shadow-2xl shadow-black/60 sm:mt-8">
        <div className="flex items-center justify-between border-b border-[#c6a55c]/15 px-5 py-4 sm:px-6">
          <h3 className="font-serif text-2xl italic text-foreground">Send Your Feedback</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#c6a55c]/25 p-2 text-[#c6a55c] transition-colors hover:bg-[#c6a55c]/10"
            aria-label="Close feedback modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c6a55c]/12">
              <CheckCircle2 className="h-10 w-10 text-[#c6a55c]" />
            </div>
            <p className="font-serif text-2xl italic text-foreground">Review Sent</p>
            <p className="text-sm text-foreground/70">Thank you for sharing your feedback.</p>
          </div>
        ) : (
          <>
            <form
              id="feedback-form"
              className="grid gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6"
              onSubmit={(event) => {
                event.preventDefault();
                setIsSubmitted(true);
              }}
            >
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Client Names</label>
                <input
                  type="text"
                  placeholder="Priya & Arjun"
                  className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Event Type / Title</label>
                <input
                  type="text"
                  placeholder="Wedding Story"
                  className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Location</label>
                <input
                  type="text"
                  placeholder="Mumbai"
                  className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Upload Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-[11px] text-foreground/70 file:mr-3 file:rounded-md file:border-0 file:bg-[#c6a55c]/15 file:px-2.5 file:py-1 file:text-[10px] file:uppercase file:tracking-[0.12em] file:text-[#c6a55c]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Review Message</label>
                <textarea
                  rows={3}
                  placeholder="Client feedback / review"
                  className="w-full resize-none rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Rating *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 text-[#c6a55c] transition-transform hover:scale-110"
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <Star className="h-5 w-5" fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
            </form>

            <div className="border-t border-[#c6a55c]/15 px-5 py-4 sm:px-6">
              <button
                type="submit"
                form="feedback-form"
                className="w-full rounded-lg border border-[#c6a55c]/45 bg-[#c6a55c]/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c6a55c] transition-colors hover:bg-[#c6a55c]/20"
              >
                Send Feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
