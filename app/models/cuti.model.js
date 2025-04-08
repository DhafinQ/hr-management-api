export default ( sequelize, DataTypes ) => {
    const Cuti = sequelize.define("Cuti", {
        IDCuti : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        IDKaryawan: {type: DataTypes.INTEGER, allowNull: true},
        JenisCuti: {type: DataTypes.ENUM("Tahunan","Sakit","Urgent","Melahirkan","Lainnya"),
            allowNull: false
        },
        TanggalMulai: {type: DataTypes.DATEONLY, allowNull: false},
        TanggalSelesai: {type: DataTypes.DATEONLY, allowNull: false},
        StatusPersetujuan: {type: DataTypes.ENUM("Pending","Disetujui","Ditolak")},
    },
    { freezeTableName: true, timestamps: false }
)

    return Cuti;
}