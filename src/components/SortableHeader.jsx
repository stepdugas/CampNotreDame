import { useState } from 'react';

export default function SortableHeader({ label, sortKey, sortConfig, onSort, className = '' }) {
  const active = sortConfig.key === sortKey;
  const arrow = active ? (sortConfig.dir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <th
      className={`px-4 py-3 font-medium cursor-pointer select-none hover:text-gray-900 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
    >
      {label}{arrow}
    </th>
  );
}

export function useSort(defaultKey = null) {
  const [sortConfig, setSortConfig] = useState({ key: defaultKey, dir: 'asc' });

  const onSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    );
  };

  const sortFn = (data, getValue) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = getValue(a, sortConfig.key);
      const bVal = getValue(b, sortConfig.key);
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.dir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortConfig.dir === 'asc' ? cmp : -cmp;
    });
  };

  return { sortConfig, onSort, sortFn };
}
