"use client"

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#7BAB8B] hover:bg-[#629878] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
    >
      Print / Save PDF
    </button>
  )
}
