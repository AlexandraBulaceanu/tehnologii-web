import { useState } from 'react'
import './Playlist.css'
import { Button } from 'primereact/button'
import handler from './SongHandler'


function Song (props) {

  const { item, onDelete, onSave, playlistId } = props
  const [isEditing, setIsEditing] = useState(false)
  const [titlu, setTitlu] = useState(item.titlu)
  const [url, setUrl] = useState(item.url)
  const [stilMuzica, setStilMuzica] = useState(item.stilMuzica)

  const deleteSong = (evt) => {
    console.log(playlistId)
    console.log(item.id)
    onDelete(playlistId, item.id)
  }

  const saveSong = (evt) => {
    onSave(playlistId, item.id, { titlu, url, stilMuzica })
    setIsEditing(false)
  }

  const edit = () => {
    setIsEditing(true)
  }

  const cancel = () => {
    setIsEditing(false)
  }


  return (
    <>
      {isEditing
        ? (
          <div className='row'>
            This is a song named: <input type='text' value={titlu} onChange={(evt) => setTitlu(evt.target.value)} />
            with url: <input type='text' value={url} onChange={(evt) => setUrl(evt.target.value)} />
            with musical style: <input type='text' value={stilMuzica} onChange={(evt) => setStilMuzica(evt.target.value)} />
            <input type='button' value='save' onClick={saveSong} />
            <input type='button' value='cancel' onClick={cancel} />
          </div>
          )
        : (
          <div className='row'>
            This is a Song named: <span className='title'>{item.titlu}</span> with musical style:{' '}
            <span className='content'style={{ backgroundColor: 'lightblue' }}>{item.stilMuzica}</span>
            <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
            color="secondary" onClick={deleteSong}>Delete</Button>
            
            <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
            color="secondary" onClick={edit}>Edit</Button>

            
          </div>
          )}
    </>
  )
}

export default Song
