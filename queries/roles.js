const db = require("../config/connection");
const cTable = require("console.table");

const getRoles = async () => {
  const roles = await db.promise().query(
    `SELECT roles.title AS job_title, roles.id AS role_id, department.dept_name AS department, roles.salary
        FROM roles
        LEFT JOIN department ON roles.dept_id = department.id;`
  );
  console.table(roles[0]);
  return roles;
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

module.exports = { getRoles, addRole };
