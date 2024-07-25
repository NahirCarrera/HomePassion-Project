import { Sequelize } from 'sequelize';

// Configura los parámetros de conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
});

export default sequelize;
