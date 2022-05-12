const db = require("../config/connection");
const cTable = require("console.table");

const getDepartments = async () => {
  const departments = await db.promise().query(
    `SELECT department.id AS ID,
      department.dept_name AS Department FROM department ORDER BY id`
  );
  console.table(departments[0]);
  return departments;
};

const addDepartment = async (department) => {
  db.promise()
    .query(`INSERT INTO department (dept_name) VALUES ("${department}")`)
    .then(console.log(`${department} Department added`))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { addDepartment, getDepartments };
