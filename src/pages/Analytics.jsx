import { analyticsData } from '../data/extendedData';

const maxEnrollment = Math.max(...analyticsData.enrollmentByYear.map(d => d.count));
const maxRevenue = Math.max(...analyticsData.revenueBySession.map(d => d.revenue));
const totalRetention = analyticsData.retention.returning + analyticsData.retention.new;
const returningPct = Math.round((analyticsData.retention.returning / totalRetention) * 100);
const newPct = 100 - returningPct;

export default function Analytics() {
  const exportCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Average Camper Age', analyticsData.keyMetrics.avgCamperAge],
      ['Most Popular Week', analyticsData.keyMetrics.mostPopularWeek],
      ['Avg Revenue Per Family', `$${analyticsData.keyMetrics.avgRevenuePerFamily}`],
      ['Cancellation Rate', analyticsData.keyMetrics.cancellationRate],
      ['Scholarship Recipients', analyticsData.keyMetrics.scholarshipRecipients],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'camp-analytics.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>All Time</option>
            <option>This Year</option>
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
          </select>
          <button onClick={exportCSV} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Enrollment by Year */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Enrollment by Year</h3>
          <div className="space-y-3">
            {analyticsData.enrollmentByYear.map(d => (
              <div key={d.year} className="flex items-center gap-3">
                <span className="w-10 text-sm text-gray-500 font-mono">{d.year}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(d.count / maxEnrollment) * 100}%` }}>
                    <span className="text-xs text-white font-medium">{d.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Session */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue by Week (2026)</h3>
          <div className="space-y-3">
            {analyticsData.revenueBySession.map(d => (
              <div key={d.session} className="flex items-center gap-3">
                <span className="w-20 text-sm text-gray-500">{d.session}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(d.revenue / maxRevenue) * 100}%` }}>
                    <span className="text-xs text-white font-medium">${(d.revenue / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top 10 Cities</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="pb-2 font-medium">#</th>
                  <th className="pb-2 font-medium">City</th>
                  <th className="pb-2 font-medium text-right">Families</th>
                  <th className="pb-2 font-medium text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topCities.map((c, i) => (
                  <tr key={c.city} className="border-b border-gray-50 last:border-0">
                    <td className="py-1.5 text-gray-400">{i + 1}</td>
                    <td className="py-1.5 text-gray-900">{c.city}</td>
                    <td className="py-1.5 text-gray-700 text-right">{c.count}</td>
                    <td className="py-1.5 text-gray-500 text-right">{c.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Retention Donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Family Retention</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4"
                  strokeDasharray={`${returningPct * 0.88} ${100 * 0.88}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{returningPct}%</span>
                <span className="text-xs text-gray-500">returning</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">Returning: {analyticsData.retention.returning} families</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="text-sm text-gray-700">New: {analyticsData.retention.new} families</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Avg Camper Age</p>
            <p className="text-xl font-bold text-gray-900">{analyticsData.keyMetrics.avgCamperAge}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Most Popular Week</p>
            <p className="text-xl font-bold text-gray-900">{analyticsData.keyMetrics.mostPopularWeek}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Avg Rev/Family</p>
            <p className="text-xl font-bold text-gray-900">${analyticsData.keyMetrics.avgRevenuePerFamily}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Cancellation Rate</p>
            <p className="text-xl font-bold text-gray-900">{analyticsData.keyMetrics.cancellationRate}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Scholarships</p>
            <p className="text-xl font-bold text-gray-900">{analyticsData.keyMetrics.scholarshipRecipients}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
