const db = require("../config/connection");

const updateEmployeeQuery = async (name, newRole) => {
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

module.exports = { updateEmployeeQuery };
