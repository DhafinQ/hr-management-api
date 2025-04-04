import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import userModel from "./user.model.js";
import karyawanModel from "./karyawan.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Karyawan = karyawanModel(sequelize, Sequelize);
db.User = userModel(sequelize, Sequelize);

// Define Relationships
db.User.belongsTo(db.Karyawan, { foreignKey: "IDKaryawan" });
db.Karyawan.hasOne(db.User, { foreignKey: "IDKaryawan" }); 

export default db;