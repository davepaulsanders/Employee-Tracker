const inquirer = require("inquirer");
const { departmentQuery, roleQuery, employeeQuery } = require("./utils/gets");
const { addDepartment, addRole, addEmployee } = require("./utils/adds");

const promptUser = () => {
  return inquirer.prompt([
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
  ]);
};

promptUser().then((answers) => {
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
    case "Add department":
      addDepartmentPrompt();
      break;
    case "Add role":
      addRolePrompt();
      break;
    case "Add employee":
      addEmployeePrompt();
      break;
  }
});

const addDepartmentPrompt = () => {
  inquirer
    .prompt([
      {
        name: "departmentChoice",
        message: "What department would you like to add?",
      },
    ])
    .then((answer) => {
      addDepartment(answer.departmentChoice);
    });
};

const addRolePrompt = () => {
  inquirer
    .prompt([
      {
        name: "roleChoice",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        name: "departmentId",
        message: "What is the department ID?",
      },
    ])
    .then((answers) => {
      const { roleChoice, salary, departmentId } = answers;
      addRole(roleChoice, salary, departmentId);
    });
};

const addEmployeePrompt = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "What is their first name?",
      },
      {
        name: "lastName",
        message: "What is their last name?",
      },
      {
        name: "roleId",
        message: "What is their role ID?",
      },
      {
        name: "managerId",
        message: "What is their manager ID?",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      addEmployee(firstName, lastName, roleId, managerId);
    });
};
