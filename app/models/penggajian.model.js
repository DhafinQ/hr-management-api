export default ( sequelize, DataTypes ) => {
    const Penggajian = sequelize.define("Penggajian", {
        IDGaji : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        IDKaryawan: {type: DataTypes.INTEGER, allowNull: true},
        GajiPokok: {type: DataTypes.INTEGER, allowNull: false},
        Potongan: {type: DataTypes.INTEGER, allowNull: false},
        TotalGajiBersih: {type: DataTypes.INTEGER, allowNull: false},
        TanggalPembayaran: {type: DataTypes.DATEONLY, allowNull: false},
    },
    { freezeTableName: true, timestamps: false }
)

    return Penggajian;
}