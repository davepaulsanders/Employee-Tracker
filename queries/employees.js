const db = require("../config/connection");
const cTable = require("console.table");

const getEmployees = async () => {
  //formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  const employees = await db.promise().query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, employee.manager_id
          FROM employee
          LEFT JOIN roles ON employee.role_id = roles.id
          LEFT JOIN department on roles.dept_id = department.id`
  );

  console.table(employees[0]);
  // returning data for update employee role function
  return employees[0];
};

// Add employee function must be async to await roleID and managerID variables
const addEmployee = async (firstName, lastName, role, manager) => {
  const [first, last] = manager.split(" ");

  // get roleID from job title
  const roleQ = await db
    .promise()
    .query(`SELECT id FROM roles WHERE title = "${role}"`);

  const roleID = roleQ[0][0].id;

  // get managerID from their name
  const managerQ = await db
    .promise()
    .query(
      `SELECT id FROM employee WHERE first_name = "${first}" AND last_name = "${last}"`
    );

  const managerID = managerQ[0][0].id;

  // insert into query with roleID and managerID
  db.promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}","${roleID}", "${managerID}")`
    )
    .then(console.log(`${firstName} ${lastName} added as an employee`));
};

const updateEmployee = async (name, newRole) => {
  // Split name
  const [first, last] = name.split(" ");

  // get role id of newRole
  const roleQ = await db
    .promise()
    .query(`SELECT id FROM roles WHERE title = "${newRole}"`);

  const roleID = roleQ[0][0].id;

  // get employeeID of name
  const employeeQ = await db
    .promise()
    .query(
      `SELECT id FROM employee WHERE first_name = "${first}" AND last_name = "${last}"`
    );
  const employeeID = employeeQ[0][0].id;

  // Update employee
  db.promise()
    .query(`UPDATE employee SET role_id = "${roleID}" WHERE id = ${employeeID}`)
    .then(
      console.log(
        `${first} ${last} has been updated with the new role of ${newRole}`
      )
    );
};

module.exports = { getEmployees, addEmployee, updateEmployee };
