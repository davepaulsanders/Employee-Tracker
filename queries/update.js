const db = require("../config/connection");

const updateEmployeeQuery = async (name, newRole) => {
  const [first, last] = name.split(" ");

  const roleID = await db
    .promise()
    .query(`SELECT id FROM roles WHERE title = "${newRole}"`)
    .then(([rows]) => {
      if (!rows[0].id) {
        return "That job doesn't exist";
      }
      return rows[0].id;
    });

  const employeeID = await db
    .promise()
    .query(
      `SELECT id FROM employee WHERE first_name = "${first}" AND last_name = "${last}"`
    )
    .then(([rows]) => {
      if (!rows[0].id) {
        return "That employee doesn't exist";
      }
      return rows[0].id;
    });
  db.promise()
    .query(`UPDATE employee SET role_id = "${roleID}" WHERE id = ${employeeID}`)
    .then(
      console.log(
        `${first} ${last} has been updated with the new role of ${newRole}`
      )
    );
};

module.exports = { updateEmployeeQuery };
