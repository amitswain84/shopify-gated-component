'use client'

interface CopyButtonProps {
  code: string
}

export function CopyButton({ code }: CopyButtonProps) {
  return (
    <button 
      onClick={() => navigator.clipboard.writeText(code)} 
      className="text-xs border rounded px-2 py-1"
    >
      Copy
    </button>
  )
}
