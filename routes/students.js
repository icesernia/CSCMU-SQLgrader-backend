var express = require("express");
var router = express.Router();
const model = require("../model/student");
const controller = require("../controllers/student.js");
var jwt = require("jsonwebtoken");

router.post("/addstudent", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const studentid = req.body.studentid;
  const fullname = req.body.fullname;
  const cid = req.body.cid;
  try {
    const hashPassword = await controller.hashPassword(password);
    const addStudent = await model.addStudent(
      username,
      hashPassword,
      studentid,
      fullname
    );
    const addStudentInCourse = await model.addStudentInCourse(username, cid);
    res.status(200).send({ yes: "yes" });
  } catch (error) {
    res.status(500).send(error);
  }
  // const addStudent = await
});

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = await model.getDataStudent(username);
    const checkPassword = await controller.checkPassword(
      password,
      data.password
    );
    delete data.password;
    const jwtToken = await controller.genToken(data);
    res.status(200).send(jwtToken);
  } catch (error) {
    res.status(500).send("login failed");
  }
  // const addStudent = await
});

module.exports = router;