const APPROVED_FEEDBACK_KEY = 'aalayam_approved_feedback_reviews_v1';
const FEEDBACK_UPDATED_EVENT = 'feedback:approved-updated';

const positiveKeywords = [
  'amazing',
  'appreciate',
  'attentive',
  'authentic',
  'awesome',
  'brilliant',
  'beautiful',
  'best',
  'beyond expectations',
  'captured perfectly',
  'classy',
  'clean',
  'cooperative',
  'creative',
  'delightful',
  'dependable',
  'detailed',
  'easy to work with',
  'efficient',
  'excellent',
  'exceptional',
  'fantastic',
  'flawless',
  'friendly',
  'genuine',
  'good',
  'great',
  'helpful',
  'happy',
  'impressed',
  'incredible',
  'memorable',
  'neat',
  'on time',
  'organized',
  'highly recommend',
  'patient',
  'polite',
  'prompt',
  'quality',
  'quick delivery',
  'responsive',
  'reliable',
  'seamless',
  'smooth',
  'satisfied with service',
  'love',
  'lovely',
  'outstanding',
  'perfect',
  'phenomenal',
  'professional',
  'super',
  'supportive',
  'satisfied',
  'stunning',
  'superb',
  'top notch',
  'trustworthy',
  'value for money',
  'wonderful',
  'well managed',
  'well planned',
];

const negativeKeywords = [
  'annoyed',
  'average',
  'awful',
  'bad',
  'below average',
  'broken',
  'careless',
  'chaotic',
  'confusing',
  'costly',
  'did not like',
  'dirty',
  'disorganized',
  'delay',
  'delayed delivery',
  'did not deliver',
  'disappointed',
  'disappointing',
  'fake',
  'frustrating',
  'harsh',
  'hate',
  'horrible',
  'incomplete',
  'inconsistent',
  'issue',
  'lagging',
  'late',
  'low quality',
  'mediocre',
  'messy',
  'miscommunication',
  'missing',
  'not satisfied',
  'not worth',
  'overpriced',
  'not good',
  'poor',
  'rushed',
  'problem',
  'slow',
  'stressful',
  'unprofessional',
  'rude',
  'terrible',
  'very bad',
  'waste of money',
  'waste',
  'unhappy',
  'worst',
];

const normalize = (value) => (value || '').toLowerCase().trim();

const keywordScore = (text, keywords) =>
  keywords.reduce((score, keyword) => (text.includes(keyword) ? score + 1 : score), 0);

export function isPositiveFeedback(message) {
  const text = normalize(message);
  if (!text) return false;

  const positiveScore = keywordScore(text, positiveKeywords);
  const negativeScore = keywordScore(text, negativeKeywords);

  return positiveScore > 0 && positiveScore > negativeScore;
}

export function shouldAutoPublishFeedback({ rating, message }) {
  return Number(rating) === 5 && isPositiveFeedback(message);
}

export function getApprovedFeedback() {
  try {
    const raw = localStorage.getItem(APPROVED_FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveApprovedFeedback(feedback) {
  const current = getApprovedFeedback();
  const next = [{ ...feedback, id: Date.now() }, ...current].slice(0, 12);

  localStorage.setItem(APPROVED_FEEDBACK_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(FEEDBACK_UPDATED_EVENT));
}

export function onApprovedFeedbackUpdated(callback) {
  const handler = () => callback(getApprovedFeedback());
  const storageHandler = (event) => {
    if (event.key === APPROVED_FEEDBACK_KEY) handler();
  };

  window.addEventListener(FEEDBACK_UPDATED_EVENT, handler);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener(FEEDBACK_UPDATED_EVENT, handler);
    window.removeEventListener('storage', storageHandler);
  };
}
