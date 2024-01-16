const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize('heroproject', 'admin', 'YoSR7o67IbmgQh3dXCyD083a9EmSv5j0', {
  host: 'dpg-cmihk07109ks739luah0-a.singapore-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});
// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "postgres",
//   logging: false,
  

// });

module.exports = sequelize;