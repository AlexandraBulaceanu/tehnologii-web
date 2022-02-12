const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Song extends Model {
		static associate(models) {
			Song.belongsTo(models.Playlist, { foreignKey: "playlistId" });
		}
	}

	Song.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			titlu: {
				type: DataTypes.STRING, 
				allowNull: false,
				validate: {
					len: [5, 200]
				}
			},
            url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: true
				}
			},
            stilMuzica: {
                type: DataTypes.ENUM,
                allowNull: false,
				values: ['POP', 'ALTERNATIVE', 'ROCK', 'RAP']
            },
		},
		{ sequelize }
	);
	return Song;
};