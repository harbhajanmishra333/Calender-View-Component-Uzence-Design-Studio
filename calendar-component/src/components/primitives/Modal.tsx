import React, { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface ModalProps {
  open: boolean
  onClose: () => void
  titleId?: string
  descriptionId?: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, titleId, descriptionId, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) focusable[0].focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={clsx('fixed inset-0 z-50 flex items-center justify-center p-4')}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-modal p-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
