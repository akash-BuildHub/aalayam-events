const APPROVED_FEEDBACK_KEY = 'aalayam_approved_feedback_reviews_v1';
const FEEDBACK_UPDATED_EVENT = 'feedback:approved-updated';

const positiveKeywords = [
  'amazing',
  'awesome',
  'beautiful',
  'best',
  'excellent',
  'fantastic',
  'good',
  'great',
  'happy',
  'highly recommend',
  'love',
  'lovely',
  'outstanding',
  'perfect',
  'professional',
  'satisfied',
  'stunning',
  'superb',
  'wonderful',
];

const negativeKeywords = [
  'awful',
  'bad',
  'delay',
  'disappointed',
  'hate',
  'horrible',
  'issue',
  'late',
  'not good',
  'poor',
  'problem',
  'rude',
  'terrible',
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
  return Number(rating) >= 4 && isPositiveFeedback(message);
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
