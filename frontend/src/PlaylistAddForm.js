import { useState } from 'react'
import { Button } from 'primereact/button'

function PlaylistAddForm (props) {
  const { onAdd } = props
  const [descriere, setDescriere] = useState('')
  const [id, setId] = useState(0)
  const [data, setData] = useState('2023-03-23')


  const add = (evt) => {
    onAdd({
      descriere,
      data
    })
  }

  return (
    <div className='row'>
      
      <div div className='content'>
      <label>Descriere:</label>
        <input type='text' placeholder='descriere' onChange={(evt) => setDescriere(evt.target.value)} />
      </div>
      <div div className='content'>
        <label>Data disponibil:</label>
        <input type='date' placeholder='data disponibil' onChange={(evt) => setData(evt.target.value)} />
      </div>
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button backgroundColor="green" icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={add}>Add</Button>
      </div>
    </div>
  )
}

export default PlaylistAddForm
