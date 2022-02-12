import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:3001'

class SongHandler {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAllSongs () {
    try {
      const response = await fetch(`${SERVER}/songs`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_SONGS_SUCCES')
    } catch (err) {
      console.warn('GET_SONGS_ERROR')
    }
  }

  async addSong (id, song) {
    try {
      const response = await fetch(`${SERVER}/playlists/${id}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      })
      if (!response.ok) {
        throw response
      }
      this.getAllSongs()
    } catch (err) {
      console.warn('ADD_SONGS_ERROR')
    }
  }

  async updateSong (playlistId, songId, song) {
    try {
      const response = await fetch(`${SERVER}/playlists/${playlistId}/songs/${songId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
      })
      if (!response.ok) {
        throw response
      }
      this.getAllSongs()
    } catch (err) {
      console.warn('UPDATE_SONG_ERROR')
    }
  }

  async deleteSong (playlistId, songId) {
    try {
      console.log(playlistId)
      console.log(songId)
      const response = await fetch(`${SERVER}/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE'
      })
      console.log(response)
      if (!response.ok) {
        throw response
      }
      this.getAllSongs()
    } catch (err) {
      console.warn('DELETE_SONG_ERROR')
    }
  }

  async getSongFromPlaylist (playlistId, songId) {
    try {
      const response = await fetch(`${SERVER}/playlists/${playlistId}/songs/${songId}`)
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('GET_PLAYLIST_SONG_SUCCES')
    } catch (err) {
      console.warn('GET_PLAYLIST_SONG_ERROR')
    }
  }


}

const store = new SongHandler()

export default store
