import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { campers, cabins } from '../data/seedData';
import { camperForms } from '../data/extendedData';
import StatusBadge from '../components/StatusBadge';
import SortableHeader, { useSort } from '../components/SortableHeader';

const formFields = ['medical', 'liability', 'emergency', 'medication', 'socialMedia'];

function getFormStatus(camperId) {
  const cf = camperForms.find(f => f.camperId === camperId);
  if (!cf) return { complete: 0, total: 5, allDone: false };
  const complete = formFields.filter(f => cf[f]).length;
  return { complete, total: 5, allDone: complete === 5 };
}

const cabinName = (id) => cabins.find(c => c.id === id)?.name || '—';

const paymentOrder = { Paid: 0, Deposit: 1, Unpaid: 2 };

export default function Campers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterSession, setFilterSession] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterForms, setFilterForms] = useState('');
  const { sortConfig, onSort, sortFn } = useSort();

  const filtered = useMemo(() => {
    return campers.filter(c => {
      const matchesSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase());
      const matchesSession = !filterSession || c.session === Number(filterSession);
      const matchesGender = !filterGender || c.gender === filterGender;
      const matchesPayment = !filterPayment || c.paymentStatus === filterPayment;
      const matchesType = !filterType || c.type === filterType;
      const fs = getFormStatus(c.id);
      const matchesForms = !filterForms || (filterForms === 'complete' ? fs.allDone : !fs.allDone);
      return matchesSearch && matchesSession && matchesGender && matchesPayment && matchesType && matchesForms;
    });
  }, [search, filterSession, filterGender, filterPayment, filterType, filterForms]);

  const sorted = useMemo(() => {
    return sortFn(filtered, (c, key) => {
      switch (key) {
        case 'name': return `${c.lastName} ${c.firstName}`;
        case 'age': return c.age;
        case 'gender': return c.gender;
        case 'session': return c.session;
        case 'type': return c.type;
        case 'payment': return paymentOrder[c.paymentStatus] ?? 9;
        case 'forms': return getFormStatus(c.id).complete;
        case 'cabin': return cabinName(c.cabin);
        default: return null;
      }
    });
  }, [filtered, sortConfig]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campers</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select value={filterSession} onChange={e => setFilterSession(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Weeks</option>
          {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Week {s}</option>)}
        </select>
        <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Genders</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <select value={filterPayment} onChange={e => setFilterPayment(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Payment</option>
          <option value="Paid">Paid</option>
          <option value="Deposit">Deposit</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Types</option>
          <option value="Overnight">Overnight</option>
          <option value="Day">Day</option>
        </select>
        <select value={filterForms} onChange={e => setFilterForms(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Forms</option>
          <option value="complete">Forms Complete</option>
          <option value="incomplete">Forms Incomplete</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <SortableHeader label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Age" sortKey="age" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Gender" sortKey="gender" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Week" sortKey="session" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Type" sortKey="type" sortConfig={sortConfig} onSort={onSort} />
                <th className="px-4 py-3 font-medium">Weeks</th>
                <SortableHeader label="Payment" sortKey="payment" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Forms" sortKey="forms" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Cabin" sortKey="cabin" sortConfig={sortConfig} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map(c => {
                const fs = getFormStatus(c.id);
                return (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/campers/${c.id}`)}
                    className="border-b border-gray-100 last:border-0 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{c.firstName} {c.lastName}</td>
                    <td className="px-4 py-3 text-gray-700">{c.age}</td>
                    <td className="px-4 py-3 text-gray-700">{c.gender}</td>
                    <td className="px-4 py-3 text-gray-700">Week {c.session}</td>
                    <td className="px-4 py-3 text-gray-700">{c.type}</td>
                    <td className="px-4 py-3 text-gray-500">{c.weeks || '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.paymentStatus} /></td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${fs.allDone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {fs.complete}/{fs.total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{cabinName(c.cabin)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && (
          <div className="p-8 text-center text-gray-400">No campers match your filters.</div>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-3">{sorted.length} of {campers.length} campers shown</p>
    </div>
  );
}
