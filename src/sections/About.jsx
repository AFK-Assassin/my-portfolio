import React from 'react'
import boy from '../assets/boy.jpg'

export default function About() {

  const glows = [
    // Top-left glow — soft teal
    "top-10 left-10 h-[200px] w-[200px] opacity-30 blur-[120px] from-[#00bf8f] to-[#1cd8d2]",
    // Center glow — faint blue
    "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[150px] w-[150px] opacity-20 blur-[140px] from-[#302b63] to-[#00bf8f]",
    // Bottom-right glow — stronger cyan
    "bottom-20 right-20 h-[220px] w-[220px] opacity-40 blur-[160px] from-[#1cd8d2] to-[#00bf8f]"
  ]

  return (
    <section 
      id='about'
      className='w-full min-h-screen relative bg-black text-white flex items-center justify-center overflow-hidden'>

      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((c, i) => (
          <div 
            key={i} 
            className={`absolute ${c} rounded-full bg-gradient-to-r animate-pulse`} 
          />
        ))}
      </div>

          {/* content wrapper */}
      <div className='relative z-10 mx-auto px-6 md:px-10 lg:px-12 w-full max-w-6xl py-20 bg-amber-300 gap-10 flex flex-col'>

          {/* main content */}
        <div className='flex flex-col md:flex-row sm:items-stretch gap-8 '>

        </div>
       
      </div>
    </section>
  )
}
