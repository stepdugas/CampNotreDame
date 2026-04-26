import { useState, useMemo } from 'react';
import { camperForms, staffForms } from '../data/extendedData';
import { campers, staff } from '../data/seedData';
import SortableHeader, { useSort } from '../components/SortableHeader';

const camperFormFields = ['medical', 'liability', 'emergency', 'medication', 'socialMedia'];
const camperFormLabels = { medical: 'Medical Form', liability: 'Liability Waiver', emergency: 'Emergency Contacts', medication: 'Medication Auth', socialMedia: 'Social Media Waiver' };
const staffFormFields = ['backgroundCheck', 'certifications', 'taxForms', 'directDeposit'];
const staffFormLabels = { backgroundCheck: 'Background Check', certifications: 'Certifications', taxForms: 'Tax Forms', directDeposit: 'Direct Deposit' };

const camperCompleteCount = (cf) => camperFormFields.filter(f => cf[f]).length;
const staffCompleteCount = (sf) => staffFormFields.filter(f => sf[f]).length;

export default function FormsDocuments() {
  const [tab, setTab] = useState('camper');
  const [selectedCamperId, setSelectedCamperId] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const camperSort = useSort();
  const staffSort = useSort();

  const selectedCamper = selectedCamperId ? campers.find(c => c.id === selectedCamperId) : null;
  const selectedCamperForm = selectedCamperId ? camperForms.find(f => f.camperId === selectedCamperId) : null;
  const selectedStaff = selectedStaffId ? staff.find(s => s.id === selectedStaffId) : null;
  const selectedStaffForm = selectedStaffId ? staffForms.find(f => f.staffId === selectedStaffId) : null;

  const sortedCamperForms = useMemo(() => {
    return camperSort.sortFn(camperForms, (cf, key) => {
      const c = campers.find(x => x.id === cf.camperId);
      switch (key) {
        case 'name': return c ? `${c.lastName} ${c.firstName}` : '';
        case 'status': return camperCompleteCount(cf);
        case 'lastUpdated': return cf.lastUpdated || '';
        default: return null;
      }
    });
  }, [camperSort.sortConfig]);

  const sortedStaffForms = useMemo(() => {
    return staffSort.sortFn(staffForms, (sf, key) => {
      const s = staff.find(x => x.id === sf.staffId);
      switch (key) {
        case 'name': return s ? `${s.lastName} ${s.firstName}` : '';
        case 'status': return staffCompleteCount(sf);
        case 'lastUpdated': return sf.lastUpdated || '';
        default: return null;
      }
    });
  }, [staffSort.sortConfig]);

  if (selectedCamper && selectedCamperForm) {
    return (
      <div>
        <button onClick={() => setSelectedCamperId(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">&larr; Back to all campers</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCamper.firstName} {selectedCamper.lastName} — Forms</h2>
        <div className="space-y-3">
          {camperFormFields.map(f => (
            <div key={f} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${selectedCamperForm[f] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {selectedCamperForm[f] ? '✓' : '✗'}
                </span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{camperFormLabels[f]}</p>
                  <p className="text-xs text-gray-500">{selectedCamperForm[f] ? 'Completed' : 'Not submitted'}</p>
                </div>
              </div>
              {selectedCamperForm[f] && (
                <button className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-50">Download</button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedStaff && selectedStaffForm) {
    return (
      <div>
        <button onClick={() => setSelectedStaffId(null)} className="text-sm text-green-700 hover:text-green-900 mb-4">&larr; Back to all staff</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedStaff.firstName} {selectedStaff.lastName} — Forms</h2>
        <div className="space-y-3">
          {staffFormFields.map(f => (
            <div key={f} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${selectedStaffForm[f] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {selectedStaffForm[f] ? '✓' : '✗'}
                </span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{staffFormLabels[f]}</p>
                  <p className="text-xs text-gray-500">{selectedStaffForm[f] ? 'Completed' : 'Not submitted'}</p>
                </div>
              </div>
              {selectedStaffForm[f] && (
                <button className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-50">Download</button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Forms & Documents</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button onClick={() => setTab('camper')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'camper' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Camper Forms</button>
          <button onClick={() => setTab('staff')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === 'staff' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Staff Forms</button>
        </div>
      </div>

      {tab === 'camper' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                  <SortableHeader label="Camper" sortKey="name" sortConfig={camperSort.sortConfig} onSort={camperSort.onSort} />
                  {camperFormFields.map(f => <th key={f} className="px-3 py-3 font-medium text-center text-xs">{camperFormLabels[f]}</th>)}
                  <SortableHeader label="Last Updated" sortKey="lastUpdated" sortConfig={camperSort.sortConfig} onSort={camperSort.onSort} />
                  <SortableHeader label="Status" sortKey="status" sortConfig={camperSort.sortConfig} onSort={camperSort.onSort} />
                </tr>
              </thead>
              <tbody>
                {sortedCamperForms.map(cf => {
                  const c = campers.find(x => x.id === cf.camperId);
                  if (!c) return null;
                  const complete = camperFormFields.every(f => cf[f]);
                  return (
                    <tr key={cf.camperId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCamperId(cf.camperId)}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{c.firstName} {c.lastName}</td>
                      {camperFormFields.map(f => (
                        <td key={f} className="px-3 py-3 text-center">
                          <span className={`inline-block w-5 h-5 rounded-full text-xs leading-5 ${cf[f] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {cf[f] ? '✓' : '✗'}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-gray-500 text-xs">{cf.lastUpdated || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${complete ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {complete ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'staff' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
                  <SortableHeader label="Staff Member" sortKey="name" sortConfig={staffSort.sortConfig} onSort={staffSort.onSort} />
                  {staffFormFields.map(f => <th key={f} className="px-3 py-3 font-medium text-center text-xs">{staffFormLabels[f]}</th>)}
                  <SortableHeader label="Last Updated" sortKey="lastUpdated" sortConfig={staffSort.sortConfig} onSort={staffSort.onSort} />
                  <SortableHeader label="Status" sortKey="status" sortConfig={staffSort.sortConfig} onSort={staffSort.onSort} />
                </tr>
              </thead>
              <tbody>
                {sortedStaffForms.map(sf => {
                  const s = staff.find(x => x.id === sf.staffId);
                  if (!s) return null;
                  const complete = staffFormFields.every(f => sf[f]);
                  return (
                    <tr key={sf.staffId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStaffId(sf.staffId)}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{s.firstName} {s.lastName}</td>
                      {staffFormFields.map(f => (
                        <td key={f} className="px-3 py-3 text-center">
                          <span className={`inline-block w-5 h-5 rounded-full text-xs leading-5 ${sf[f] ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {sf[f] ? '✓' : '✗'}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-gray-500 text-xs">{sf.lastUpdated}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${complete ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {complete ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
