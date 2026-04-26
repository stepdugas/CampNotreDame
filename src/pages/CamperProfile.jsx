import { useParams, useNavigate } from 'react-router-dom';
import { campers, cabins, sessions } from '../data/seedData';
import StatusBadge from '../components/StatusBadge';

export default function CamperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const camper = campers.find(c => c.id === Number(id));

  if (!camper) {
    return <div className="p-8 text-center text-gray-400">Camper not found.</div>;
  }

  const cabin = cabins.find(c => c.id === camper.cabin);
  const session = sessions.find(s => s.id === camper.session);

  return (
    <div>
      <button onClick={() => navigate('/campers')} className="text-sm text-green-700 hover:text-green-900 mb-4 inline-flex items-center gap-1">
        &larr; Back to Campers
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
          {camper.firstName[0]}{camper.lastName[0]}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{camper.firstName} {camper.lastName}</h2>
          <p className="text-gray-500">Week {camper.session} &middot; {camper.type} Camper</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={camper.paymentStatus} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Camper Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Camper Information</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Full Name</dt><dd className="text-gray-900">{camper.firstName} {camper.lastName}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Date of Birth</dt><dd className="text-gray-900">{camper.dob}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Age</dt><dd className="text-gray-900">{camper.age}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Gender</dt><dd className="text-gray-900">{camper.gender}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Medical Notes</dt><dd className="text-gray-900">{camper.medical}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Allergies</dt><dd className="text-gray-900">{camper.allergies}</dd></div>
          </dl>
        </div>

        {/* Parent Contact */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Parent / Guardian</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-gray-900">{camper.parentName}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="text-gray-900">{camper.parentEmail}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd className="text-gray-900">{camper.parentPhone}</dd></div>
          </dl>
        </div>

        {/* Registration Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Registration Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Week</dt><dd className="text-gray-900">{session?.name} ({session?.dates})</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="text-gray-900">{camper.type}</dd></div>
            {camper.weeks && <div className="flex justify-between"><dt className="text-gray-500">Weeks</dt><dd className="text-gray-900">{camper.weeks}</dd></div>}
            <div className="flex justify-between"><dt className="text-gray-500">Cabin</dt><dd className="text-gray-900">{cabin ? `${cabin.name} (${cabin.gender})` : 'Unassigned'}</dd></div>
          </dl>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payment History</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Total Owed</dt><dd className="text-gray-900 font-medium">${camper.totalOwed.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Amount Paid</dt><dd className="text-green-700 font-medium">${camper.depositPaid.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Balance Remaining</dt><dd className={`font-medium ${camper.balanceRemaining > 0 ? 'text-red-600' : 'text-gray-900'}`}>${camper.balanceRemaining.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Payment Method</dt><dd className="text-gray-900">{camper.paymentMethod || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Last Payment</dt><dd className="text-gray-900">{camper.lastPayment || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Status</dt><dd><StatusBadge status={camper.paymentStatus} /></dd></div>
          </dl>
        </div>
      </div>

      {/* Bunk Request */}
      {camper.bunkRequest && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm"><span className="font-medium text-amber-800">Bunk Request:</span> <span className="text-amber-700">{camper.bunkRequest}</span></p>
        </div>
      )}
    </div>
  );
}
