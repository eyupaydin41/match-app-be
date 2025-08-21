export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: { 
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        primaryKey: true 
      },
      userAId: { 
        type: Sequelize.UUID, 
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      userBId: { 
        type: Sequelize.UUID, 
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal('NOW()') 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
