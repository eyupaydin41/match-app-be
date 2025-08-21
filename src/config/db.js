import pkg from 'sequelize';

const { Sequelize } = pkg;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

export default sequelize;
