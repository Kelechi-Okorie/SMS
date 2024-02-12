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

      
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      
      const userName = (`${firstName}-${lastName}@gmail.com`).toLowerCase();
      
    users.push({
      firstName: lastName,
      lastName: faker.name.lastName(),
      middleName: faker.name.middleName(),
      userName: userName,
      password: bcrypt.hashSync(userName, bcrypt.genSaltSync(12)),
      phone: faker.phone.phoneNumber(),
      dob: faker.date.past(),
      addressStreet: faker.address.streetAddress(),
      addressState: faker.address.state(),
      addressLGA: faker.address.cityName(),
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
