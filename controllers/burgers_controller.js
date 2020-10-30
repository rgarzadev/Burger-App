var express = require("express");

//creating instance of express router
var router = express.Router();

//import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//create a burger
router.post("/api/burgers", function (req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function (result) {
    //send back the ID of the new burger
    res.json({ message: "Success" });
  });
});

//change the burger with the given id
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      //if no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//delete a burger from devoured list
router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      //if no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//export routes for server.js to use.
module.exports = router;
