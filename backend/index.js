const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT;

//sequelize
const db = require("./models/index.js");
const { getPlaylist, deletePlaylist, createPlaylist, updatePlaylist, getAllPlaylists, getPlaylistByDescriere, getPlaylistDescriere, getAllPlaylistsPagination } = require("./repository/playlist.js");
const { getSong, deleteSong, createSong, updateSong, getAllSongs, getSongsOfPlaylist, getAllPlaylistSongs } = require("./repository/songs.js");


const app = express();

app.use(bodyParser.json());
app.use(cors());

//REST for Playlists

//post
app.post("/playlists", async (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('descriere') || !req.body.hasOwnProperty('data'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = await createPlaylist(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

//get all  - /playlists?page=1&per_page=10
app.get("/playlists", async (req, res) => {
	try{
		console.log(req.query.per_page)
		console.log(req.query.page)
		if(req.query.per_page && req.query.page) {
			console.log("in")
			const nb_per_page = parseInt(req.query.per_page)
			const nb_page = parseInt(req.query.page)
			const nb_offset = nb_page * nb_per_page 
			const playlistsList = await db.Playlist.findAll({
				//offset: req.query.page * req.query.per_page,
				limit: nb_per_page,
				offset: nb_offset
			});
			console.log(playlistsList)
			res.json(playlistsList); 
		} else {
			const playlistsList = await getAllPlaylists()
			res.json(playlistsList); 
		}
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get all  
/*app.get("/playlists", async (req, res) => {
	try{
		const playlistsList = await getAllPlaylists();
		console.log(playlistsList)
		res.json(playlistsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});*/

//get one by id
app.get("/playlists/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const playlist = await getPlaylist(id);
	
		if (playlist !== null) {
			res.json(playlist);
		} else { 
			res.status(404).send(`Playlist ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update one by id
app.put("/playlists/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let playlistToUpdate = await updatePlaylist(id, req.body); 
		
		if (playlistToUpdate !== null) {
		res.json(playlistToUpdate);
		} else {
		res.status(404).send(`Playlist ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//delete one by id
app.delete("/playlists/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const playlistToDelete = await deletePlaylist(id);

		if (playlistToDelete.status === "success") {
			res.status(200).send(`Playlist ${id} was removed`);
		} else {
		res.status(404).send(`Playlist ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });


  //SORT
// get /playlists?sortField=id&sortOrder=1
app.get('/sortare/playlists', async (req, res) => {
	let sortedPlaylists = []
	let playlists = []
	console.log(req.query.sortField)
	if (req.query.sortField) {
	  const sortField = req.query.sortField
	  const sortOrder = req.query.sortOrder
		? parseInt(req.query.sortOrder)
		: 1
	try{
		playlists = await db.Playlist.findAll({limit:10})
		//console.log(playlists)
		if(playlists.length > 0) {
			    sortedPlaylists = Object.values(playlists).sort((first, second) => {
					if (first[sortField] === second[sortField]) {
						return 0
					} else {
					if (first[sortField] > second[sortField]) {
						return 1 * sortOrder
					} else {
						return -1 * sortOrder
					}
					}
			})}
		console.log("SORTARE: "+sortedPlaylists)
		} catch(err) {
			console.log(err)
		}
		  res.status(200).json(sortedPlaylists)
		} else {
			try{
				let playlistsList = await getAllPlaylists();
				console.log(playlistsList)
				res.json(playlistsList);
			}catch(err) {console.log(err)}
		} 
	  
})


//FILTER - to do cu doua criterii
app.get('/filter/playlists/', async (req, res) => {
	let filteredPlaylists = []
	let playlists = []
	console.log("1: "+req.query.descriere)
	//if()
	try{
		playlists = await db.Playlist.findAll({
			where: {descriere: req.query.descriere,
			        id: req.query.id,     //TO DO: de incercat si cu data ca al doilea filtru
				}
		})
		//console.log(playlists)
		/*if (req.query.descriere) {
			filteredPlaylists = Object.values(playlists).filter((e) => e.descriere === req.query.descriere)
			console.log(Object.values(playlists).filter((e) => e.descriere === req.query.descriere))
			//filteredPlaylists = Object.values(filteredPlaylistsInterm).filter((e) => e.id === req.query.id)
		  } else {
			filteredPlaylists = playlists
		  }*/
		  console.log("2: "+playlists)
		  
	} catch(err) {
		console.log(err)
	}
	res.json(playlists)

})




//AMBELE ENTITATI
//GET a specific Playlist's songs
/*app.get('/playlists/:playlistId/songs', async (req, res, next) => {
	try {
		const playlist = await getsongsOfPlaylist(req.params.playlistId)
		if(playlist) {
		res.status(200).json(playlist.songs)
	} else {
		res.status(404).json({ message: '404 - Playlist Not Found!' })
	}
	} catch (err) {
	next(err)
	}
})*/


//another method for getting the songs of a playlist
app.get('/playlists/:playlistId/songs', async (req, res, next) => {
	try {
	  const playlist = await db.Playlist.findByPk(req.params.playlistId)
	  if (playlist) {
		const songs = await playlist.getSongs()
		console.log(songs)
		if (songs.length >= 0) {
			res.json(songs)
		  } else {
			res.sendStatus(204)
		}
	  } else {
		res.status(404).json({ message: '404 - Playlist Not Found!' })
	  }
	} catch (err) {
	  next(err)
	}
})



// IMPORT
app.post("/", async (req, res, next) => {
    try {
        const registry = {};
        for (let m of req.body) {
            const playlist = await db.Playlist.create(m);
            for (let c of m.songs) {
                const song = await db.Song.create(c);
                registry[c.key] = song;
                playlist.addSong(song);
            }
            await playlist.save();
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// EXPORT
app.get("/", async (req, res, next) => {
	console.log("fac export")
    try {
        const result = [];
        for (let m of await db.Playlist.findAll()) {
            const playlist = {
                descriere: m.descriere,
                data: m.data,
                songs: [],
            };
            for (let c of await m.getSongs()) {
                playlist.songs.push({
                    id: c.id,
                    titlu: c.titlu,
					url: c.url,
					stilMuzica: c.stilMuzica
                });
            }
            result.push(playlist);
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        next(error);
    }
});


//REST for songs

//post
/*.post("/songs", async (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('titlu') || !req.body.hasOwnProperty('url') || !req.body.hasOwnProperty('stilMuzica'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = await createSong(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});*/

app.post("/playlists/:playlistId/songs", async (req, res) => {
	try {
		if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
		{
			console.log("primul if")
			res.status(400).json({message:"body is missing"})
		} 
		else if(!req.body.hasOwnProperty('titlu') || !req.body.hasOwnProperty('url') || !req.body.hasOwnProperty('stilMuzica'))
		{
			console.log("al doilea if")
			res.status(400).json({message:"malformed request"})
		}
		else {
			console.log(req.body)
			function_response = await createSong(req.params.playlistId, req.body)
			console.log(function_response)
			if (function_response === null)
				res.status(400).send()
			else
				res.status(200).send()
		} } catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
	}
})



//get all
app.get("/songs", async (req, res) => {
	try{
		const songsList = await getAllSongs();
		res.json(songsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get one by id
app.get("/songs/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const song = await getSong(id);
	
		if (song !== null) {
			res.json(song);
		} else { 
			res.status(404).send(`song ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update by id
app.put("/songs/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let songToUpdate = await updateSong(id, req.body);
		
		if (songToUpdate !== null) {
		res.json(songToUpdate);
		} else {
		res.status(404).send(`song ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//delete by id
app.delete("/songs/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const songToDelete = await deleteSong(id);

		if (songToDelete.status === "success") {
			res.status(200).send(`song ${id} was removed`);
		} else {
		res.status(404).send(`song ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});




//get song by songId from a specific Playlist
app.get(
	'/playlists/:playlistId/songs/:songId',
	async (req, res, next) => {
	  try {
		const playlist = await db.Playlist.findByPk(req.params.playlistId)
		if (playlist) {
		  const songs = await playlist.getSongs({
			where: {
			  id: req.params.songId
			}
		  })
		  const song = songs.shift()
		  res.status(200).json(song)
		} else {
		  res.status(404).json({ message: '404 - Playlist Not Found!' })
		}
	  } catch (error) {
		next(error)
	  }
	}
)



/**
 * PUT to update a song from a Playlist.
 */
 app.put(
	'/playlists/:playlistId/songs/:songId',
	async (req, res, next) => {
	  try {
		const playlist = await db.Playlist.findByPk(req.params.playlistId)
		if (playlist) {
		  const songs = await playlist.getSongs({
			id: req.params.songId
		  })
		  const song = songs.shift()
		  if (song) {
			song.titlu = req.body.titlu
			song.url = req.body.url
			song.stilMuzica = req.body.stilMuzica
			await song.save()
			res.status(202).json(song)
		  } else {
			res.status(404).json({ message: '404 - song Not Found!' })
		  }
		} else {
		  res.status(404).json({ message: '404 - Playlist Not Found!' })
		}
	  } catch (err) {
		next(err)
	  }
	}
  )
  
  /**
   * delete a song from a Playlist
   */
  app.delete(
	'/playlists/:playlistId/songs/:songId',
	async (req, res, next) => {
	  try {
		const playlist = await db.Playlist.findByPk(req.params.playlistId)
		if (playlist) {
		  const songs = await playlist.getSongs({
			id: req.params.songId
		  })
		  const song = songs.shift()
		  if (song) {
			await song.destroy()
			res.status(202).json({ message: 'song deleted!' })
		  } else {
			res.status(404).json({ message: '404 - song Not Found!' })
		  }
		} else {
		  res.status(404).json({ message: '404 - Playlist Not Found!' })
		}
	  } catch (err) {
		next(err)
	  }
	}
)



app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
