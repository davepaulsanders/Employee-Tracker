const db = require("../config/connection");
const departmentQuery = () => {
  db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows]) => {
      console.table(rows);
    });
};

const employeeQuery = () => {
  //formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  db.promise()
    .query(
      `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, employee.manager_id
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department on roles.dept_id = department.id`
    )
    .then(([rows]) => {
      console.log(` \n =========================================`);
      console.table(rows);
      console.log(`=========================================`);
    });
};

const roleQuery = () => {
  db.promise()
    .query(
      `SELECT roles.title AS job_title, roles.id AS role_id, department.dept_name AS department, roles.salary
      FROM roles
      LEFT JOIN department ON roles.dept_id = department.id;`
    )
    .then(([rows]) => {
      console.table(rows);
    });
};

module.exports = { departmentQuery, roleQuery, employeeQuery };
