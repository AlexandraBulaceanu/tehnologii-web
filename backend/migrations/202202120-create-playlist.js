"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Playlists", {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
                type: Sequelize.INTEGER,
			},
			descriere: {
				allowNull: false,
                type: Sequelize.STRING,
			},
            data: {
				allowNull: false,
                type: Sequelize.DATE,
            },
            createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Playlists");
	},
};
