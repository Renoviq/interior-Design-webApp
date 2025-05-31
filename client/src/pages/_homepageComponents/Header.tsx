import { UserNav } from '@/components/user-nav';
import React from 'react'

function Header() {
  return (
    <div className='sticky top-0 z-50'>
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a href="/">
              <h1 className="text-xl text-primary font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
                Renoviq<span className="text-black">AI</span>
              </h1>
            </a>
            <span className="hidden sm:inline text-sm text-slate-500 border-l border-slate-300 pl-3 ml-3">
              Your Personal AI Home Renovator
            </span>
          </div>
          <UserNav />
        </div>
      </header>
    </div>
  )
}

export default Header;