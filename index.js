const inquirer = require("inquirer");
const { getDepartments, addDepartment } = require("./queries/departments");
const {
  getEmployees,
  addEmployee,
  updateEmployee,
} = require("./queries/employees");
const { getRoles, addRole } = require("./queries/roles");
const db = require("./config/connection");

// Action choices for user
const promptUser = () => {
  return inquirer
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
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const action = answers.actionChoice;
      switch (action) {
        case "View departments":
          getDepartments().then(promptUser);
          break;
        case "View employees":
          getEmployees().then(promptUser);
          break;
        case "View roles":
          getRoles().then(promptUser);
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
        case "Exit":
          console.log("Goodbye");
          db.end();
          break;
      }
    });
};

const addDepartmentPrompt = () => {
  inquirer
    .prompt([
      {
        name: "departmentChoice",
        message: "What department would you like to add?",
        validate: (department) => {
          if (department) {
            return true;
          } else {
            console.log("Please enter a department!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      // send answers to query
      addDepartment(answer.departmentChoice).then(promptUser);
    });
};

const addRolePrompt = () => {
  inquirer
    .prompt([
      {
        name: "roleChoice",
        message: "What role would you like to add?",
        validate: (role) => {
          if (role) {
            return true;
          } else {
            console.log("Please enter a role!");
            return false;
          }
        },
      },
      {
        name: "salary",
        message: "What is the salary for this role?",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("Please enter a salaryt!");
            return false;
          }
        },
      },
      {
        name: "departmentId",
        message: "Which deparment is the role in?",
        validate: (department) => {
          if (department) {
            return true;
          } else {
            console.log("Please enter a department!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      const { roleChoice, salary, departmentId } = answers;
      // send answers to query
      addRole(roleChoice, salary, departmentId).then(promptUser);
    });
};

const addEmployeePrompt = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "What is their first name?",
        validate: (name) => {
          if (name) {
            return true;
          } else {
            console.log("Please enter a first name!");
            return false;
          }
        },
      },
      {
        name: "lastName",
        message: "What is their last name?",
        validate: (lname) => {
          if (lname) {
            return true;
          } else {
            console.log("Please enter a last name!");
            return false;
          }
        },
      },
      {
        name: "role",
        message: "What is their role?",
        validate: (role) => {
          if (role) {
            return true;
          } else {
            console.log("Please enter a role!");
            return false;
          }
        },
      },
      {
        name: "manager",
        message: "Who is their manager? (Hit enter if none)",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, role, manager } = answers;
      // send answers to query
      addEmployee(firstName, lastName, role, manager).then(promptUser);
    });
};

const updateEmployeeRole = async () => {
  // get list of employees
  const employees = await getEmployees();
  // combine first and last name, make a list, and add it to choices
  const list = [];
  employees.forEach((employee) => list.push(`${employee.Name}`));

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
        validate: (role) => {
          if (department) {
            return true;
          } else {
            console.log("Please enter a role!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const { employeeName, newRole } = answer;
      updateEmployee(employeeName, newRole).then(promptUser);
    });
};

console.log(`
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗  ████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝  ╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░  ░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░  ░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗  ░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝  ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝\n\n`);

// Initializing the program
promptUser();
