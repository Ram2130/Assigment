'use client';

import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-[#efefce] text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-black text-2xl font-bold">
          TODO
        </Link>
        
      </div>
    </nav>
  )
}

export default Navbar