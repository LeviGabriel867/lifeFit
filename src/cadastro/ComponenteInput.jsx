import React from 'react'

const ComponenteInput = ({value, onChange, series, onChangeSeries, repeticoes, onChangeRepeticoes}) => {
  return (
    <div className='flex flex-col'>
      <input type="text" 
      placeholder='Nome exercicio' 
      value={value} 
      onChange={onChange} 
      className='placeholder-gray-800 text-black' />


      <input type="number"
      placeholder='Séries: '
      className='placeholder-gray-800 text-black' 
      value={series} 
      onChange={onChangeSeries}
      />

       
       <input type="number"
       placeholder='Repetições: '
       className='placeholder-gray-800 text-black'
       value={repeticoes} 
       onChange={onChangeRepeticoes}
       />
 
    </div>
  )
}

export default ComponenteInput