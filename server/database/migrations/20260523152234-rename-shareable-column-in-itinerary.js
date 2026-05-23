/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Itineraries',
      'shareable',
      'privateItinerary'
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'Itineraries',
      'privateItinerary',
      'shareable'
    )
  }
};