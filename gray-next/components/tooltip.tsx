'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

interface TooltipProps {
  children: React.ReactNode
  content: string
  id: string
  dark?: boolean
}

export default function Tooltip({
  children,
  content,
  id,
  dark = false
}: TooltipProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="relative">
      <button
        className={`block text-left text-zinc-500 underline decoration-dotted underline-offset-4 cursor-help ${dark ? 'decoration-zinc-600 ' : 'decoration-zinc-300'}`}
        aria-describedby={`tooltip-${id}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}        
      >
        {children}
      </button>
      <div id={`tooltip-${id}`} role="tooltip" className="z-10 absolute top-full left-0">
        <Transition
          as="div"
          show={open}
          className="w-[12.5rem] text-xs bg-white text-zinc-500 border border-zinc-200 px-3 py-2 rounded-sm shadow-lg overflow-hidden mt-1 transform transition duration-200 ease-out data-enter:data-closed:-translate-y-1 data-closed:opacity-0 "
        >
          {content}
        </Transition>
      </div>
    </div>
  )
}