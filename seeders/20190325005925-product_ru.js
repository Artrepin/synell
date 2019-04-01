'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project_ru', [
      {
        iProjectID: 1,
        sProjectTitle: "Первый проект",
        sProjectTechnology: "ПХП, АШТМЛЬ",
        tProjectDesc: "Персонал, в их привычном оборонительном состоянии, как правило, заставляет этих несчастных сотрудников думать, что существует возможность выбора, когда дело доходит до назначений, но это не так.",
        tProjectTask: "В течение нескольких поколений технический персонал работал над компьтером, пытаясь расширить его возможности.",
        tProjectWork: "Произведя снимок, фотограф сухо поблагодарил железнодорожный персонал и поспешно удалился в свое купе.",
        tProjectResult1: "Рост конверсии отдела продаж на 200%",
        tProjectResult2: "Появился рычаг управления компанией",
        tProjectResult3: "Стало понятно, какие результаты даёт каждое направления инвестиций",
        tProjectResult4: "Потенциальным клиентам стало просто и удобно знакомиться с компанией",
      },
      {
        iProjectID: 2,
        sProjectTitle: "Второй проект",
        sProjectTechnology: "ПХП, АШТМЛЬ",
        tProjectDesc: "Персонал, в их привычном оборонительном состоянии, как правило, заставляет этих несчастных сотрудников думать, что существует возможность выбора, когда дело доходит до назначений, но это не так.",
        tProjectTask: "В течение нескольких поколений технический персонал работал над компьтером, пытаясь расширить его возможности.",
        tProjectWork: "Произведя снимок, фотограф сухо поблагодарил железнодорожный персонал и поспешно удалился в свое купе.",
        tProjectResult1: "Рост конверсии отдела продаж на 200%",
        tProjectResult2: "Появился рычаг управления компанией",
        tProjectResult3: "Стало понятно, какие результаты даёт каждое направления инвестиций",
        tProjectResult4: "Потенциальным клиентам стало просто и удобно знакомиться с компанией",
      },
      {
        iProjectID: 3,
        sProjectTitle: "Третий проект",
        sProjectTechnology: "ПХП, АШТМЛЬ",
        tProjectDesc: "Персонал, в их привычном оборонительном состоянии, как правило, заставляет этих несчастных сотрудников думать, что существует возможность выбора, когда дело доходит до назначений, но это не так.",
        tProjectTask: "В течение нескольких поколений технический персонал работал над компьтером, пытаясь расширить его возможности.",
        tProjectWork: "Произведя снимок, фотограф сухо поблагодарил железнодорожный персонал и поспешно удалился в свое купе.",
        tProjectResult1: "Рост конверсии отдела продаж на 200%",
        tProjectResult2: "Появился рычаг управления компанией",
        tProjectResult3: "Стало понятно, какие результаты даёт каждое направления инвестиций",
        tProjectResult4: "Потенциальным клиентам стало просто и удобно знакомиться с компанией",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_ru', null, {});
  }
};