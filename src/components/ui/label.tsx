import React from 'react'
interface LabelProps {
  label?: string
  className?: string
}

const Label = (props: LabelProps) => {
  return (
    <div className={`text-[#3D3D3D] mb-1 ${props.className}`}>{props.label}</div>
  )
}

export default Label