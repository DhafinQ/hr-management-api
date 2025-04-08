export default ( sequelize, DataTypes ) => {
    const Absensi = sequelize.define("Absensi", {
        IDAbsensi : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        IDKaryawan: {type: DataTypes.INTEGER, allowNull: true},
        WaktuCheckIn: {type: DataTypes.DATE, allowNull: false},
        WaktuCheckOut: {type: DataTypes.DATE, allowNull: true},
        StatusKehadiran: {type: DataTypes.ENUM("Hadir","Izin","Sakit","Alpha")},
    },
    { freezeTableName: true, timestamps: false }
)

    return Absensi;
}