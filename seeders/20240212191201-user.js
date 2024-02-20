'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');


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

    const users = [];


    for(let i = 0; i < 30; i++) {

      
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      
      const userName = (`${firstName}-${lastName}@gmail.com`).toLowerCase();
      
    users.push({
      firstName: lastName,
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      userName: userName,
      password: bcrypt.hashSync(userName, bcrypt.genSaltSync(12)),
      phone: faker.phone.number(),
      dob: faker.date.past(),
      address: faker.word.sample(),
      isStudent: false,
      isSchoolStaff: false,
      isPortalAdmin: true,
      config: '{"hasChangedPassword": false}',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
  }
    await queryInterface.bulkInsert('users', users);

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
