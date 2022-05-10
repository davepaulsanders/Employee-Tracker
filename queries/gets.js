const db = require("../config/connection");

const departmentQuery = async () => {
  const departments = await db
    .promise()
    .query(`SELECT * FROM department`)
    .then(([rows]) => {
      console.table(rows);
    });
  return departments;
};

const employeeQuery = async () => {
  //formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  const employees = await db
    .promise()
    .query(
      `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, employee.manager_id
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department on roles.dept_id = department.id`
    )
    .then(([rows]) => {
      return rows;
    });
  console.table(employees);
  // returning data for update employee role function
  return employees;
};

const roleQuery = async () => {
  const roles = await db
    .promise()
    .query(
      `SELECT roles.title AS job_title, roles.id AS role_id, department.dept_name AS department, roles.salary
      FROM roles
      LEFT JOIN department ON roles.dept_id = department.id;`
    )
    .then(([rows]) => {
      console.table(rows);
    });
  return roles;
};

module.exports = { departmentQuery, roleQuery, employeeQuery };
