const { Sequelize } = require('sequelize');
require("dotenv").config();

// const sequelize = new Sequelize('heroproject', 'admin', 'YoSR7o67IbmgQh3dXCyD083a9EmSv5j0', {
//   host: 'dpg-cmihk07109ks739luah0-a.singapore-postgres.render.com',
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: false,
//       rejectUnauthorized: false,
//     },
//   },
// });
// const sequelize = new Sequelize('heroproject', 'admin', 'rootuser', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
const sequelize = new Sequelize('programdashboard', 'admin', '0t1sDFaMMDDjNll5jiF9l1zSFm5iWacv', {
  host: 'dpg-co6k6i8l6cac73aagab0-a.singapore-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

// });
///

module.exports = sequelize;