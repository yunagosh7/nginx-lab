import { Sequelize } from "sequelize"

console.log("process.env.DB_HOST", process.env.DB_HOST)
console.log("process.env.DB_USER", process.env.DB_USER)
console.log("process.env.DB_PASSWORD", process.env.DB_PASSWORD)

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST ?? "db-host",
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: console.log,

  }
);
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}