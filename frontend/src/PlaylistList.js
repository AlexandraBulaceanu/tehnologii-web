import { useEffect, useState } from 'react'
import handler from './PlaylistHandler'
import handler2 from './SongHandler'
import PlaylistAddForm from './PlaylistAddForm'
import Playlist from './Playlist'
import { Button } from 'primereact/button'
import CrewMemberAddForm from './SongAddForm'


function PlaylistList () {
  const [playlists, setPlaylists] = useState([])
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState(1)
  const [filterDescriere, setFilterDescriere] = useState('Amore')
  const [filterId, setFilterId] = useState('ROMANTIC')

  useEffect(() => {
    handler.getPlaylists()
    handler.emitter.addListener('GET_PLAYLISTS_SUCCES', () => {
      setPlaylists(handler.data)
    })
  }, [])

  /*useEffect(() => {
    handler.getAllPlaylistsFilter('Amore','ROMANCE')
    handler.emitter.addListener('GET_PLAYLISTS_FILTERED_SUCCES', () => {
      setPlaylists(handler.data)
    })
  }, [])*/

  useEffect(() => {
    handler.getAllPlaylistsSort('id', 1)
    handler.emitter.addListener('GET_PLAYLISTS_SORTED_SUCCES', () => {
      setPlaylists(handler.data)
    })
  }, [])

  useEffect(() => {
    handler.getPlaylistsPaginare(page, perPage)
    handler.emitter.addListener('GET_PLAYLISTS_PAGINATE_SUCCES', () => {
      setPlaylists(handler.data)
    })
  }, [])

  const addPlaylist = (playlist) => {
    handler.addPlaylist(playlist)
  }

  const deletePlaylist = (id) => {
    handler.deletePlaylist(id)
  }

  const savePlaylist = (id, playlist) => {
    handler.updatePlaylist(id, playlist)
  }

  const getSongs = (id) => {
    handler.getAllSongs(id)
  }

  const getAllPlaylistsFilter = (val1, val2) => {
    handler.getAllPlaylistsFilter(val1, val2)
  }

  const getAllPlaylistsSort = (sortField, sortOrder) => {
    handler.getAllPlaylistsSort(sortField, sortOrder)
  }

  const getAllPlaylistsPagination = (page, per_page) => {
    handler.getPlaylistsPaginare(page,per_page)
  }




  return (
    <div>
      <h3 style={{backgroundColor:'lightblue'}}>List of Playlists</h3>
      {playlists.map((e) => (
        <Playlist key={e.id} item={e} onDelete={deletePlaylist} onSave={savePlaylist} />
      ))}
      <h3 style={{backgroundColor:'lightblue'}}>Options</h3>
      <div className='row'>
     
      <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={() => handler.getPlaylists()}>Normal</Button>
      <div>
      <label>Page:</label>
        <input type='text' placeholder='pag' onChange={(evt) => setPage(evt.target.value)} />
      </div>
      <div>
      <label>Per Page:</label>
        <input type='text' placeholder='per pag' onChange={(evt) => setPerPage(evt.target.value)} />
      </div>
        <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={() => getAllPlaylistsPagination(page,perPage)}>Pagineaza</Button>
      <div>
      <label>Filtru descriere:</label>
        <input type='text' placeholder='descriere' onChange={(evt) => setFilterDescriere(evt.target.value)} />
      </div>
      <div>
      <label>Filtru id:</label>
        <input type='text' placeholder='id' onChange={(evt) => setFilterId(evt.target.value)} />
      </div>
        <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={() => getAllPlaylistsFilter(filterDescriere,filterId)}>Filtreaza</Button>
               <div>
      <label>Camp sortare:</label>
        <input type='text' placeholder='sortare' onChange={(evt) => setSortField(evt.target.value)} />
      </div>
      <div>
      <label>Ordine sortare:</label>
        <input type='number' placeholder='ordine' onChange={(evt) => setSortOrder(evt.target.value)} />
      </div>
        <Button icon='pi pi-times' className='p-button-rounded p-button-danger p-button-text'
              color="secondary" onClick={() => getAllPlaylistsSort(sortField,sortOrder)}>Sorteaza</Button>
      </div>
      <h3 style={{backgroundColor:'lightblue'}}>Add a new Playlist</h3>
      <PlaylistAddForm onAdd={addPlaylist} />

      
    </div>
  )
}

export default PlaylistList
