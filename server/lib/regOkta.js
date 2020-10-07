const express = require("express");
const oktaClient = require("./oktaClient");
const util = require("util");

/* Create a new User (register). */
function reg(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email,
      mobilePhone: req.body.phone,
      admin: req.body.admin
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  //console.log(util.inspect(newUser, false, null, true /* enable colors */));
  //console.log('newuser is'+newUser);
var temp = {};
  oktaClient
    .createUser(newUser)
    .then(user => {
      console.log("Created user", user);
      temp = {user: user, successful: true};
      console.log('temp is: ' +temp);
      next(null,temp);
      //res.status(201);
      //res.send(user);
    })
    .catch(err => {
      console.log(err.message);
      temp = {err: err.message, successful: false};
      next(null,temp);
      //res.status(400);
      //res.send(err);
    });

}

module.exports = {
  reg
};
