'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const assessments = [
      {
        name: 'First',
        ordinal: 1,
        maximumScore: 10,
      },
      {
        name: 'Second',
        ordinal: 2,
        maximumScore: 10,
      },
      {
        name: 'Third',
        ordinal: 3,
        maximumScore: 10,
      },
      {
        name: 'Exam',
        ordinal: 4,
        maximumScore: 70,
      }
    ];

    await queryInterface.bulkInsert('assessments', assessments);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
