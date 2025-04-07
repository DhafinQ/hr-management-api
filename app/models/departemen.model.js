export default (sequelize, DataTypes) => {
    const Departemen = sequelize.define("Departemen", {
      IDDepartemen: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      NamaDepartemen: { type: DataTypes.STRING, allowNull: false },
      KepalaDepartemen: { type: DataTypes.STRING, allowNull: false },
      KodeDepartemen: { type: DataTypes.STRING, allowNull: false }
    },
    { freezeTableName: true, timestamps: false });
  
    return Departemen;
  };