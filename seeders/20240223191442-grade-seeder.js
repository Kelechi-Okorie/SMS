'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const grades = [
      {
        name: 'A',
        min: 70,
        max: 100,
        remarks: 'excellent'
      },
      {
        name: 'B',
        min: 60,
        max: 69,
        remarks: 'very good'
      },
      {
        name: 'C',
        min: 50,
        max: 59,
        remarks: 'good'
      },
      {
        name: 'D',
        min: 45,
        max: 49,
        remarks: 'pass'
      },
      {
        name: 'E',
        min: 40,
        max: 44,
        remarks: 'fail'
      },

      {
        name: 'F',
        min: 0,
        max: 39,
        remarks: 'fail'
      }
    ];

    queryInterface.bulkInsert('grades', grades);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
