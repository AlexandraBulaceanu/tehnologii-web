const db = require("../models");
const Song = require("../models/Song");

module.exports.createSong = async (playlistId, args) => {
	console.log("inside")
	console.log("args are ", args);
	try {

		const newSong = await db.Song.create({
            id: args.id,
			titlu: args.titlu,
            url: args.url,
            stilMuzica: args.stilMuzica,
            playlistId: playlistId,
	});

	const playlist = await db.Playlist.findOne({ where: { id: playlistId } });
    if (!playlist) {
        await newSong.destroy();
        throw "invalid id for song nested objects";
    }
    return {
        id: newSong.dataValues.id,
        titlu: newSong.dataValues.titlu,
        url: newSong.dataValues.url,
        stilMuzica: newSong.dataValues.stilMuzica,
        playlist,
    };

	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.updateSong = async (id, args) => {
	const { titlu, url, stilMuzica, playlistId } = args;

	try {
		await db.Song.update(
			{
				titlu, url, stilMuzica, playlistId
			},
			{ where: { id } }
		);

		return await db.Song.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}

}

module.exports.deleteSong = async (id) => {
	console.log(id)
	try {
		const songToDelete = await db.Song.findOne({
			where: {
				id
			}
		});
		console.log(songToDelete)
		if (songToDelete == null) {
			return {
				status: "no Song with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		await SongToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.log("ups eroare");
		console.error(err);
		return null;
	}
};

module.exports.getAllSongs = async () => {
	try {
		const songs = await db.Song.findAll({limit:10});

        const songsArr = [];
        if(songs.length) {
            for (let song of songs) {
                console.log(song)
                try{
                    const playlist = await db.Playlist.findOne({
                        where: { id: song.dataValues.playlistId },
                    });
                    songsArr.push({
                        id: song.dataValues.id,
                        titlu: song.dataValues.titlu,
                        url: song.dataValues.url,
                        stilMuzica: song.dataValues.stilMuzica,
                        playlist: playlist.dataValues,
                    });
                } catch(err) {
					console.log(err)
				}
            }
        }
        return songsArr;
		
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getSong = async (id) => {
	try {
		const songById = await db.Song.findOne({ where: { id } });
        const playlist = await db.Playlist.findOne({
            where: { id: songById.dataValues.playlistId },
        });
		return {
            id: songById.dataValues.id,
            titlu: songById.dataValues.titlu,
            url: songById.dataValues.url,
            stilMuzica: songById.dataValues.stilMuzica,
            playlist: playlist.dataValues,
        };
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getSongsOfPlaylist = async (playlistId) => {
	const playlist = await Playlist.findByPk(playlistId, {
		include: [Song]
	})
	return playlist
}

module.exports.getAllPlaylistSongs = async (playlistId) => {
	try{
		const playlist = await db.Playlist.findByPk(playlistId)
		const songs = await playlist.getSongs()
		//const Songs = await db.Song.findAll({where: {PlaylistId : PlaylistId} })
		
		return songs
	}
	catch (err){
		console.error(err)
		return null
	}
}