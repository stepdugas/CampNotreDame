import { useState } from 'react';
import { campers, cabins } from '../data/seedData';

export default function BunkingBoard() {
  const [camperList, setCamperList] = useState(campers.filter(c => c.cabin));
  const [draggedCamper, setDraggedCamper] = useState(null);

  const getCabinCampers = (cabinId) => camperList.filter(c => c.cabin === cabinId);

  const capacityColor = (count, capacity) => {
    if (count > 10) return 'text-red-600 bg-red-50';
    if (count >= 8) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const handleDragStart = (e, camper) => {
    setDraggedCamper(camper);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, cabinId) => {
    e.preventDefault();
    if (!draggedCamper) return;
    const cabin = cabins.find(c => c.id === cabinId);
    if (cabin.gender === 'Girls' && draggedCamper.gender !== 'Female') return;
    if (cabin.gender === 'Boys' && draggedCamper.gender !== 'Male') return;

    setCamperList(prev =>
      prev.map(c => c.id === draggedCamper.id ? { ...c, cabin: cabinId } : c)
    );
    setDraggedCamper(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const girlsCabins = cabins.filter(c => c.gender === 'Girls');
  const boysCabins = cabins.filter(c => c.gender === 'Boys');

  const renderCabin = (cabin) => {
    const assigned = getCabinCampers(cabin.id);
    const count = assigned.length;
    return (
      <div
        key={cabin.id}
        onDrop={e => handleDrop(e, cabin.id)}
        onDragOver={handleDragOver}
        className="bg-white rounded-xl border border-gray-200 p-4 min-w-[200px]"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">{cabin.name}</h4>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${capacityColor(count, cabin.capacity)}`}>
            {count}/{cabin.capacity}
          </span>
        </div>
        <div className="space-y-2 min-h-[80px]">
          {assigned.map(c => (
            <div
              key={c.id}
              draggable
              onDragStart={e => handleDragStart(e, c)}
              className="bg-gray-50 rounded-lg px-3 py-2 text-sm cursor-grab active:cursor-grabbing border border-gray-100 hover:border-green-300 transition-colors"
            >
              <div className="font-medium text-gray-800">{c.firstName} {c.lastName}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-xs">Age {c.age}</span>
                {c.bunkRequest && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">request</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Bunking Board</h2>
      <p className="text-sm text-gray-500 mb-6">Drag and drop campers between cabins. Gender-restricted.</p>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-pink-400"></span> Girls Cabins
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {girlsCabins.map(renderCabin)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400"></span> Boys Cabins
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {boysCabins.map(renderCabin)}
        </div>
      </div>
    </div>
  );
}
