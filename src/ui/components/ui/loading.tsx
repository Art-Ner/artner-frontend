"use client"

import React from "react"

export function Loading({ label = "로딩 중..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-3">
        <span
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
          aria-hidden
        />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </div>
  )
}

export default Loading


