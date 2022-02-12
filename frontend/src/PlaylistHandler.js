import { EventEmitter } from 'fbemitter'

//const SERVER = 'http://localhost:3001'
const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

class PlaylistHandler {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getPlaylists () {
    try {
      const response = await fetch(`${SERVER}/playlists`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLISTS_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLISTS_ERROR')
    }
  }

  async addPlaylist (playlist) {
    try {
      const response = await fetch(`${SERVER}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
      })
      if (!response.ok) {
        throw response
      }
      this.getPlaylists()
    } catch (err) {
      console.warn('ADD_PLAYLIST_ERROR')
    }
  }

  async updatePlaylist (id, playlist) {
    try {
      const response = await fetch(`${SERVER}/playlists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
      })
      if (!response.ok) {
        throw response
      }
      this.getPlaylists()
    } catch (err) {
      console.warn('UPDATE_PLAYLIST_ERROR')
    }
  }

  async deletePlaylist (id) {
    try {
      const response = await fetch(`${SERVER}/playlists/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw response
      }
      this.getPlaylists()
    } catch (err) {
      console.warn('DELETE_PLAYLIST_ERROR')
    }
  }

  async getAllSongs (id) {
    try {
      const response = await fetch(`${SERVER}/playlists/${id}/songs`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLIST_SONGS_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLIST_SONGS_ERROR')
    }
  }

  async getAllPlaylistsSort (sortField,sortOrder) {
    try {
      const response = await fetch(`${SERVER}/sortare/playlists?sortField=${sortField}&sortOrder=${sortOrder}`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLISTS_SORTED_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLISTS_SORTED_ERROR')
    }
  }

  async getAllPlaylistsFilter (val1, val2) {
    try {
      const response = await fetch(`${SERVER}/filter/playlists?descriere=${val1}&id=${val2}`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLISTS_SORTED_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLISTS_SORTED_ERROR')
    }
  }

  async getPlaylistsPaginare (page, per_page) {
    try {
      const response = await fetch(`${SERVER}/playlists?page=${page}&per_page=${per_page}`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLISTS_PAGINATE_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLISTS_PAGINATE_ERROR')
    }
  }

  async exportFront () {
    try {
      const response = await fetch(`${SERVER}/`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_IMPORT_SUCCES')
    }catch (err) {
      console.warn('GET_IMPORT_ERROR')
    }
  }


}

const store = new PlaylistHandler()

export default store
