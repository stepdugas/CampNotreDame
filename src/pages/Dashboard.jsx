import { useNavigate } from 'react-router-dom';
import { sessions, recentRegistrations } from '../data/seedData';
import StatusBadge from '../components/StatusBadge';

const metrics = [
  { label: 'Total Campers Enrolled', value: '40', bg: 'bg-blue-50', text: 'text-blue-700' },
  { label: 'Revenue Collected', value: '$33,300', bg: 'bg-green-50', text: 'text-green-700' },
  { label: 'Weeks This Summer', value: '7', bg: 'bg-purple-50', text: 'text-purple-700' },
  { label: 'Families Registered', value: '37', bg: 'bg-orange-50', text: 'text-orange-700' },
];

const quickStats = [
  { label: 'Forms Incomplete', value: 14, color: 'text-red-600' },
  { label: 'Waitlisted Campers', value: 12, color: 'text-yellow-600' },
  { label: 'Pending Camper Mail', value: 3, color: 'text-blue-600' },
  { label: 'Staff Apps Pending', value: 3, color: 'text-purple-600' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <button onClick={() => navigate('/notifications')} className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">6</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map(m => (
          <div key={m.label} className={`${m.bg} rounded-xl p-5`}>
            <p className="text-sm text-gray-600 mb-1">{m.label}</p>
            <p className={`text-2xl lg:text-3xl font-bold ${m.text}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">{s.label}</span>
            <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Capacity</h3>
        <div className="space-y-3">
          {sessions.map(s => {
            const pct = Math.round((s.enrolled / s.capacity) * 100);
            const barColor = pct >= 95 ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-500' : 'bg-green-500';
            return (
              <div key={s.id} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-700 font-medium shrink-0">{s.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className={`${barColor} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <span className="w-28 text-sm text-gray-500 text-right shrink-0">{s.enrolled}/{s.capacity} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Registrations</h3>

        {/* Mobile: card layout */}
        <div className="sm:hidden space-y-3">
          {recentRegistrations.map((r, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{r.family}</span>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-sm text-gray-700">{r.camper}</p>
              <p className="text-xs text-gray-500 mt-1">{r.session} &middot; {r.date}</p>
            </div>
          ))}
        </div>

        {/* Desktop: table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 pr-4 font-medium">Family</th>
                <th className="pb-3 pr-4 font-medium">Camper</th>
                <th className="pb-3 pr-4 font-medium">Week</th>
                <th className="pb-3 pr-4 font-medium">Date Registered</th>
                <th className="pb-3 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((r, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 text-gray-900 font-medium whitespace-nowrap">{r.family}</td>
                  <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{r.camper}</td>
                  <td className="py-3 pr-4 text-gray-700">{r.session}</td>
                  <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{r.date}</td>
                  <td className="py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
