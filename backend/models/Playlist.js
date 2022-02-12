const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Playlist extends Model {
		static associate(models) {
			Playlist.hasMany(models.Song, { foreignKey: "playlistId" });
		}
	}

	Playlist.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			descriere: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 200]
				}
			},
            data: {
                type: DataTypes.DATE,
				allowNull: false,
				isAfter: new Date()
            },
		},
		{ sequelize }
	);
	return Playlist;
};
