'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Copy, Check, Info } from 'lucide-react'
import { CodeBlock } from './code-block'
import { TableOfContents } from './table-of-contents'
import { useToc } from '@/contexts/toc-context'
import { Badge } from '@/components/ui/badge'

interface ComponentDocsProps {
  title: string
  description: string
  problemStatement?: string
  fileName: string
  thumbnail: string
  code: string
  implementationSteps: string[]
  customizationGuide?: {
    title: string
    content: string
  }[]
  // When true, show lockedContent instead of the code section (for Pro components without access)
  locked?: boolean
  lockedContent?: React.ReactNode
  // Optional meta
  variantCount?: number
  isFree?: boolean
  // Legacy props for backward compatibility
  tags?: string[]
  image?: string
  children?: React.ReactNode
}

export function ComponentDocs({
  title,
  description,
  problemStatement,
  fileName,
  thumbnail,
  code,
  implementationSteps,
  customizationGuide,
  locked = false,
  lockedContent,
  variantCount,
  isFree,
  // Legacy props
  tags,
  image,
  children,
}: ComponentDocsProps) {
  const [copiedFileName, setCopiedFileName] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const { setItems } = useToc()

  const copyToClipboard = async (text: string, type: 'fileName' | 'code') => {
    await navigator.clipboard.writeText(text)
    if (type === 'fileName') {
      setCopiedFileName(true)
      setTimeout(() => setCopiedFileName(false), 2000)
    } else {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  // Legacy mode check
  const isLegacyMode = !fileName && tags
  const displayImage = thumbnail || image

  // Generate TOC items with useMemo to prevent unnecessary re-renders
  const tocItems = useMemo(() => [
    ...(problemStatement ? [{ id: 'problem-statement', title: 'Key issue', level: 2 }] : []),
    { id: 'installation', title: 'Installation', level: 2 },
    { id: 'preview', title: 'Preview', level: 2 },
    { id: 'code', title: 'Code', level: 2 },
    { id: 'implementation-guide', title: 'Implementation Guide', level: 2 },
    ...(customizationGuide && customizationGuide.length > 0 ? [{ id: 'customization', title: 'Customization', level: 2 }] : []),
  ], [problemStatement, customizationGuide])

  // Update TOC context for mobile dropdown
  useEffect(() => {
    setItems(tocItems)
    return () => setItems([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tocItems])

  if (isLegacyMode) {
    // Legacy layout for backward compatibility
    return (
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          {tags && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <span key={t} className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground">#{t}</span>
              ))}
            </div>
          )}
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg overflow-hidden">
            <Image src={displayImage || ''} alt={title} width={768} height={400} className="w-full h-auto object-cover" />
          </div>
          <CodeBlock code={code} fileName="component.tsx" />
        </section>

        <section className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Implementation Guide</h2>
          {children}
        </section>
      </div>
    )
  }

  // New comprehensive layout
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 w-full max-w-3xl space-y-6 sm:space-y-8 py-4 overflow-x-hidden">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">{title}</h1>
              {typeof isFree === 'boolean' && (
                <Badge variant={isFree ? 'outline' : 'default'} className="text-[10px] h-5 px-2 py-0.5">
                  {isFree ? 'Free' : 'Pro'}
                </Badge>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Problem Statement */}
          {problemStatement && (
            <div id="problem-statement" className="flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/60 border scroll-mt-20">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">Key issue</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{problemStatement}</p>
              </div>
            </div>
          )}

          {/* File Name */}
          <div id="installation" className="space-y-2 scroll-mt-20">
            <h2 className="text-base font-semibold">
<Badge variant="secondary" className="h-5 rounded-sm px-2 py-0 text-[10px] font-medium uppercase">Copy File Name</Badge>
            </h2>
            <div className="flex items-center gap-2 p-3 sm:p-4 rounded-lg bg-muted border overflow-x-auto">
              <code className="flex-1 text-xs sm:text-sm font-mono break-all">{fileName}</code>
              <button
                onClick={() => copyToClipboard(fileName, 'fileName')}
                className="p-2 hover:bg-background rounded-md transition-colors shrink-0"
                title="Copy"
              >
                {copiedFileName ? (
                  <Check className="w-4 h-4 text-foreground" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Preview and Code */}
          <div className="space-y-6">
            {/* Preview */}
            <div id="preview" className="space-y-3 w-full scroll-mt-20">
              <h2 className="text-base font-semibold">
<Badge variant="secondary" className="h-5 rounded-sm px-2 py-0 text-[10px] font-medium uppercase">Preview</Badge>
              </h2>
              <div className="rounded-lg border overflow-hidden bg-background w-full">
                <Image 
                  src={displayImage || ''} 
                  alt={`${title} preview`}
                  width={768}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Code */}
            <div id="code" className="space-y-3 w-full scroll-mt-20">
              <h2 className="text-base font-semibold">
<Badge variant="secondary" className="h-5 rounded-sm px-2 py-0 text-[10px] font-medium uppercase">Code</Badge>
              </h2>
              {locked ? (
                <div className="border rounded-lg p-4">
                  {lockedContent}
                </div>
              ) : (
                <CodeBlock code={code} fileName={fileName} />
              )}
            </div>
          </div>

          {/* Implementation Guide */}
          <div id="implementation-guide" className="space-y-3 sm:space-y-4 scroll-mt-20">
            <h2 className="text-base font-semibold">
<Badge variant="secondary" className="h-5 rounded-sm px-2 py-0 text-[10px] font-medium uppercase">Implementation Guide</Badge>
            </h2>
            <div className="space-y-3">
              {implementationSteps.map((step, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-sm sm:text-base text-muted-foreground pt-0.5 sm:pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Guide */}
          {customizationGuide && customizationGuide.length > 0 && (
            <div id="customization" className="space-y-3 sm:space-y-4 scroll-mt-20">
              <h2 className="text-base font-semibold">
<Badge variant="secondary" className="h-5 rounded-sm px-2 py-0 text-[10px] font-medium uppercase">Customization</Badge>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {customizationGuide.map((section, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    {!(customizationGuide.length === 1 && (section.title || '').toLowerCase() === 'customization') && (
                      <h3 className="text-base sm:text-lg font-semibold">{section.title}</h3>
                    )}
                    <p className="text-sm sm:text-base text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Content */}
          {children && (
            <div className="space-y-4">
              {children}
            </div>
          )}
        </div>

          {/* Table of Contents Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0 lg:pt-4">
            <div className="sticky top-20">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
