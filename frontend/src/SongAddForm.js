import { useState } from 'react'
import { Button } from 'primereact/button'

function SongAddForm (props) {
  const { playlist, onAdd } = props
  const [titlu, setTitlu] = useState('')
  const [id, setId] = useState(0)
  const [url, setUrl] = useState('http://foo.com')
  const [stilMuzica, setStilMuzica] = useState('POP')
  //const [playlistId, setPlaylistId] = useState(0)  

  const add = (evt) => {
    onAdd(playlist, {
      titlu,
      url,
      stilMuzica,
      //playlistId
    })
  }

  return (
    <div className='row'>
      
    
      <div div className='content'>
      <label>Titlu:</label>
        <input type='text' placeholder='titlu' onChange={(evt) => setTitlu(evt.target.value)} />
      </div>
      <div div className='content'>
        <label>
            StilMuzica:
            <select value={stilMuzica} onChange={(evt) => setStilMuzica(evt.target.value)}>
              <option value="POP">POP</option>
              <option value="ALTERNATIVE">ALTERNATIVE</option>
              <option value="ROCK">ROCK</option>
              <option value="RAP">RAP</option>
            </select>
          </label>
      </div>
      <div div className='content'>
      <label>url:</label>
        <input type='text' placeholder='url' onChange={(evt) => setUrl(evt.target.value)} />
      </div>
     
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button backgroundColor="green" icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={add}>Add</Button>
      </div>
    </div>
  )
}

export default SongAddForm
