import { useState, useMemo } from 'react';
import { staff, weeklyAssignments, sessions } from '../data/seedData';
import StatusBadge from '../components/StatusBadge';
import SortableHeader, { useSort } from '../components/SortableHeader';

const statusOrder = { Active: 0, Interview: 1, Pending: 2 };

export default function Staff() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { sortConfig, onSort, sortFn } = useSort();

  const selectedStaff = staff.find(s => s.id === selectedStaffId);
  const weekAssignments = weeklyAssignments[selectedWeek] || [];

  const getAssignment = (staffId) => weekAssignments.find(a => a.staffId === staffId);

  const sorted = useMemo(() => {
    return sortFn(staff, (s, key) => {
      switch (key) {
        case 'name': return `${s.lastName} ${s.firstName}`;
        case 'role': return s.role;
        case 'assignment': {
          const a = getAssignment(s.id);
          return a?.assignment || 'zzz';
        }
        case 'status': return statusOrder[s.status] ?? 9;
        case 'certs': return s.certifications.length;
        default: return null;
      }
    });
  }, [sortConfig, selectedWeek]);

  // Staff profile view
  if (selectedStaff) {
    const allAssignments = Object.entries(weeklyAssignments).map(([week, assignments]) => {
      const a = assignments.find(x => x.staffId === selectedStaff.id);
      return { week: Number(week), assignment: a?.assignment || null, type: a?.type || null };
    });

    return (
      <div>
        <button onClick={() => setSelectedStaffId(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">
          &larr; Back to Staff
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
            {selectedStaff.firstName[0]}{selectedStaff.lastName[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedStaff.firstName} {selectedStaff.lastName}</h2>
            <p className="text-gray-500">{selectedStaff.role}</p>
          </div>
          <div className="ml-auto">
            <StatusBadge status={selectedStaff.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd className="text-gray-900">{selectedStaff.phone}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="text-gray-900">{selectedStaff.email}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Emergency Contact</dt><dd className="text-gray-900 text-right">{selectedStaff.emergencyContact}</dd></div>
            </dl>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Role</dt><dd className="text-gray-900">{selectedStaff.role}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Start Week</dt><dd className="text-gray-900">{selectedStaff.startWeek ? `Week ${selectedStaff.startWeek}` : 'Not assigned'}</dd></div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Certifications</dt>
                <dd className="flex flex-wrap gap-1 justify-end">
                  {selectedStaff.certifications.map(c => (
                    <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{c}</span>
                  ))}
                </dd>
              </div>
              {selectedStaff.notes && (
                <div className="flex justify-between"><dt className="text-gray-500">Notes</dt><dd className="text-gray-900 text-right">{selectedStaff.notes}</dd></div>
              )}
            </dl>
          </div>
        </div>

        {/* Weekly Assignment History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Assignments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {allAssignments.map(a => (
              <div key={a.week} className={`rounded-lg p-3 text-center ${a.assignment ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                <p className="text-xs text-gray-500 mb-1">Week {a.week}</p>
                {a.assignment ? (
                  <>
                    <p className="text-sm font-medium text-gray-900">{a.assignment}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.type === 'cabin' ? 'Cabin' : 'Program'}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">—</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Staff</h2>
        <div className="flex items-center gap-3">
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {sessions.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.dates})</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing assignments for <span className="font-medium text-gray-700">Week {selectedWeek}</span> &mdash; assignments are announced each Thursday for the following week.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                <SortableHeader label="Name" sortKey="name" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Role" sortKey="role" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label={`Week ${selectedWeek} Assignment`} sortKey="assignment" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Status" sortKey="status" sortConfig={sortConfig} onSort={onSort} />
                <SortableHeader label="Certifications" sortKey="certs" sortConfig={sortConfig} onSort={onSort} />
              </tr>
            </thead>
            <tbody>
              {sorted.map(s => {
                const a = getAssignment(s.id);
                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStaffId(s.id)}
                    className="border-b border-gray-100 last:border-0 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{s.firstName} {s.lastName}</td>
                    <td className="px-4 py-3 text-gray-700">{s.role}</td>
                    <td className="px-4 py-3">
                      {a ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${a.type === 'cabin' ? 'bg-green-500' : 'bg-blue-500'}`} />
                          <span className="text-gray-700">{a.assignment}</span>
                          <span className="text-xs text-gray-400">({a.type === 'cabin' ? 'Cabin' : 'Program'})</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.certifications.map(cert => (
                          <span key={cert} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{cert}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff */}
      {showAddForm ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Add New Staff Member</h3>
            <button onClick={() => setShowAddForm(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" placeholder="First name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" placeholder="Last name" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Senior Staff</option>
                <option>Nurse</option>
                <option>CIT</option>
                <option>Legacy Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Week</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="">TBD</option>
                {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" placeholder="(555) 000-0000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input type="text" placeholder="Name — Phone number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <button onClick={() => setShowAddForm(false)} className="mt-4 px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">
            Add Staff Member
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 text-sm font-medium hover:border-green-400 hover:text-green-700 transition-colors"
        >
          + Add Staff Member
        </button>
      )}
    </div>
  );
}
