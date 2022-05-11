const db = require("../config/connection");

const addDepartment = async (department) => {
  db.promise()
    .query(`INSERT INTO department (dept_name) VALUES ("${department}")`)
    .then(console.log(`${department} Department added`))
    .catch((err) => {
      console.log(err);
    });
};

const addRole = async (title, salary, dept) => {
  const departmentQ = await db
    .promise()
    .query(`SELECT id FROM department WHERE dept_name = "${dept}"`);
  const deptID = departmentQ[0][0].id;

  db.promise()
    .query(
      `INSERT INTO roles (title, salary, dept_id) VALUES ("${title}","${salary}","${deptID}")`
    )
    .then(console.log(`${title} Role added`))
    .catch((err) => {
      console.log(err);
    });
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

module.exports = { addDepartment, addRole, addEmployee };
