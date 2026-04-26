import { useState } from 'react';
import { emailAutomations, emailLog } from '../data/extendedData';

export default function EmailAutomation() {
  const [automations, setAutomations] = useState(emailAutomations);
  const [selectedId, setSelectedId] = useState(null);

  const selected = automations.find(a => a.id === selectedId);

  const toggleEnabled = (id) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Automation</h2>

      {!selected ? (
        <>
          <div className="space-y-3 mb-8">
            {automations.map(a => (
              <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => toggleEnabled(a.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${a.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${a.enabled ? 'translate-x-5' : ''}`} />
                </button>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedId(a.id)}>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 text-sm">{a.name}</h4>
                    {!a.enabled && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Disabled</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{a.trigger}</p>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500 shrink-0">
                  <div><span className="font-medium text-gray-700">{a.totalSent}</span> sent</div>
                  <div><span className="font-medium text-gray-700">{a.openRate}%</span> open rate</div>
                  <div>Last: {a.lastSent}</div>
                  <button onClick={() => setSelectedId(a.id)} className="text-green-700 hover:text-green-900 font-medium">Edit &rarr;</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sent Email Log */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sent Email Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 pr-4 font-medium">Automation</th>
                    <th className="pb-3 pr-4 font-medium">Recipient</th>
                    <th className="pb-3 pr-4 font-medium">Camper</th>
                    <th className="pb-3 pr-4 font-medium">Sent</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  {emailLog.map(e => (
                    <tr key={e.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4 text-gray-700">{e.automation}</td>
                      <td className="py-3 pr-4 text-gray-500 font-mono text-xs">{e.recipient}</td>
                      <td className="py-3 pr-4 text-gray-900 font-medium">{e.camper}</td>
                      <td className="py-3 pr-4 text-gray-500">{e.sentDate}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${e.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{e.status}</span>
                      </td>
                      <td className="py-3 text-gray-500">{e.opened ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedId(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">&larr; Back to automations</button>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selected.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{selected.trigger}</p>
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input type="text" defaultValue={selected.subject} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
                <textarea defaultValue={selected.body} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-48 font-mono resize-none" />
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">Available merge fields:</p>
                <div className="flex flex-wrap gap-2">
                  {['{camper_name}', '{parent_name}', '{week_name}', '{balance_due}', '{total_owed}', '{camp_name}'].map(f => (
                    <code key={f} className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded text-green-700">{f}</code>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">Save Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
