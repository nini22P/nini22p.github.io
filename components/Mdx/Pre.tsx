'use client'

import React, { useState, useRef } from 'react'
import { FaRegCopy, FaCheck } from 'react-icons/fa'

const Pre = ({ children, ...props }: React.ComponentProps<'pre'>) => {
  const [isCopied, setIsCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    if (!preRef.current) return

    const textToCopy = preRef.current.innerText
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Copy code"
      >
        {isCopied ? <FaCheck size={16} className="text-green-400" /> : <FaRegCopy size={16} />}
      </button>
      <pre ref={preRef} {...props} className={`${props.className || ''} relative`}>
        {children}
      </pre>
    </div>
  )
}

export default Pre