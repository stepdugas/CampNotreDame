import { useState, useMemo } from 'react';
import { campers } from '../data/seedData';
import StatusBadge from '../components/StatusBadge';
import SortableHeader, { useSort } from '../components/SortableHeader';

const paymentOrder = { Paid: 0, Deposit: 1, Unpaid: 2 };

export default function Payments() {
  const [filter, setFilter] = useState('');
  const { sortConfig, onSort, sortFn } = useSort();

  const filtered = useMemo(() => {
    if (!filter) return campers;
    return campers.filter(c => c.paymentStatus === filter);
  }, [filter]);

  const sorted = useMemo(() => {
    return sortFn(filtered, (c, key) => {
      switch (key) {
        case 'name': return `${c.lastName} ${c.firstName}`;
        case 'session': return c.session;
        case 'totalOwed': return c.totalOwed;
        case 'depositPaid': return c.depositPaid;
        case 'balance': return c.balanceRemaining;
        case 'method': return c.paymentMethod || '';
        case 'lastPayment': return c.lastPayment || '';
        case 'status': return paymentOrder[c.paymentStatus] ?? 9;
        default: return null;
      }
    });
  }, [filtered, sortConfig]);

  const totalCollected = campers.reduce((sum, c) => sum + c.depositPaid, 0);
  const totalExpected = campers.reduce((sum, c) => sum + c.totalOwed, 0);
  const totalOutstanding = totalExpected - totalCollected;

  const summaryCards = [
    { label: 'Total Collected', value: `$${totalCollected.toLocaleString()}`, bg: 'bg-green-50', text: 'text-green-700' },
    { label: 'Total Outstanding', value: `$${totalOutstanding.toLocaleString()}`, bg: 'bg-red-50', text: 'text-red-700' },
    { label: 'Total Expected', value: `$${totalExpected.toLocaleString()}`, bg: 'bg-blue-50', text: 'text-blue-700' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {summaryCards.map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl p-5`}>
            <p className="text-sm text-gray-600 mb-1">{c.label}</p>
            <p className={`text-3xl font-bold ${c.text}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['', 'Paid', 'Deposit', 'Unpaid'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <SortableHeader label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Week" sortKey="session" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Total Owed" sortKey="totalOwed" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Deposit Paid" sortKey="depositPaid" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Balance" sortKey="balance" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Method" sortKey="method" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Last Payment" sortKey="lastPayment" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Status" sortKey="status" sortConfig={sortConfig} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map(c => (
                <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-medium">{c.firstName} {c.lastName}</td>
                  <td className="px-4 py-3 text-gray-700">Week {c.session}</td>
                  <td className="px-4 py-3 text-gray-700">${c.totalOwed.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-700">${c.depositPaid.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-medium ${c.balanceRemaining > 0 ? 'text-red-600' : 'text-green-600'}`}>${c.balanceRemaining.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-500">{c.paymentMethod || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{c.lastPayment || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
