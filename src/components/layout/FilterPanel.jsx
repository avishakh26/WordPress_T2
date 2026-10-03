import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';

/*
 * Category / brand filter. On desktop it is the usual sidebar; on phones it collapses into a
 * "Filter" button at the top left that opens a slide-in drawer, so the products come first.
 */
const FilterPanel = ({ title, items, activeLabel }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const list = (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.to}
            onClick={() => setOpen(false)}
            aria-current={item.active ? 'page' : undefined}
            className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-orange-50 hover:text-primary transition-colors ${
              item.active ? 'bg-orange-50 text-primary font-semibold border-l-4 border-primary' : 'text-secondary'
            }`}
          >
            <span className="capitalize">{item.label}</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
          <div className="bg-primary text-white px-4 py-3 font-bold font-montserrat uppercase text-sm tracking-wider">{title}</div>
          <div className="max-h-[70vh] overflow-y-auto">{list}</div>
        </div>
      </aside>

      {/* Mobile: filter button + drawer */}
      <div className="md:hidden flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-secondary active:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" aria-hidden="true" /> Filter
        </button>
        <span className="text-sm text-gray-500 truncate capitalize">{activeLabel}</span>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label={title}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-xs bg-white shadow-2xl flex flex-col animate-[slideInLeft_.25s_ease-out]">
            <div className="bg-primary text-white px-4 py-3.5 flex items-center justify-between">
              <span className="font-bold font-montserrat uppercase text-sm tracking-wider">{title}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close filter" className="p-1.5 -mr-1.5 rounded-full hover:bg-white/20">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{list}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
