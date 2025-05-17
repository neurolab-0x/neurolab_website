import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/#projects' },
  { label: 'Team', href: '/#team' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Blog', href: 'https://neurolabog.blogspot.com', external: true },
];

const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="md:hidden">
      <div className="flex items-center justify-between p-4">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10 focus:outline-none"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setOpen(false)} />
          {/* Drawer */}
          <div className="relative w-full h-screen flex flex-col animate-slideInLeft overflow-y-auto border-r border-white/10 shadow-2xl">
            {/* Gradient and grid backgrounds */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col h-full p-6 backdrop-blur-xl bg-white/80">
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  Neurolab
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-white/20 shadow focus:outline-none"
                >
                  <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block px-3 py-3 rounded-lg text-lg font-medium text-gray-800 hover:text-blue-500 transition-colors relative overflow-hidden"
                        onClick={() => setOpen(false)}
                      >
                        <span>{item.label}</span>
                        <span className="absolute left-3 right-3 bottom-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className="group block px-3 py-3 rounded-lg text-lg font-medium text-gray-800 hover:text-blue-500 transition-colors relative overflow-hidden"
                        onClick={() => setOpen(false)}
                      >
                        <span>{item.label}</span>
                        <span className="absolute left-3 right-3 bottom-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.25s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </nav>
  );
};

export default MobileNavbar; 