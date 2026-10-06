import React, { useState } from 'react'

/**
 * Robust lexical tokenizer for JavaScript / JSON code lines.
 * Eliminates HTML injection bugs by returning structured token objects.
 */
function tokenizeLine(line) {
  const tokens = []
  let remaining = line

  while (remaining.length > 0) {
    // 1. Comments
    if (remaining.startsWith('//')) {
      tokens.push({ type: 'comment', value: remaining })
      break
    }

    // 2. Whitespace
    const spaceMatch = remaining.match(/^\s+/)
    if (spaceMatch) {
      tokens.push({ type: 'text', value: spaceMatch[0] })
      remaining = remaining.slice(spaceMatch[0].length)
      continue
    }

    // 3. Strings (double, single, or backtick quotes)
    const strMatch = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/)
    if (strMatch) {
      tokens.push({ type: 'string', value: strMatch[0] })
      remaining = remaining.slice(strMatch[0].length)
      continue
    }

    // 4. Arrow function syntax
    if (remaining.startsWith('=>')) {
      tokens.push({ type: 'arrow', value: '=>' })
      remaining = remaining.slice(2)
      continue
    }

    // 5. Numbers
    const numMatch = remaining.match(/^\d+/)
    if (numMatch) {
      tokens.push({ type: 'number', value: numMatch[0] })
      remaining = remaining.slice(numMatch[0].length)
      continue
    }

    // 6. Keywords, Booleans, Object Properties, Functions, Identifiers
    const wordMatch = remaining.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/)
    if (wordMatch) {
      const word = wordMatch[0]
      const afterWord = remaining.slice(word.length).trimStart()

      if (/^(const|let|var|function|return|new|while|for|if|else|import|export|default)$/.test(word)) {
        tokens.push({ type: 'keyword', value: word })
      } else if (/^(true|false|null|undefined)$/.test(word)) {
        tokens.push({ type: 'boolean', value: word })
      } else if (afterWord.startsWith(':')) {
        tokens.push({ type: 'property', value: word })
      } else if (afterWord.startsWith('(')) {
        tokens.push({ type: 'function', value: word })
      } else {
        tokens.push({ type: 'identifier', value: word })
      }

      remaining = remaining.slice(word.length)
      continue
    }

    // 7. Punctuation & Delimiters
    const char = remaining[0]
    if ('{}[](),;:.+-*/=<>!&|'.includes(char)) {
      tokens.push({ type: 'punctuation', value: char })
      remaining = remaining.slice(1)
      continue
    }

    // 8. Fallback
    tokens.push({ type: 'text', value: char })
    remaining = remaining.slice(1)
  }

  return tokens
}

const TOKEN_CLASSES = {
  comment: 'text-slate-500 italic',
  string: 'text-emerald-400 font-normal',
  keyword: 'text-purple-400 font-semibold',
  arrow: 'text-purple-400 font-bold',
  boolean: 'text-purple-400 font-medium',
  number: 'text-amber-300 font-medium',
  property: 'text-cyan-300 font-medium',
  function: 'text-blue-300 font-medium',
  punctuation: 'text-slate-400',
  identifier: 'text-slate-100',
  text: 'text-slate-300',
}

/**
 * SRP: Reusable formatted code snippet block with syntax styling, line numbers, and copy button
 */
export default function CodeSnippet({
  code,
  language = 'javascript',
  className = '',
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const lines = code.trim().split('\n')

  return (
    <div
      className={`relative group bg-slate-950/95 border border-white/10 rounded-xl p-3.5 sm:p-4 overflow-x-auto shadow-inner w-full min-h-[140px] flex flex-col justify-center ${className}`}
    >
      {/* Top right language badge & copy button */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-2">
        <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] px-2 py-0.5 rounded font-mono border border-white/15 cursor-pointer shadow-sm"
          title="Copiar código"
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto">
        <div className="table w-full">
          {lines.map((line, idx) => {
            const tokens = tokenizeLine(line)
            return (
              <div key={idx} className="table-row">
                <span className="table-cell pr-3 select-none text-slate-600 text-[11px] text-right w-6 font-mono">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono">
                  {tokens.length === 0
                    ? '\u00A0'
                    : tokens.map((token, tIdx) => (
                        <span
                          key={tIdx}
                          className={TOKEN_CLASSES[token.type] || 'text-slate-300'}
                        >
                          {token.value}
                        </span>
                      ))}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
