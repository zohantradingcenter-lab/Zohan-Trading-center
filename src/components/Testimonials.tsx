import React, { useState } from 'react';
import { Star, Quote, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { TESTIMONIALS, FAQ_LIST } from '../data/mockData';
import { FAQItem } from '../types';

interface TestimonialsProps {
  faqs?: FAQItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ faqs = FAQ_LIST }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-3">
            <Quote className="w-4 h-4" />
            <span>Reputation & Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            Client Experiences
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Read what overseas Pakistani investors, distinguished armed forces veterans, and commercial clients have to say about working with Khan Brothers & Builders.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Scope of Work */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-700 block mb-3">
                  {testimonial.propertyType}
                </span>

                {/* Quote */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                <h4 className="font-serif text-base font-bold text-navy-950">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-slate-600 font-medium">{testimonial.role}</p>
                <p className="text-xs text-gold-600 font-semibold mt-0.5">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 pt-16 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-600 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Questions & Answers</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-navy-950">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-slate-200/60 text-slate-700 shrink-0">
                    {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
