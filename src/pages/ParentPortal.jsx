import { camperMailParentSent } from '../data/extendedData';

const colors = ['bg-emerald-200', 'bg-sky-200', 'bg-amber-200'];

export default function ParentPortal() {
  return (
    <div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-800 mb-6">
        Preview Mode — This is a read-only mockup of the parent-facing portal.
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center text-xl font-bold text-white">J</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Welcome, Johnson Family</h2>
            <p className="text-gray-500 text-sm">Camp Notre Dame &middot; Summer 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Child 1 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-sm font-bold text-pink-700">EJ</div>
              <div>
                <h3 className="font-semibold text-gray-900">Emma Johnson</h3>
                <p className="text-xs text-gray-500">Age 10 &middot; Female</p>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Week</dt><dd className="text-gray-900">Week 1 (Jun 21 – Jun 26)</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="text-gray-900">Overnight</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Cabin</dt><dd className="text-gray-900">Broken Arrow</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Balance</dt><dd className="text-green-600 font-medium">$0 — Paid in Full</dd></div>
            </dl>
          </div>

          {/* Child 2 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">LJ</div>
              <div>
                <h3 className="font-semibold text-gray-900">Liam Johnson</h3>
                <p className="text-xs text-gray-500">Age 12 &middot; Male</p>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Week</dt><dd className="text-gray-900">Week 1 (Jun 21 – Jun 26)</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="text-gray-900">Overnight</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Cabin</dt><dd className="text-gray-900">Circle B</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Balance</dt><dd className="text-green-600 font-medium">$0 — Paid in Full</dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* Registration History & Account */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Account Summary</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600">Charged</p>
              <p className="text-lg font-bold text-blue-700">$2,400</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600">Paid</p>
              <p className="text-lg font-bold text-green-700">$2,400</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600">Balance</p>
              <p className="text-lg font-bold text-gray-700">$0</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">No scholarships applied.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Registration History</h3>
          <div className="space-y-3">
            {[
              { year: 2025, campers: 'Emma, Liam', session: 'Week 1', amount: '$2,400' },
              { year: 2024, campers: 'Emma, Liam', session: 'Week 1', amount: '$2,300' },
              { year: 2023, campers: 'Emma, Liam', session: 'Week 1', amount: '$2,200' },
            ].map(r => (
              <div key={r.year} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                <div>
                  <span className="font-medium text-gray-900">{r.year}</span>
                  <span className="text-gray-500 ml-2">{r.campers} &middot; {r.session}</span>
                </div>
                <span className="text-gray-700">{r.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forms Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Required Forms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Emma Johnson</p>
            <div className="space-y-2">
              {[
                { name: 'Medical Form', done: true },
                { name: 'Liability Waiver', done: true },
                { name: 'Emergency Contacts', done: true },
                { name: 'Medication Auth', done: true },
                { name: 'Social Media Waiver', done: true },
              ].map(f => (
                <div key={f.name} className="flex items-center gap-2 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${f.done ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {f.done ? '✓' : '✗'}
                  </span>
                  <span className={f.done ? 'text-gray-700' : 'text-red-600'}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Liam Johnson</p>
            <div className="space-y-2">
              {[
                { name: 'Medical Form', done: true },
                { name: 'Liability Waiver', done: true },
                { name: 'Emergency Contacts', done: true },
                { name: 'Medication Auth', done: true },
                { name: 'Social Media Waiver', done: false },
              ].map(f => (
                <div key={f.name} className="flex items-center gap-2 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${f.done ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {f.done ? '✓' : '✗'}
                  </span>
                  <span className={f.done ? 'text-gray-700' : 'text-red-600'}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Method</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2026-03-15', desc: 'Emma - Week 1 Overnight', amount: '$1,200', method: 'Visa ****4242' },
                { date: '2026-03-15', desc: 'Liam - Week 1 Overnight', amount: '$1,200', method: 'Visa ****4242' },
              ].map((p, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 text-gray-500">{p.date}</td>
                  <td className="py-2 text-gray-900">{p.desc}</td>
                  <td className={`py-2 font-medium ${p.amount.startsWith('-') ? 'text-green-700' : 'text-gray-900'}`}>{p.amount}</td>
                  <td className="py-2 text-gray-500">{p.method}</td>
                  <td className="py-2">
                    {!p.amount.startsWith('-') && (
                      <button className="text-xs text-green-700 hover:text-green-900 font-medium">Receipt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Camper Mail */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Camper Mail</h3>
        <div className="mb-4">
          <div className="flex gap-3 mb-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Emma Johnson</option>
              <option>Liam Johnson</option>
            </select>
          </div>
          <textarea placeholder="Write a letter to your camper..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-20 resize-none mb-2" />
          <button className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800">Send Letter</button>
        </div>
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Recent Letters</p>
          {camperMailParentSent.slice(0, 3).map(l => (
            <div key={l.id} className="text-sm p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900">To: {l.child}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{l.date}</span>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${l.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{l.status}</span>
                </div>
              </div>
              <p className="text-gray-600 text-xs">{l.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Photo Gallery</h3>
        <p className="text-sm text-gray-500 mb-4">Cabin photos from Week 1 — uploaded after each session photo day.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {['Broken Arrow cabin photo', 'T Bar T cabin photo', 'Circle B cabin photo'].map((desc, i) => (
            <div key={i} className={`${colors[i % colors.length]} rounded-xl aspect-square flex items-end p-3`}>
              <p className="text-xs text-gray-800 font-medium bg-white/80 rounded px-2 py-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
