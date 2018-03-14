var express = require("express");
const knex = require("../utils/connection");
var router = express.Router();
const model = require("../model/assignment");
const helper = require("../controllers/helper");
var CronJob = require("cron").CronJob;
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   "postgres://postgres:cmugrader@127.0.0.1:5432/grader"
// );

// Load the full build.
var _ = require("lodash");
// Load the core build.
var _ = require("lodash/core");
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require("lodash/fp");

// Load method categories.
var array = require("lodash/array");
var object = require("lodash/fp/object");

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require("lodash/at");
var curryN = require("lodash/fp/curryN");

/* GET home page. */
router.get("/", async function(req, res, next) {
  // new CronJob(
  //   "* * * * * *",
  //   function() {
  //     console.log("You will see this message every second");
  //   },
  //   null,
  //   true,
  //   "Asia/Bangkok"
  // );
  // const data = model.CreatePDFdetailAssignment();

  // var object = {
  //   a: 1,
  //   b: 3,
  //   c: 3,
  //   d: {
  //     d: 4
  //   }
  // };
  // var other = { c: 3, a: 1, b: 3, d: 4 };
  // res.send(_.isEqual(object, other));
  // const data = await model.addDbNameintoServer("eieieeiie212111ei12222");
  // res.send(data);
  var knexGrader = knex.pgGrader;
  // var startDate = new Date();
  // await knexGrader.raw("BEGIN;");
  await knexGrader
    .raw(
      "BEGIN;delete\t\n from assignment_header where anumber=44 returning *;ROLLBACK;"
    )
    .timeout(1000)
    .then(async data => {
      var endDate = new Date();
      var dataObj = data;
      dataObj.shift();
      dataObj.pop();
      // data.shift();
      // data.pop();
      await res.send(dataObj);
      // res.send({ data: data, time: endDate - startDate });
    })
    .catch(async error => {
      console.error(error);
      await knexGrader.raw("ROLLBACK;");
      await res.send("eiei");
      // res.send(error);
    });
  // const data = await helper.writeAssignmentSubmitFile(1, 20);
  // const pgp = require("pg-promise")({
  //   // Initialization Options
  // });
  // const cn = "postgres://postgres:cmusqlgrader@localhost:5432/grader";
  // const db = pgp(cn);
  // db
  //   .one(
  //     "insert into databases(dbname) values ('test323aaaaa') returning dbname;"
  //   )
  //   .then(function(data) {
  //     console.log(data);
  //     res.send(data);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //     res.send(error);
  //   });
});

module.exports = router;
