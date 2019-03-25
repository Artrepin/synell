'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project', [
      {
        iProjectID: 1,
        sProjectImage: "1.jpg",
        sProjectLinkDemo: "http://ya.ru",
        sProjectLinkReady: "http://yandex.ru",
        iProjectPeriod: 60,
        iProjectStaff: 34,
      },
      {
        iProjectID: 2,
        sProjectImage: "2.jpg",
        sProjectLinkDemo: "http://ya.ru",
        sProjectLinkReady: "http://yandex.ru",
        iProjectPeriod: 90,
        iProjectStaff: 43,
      },
      {
        iProjectID: 3,
        sProjectImage: "3.jpg",
        sProjectLinkDemo: "http://ya.ru",
        sProjectLinkReady: "http://yandex.ru",
        iProjectPeriod: 120,
        iProjectStaff: 67,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project', null, {});
  }
};
