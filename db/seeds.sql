

INSERT INTO department (dept_name)
VALUES
("Sales"),
("Engineering"),
("Service"),
("Finance"),
("Legal");

INSERT INTO roles (title, salary, dept_id)
VALUES
("Salesperson", 40000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software Engineer", 100000.00, 2),
("Accountant", 50000.00, 3),
("Account Manager", 50000.00, 3),
("Legal Team Lead", 30000.00, 4),
("Lawyer", 10000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Margaret", "Nice", 5, NULL),
("David", "Sanders", 3, 1);

