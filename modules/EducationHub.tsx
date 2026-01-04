
import React from 'react';
import { FAQ_DATA } from '../constants';
import { BookOpen, AlertCircle, HelpCircle, FileText, Gavel, Scale } from 'lucide-react';
import { UserRole } from '../types';

interface EducationHubProps {
  role: UserRole;
}

export const EducationHub: React.FC<EducationHubProps> = ({ role }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900">Your Property Recovery Resource</h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto">Everything you need to know about navigating insurance claims and public adjusting.</p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Advice Column */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-500" /> What NOT to say to your Insurer
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Avoid "Everything is fine"', text: 'Until a professional inspection is done, you may have hidden damage (mold, structural, roof).' },
                { title: 'Don\'t say "It was a pre-existing leak"', text: 'Wait for a professional assessment to determine the date of loss and cause.' },
                { title: 'Don\'t accept the first offer on the spot', text: 'Verbally agreeing can sometimes be interpreted as a settlement.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">!</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* This section is now exclusive to Public Adjusters */}
          {role === UserRole.ADJUSTER && (
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-left-4 duration-500">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Scale className="text-blue-500" /> Local Adjusting Statutes
              </h3>
              <div className="space-y-4">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <h4 className="font-bold text-sm">Fla. Stat. § 626.854</h4>
                   <p className="text-xs text-slate-500 mt-1 italic">Public Adjuster Professional Ethics and Conduct rules. Updated 2024.</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <h4 className="font-bold text-sm">Homeowner Claims Bill of Rights</h4>
                   <p className="text-xs text-slate-500 mt-1">Requires insurers to respond within 7 days of receiving your claim communication.</p>
                 </div>
                 <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:underline">
                   View All Relevant Statutes <BookOpen size={16} />
                 </button>
              </div>
            </section>
          )}
        </div>

        {/* FAQ Column */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <HelpCircle className="text-purple-500" /> Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {FAQ_DATA.map((faq, i) => (
                <details key={i} className="group border-b border-slate-100 pb-4">
                  <summary className="list-none cursor-pointer flex justify-between items-center">
                    <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform font-bold text-xl">↓</span>
                  </summary>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-900 to-blue-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <FileText className="absolute -right-4 -bottom-4 opacity-10 w-48 h-48" />
            <h3 className="text-xl font-bold mb-4">Immediate Mitigation Advice</h3>
            <p className="text-blue-100 text-sm mb-6">
              Your policy requires you to take reasonable steps to prevent further damage.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>Tarp leaking roofs immediately.</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>Shut off water mains if leaking.</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>Photograph everything before cleaning.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
