import { useState } from 'react';

const steps = ['Account', 'Camper Details', 'Select Weeks', 'Required Forms', 'Payment', 'Confirmation'];

const weekData = [
  { id: 1, name: 'Week 1', dates: 'Jun 21 – Jun 26', types: ['overnight', 'day', 'older', 'cit'] },
  { id: 2, name: 'Week 2', dates: 'Jun 28 – Jul 3', types: ['overnight', 'day', 'cit'] },
  { id: 3, name: 'Week 3', dates: 'Jul 5 – Jul 10', types: ['overnight', 'day', 'cit'] },
  { id: 4, name: 'Week 4', dates: 'Jul 12 – Jul 17', types: ['overnight', 'day', 'older'] },
  { id: 5, name: 'Week 5', dates: 'Jul 19 – Jul 24', types: ['overnight', 'day'] },
  { id: 6, name: 'Week 6', dates: 'Jul 26 – Jul 31', types: ['overnight', 'day'] },
  { id: 7, name: 'Week 7', dates: 'Aug 2 – Aug 7', types: ['overnight', 'day'] },
];

const camperTypes = [
  { key: 'overnight', label: 'Overnight Camper', desc: 'Full week, stay in cabin', pricePerWeek: 1200 },
  { key: 'day', label: 'Day Camper', desc: 'Drop-off & pick-up daily', pricePerDay: 75 },
  { key: 'older', label: 'Older Camper', desc: 'Ages 14–16, Weeks 1 & 4', pricePerWeek: 1200 },
  { key: 'cit', label: 'CIT', desc: 'Counselor in Training, Weeks 1–3', pricePerWeek: 800 },
];

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const blankCamper = { firstName: '', lastName: '', dob: '', gender: '', allergies: '', medical: '' };

function calcPrice(type, selectedWeeks, selectedDays) {
  const ct = camperTypes.find(t => t.key === type);
  if (type === 'day') {
    const totalDays = Object.values(selectedDays).reduce((sum, days) => sum + days.length, 0);
    return totalDays * ct.pricePerDay;
  }
  return selectedWeeks.length * ct.pricePerWeek;
}

export default function RegistrationFlow() {
  const [step, setStep] = useState(0);
  const [camperType, setCamperType] = useState('overnight');
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [selectedDays, setSelectedDays] = useState({});
  const [payOption, setPayOption] = useState('full');
  const [campersList, setCampersList] = useState([
    { firstName: 'Emma', lastName: 'Johnson', dob: '2016-03-14', gender: 'Female', allergies: 'None', medical: 'No medical conditions.' },
  ]);
  const [activeCamperIdx, setActiveCamperIdx] = useState(0);

  const addCamper = () => {
    setCampersList(prev => [...prev, { ...blankCamper }]);
    setActiveCamperIdx(campersList.length);
  };

  const removeCamper = (idx) => {
    if (campersList.length <= 1) return;
    setCampersList(prev => prev.filter((_, i) => i !== idx));
    setActiveCamperIdx(Math.max(0, activeCamperIdx - 1));
  };

  const toggleWeek = (w) => {
    setSelectedWeeks(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
  };

  const toggleDay = (weekId, day) => {
    setSelectedDays(prev => {
      const key = `${weekId}`;
      const days = prev[key] || [];
      return { ...prev, [key]: days.includes(day) ? days.filter(d => d !== day) : [...days, day] };
    });
  };

  const availableWeeks = weekData.filter(w => w.types.includes(camperType));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-800 mb-6">
        Demo Mode — This registration flow preview shows what parents see when registering.
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center shrink-0">
            <button
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === step ? 'bg-green-700 text-white' : i < step ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === step ? 'bg-white text-green-700' : i < step ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'
              }`}>{i < step ? '✓' : i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <div className="w-6 lg:w-10 h-px bg-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        {/* Step 1: Account */}
        {step === 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
            <p className="text-gray-500 text-sm mb-6">Already have an account? Log in below.</p>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name</label>
                <input type="text" defaultValue="Sarah Johnson" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="johnson.family@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" defaultValue="(555) 234-5678" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" defaultValue="password123" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Camper Details */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">Camper Details</h3>
              <span className="text-sm text-gray-400">{campersList.length} camper{campersList.length > 1 ? 's' : ''}</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">Tell us about your camper{campersList.length > 1 ? 's' : ''}. You can add multiple campers.</p>

            {/* Camper Tabs */}
            {campersList.length > 1 && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {campersList.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCamperIdx(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      i === activeCamperIdx ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {c.firstName || `Camper ${i + 1}`}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" defaultValue={campersList[activeCamperIdx]?.firstName} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" defaultValue={campersList[activeCamperIdx]?.lastName} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" defaultValue={campersList[activeCamperIdx]?.dob} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select defaultValue={campersList[activeCamperIdx]?.gender || ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" disabled>
                    <option value="">Select</option><option>Female</option><option>Male</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                <input type="text" defaultValue={campersList[activeCamperIdx]?.allergies} placeholder="None" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Notes</label>
                <textarea defaultValue={campersList[activeCamperIdx]?.medical} placeholder="Any medical conditions, medications, or notes..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20 resize-none" readOnly />
              </div>
            </div>

            {/* Add / Remove Camper */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={addCamper}
                className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:border-green-400 hover:text-green-700 transition-colors"
              >
                + Add Another Camper
              </button>
              {campersList.length > 1 && (
                <button
                  onClick={() => removeCamper(activeCamperIdx)}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove This Camper
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Week Selection */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select Weeks</h3>
            <p className="text-gray-500 text-sm mb-6">Choose your camper type, then select weeks.</p>

            {/* Camper Type Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {camperTypes.map(t => (
                <button
                  key={t.key}
                  onClick={() => { setCamperType(t.key); setSelectedWeeks([]); setSelectedDays({}); }}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    camperType === t.key ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className={`text-sm font-medium ${camperType === t.key ? 'text-green-800' : 'text-gray-900'}`}>{t.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>

            {/* Week Selection */}
            {(camperType === 'overnight' || camperType === 'older' || camperType === 'cit') && (
              <div className="space-y-3">
                {availableWeeks.map(w => (
                  <label key={w.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-400 cursor-pointer transition-colors">
                    <input
                      type={camperType === 'overnight' ? 'checkbox' : 'radio'}
                      name="session"
                      checked={selectedWeeks.includes(w.id)}
                      onChange={() => {
                        if (camperType === 'overnight') {
                          toggleWeek(w.id);
                        } else {
                          setSelectedWeeks([w.id]);
                        }
                      }}
                      className="text-green-600"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{w.name}</span>
                      <span className="text-gray-500 text-sm ml-2">{w.dates}</span>
                      {(camperType === 'older') && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Older Camper</span>}
                      {(camperType === 'cit') && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">CIT</span>}
                    </div>
                  </label>
                ))}
                {camperType === 'overnight' && (
                  <p className="text-xs text-gray-400 mt-2">Select one or more weeks for overnight camp.</p>
                )}
              </div>
            )}

            {/* Day Camper — select weeks, then days within each week */}
            {camperType === 'day' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">Select the weeks your camper will attend, then choose specific days:</p>
                <div className="space-y-4">
                  {weekData.map(w => {
                    const isSelected = selectedWeeks.includes(w.id);
                    const weekDays = selectedDays[w.id] || [];
                    return (
                      <div key={w.id} className={`border rounded-lg transition-colors ${isSelected ? 'border-green-500 bg-green-50/50' : 'border-gray-200'}`}>
                        <button
                          onClick={() => toggleWeek(w.id)}
                          className="w-full p-4 flex items-center justify-between text-left"
                        >
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{w.name}</div>
                            <div className="text-xs text-gray-500">{w.dates}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs transition-colors ${
                              isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'
                            }`}>
                              {isSelected && '✓'}
                            </span>
                          </div>
                        </button>
                        {isSelected && (
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-xs text-gray-500 mb-2">Select days:</p>
                            <div className="flex flex-wrap gap-2">
                              {dayNames.map(day => (
                                <button
                                  key={day}
                                  onClick={() => toggleDay(w.id, day)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    weekDays.includes(day) ? 'bg-green-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-green-400'
                                  }`}
                                >
                                  {day}
                                </button>
                              ))}
                              <button
                                onClick={() => setSelectedDays(prev => ({ ...prev, [w.id]: [...dayNames] }))}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium text-green-700 hover:text-green-900"
                              >
                                All week
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Required Forms */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Required Forms</h3>
            <p className="text-gray-500 text-sm mb-6">All forms must be completed before the session begins.</p>
            <div className="space-y-3">
              {[
                { name: 'Medical History Form', done: true },
                { name: 'Emergency Contact Information', done: true },
                { name: 'Liability Waiver & Release', done: true },
                { name: 'Medication Authorization', done: false },
                { name: 'Social Media Waiver', done: false },
              ].map(f => (
                <label key={f.name} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                  <input type="checkbox" defaultChecked={f.done} className="w-5 h-5 text-green-600 rounded" disabled />
                  <span className={`text-sm ${f.done ? 'text-gray-900' : 'text-gray-500'}`}>{f.name}</span>
                  {f.done && <span className="ml-auto text-xs text-green-600 font-medium">Complete</span>}
                  {!f.done && <span className="ml-auto text-xs text-orange-600 font-medium">Required</span>}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment</h3>
            <p className="text-gray-500 text-sm mb-6">Review your total and complete payment.</p>
            {(() => {
              const perCamper = calcPrice(camperType, selectedWeeks, selectedDays);
              const total = perCamper * campersList.length;
              const deposit = Math.round(total * 0.33);
              const ct = camperTypes.find(t => t.key === camperType);
              const priceDesc = camperType === 'day'
                ? `${Object.values(selectedDays).reduce((s, d) => s + d.length, 0)} days @ $${ct.pricePerDay}/day`
                : `${selectedWeeks.length} week${selectedWeeks.length !== 1 ? 's' : ''} @ $${ct.pricePerWeek.toLocaleString()}/week`;
              return (<>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  {campersList.map((c, i) => (
                    <div key={i} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{c.firstName || `Camper ${i+1}`} — {ct?.label} ({priceDesc})</span>
                      <span className="text-gray-900">${perCamper.toLocaleString()}.00</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}.00</span>
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setPayOption('full')} className={`flex-1 p-4 border rounded-lg text-sm text-left ${payOption === 'full' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <div className="font-medium text-gray-900">Pay in Full</div>
                    <div className="text-gray-500 text-xs">${total.toLocaleString()}.00 today</div>
                  </button>
                  <button onClick={() => setPayOption('deposit')} className={`flex-1 p-4 border rounded-lg text-sm text-left ${payOption === 'deposit' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <div className="font-medium text-gray-900">Deposit Only</div>
                    <div className="text-gray-500 text-xs">${deposit.toLocaleString()}.00 today, balance due by Jun 1</div>
                  </button>
                </div>
              </>);
            })()}
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" defaultValue="4242 4242 4242 4242" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input type="text" defaultValue="12/28" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" defaultValue="123" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" readOnly />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secured by Stripe. Your payment info is encrypted.
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 5 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
            <p className="text-gray-500 mb-8">Confirmation email sent to johnson.family@email.com</p>
            {(() => {
              const perCamper = calcPrice(camperType, selectedWeeks, selectedDays);
              const total = perCamper * campersList.length;
              const weeksSummary = selectedWeeks.map(w => `Week ${w}`).join(', ') || 'Week 1';
              const daysSummary = camperType === 'day' && Object.keys(selectedDays).length > 0
                ? Object.entries(selectedDays).map(([wk, days]) => `Week ${wk}: ${days.join(', ')}`).join(' | ')
                : null;
              return (
                <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Registration Summary</h4>
                  {campersList.map((c, i) => (
                    <div key={i} className={`${i > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between"><dt className="text-gray-500">Camper</dt><dd className="text-gray-900">{c.firstName || `Camper ${i+1}`} {c.lastName}</dd></div>
                        <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="text-gray-900">{camperTypes.find(t => t.key === camperType)?.label}</dd></div>
                        <div className="flex justify-between"><dt className="text-gray-500">Weeks</dt><dd className="text-gray-900 text-right">{weeksSummary}</dd></div>
                        {daysSummary && <div className="flex justify-between"><dt className="text-gray-500">Days</dt><dd className="text-gray-900 text-right text-xs">{daysSummary}</dd></div>}
                      </dl>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-gray-500">Amount Paid</dt><dd className="text-green-700 font-medium">${total.toLocaleString()}.00</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">Confirmation #</dt><dd className="text-gray-900 font-mono">CND-2026-0247</dd></div>
                    </dl>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30"
          >
            &larr; Back
          </button>
          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              {step === 4 ? 'Submit Payment' : 'Continue'} &rarr;
            </button>
          ) : (
            <button
              onClick={() => setStep(0)}
              className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Restart Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
