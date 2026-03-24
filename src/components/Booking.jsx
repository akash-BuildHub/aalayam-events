import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import { sendBookingEmail } from '../services/emailService';

export default function Booking() {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [serviceOpen, setServiceOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handlePickerTrigger = (ref) => {
    if (ref.current) {
      try {
        if (ref.current.showPicker) {
          ref.current.showPicker();
        } else {
          ref.current.focus();
        }
      } catch (err) {
        ref.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendBookingEmail(formData);

    if (result.success) {
      setSubmitStatus('success');
      setFormData({
        name: '', location: '', email: '', phone: '', service: '', date: '', time: '', message: ''
      });
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="booking" className="group/booking min-h-screen flex items-start px-6 pt-8 md:pt-10 bg-[#0f0f0f]">
      <div className="section-shell max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-foreground mb-6 italic leading-[1.25]"
          >
            Secure Your Session
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-[1px] w-20 bg-[#c6a55c] mx-auto"
          />
        </div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#0a0a0a] p-6 md:p-8 rounded-3xl border-2 border-[#d8bc78]/16 group-hover/booking:border-[#e7cd8a]/38 focus-within:border-[#e7cd8a]/45 relative shadow-2xl shadow-[#d8bc78]/6 transition-colors duration-400 min-h-[68vh] lg:min-h-[72vh]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#e7cd8a]/0 group-hover/booking:border-[#e7cd8a]/30 focus-within:border-[#e7cd8a]/36 transition-colors duration-400" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#c6a55c]/5 blur-3xl rounded-full" />

          <div className="grid md:grid-cols-2 gap-5 relative z-10">
            <div className="space-y-5">
              <motion.div variants={itemVariants} className="space-y-4 bg-[#0f0f0f]/35 border border-[#c6a55c]/10 rounded-2xl p-4 md:p-5">
                <div className="space-y-2">
                  <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex. Pugal"
                    className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 placeholder:text-foreground/20 font-light text-base"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="Ex. aalayamstudio818@gmail.com"
                    className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 placeholder:text-foreground/20 font-light text-base"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="Ex. +91 63691 50731"
                    className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 placeholder:text-foreground/20 font-light text-base"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 bg-[#0f0f0f]/35 border border-[#c6a55c]/10 rounded-2xl p-4 md:p-5">
                <div className="space-y-2">
                  <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Preferred Date</label>
                  <div className="relative cursor-pointer" onClick={() => handlePickerTrigger(dateInputRef)}>
                    <input
                      required
                      ref={dateInputRef}
                      type="date"
                      className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden text-base"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c6a55c]/50 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Preferred Time</label>
                  <div className="relative cursor-pointer" onClick={() => handlePickerTrigger(timeInputRef)}>
                    <input
                      required
                      ref={timeInputRef}
                      type="time"
                      className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden text-base"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                    <Clock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c6a55c]/50 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4 bg-[#0f0f0f]/35 border border-[#c6a55c]/10 rounded-2xl p-4 md:p-5">
              <div className="space-y-2">
                <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Location</label>
                <input
                  required
                  type="text"
                  placeholder="Ex. Chennai"
                  className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-300 placeholder:text-foreground/20 font-light text-base"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Shoot Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground text-left py-3.5 px-4 focus:outline-none flex justify-between items-center rounded-xl transition-all duration-300 text-base"
                  >
                    <span className={formData.service ? 'text-foreground' : 'text-foreground/20 font-light'}>
                      {formData.service ? formData.service.charAt(0).toUpperCase() + formData.service.slice(1) : 'Select Shoot Type'}
                    </span>
                    <div className={`transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-[#c6a55c]" />
                    </div>
                  </button>
                  {serviceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 bg-[#0a0a0a] border border-[#c6a55c]/10 mt-1 rounded-xl z-20 shadow-2xl overflow-hidden"
                    >
                      {[
                        ['wedding-coverage', 'Wedding Coverage'],
                        ['pre-wedding-shoot', 'Pre-Wedding Shoot'],
                        ['portrait-sessions', 'Portrait Sessions'],
                        ['maternity-baby-shoots', 'Maternity & Baby Shoots'],
                        ['event-coverage', 'Event Coverage'],
                        ['brand-commercial-shoots', 'Brand & Commercial Shoots'],
                        ['destination-shoots', 'Destination Shoots'],
                        ['custom-projects', 'Custom Projects']
                      ].map(([value, label]) => (
                        <div
                          key={value}
                          onClick={() => {
                            setFormData({ ...formData, service: label });
                            setServiceOpen(false);
                          }}
                          className="px-4 py-2.5 hover:bg-[#c6a55c]/10 cursor-pointer text-foreground/70 hover:text-[#c6a55c] text-sm transition-colors border-b border-[#c6a55c]/5 last:border-b-0"
                        >
                          {label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[#c6a55c] text-[11px] uppercase tracking-[0.18em] font-bold ml-1">Message & Vision</label>
                <textarea
                  placeholder="Tell us about your dream shoot..."
                  rows={9}
                  className="w-full bg-[#0f0f0f] border border-[#c6a55c]/10 focus:border-[#c6a55c] text-foreground rounded-xl p-4 focus:outline-none transition-all duration-300 placeholder:text-foreground/20 font-light resize-none text-base"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full ${isSubmitting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-[#c6a55c] text-[#0f0f0f] shadow-xl shadow-[#c6a55c]/10 hover:shadow-[#c6a55c]/20'} py-4 rounded-2xl text-xs uppercase tracking-[0.25em] font-black transition-all flex items-center justify-center gap-3 group`}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </motion.button>

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-red-500 text-sm font-medium p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  Failed to send request. Please check your connection and try again.
                </motion.div>
              )}
            </motion.div>
          </div>

          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              >
                <div className="absolute inset-0 cursor-pointer" onClick={() => setSubmitStatus(null)} />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-[#0f0f0f] border border-[#c6a55c]/20 p-8 md:p-12 rounded-3xl shadow-[0_0_80px_rgba(198,165,92,0.15)] max-w-sm w-full text-center relative overflow-hidden z-10"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c6a55c] to-transparent opacity-50" />
                  <div className="w-20 h-20 bg-[#c6a55c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#c6a55c]" />
                  </div>
                  <h3 className="text-3xl font-serif text-foreground mb-4 italic">Booking Successful</h3>
                  <p className="text-foreground/70 text-sm mb-10 font-light leading-relaxed">
                    Our team will contact you shortly to confirm the details.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    type="button"
                    className="w-full bg-[#c6a55c] text-[#0f0f0f] py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-black transition-all hover:bg-[#d4b46c] shadow-lg shadow-[#c6a55c]/20 hover:shadow-[#c6a55c]/40"
                  >
                    Done
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}


