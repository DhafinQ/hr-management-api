export default (sequelize, DataTypes) => {
    const Jabatan = sequelize.define("Jabatan", {
      IDJabatan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      NamaJabatan  : { type: DataTypes.STRING, allowNull: false },
      GajiPokok: { type: DataTypes.INTEGER, allowNull: false },
      Tunjangan: { type: DataTypes.INTEGER, allowNull: false },
      DeskripsiJabatan  : { type: DataTypes.STRING, allowNull: false }
    },
    { freezeTableName: true, timestamps: false });
  
    return Jabatan;
  };