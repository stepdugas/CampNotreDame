import { useState } from 'react';
import { notifications as notifData } from '../data/extendedData';

const filterTabs = [
  { key: '', label: 'All' },
  { key: 'registration', label: 'Registrations' },
  { key: 'payment', label: 'Payments' },
  { key: 'staff', label: 'Staff' },
  { key: 'forms', label: 'Forms' },
];

export default function Notifications() {
  const [filter, setFilter] = useState('');
  const [notifs, setNotifs] = useState(notifData);

  const filtered = filter ? notifs.filter(n => n.type === filter) : notifs;
  const unreadCount = notifs.filter(n => !n.read).length;

  const markRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-green-700 hover:text-green-900 font-medium">Mark all as read</button>
        )}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {filterTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === t.key ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(n => (
          <div
            key={n.id}
            className={`bg-white rounded-xl border p-4 flex items-start gap-3 transition-colors ${
              n.read ? 'border-gray-200' : 'border-green-200 bg-green-50/50'
            }`}
          >
            <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>{n.text}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
            {!n.read && (
              <button
                onClick={() => markRead(n.id)}
                className="text-xs text-green-700 hover:text-green-900 font-medium shrink-0 mt-1"
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
