const db = require("../config/connection");

const addDepartment = (department) => {
  db.promise()
    .query(`INSERT INTO department (dept_name) VALUES ("${department}")`)
    .then(console.log(`${department} Department added`));
};

const addRole = (title, salary, deptID) => {
  db.promise()
    .query(
      `INSERT INTO roles (title, salary, dept_id) VALUES ("${title}","${salary}","${deptID}")`
    )
    .then(console.log(`${title} Role added`));
};

const addEmployee = (firstName, lastName, roleID, managerID) => {
  db.promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}","${roleID}", "${managerID}")`
    )
    .then(console.log(`${firstName} ${lastName} added as an employee`));
};

module.exports = { addDepartment, addRole, addEmployee };
