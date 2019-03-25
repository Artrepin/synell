'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('project_en', [
      {
        iProjectID: 1,
        sProjectTitle: "Project one",
        sProjectTechnology: "PHP, HTML",
        tProjectDesc: "The staff, in their habitual defensive state, tend to make these unfortunate employees think that there is a choice when it comes to appointments, but this is not the case.",
        tProjectTask: "For several generations, technical staff worked on the computer, trying to expand its capabilities.",
        tProjectWork: "Having made a picture, the photographer dryly thanked the railway staff and hurriedly retired to his compartment.",
        tProjectResult1: "Increase the conversion of sales 200%",
        tProjectResult2: "There was a lever of management of the company",
        tProjectResult3: "It became clear how much each investment",
        tProjectResult4: "It has become easy and convenient for potential customers to get acquainted with the company",
      },
      {
        iProjectID: 2,
        sProjectTitle: "Project two",
        sProjectTechnology: "PHP, HTML",
        tProjectDesc: "The staff, in their habitual defensive state, tend to make these unfortunate employees think that there is a choice when it comes to appointments, but this is not the case.",
        tProjectTask: "For several generations, technical staff worked on the computer, trying to expand its capabilities.",
        tProjectWork: "Having made a picture, the photographer dryly thanked the railway staff and hurriedly retired to his compartment.",
        tProjectResult1: "Increase the conversion of sales 200%",
        tProjectResult2: "There was a lever of management of the company",
        tProjectResult3: "It became clear how much each investment",
        tProjectResult4: "It has become easy and convenient for potential customers to get acquainted with the company",
      },
      {
        iProjectID: 3,
        sProjectTitle: "Project three",
        sProjectTechnology: "PHP, HTML",
        tProjectDesc: "The staff, in their habitual defensive state, tend to make these unfortunate employees think that there is a choice when it comes to appointments, but this is not the case.",
        tProjectTask: "For several generations, technical staff worked on the computer, trying to expand its capabilities.",
        tProjectWork: "Having made a picture, the photographer dryly thanked the railway staff and hurriedly retired to his compartment.",
        tProjectResult1: "Increase the conversion of sales 200%",
        tProjectResult2: "There was a lever of management of the company",
        tProjectResult3: "It became clear how much each investment",
        tProjectResult4: "It has become easy and convenient for potential customers to get acquainted with the company",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('project_en', null, {});
  }
};
