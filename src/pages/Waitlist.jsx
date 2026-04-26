import { useState } from 'react';
import { waitlistCampers } from '../data/extendedData';

export default function Waitlist() {
  const [session, setSession] = useState(0);
  const [list, setList] = useState(waitlistCampers);

  const filtered = session === 0 ? list : list.filter(w => w.session === session);

  const notify = (id) => {
    setList(prev => prev.map(w => w.id === id ? { ...w, notified: true } : w));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Waitlist</h2>

      <div className="flex gap-3 mb-4">
        <select value={session} onChange={e => setSession(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value={0}>All Weeks</option>
          {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Week {s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Camper Name</th>
              <th className="px-4 py-3 font-medium">Week</th>
              <th className="px-4 py-3 font-medium">Date Added</th>
              <th className="px-4 py-3 font-medium">Parent Email</th>
              <th className="px-4 py-3 font-medium">Notified</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => (
              <tr key={w.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 font-mono">{w.position}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{w.firstName} {w.lastName}</td>
                <td className="px-4 py-3 text-gray-700">Week {w.session}</td>
                <td className="px-4 py-3 text-gray-500">{w.dateAdded}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{w.parentEmail}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${w.notified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {w.notified ? 'Notified' : 'Waiting'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {w.position === 1 && !w.notified && (
                    <button onClick={() => notify(w.id)} className="px-3 py-1 bg-green-700 text-white text-xs font-medium rounded-lg hover:bg-green-800 transition-colors">
                      Notify Next
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-400 mt-3">{filtered.length} campers on waitlist</p>
    </div>
  );
}
