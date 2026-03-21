import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Send, Star, X } from 'lucide-react';
import { saveApprovedFeedback, shouldAutoPublishFeedback } from '@/services/feedbackService';

const initialFormState = {
  name: '',
  eventTitle: '',
  location: '',
  message: '',
  photoDataUrl: '',
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [fileName, setFileName] = useState('Upload Image');
  const fileInputRef = useRef(null);

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
      setFormData(initialFormState);
      setFileName('Upload Image');
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

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      updateField('photoDataUrl', '');
      setFileName('Upload Image');
      return;
    }
    setFileName(file.name);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      updateField('photoDataUrl', dataUrl);
    } catch {
      updateField('photoDataUrl', '');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name.trim(),
      event: formData.eventTitle.trim(),
      location: formData.location.trim(),
      text: formData.message.trim(),
      rating,
      image: formData.photoDataUrl,
    };

    if (!payload.name || !payload.event || !payload.location || !payload.text || !payload.image || rating < 1) return;

    if (shouldAutoPublishFeedback({ rating: payload.rating, message: payload.text })) {
      saveApprovedFeedback(payload);
    }

    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label="Send Your Feedback">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 mt-0.5 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#c6a55c]/25 bg-[#13100d] shadow-2xl shadow-black/60 sm:-translate-y-10">
        <div className="flex items-center justify-between border-b border-[#c6a55c]/15 px-4 py-3 sm:px-5 sm:py-3.5">
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
          <form id="feedback-form" className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Name</label>
              <input
                required
                type="text"
                placeholder="Priya & Arjun"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Event Type</label>
              <input
                required
                type="text"
                placeholder="Wedding Story"
                value={formData.eventTitle}
                onChange={(event) => updateField('eventTitle', event.target.value)}
                className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Location</label>
              <input
                required
                type="text"
                placeholder="Bangalore"
                value={formData.location}
                onChange={(event) => updateField('location', event.target.value)}
                className="w-full rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Upload Image</label>
              <input
                ref={fileInputRef}
                required
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-between rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-[11px] text-foreground/70 transition-colors hover:border-[#c6a55c]/45"
              >
                <span className="truncate pr-3">{fileName}</span>
                <span className="rounded-md bg-[#c6a55c]/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#c6a55c]">
                  Choose File
                </span>
              </button>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#c6a55c]/85">Your Feedback</label>
              <textarea
                required
                rows={2}
                placeholder="Your Feedback"
                value={formData.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="w-full resize-none rounded-lg border border-[#c6a55c]/20 bg-[#080808] px-3 py-2 text-xs text-foreground/85 outline-none transition-colors focus:border-[#c6a55c]/55"
              />
            </div>

            <div className="space-y-1">
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

            <button
              type="submit"
              className="mt-1 inline-flex w-full items-center justify-center gap-1.5 self-end rounded-xl bg-[#c6a55c] px-4 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#0f0f0f] shadow-[0_10px_22px_rgba(198,165,92,0.24)] transition-all duration-300 hover:bg-[#d3b46f] hover:shadow-[0_12px_26px_rgba(198,165,92,0.3)] sm:mt-5"
            >
              <span>Send Feedback</span>
              <Send className="h-3 w-3" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

