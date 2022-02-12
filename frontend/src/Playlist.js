import { useState } from 'react'
import './Playlist.css'
import { Button } from 'primereact/button'
import handler from './PlaylistHandler'
import Song from './Song'
import SongList from './SongList'

function Playlist (props) {
  const { item, onDelete, onSave } = props
  const [isEditing, setIsEditing] = useState(false)
  const [descriere, setDescriere] = useState(item.descriere)
  const [data, setData] = useState(item.data)
  const [children, setChildren] = useState([])
  const [visible, setVisible] = useState(false)

  const deletePlaylist = (evt) => {
    onDelete(item.id)
  }

  const getChildren = (evt) => {
    handler.getAllSongs(item.id)
    handler.emitter.addListener('GET_PLAYLIST_SONGS_SUCCES', () => {
      setChildren(handler.data)
      setVisible(true)
    })

  }

  const savePlaylist = (evt) => {
    onSave(item.id, { descriere, data })
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
            This is a Playlist described as: <input type='text' value={descriere} onChange={(evt) => setDescriere(evt.target.value)} />
            from date: <input type='text' value={data} onChange={(evt) => setData(evt.target.value)} />
            <input type='button' value='save' onClick={savePlaylist} />
            <input type='button' value='cancel' onClick={cancel} />
          </div>
          )
        : (
          <div className='row'>
            This is a Playlist with id : <span className='id'>{item.id}</span> 
            described as: <span className='title'>{item.descriere}</span> from date:{' '}
            <span className='content'style={{ backgroundColor: 'lightblue' }}>{item.data}</span>
            <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
            color="secondary" onClick={deletePlaylist}>Delete</Button>
            
            <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
            color="secondary" onClick={edit}>Edit</Button>

            <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
            color="secondary" onClick={getChildren}>Entitati copii - Songs</Button>

          <>{visible ? ( <SongList songList={children} playlistId={item.id}/>) : (<div></div>)}</>
          </div>
          )}
    </>
  )
}

export default Playlist
