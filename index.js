const inquirer = require("inquirer");
const { departmentQuery, roleQuery, employeeQuery } = require("./queries/gets");
const { addDepartment, addRole, addEmployee } = require("./queries/adds");
const { updateEmployeeQuery } = require("./queries/update");

// Action choices for user
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
    case "Update employee role":
      updateEmployeeRole();
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
      // send answers to query
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
      // send answers to query
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
        name: "role",
        message: "What is their role?",
      },
      {
        name: "manager",
        message: "Who is their manager? (Hit enter if none)",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, role, manager } = answers;

      // send answers to query
      addEmployee(firstName, lastName, role, manager);
    });
};

const updateEmployeeRole = async () => {
  // get list of employees
  const employees = await employeeQuery();

  // combine first and last name, make a list, and add it to choices
  const list = [];
  employees.forEach((employee) =>
    list.push(`${employee.first_name} ${employee.last_name}`)
  );

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee do you want to update?",
        choices: list,
      },
      {
        name: "newRole",
        message: "What is their new role?",
      },
    ])
    .then((answer) => {
      const { employeeName, newRole } = answer;
      updateEmployeeQuery(employeeName, newRole);
    });
};
