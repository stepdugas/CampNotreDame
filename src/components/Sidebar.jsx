import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/campers', label: 'Campers', icon: '👧' },
  { path: '/registration', label: 'Registration Flow', icon: '📝' },
  { path: '/bunking', label: 'Bunking Board', icon: '🏠' },
  { path: '/payments', label: 'Payments', icon: '💳' },
  { path: '/staff', label: 'Staff', icon: '👥' },
  { path: '/mail', label: 'Camper Mail', icon: '✉️' },
  { path: '/photos', label: 'Photos', icon: '📷' },
  { path: '/email-automation', label: 'Email Automation', icon: '📧' },
  { path: '/waitlist', label: 'Waitlist', icon: '⏳' },
  { path: '/forms', label: 'Forms & Documents', icon: '📄' },
  { path: '/alumni', label: 'Alumni', icon: '🎓' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
  { path: '/discounts', label: 'Scholarships', icon: '🎗️' },
  { path: '/notifications', label: 'Notifications', icon: '🔔', badge: 6 },
  { path: '/parent-portal', label: 'Parent Portal Preview', icon: '👨‍👩‍👧‍👦' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1a2e1a] text-white p-2 rounded-lg shadow-lg"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-auto
        w-64 bg-[#1a2e1a] min-h-screen h-screen flex flex-col shrink-0 overflow-y-auto
        transition-transform lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Camp Notre Dame</h1>
            <p className="text-green-300/70 text-xs mt-1">Admin Dashboard</p>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white font-medium border-r-3 border-green-400'
                    : 'text-green-100/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10 text-green-100/40 text-xs">
          &copy; 2026 Camp Notre Dame
        </div>
      </aside>
    </>
  );
}
