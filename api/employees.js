import express from "express";
const router = express.Router();
export default router;

import employees, {
  addEmployee,
  getEmployeesById,
  getRandomEmployee,
} from "#db/employees";

router.get("/", (req, res) => {
  res.json(employees);
});

router.post("/", (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name } = req.body;
  if (!name) return res.status(400).send("Name is required.");

  const employee = addEmployee(name);
  res.status(201).send(employee);
});

router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.json(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const employee = getEmployeesById(+id);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }
  res.json(employee);
});
