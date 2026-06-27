import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* Collapses long content on MOBILE only (clamps height + "Show more" button)
   so the page feels shorter on phones. On desktop (lg+) it always shows fully. */
export default function MobileCollapse({ children, maxHeight = 460 }: { children: any; maxHeight?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden lg:!max-h-none"
        style={{ maxHeight: open ? undefined : maxHeight }}
      >
        {children}
        {!open && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent lg:hidden pointer-events-none" />
        )}
      </div>

      {!open && (
        <div className="flex justify-center lg:hidden mt-6">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-neon-green hover:border-neon-green/40 transition-colors"
          >
            Show more <ChevronDown size={16} />
          </button>
        </div>
      )}
    </>
  );
}
