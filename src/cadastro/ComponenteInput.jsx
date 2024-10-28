import React from 'react'

const ComponenteInput = ({value, onChange}) => {
  return (
    <div>
      <input type="text" 
      placeholder='Nome exercicio' 
      value={value} 
      onChange={onChange} 
      className='placeholder-gray-800 text-black'/>
    </div>
  )
}

export default ComponenteInput