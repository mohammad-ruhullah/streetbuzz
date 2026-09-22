import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('New York');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('$25k – $50k');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService && !selectedServices.includes(preselectedService)) {
      setSelectedServices(prev => [...prev, preselectedService]);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const serviceOptions = [
    'Mobile OOH',
    'Experiential Marketing',
    'Street Activations',
    'Creative OOH',
    'Guerrilla Campaigns',
    'Brand Experiences',
  ];

  const budgetOptions = [
    'Under $25k',
    '$25k – $50k',
    '$50k – $100k',
    '$100k+',
  ];

  const toggleService = (srv: string) => {
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-md overflow-y-auto">
      <div
        id="campaign-modal-container"
        className="relative w-full max-w-2xl bg-[#F5F4EF] text-[#0A0A0A] p-6 sm:p-10 border border-[#0A0A0A] shadow-2xl my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F4EF] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-8">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#71717A] uppercase block mb-1">
                // STREETBUZZ BRIEF INTAKE
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0A0A0A]">
                START A CAMPAIGN.
              </h3>
              <p className="mt-2 text-sm text-[#71717A]">
                Tell us about your brand and what you want people to notice on the streets.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Brand & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                    Brand / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Studio"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#EAE8DF] border border-[#0A0A0A]/20 focus:border-[#0A0A0A] text-sm text-[#0A0A0A] placeholder-[#888] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#EAE8DF] border border-[#0A0A0A]/20 focus:border-[#0A0A0A] text-sm text-[#0A0A0A] placeholder-[#888] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Target City */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                  Target City / Market *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New York (SoHo / Flatiron / Williamsburg)"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#EAE8DF] border border-[#0A0A0A]/20 focus:border-[#0A0A0A] text-sm text-[#0A0A0A] placeholder-[#888] focus:outline-none"
                />
              </div>

              {/* Row 3: Desired Formats */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                  Desired Outdoor Formats (Select Multiple)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {serviceOptions.map(srv => {
                    const isChecked = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-2 text-xs font-mono font-bold text-left transition-all border ${
                          isChecked
                            ? 'bg-[#0A0A0A] text-[#CCFF00] border-[#0A0A0A]'
                            : 'bg-[#EAE8DF] text-[#0A0A0A] border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                        }`}
                      >
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Budget Range */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                  Campaign Budget Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-3 py-2 text-xs font-mono font-bold transition-all border text-center ${
                        budget === b
                          ? 'bg-[#CCFF00] text-[#0A0A0A] border-[#0A0A0A]'
                          : 'bg-[#EAE8DF] text-[#71717A] border-[#0A0A0A]/15 hover:border-[#0A0A0A]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Notes */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#0A0A0A] mb-2">
                  What do you want people to notice? (Brief details)
                </label>
                <textarea
                  rows={3}
                  placeholder="Campaign launch dates, primary visual concept, target demographic..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#EAE8DF] border border-[#0A0A0A]/20 focus:border-[#0A0A0A] text-sm text-[#0A0A0A] placeholder-[#888] focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A0A0A] text-[#F5F4EF] hover:bg-[#1a1a1a] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>SUBMIT CAMPAIGN BRIEF</span>
                  <ArrowRight size={16} className="text-[#CCFF00]" />
                </button>
                <p className="text-[11px] font-mono text-[#71717A] text-center mt-2">
                  Direct routing to hello@wearestreetbuzz.com • Expect response within 4 business hours
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#0A0A0A] text-[#CCFF00] mx-auto flex items-center justify-center mb-6">
              <Check size={32} />
            </div>

            <span className="text-xs font-mono font-bold tracking-widest text-[#71717A] uppercase block mb-2">
              BRIEF DISPATCHED
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#0A0A0A] tracking-tight mb-4">
              WE'RE READY TO MAKE NOISE.
            </h3>
            <p className="text-sm text-[#0A0A0A] max-w-md mx-auto leading-relaxed mb-8">
              Thank you, <span className="font-bold">{brandName}</span>. Your brief for{' '}
              <span className="font-bold">{city}</span> has been logged into our creative dispatch queue.
              Our strategy team will contact <span className="font-bold">{email}</span> shortly.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#0A0A0A] text-[#CCFF00] font-bold text-xs uppercase tracking-wider hover:bg-[#222] transition-colors"
            >
              RETURN TO SITE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
