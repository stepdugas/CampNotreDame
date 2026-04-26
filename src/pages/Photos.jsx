import { useState } from 'react';
import { photos } from '../data/extendedData';

const colors = ['bg-emerald-200', 'bg-sky-200', 'bg-amber-200', 'bg-rose-200', 'bg-violet-200', 'bg-teal-200', 'bg-orange-200', 'bg-indigo-200', 'bg-lime-200', 'bg-pink-200', 'bg-cyan-200', 'bg-yellow-200'];

export default function Photos() {
  const [session, setSession] = useState(0);
  const [photoList, setPhotoList] = useState(photos);
  const [parentView, setParentView] = useState(false);

  const filtered = session === 0 ? photoList : photoList.filter(p => p.session === session);
  const parentFiltered = photoList.filter(p => p.session === 1 && p.visible);

  const visibleCount = filtered.filter(p => p.visible).length;
  const hiddenCount = filtered.filter(p => !p.visible).length;

  const toggleVisibility = (id) => {
    setPhotoList(prev => prev.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  if (parentView) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Photo Gallery — Johnson Family View</h2>
          <button onClick={() => setParentView(false)} className="text-sm text-green-700 hover:text-green-900">&larr; Back to Admin</button>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-800 mb-6">
          Showing photos from Week 1 (Emma & Liam's week)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {parentFiltered.map((p, i) => (
            <div key={p.id} className={`${colors[i % colors.length]} rounded-xl aspect-square flex items-end p-3`}>
              <p className="text-xs text-gray-800 font-medium bg-white/80 rounded px-2 py-1">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
        <div className="flex gap-3">
          <select value={session} onChange={e => setSession(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value={0}>All Weeks</option>
            {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Week {s}</option>)}
          </select>
          <button onClick={() => setParentView(true)} className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800">
            Parent Preview
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Total Photos</p>
          <p className="text-2xl font-bold text-blue-700">{filtered.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Visible to Parents</p>
          <p className="text-2xl font-bold text-green-700">{visibleCount}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">Hidden</p>
          <p className="text-2xl font-bold text-gray-700">{hiddenCount}</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-green-400 transition-colors cursor-pointer">
        <svg className="w-10 h-10 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-sm text-gray-500">Drag and drop photos here, or <span className="text-green-700 font-medium">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <div key={p.id} className="relative group">
            <div className={`${colors[i % colors.length]} rounded-xl aspect-square flex items-end p-3`}>
              <p className="text-xs text-gray-800 font-medium bg-white/80 rounded px-2 py-1">{p.description}</p>
            </div>
            <div className="absolute top-2 left-2">
              <span className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">{p.cabin} — S{p.session}</span>
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={() => toggleVisibility(p.id)}
                className={`text-xs px-2 py-1 rounded font-medium transition-colors ${p.visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              >
                {p.visible ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
