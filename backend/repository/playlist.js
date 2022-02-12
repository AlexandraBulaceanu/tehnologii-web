const db = require("../models");

module.exports.createPlaylist = async (args) => {
	console.log("args are ", args);
	try {
		const newPlaylist = await db.Playlist.create({
            id: args.id,
			descriere: args.descriere,
            data: args.data,
		});
		return newPlaylist;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.updatePlaylist = async (id, args) => {

    descriere = args.descriere
    data = args.data

	try {
		await db.Playlist.update(
			{
				descriere, data
			},
			{ where: { id } }
		);

		return await db.Playlist.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}

}

module.exports.deletePlaylist = async (id) => {
	console.log(id)
	try {
		const playlistToDelete = await db.Playlist.findOne({
			where: {
				id
			}
		});
		console.log(playlistToDelete)
		if (playlistToDelete == null) {
			return {
				status: "no playlist with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		await playlistToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.log("ups eroare");
		console.error(err);
		return null;
	}
};

//PAGINARE
module.exports.getAllPlaylistsPagination = async (page, per_page) => {
	//const page = args.page
	//const per_page = args.per_page
	try {
		const playlists = await db.Playlist.findAll({
			limit: per_page,
			offset: page * per_page
		});
		return playlists;
	} catch (err) {
		console.error(err);
		return null;
	}
};

//PAGINARE
module.exports.getAllPlaylists = async () => {
	//const page = args.page
	//const per_page = args.per_page
	try {
		const playlists = await db.Playlist.findAll({
			limit: 10
		});
		return playlists;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getPlaylist = async (id) => {
	try {
		const playlistById = await db.Playlist.findOne({ where: { id } });
		return playlistById;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getPlaylistByDescriere = async (descriere) => {
	try {
		const playlistByDescriere = await db.Playlist.findOne({ where: { descriere } });
		return playlistByDescriere;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getPlaylistDescriere = async (id) => {
	try{
		console.log(id)
		
		const playlist = await db.Playlist.findOne({
				where: { id },
		});
        let descriere;
		if (playlist !== null){
			descriere = playlist.dataValues.descriere;
		}
        return descriere;
	} catch(err){
		console.error(err)
		return null
	}
}