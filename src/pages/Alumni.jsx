import { useState } from 'react';
import { alumniSummary, alumniFamilies } from '../data/extendedData';

export default function Alumni() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = alumniFamilies.find(f => f.id === selectedId);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelectedId(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">&larr; Back to alumni</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.familyName} Family</h2>
        <p className="text-gray-500 text-sm mb-6">Member since {selected.firstYear} &middot; {selected.totalYears} years &middot; {selected.camperCount} camper{selected.camperCount > 1 ? 's' : ''}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Total Years</p>
            <p className="text-2xl font-bold text-blue-700">{selected.totalYears}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Lifetime Spend</p>
            <p className="text-2xl font-bold text-green-700">${selected.lifetimeSpend.toLocaleString()}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Total Campers</p>
            <p className="text-2xl font-bold text-purple-700">{selected.camperCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Attendance Timeline</h3>
          <div className="space-y-4">
            {selected.history.map((h, i) => (
              <div key={h.year} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">{h.year.toString().slice(2)}</div>
                  {i < selected.history.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-medium text-gray-900 text-sm">{h.year}</p>
                  <p className="text-xs text-gray-500">Campers: {h.campers.join(', ')} &middot; {h.sessions.join(', ')} &middot; ${h.paid.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Alumni</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Total Alumni Families</p>
          <p className="text-3xl font-bold text-blue-700">{alumniSummary.totalFamilies.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Avg Years Attended</p>
          <p className="text-3xl font-bold text-green-700">{alumniSummary.avgYears}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Returning This Summer</p>
          <p className="text-3xl font-bold text-purple-700">{alumniSummary.returningPct}%</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Avg Lifetime Value</p>
          <p className="text-3xl font-bold text-orange-700">${alumniSummary.avgLifetimeValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Family</th>
                <th className="px-4 py-3 font-medium">First Year</th>
                <th className="px-4 py-3 font-medium">Years</th>
                <th className="px-4 py-3 font-medium">Campers</th>
                <th className="px-4 py-3 font-medium">Lifetime Spend</th>
                <th className="px-4 py-3 font-medium">Last Week</th>
                <th className="px-4 py-3 font-medium">Re-enrolled</th>
              </tr>
            </thead>
            <tbody>
              {alumniFamilies.map(f => (
                <tr key={f.id} className="border-b border-gray-100 last:border-0 hover:bg-green-50 cursor-pointer" onClick={() => setSelectedId(f.id)}>
                  <td className="px-4 py-3 text-gray-900 font-medium">{f.familyName}</td>
                  <td className="px-4 py-3 text-gray-700">{f.firstYear}</td>
                  <td className="px-4 py-3 text-gray-700">{f.totalYears}</td>
                  <td className="px-4 py-3 text-gray-700">{f.camperCount}</td>
                  <td className="px-4 py-3 text-gray-700">${f.lifetimeSpend.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{f.lastSession}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${f.reEnrolled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {f.reEnrolled ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
