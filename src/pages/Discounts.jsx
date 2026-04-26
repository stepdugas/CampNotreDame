import { useState } from 'react';
import { discounts as discountData, appliedDiscounts } from '../data/extendedData';

export default function Discounts() {
  const [discountList, setDiscountList] = useState(discountData);
  const [showCreate, setShowCreate] = useState(false);

  const toggleActive = (id) => {
    setDiscountList(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  const totalAwarded = appliedDiscounts.reduce((sum, a) => sum + a.discountAmount, 0);
  const totalRecipients = appliedDiscounts.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Scholarships</h2>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">
          {showCreate ? 'Cancel' : '+ New Scholarship'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Total Awarded</p>
          <p className="text-3xl font-bold text-green-700">${totalAwarded.toLocaleString()}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Recipients</p>
          <p className="text-3xl font-bold text-blue-700">{totalRecipients}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5">
          <p className="text-sm text-gray-600 mb-1">Scholarship Types</p>
          <p className="text-3xl font-bold text-purple-700">{discountList.length}</p>
        </div>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Scholarship</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Name</label>
              <input type="text" placeholder="e.g., Memorial Scholarship" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input type="text" placeholder="e.g., $600" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <button onClick={() => setShowCreate(false)} className="mt-4 px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">Save Scholarship</button>
        </div>
      )}

      {/* Scholarship Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Awarded</th>
                <th className="px-4 py-3 font-medium">Active</th>
              </tr>
            </thead>
            <tbody>
              {discountList.map(d => (
                <tr key={d.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-medium">{d.name}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{d.amount}</td>
                  <td className="px-4 py-3 text-gray-500">{d.usageCount} recipients</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(d.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${d.active ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${d.active ? 'translate-x-5' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applied Scholarships */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Awarded Scholarships</h3>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Family</th>
                <th className="px-4 py-3 font-medium">Scholarship</th>
                <th className="px-4 py-3 font-medium">Original</th>
                <th className="px-4 py-3 font-medium">Award</th>
                <th className="px-4 py-3 font-medium">Final Price</th>
              </tr>
            </thead>
            <tbody>
              {appliedDiscounts.map((a, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-900 font-medium">{a.family}</td>
                  <td className="px-4 py-3 text-gray-700">{a.discount}</td>
                  <td className="px-4 py-3 text-gray-500">${a.originalPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-green-700 font-medium">-${a.discountAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">${a.finalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
