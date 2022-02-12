"use strict";
const faker = require("faker");
const db = require("../models");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const songIds = [];
		const data_to_push = [];
        const allPlaylists = await db.Playlist.findAll();
        const playlistIds = []
        for (var elem in allPlaylists)
			playlistIds.push(allPlaylists[elem].id)
        
        let playlistId = playlistIds[
            faker.datatype.number({ min: 0, max: playlistIds.length - 2 })
        ];

        var stiluri =[
            {'POP': 0},
            {'ALTERNATIVE': 1},
            {'ROCK': 2},
            {'RAP': 3},
        ];

		for (let it = 0; it < 100; ++it) {
			const id = faker.datatype.number();
            let rand = Math.floor(Math.random() * Object.keys(stiluri).length);
            let randstiluriValue = Object.keys(stiluri[Object.keys(stiluri)[rand]])[0];
            console.log(randstiluriValue);
            let nr = faker.datatype.number({min:5, max:10});
			data_to_push.push({
				id,
                titlu: faker.lorem.word(6),
                url: faker.internet.url(),
                stilMuzica: randstiluriValue,
                playlistId: playlistId,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			songIds.push(id);
		}
		await queryInterface.bulkInsert("Songs", data_to_push, {});
	},

	down: async (queryInterface, Sequelize) => {
		
		await db.sequelize.query("SET SQL_SAFE_UPDATES=0");
		await queryInterface.bulkDelete("Songs", null, {});

	},
};
