import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, User, Phone, Users, MessageSquare, Loader2 } from 'lucide-react';
import { submitRSVP, RSVPPayload } from '../services/rsvpService';

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPPayload>({
    guestName: '',
    phoneNumber: '',
    numberOfGuests: 1,
    attendance: 'attending',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.phoneNumber.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const result = await submitRSVP(formData);
      setIsSubmitting(false);

      if (result.success) {
        setIsSubmitted(true);
        setResponseMsg(result.message);

        // Gold Confetti Animation
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C8A85D', '#E2C779', '#FAF7F2', '#2C2C2C'],
        });
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      setIsSubmitting(false);
      setErrorMsg('Something went wrong. Please try submitting again.');
    }
  };

  return (
    <section id="rsvp-section" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]">
            <Heart className="w-4 h-4 fill-[#C8A85D]" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
              Kindly Respond
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-4">
            Will You Celebrate With Us?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-md mx-auto">
            Please respond by August 1st, 2027 so we can prepare for your arrival.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#C8A85D]/30 relative"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-sans tracking-wide border border-red-200 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Attendance Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <label
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.attendance === 'attending'
                        ? 'border-[#C8A85D] bg-[#FAF7F2] shadow-md text-[#2C2C2C]'
                        : 'border-stone-200 bg-white text-[#2C2C2C]/60 hover:border-[#C8A85D]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={formData.attendance === 'attending'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        formData.attendance === 'attending' ? 'text-[#C8A85D]' : 'text-stone-300'
                      }`}
                    />
                    <span className="font-serif text-lg font-medium">Accept with Joy</span>
                  </label>

                  <label
                    className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.attendance === 'declined'
                        ? 'border-[#C8A85D] bg-[#FAF7F2] shadow-md text-[#2C2C2C]'
                        : 'border-stone-200 bg-white text-[#2C2C2C]/60 hover:border-[#C8A85D]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="declined"
                      checked={formData.attendance === 'declined'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.attendance === 'declined' ? 'border-[#C8A85D]' : 'border-stone-300'
                      }`}
                    >
                      {formData.attendance === 'declined' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C8A85D]" />
                      )}
                    </span>
                    <span className="font-serif text-lg font-medium">Regretfully Decline</span>
                  </label>
                </div>

                {/* Guest Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                      Guest Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="guestName"
                        required
                        value={formData.guestName}
                        onChange={handleChange}
                        placeholder="e.g. Eleanor & James Vance"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                    Number of Guests Attending
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#C8A85D] absolute left-4 top-1/2 -translate-y-1/2" />
                    <select
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all appearance-none cursor-pointer"
                    >
                      <option value={1}>1 Guest (Just Me)</option>
                      <option value={2}>2 Guests (+ Plus One)</option>
                      <option value={3}>3 Guests (Family)</option>
                      <option value={4}>4 Guests (Family)</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* Message for the Couple */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#2C2C2C]/70 font-semibold mb-2">
                    Message for the Couple
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#C8A85D] absolute left-4 top-4" />
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share a warm wish, song request, or dietary notes..."
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:outline-none focus:border-[#C8A85D] focus:ring-1 focus:ring-[#C8A85D] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#2C2C2C] text-[#FAF7F2] font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-500 shadow-xl flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C8A85D]" />
                      <span>Sending RSVP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Response</span>
                      <Send className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border-2 border-[#C8A85D] flex items-center justify-center mb-6 text-[#C8A85D] shadow-lg">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-3">
                  Response Received
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#2C2C2C]/80 max-w-md mx-auto mb-8 leading-relaxed">
                  {responseMsg}
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[#C8A85D]/40 text-[#2C2C2C] font-sans text-xs uppercase tracking-widest hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Edit Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
