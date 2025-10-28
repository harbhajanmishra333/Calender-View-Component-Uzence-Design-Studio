import React from 'react'

interface Option { label: string; value: string }
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => (
  <select
    className="h-10 px-3 rounded-md border border-neutral-300 bg-white text-sm focus-visible:ring-2 focus-visible:ring-primary-500"
    {...props}
  >
    {options.map(o => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
)
