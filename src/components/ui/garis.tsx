import React from 'react'

interface garisProps{
    className?: string;
}

const Garis = (props:garisProps) => {
  return (
    <div className={`garis w-full h-[1px] bg-[#C7C7CD] my-5 ${props.className}`}></div>
  )
}

export default Garis