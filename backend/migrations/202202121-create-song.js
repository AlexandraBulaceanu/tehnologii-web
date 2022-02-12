"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Songs", {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
                type: Sequelize.INTEGER,
			},
			titlu: {
				allowNull: false,
                type: Sequelize.STRING,
			},
            url: {
				allowNull: false,
                type: Sequelize.STRING,
			},
            stilMuzica: {
                allowNull: false,
                type: Sequelize.ENUM('POP','ALTERNATIVE','ROCK','RAP'),
            },
            playlistId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Playlists",
					},
					key: "id",
					onDelete: "cascade",
				},
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
		await queryInterface.dropTable("Songs");
	},
};
