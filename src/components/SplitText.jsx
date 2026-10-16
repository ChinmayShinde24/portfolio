import React from 'react'

/**
 * Splits text into per-character spans for animation.
 * Words are wrapped in whitespace-nowrap so they never break mid-word.
 */
const SplitText = ({ text, className = '', charClassName = '' }) => {
  const parts = text.split(/(\s+)/)

  return (
    <span className={className} aria-label={text}>
      {parts.map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return (
            <span key={`space-${partIndex}`} aria-hidden="true">
              {'\u00A0'}
            </span>
          )
        }

        return (
          <span
            key={`word-${partIndex}`}
            className="inline-block whitespace-nowrap"
            aria-hidden="true"
          >
            {Array.from(part).map((char, charIndex) => (
              <span
                key={`${partIndex}-${charIndex}`}
                className={`char inline-block ${charClassName}`.trim()}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </span>
        )
      })}
    </span>
  )
}

export default SplitText
