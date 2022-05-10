const inquirer = require("inquirer");
const { departmentQuery, roleQuery, employeeQuery } = require("./utils/gets");
const introQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "actionChoice",
        message: "What would you like to do?",
        choices: [
          "View departments",
          "View roles",
          "View employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
        ],
      },
    ])
    .then((answers) => {
      const action = answers.actionChoice;
      switch (action) {
        case "View departments":
          departmentQuery();
          break;
        case "View employees":
          employeeQuery();
          break;
        case "View roles":
          roleQuery();
          break;
      }
    });
};

introQuestions();
