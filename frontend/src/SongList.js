import { useEffect, useState } from 'react'
import handler from './SongHandler'
import SongAddForm from './SongAddForm'
import { Button } from 'primereact/button'
import Song from './Song'


function SongList (props) {
  let { songList, playlistId } = props
  const [songs, setSongs] = useState([])

  if(songList == null) songList = []
 /* useEffect(() => {
    handler.getAllSongs()
    handler.emitter.addListener('GET_SONGS_SUCCES', () => {
      setSongs(handler.data)
      //setSongs(songList)
    })
  }, []) */


  const addSong = (playlistId, song) => {
    handler.addSong(playlistId, song)
  }

  const deleteSong = (playlistId, songId) => {
    console.log(songId)
    handler.deleteSong(playlistId, songId)
  }

  const saveSong = (playlistId, songId, song) => {
    handler.updateSong(playlistId, songId, song)
  }



  return (
    <div>
      <h5 style={{backgroundColor:'lightblue'}}>List of songs for playlist {playlistId}</h5>
      {songList.map((e) => (
        <Song key={e.id} item={e} playlistId={playlistId} onDelete={deleteSong} onSave={saveSong} />
      ))}

      <h3 style={{backgroundColor:'lightblue'}}>Add a new Song</h3>
      <SongAddForm playlist={playlistId} onAdd={addSong} />
     
      <h3 style={{backgroundColor:'lightblue'}}>Rest List of Playlists</h3>
    </div>
  )
}

export default SongList
