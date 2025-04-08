export default (sequelize, DataTypes) => {
  const Karyawan = sequelize.define("Karyawan", {
    IDKaryawan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    NamaLengkap: { type: DataTypes.STRING, allowNull: false },
    NIP: { type: DataTypes.STRING, allowNull: false },
    IDJabatan: { type: DataTypes.INTEGER, allowNull: true },
    IDDepartemen: { type: DataTypes.INTEGER, allowNull: true },
    TanggalBergabung: { type: DataTypes.DATEONLY, allowNull: false },
    StatusKaryawan: { type: DataTypes.ENUM("Aktif", "Resign"), allowNull: false },
    NoHP: { type: DataTypes.STRING },
    Alamat: { type: DataTypes.TEXT },
    HakAkses: { type: DataTypes.ENUM("Admin", "HRD", "Pegawai"), allowNull: false }
  },
  { freezeTableName: true, timestamps: false });

  return Karyawan;
};