import { useState } from 'react';
import { camperMail, camperMailParentSent } from '../data/extendedData';
import StatusBadge from '../components/StatusBadge';

export default function CamperMail() {
  const [view, setView] = useState('admin');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [mailList, setMailList] = useState(camperMail);

  const markPrinted = (id) => {
    setMailList(prev => prev.map(m => m.id === id ? { ...m, status: 'Printed' } : m));
    setSelectedLetter(prev => prev ? { ...prev, status: 'Printed' } : null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Camper Mail</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button onClick={() => { setView('admin'); setSelectedLetter(null); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'admin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Admin View</button>
          <button onClick={() => { setView('parent'); setSelectedLetter(null); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'parent' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Parent View</button>
        </div>
      </div>

      {view === 'admin' && !selectedLetter && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Camper</th>
                <th className="px-4 py-3 font-medium">From</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {mailList.map(m => (
                <tr key={m.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLetter(m)}>
                  <td className="px-4 py-3 text-gray-900 font-medium">{m.camperName}</td>
                  <td className="px-4 py-3 text-gray-700">{m.sender}</td>
                  <td className="px-4 py-3 text-gray-500">{m.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${m.status === 'Printed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{m.status}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-right">&rarr;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'admin' && selectedLetter && (
        <div>
          <button onClick={() => setSelectedLetter(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">&larr; Back to all mail</button>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Letter to {selectedLetter.camperName}</h3>
                <p className="text-sm text-gray-500">From {selectedLetter.sender} &middot; {selectedLetter.date}</p>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedLetter.status === 'Printed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{selectedLetter.status}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedLetter.message}</div>
            {selectedLetter.status === 'Pending' && (
              <button onClick={() => markPrinted(selectedLetter.id)} className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">
                Mark as Printed
              </button>
            )}
          </div>
        </div>
      )}

      {view === 'parent' && (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-800 mb-6">
            Viewing as: The Johnson Family
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Write a Letter</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48">
                <option>Emma Johnson</option>
                <option>Liam Johnson</option>
              </select>
            </div>
            <textarea placeholder="Write your letter here..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-32 resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">Send Letter</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Sent Letters</h3>
            <div className="space-y-3">
              {camperMailParentSent.map(l => (
                <div key={l.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">To: {l.child}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{l.date}</span>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${l.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{l.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{l.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
