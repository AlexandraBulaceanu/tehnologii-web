"use strict";
const faker = require("faker");
const db = require("../models");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const playlistIds = [];
		const data_to_push = [];


		for (let it = 0; it < 100; ++it) {
			const id = faker.datatype.number();
			//var someDate = new Date();
			//console.log(someDate)
			//var numberOfDaysToAdd = faker.datatype.number({ min: 1, max: 5 });
			//console.log(numberOfDaysToAdd)
			//var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
			//var result = someDate + numberOfDaysToAdd
			//console.log(result.getDate())
			let nr = faker.datatype.number({min:3, max:10});
			data_to_push.push({
				id,
                descriere: faker.lorem.word(4),
                data: new Date(2023, 11, 24, 10, 33, 30, 0),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			playlistIds.push(id);
		}
		await queryInterface.bulkInsert("Playlists", data_to_push, {});
	},

	down: async (queryInterface, Sequelize) => {
		
		await db.sequelize.query("SET SQL_SAFE_UPDATES=0");
		await queryInterface.bulkDelete("Playlists", null, {});

	},
};