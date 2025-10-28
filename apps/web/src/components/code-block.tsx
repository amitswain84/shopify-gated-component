'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  fileName: string
  className?: string
  matchHeight?: boolean
}

export function CodeBlock({ code, fileName, className = '', matchHeight = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const heightClass = matchHeight ? 'h-full' : 'min-h-[300px]'
  const lines = code.split('\n')

  return (
    <div className={`rounded-lg border border-[#3e3e42] overflow-hidden bg-[#1e1e1e] flex flex-col ${heightClass} ${className} w-full`}>
      {/* File name bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#3e3e42] bg-[#252526] min-w-0">
        <code className="text-[10px] sm:text-xs text-[#cccccc] font-mono truncate pr-2 flex-1 min-w-0">{fileName}</code>
        <button
          onClick={copyToClipboard}
          className="p-1.5 hover:bg-[#2a2d2e] rounded transition-colors shrink-0"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
          ) : (
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cccccc]" />
          )}
        </button>
      </div>
      {/* Code content with line numbers */}
      <div className="overflow-auto flex-1 bg-[#1e1e1e]">
        <div className="flex">
          {/* Line numbers */}
          <div className="select-none bg-[#1e1e1e] text-[#858585] text-right py-3 sm:py-4 pl-3 sm:pl-4 pr-3 border-r border-[#3e3e42] min-w-[3rem] sm:min-w-[3.5rem]">
            <pre className="text-[11px] sm:text-[13px] leading-[1.6] font-mono">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </pre>
          </div>
          {/* Code */}
          <div className="flex-1 py-3 sm:py-4 px-3 sm:px-4">
            <pre className="text-[11px] sm:text-[13px] leading-[1.6] font-mono">
              <code className="font-mono whitespace-pre" style={{ 
                color: '#d4d4d4',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace'
              }}>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
